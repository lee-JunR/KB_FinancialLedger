<template>
    <div>
        <div class="summary-records">
            <div class="summary-item">
                <p class="summary-income">총수입 {{ dashboard.total_income.toLocaleString() }} 원</p>
                <p class="summary-expense">총지출 {{ dashboard.total_expand.toLocaleString() }} 원</p>
            </div>
            <div class="summary-total">총계 {{ dashboard.profit.toLocaleString() }} 원</div>
        </div>
        <FullCalendar :options="calendarOptions" ref="calendar" />
        <div style="text-align: center;">
            <div v-if="loading">Loading...</div>
            <div v-else-if="error" class="error-message">{{ error }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import { useDateStore } from '@/stores/date';
import { useRouter } from 'vue-router';
import axios from 'axios';

const dashboard = ref({ total_income: 0, total_expand: 0, profit: 0 });
const router = useRouter();
const calendar = ref(null);
const dateStore = useDateStore();
const loading = ref(true);
const error = ref(null);

const fetchDashboardData = async () => {
    try {
        const id = sessionStorage.getItem('id');
        if (!id) throw new Error('로그인이 필요합니다');

        const { data } = await axios.get(`http://localhost:3001/account?id=${id}`);
        const userDashboard = data.find(user => user.id == id);

        if (userDashboard) {
            dashboard.value = userDashboard;
        } else {
            throw new Error('가계부 데이터가 없습니다! 우측 하단 + 버튼을 눌러 가계부를 시작해보세요!');
        }
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin],
    locale: koLocale,
    headerToolbar: { left: '', center: '', right: '' },
    initialView: 'dayGridMonth',
    dateClick: handleDateClick,
    events: []
});

const fetchTransactionHistory = async () => {
    try {
        const id = sessionStorage.getItem('id');
        if (!id) throw new Error('로그인이 필요합니다');

        const { data: transactions } = await axios.get(`http://localhost:3001/transactionDetail?user_id=${id}`);
        if (transactions.length === 0) throw new Error('오른쪽 아래 + 버튼을 눌러 시작해보세요!');

        const colorMap = { '수입': '#0000FF', '지출': '#E47069' };
        const events = transactions.map(transaction => ({
            title: `${transaction.class === '수입' ? '+' : '-'}${parseInt(transaction.amount).toLocaleString()} 원`,
            start: transaction.date,
            extendedProps: { category: transaction.category, payment: transaction.payment },
            backgroundColor: "transparent",
            borderColor: "transparent",
            textColor: colorMap[transaction.class] || '#CCCCCC'
        }));

        const dailyTransactions = groupTransactionsByDay(transactions);
        for (const date in dailyTransactions) {
            const totalAmount = dailyTransactions[date].reduce((total, transaction) =>
                transaction.class === '수입' ? total + parseInt(transaction.amount) : total - parseInt(transaction.amount), 0);
            events.push({
                title: `지출 : ${totalAmount.toLocaleString()} 원`,
                start: date,
                backgroundColor: "transparent",
                borderColor: "transparent",
                textColor: '#000000'
            });
        }

        calendarOptions.value.events = events;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const groupTransactionsByDay = (transactions) => {
    return transactions.reduce((grouped, transaction) => {
        const date = transaction.date;
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(transaction);
        return grouped;
    }, {});
};

onMounted(async () => {
    await fetchTransactionHistory();
    await fetchDashboardData();
});

function handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
}

watch(
    () => ({ year: dateStore.year, month: dateStore.month }),
    ({ year, month }) => {
        calendar.value.getApi().gotoDate(`${year}-${month.toString().padStart(2, '0')}-01`);
    }
);
</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

.error-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    /* 배경색 설정 */
    padding: 20px;
    /* 내부 여백 설정 */
    border: 1px solid #FF0000;
    /* 테두리 설정 */
    border-radius: 10px;
    /* 라운드 처리 */
    z-index: 1000;
    /* 다른 요소 위에 위치하도록 설정 */
    font-size: 1.2rem;
    /* 폰트 크기 설정 */
    color: #FF0000;
    /* 글자 색상 설정 */
    text-align: center;
    /* 텍스트 가운데 정렬 */
    width: 80%;
    /* 너비 설정 */
    max-width: 400px;
    /* 최대 너비 설정 */
}

.fc {
    background-color: #F8F8F8;
    font-family: 'Jua', sans-serif;
    border-radius: 10px;
    /* 꼭지점을 라운드 처리 */
    margin: 20px;
    ;
}

.summary-records {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    margin: 10px;
}

.summary-item {
    display: flex;
    gap: 9px;
    white-space: nowrap;
}

.summary-income {
    color: #6293ce;
    font-family: 'JUA', sans-serif;
}

.summary-expense {
    color: #f66464;
    font-family: 'JUA', sans-serif;
}

.summary-total {
    color: #434343;
    font-family: 'JUA', sans-serif;
}

@media (max-width: 991px) {
    .summary-records {
        display: flex;
        flex-direction: column;
        margin: 3px;
    }

    .summary-item {
        flex-direction: column;
        gap: 0px;
        margin: 0px;
    }


    .summary-income {
        margin: 0px;
    }

    .summary-expense {
        margin: 0px;
    }

    .summary-total {
        margin-top: 4px;
    }
}
</style>