<template>
  <div class="div">
    <div class="div-2">
      <div class="div-3">
        <div class="div-4">
          <div class="div-5">전체 내역 {{ data.totalCnt }}건</div>
        </div>

        <div class="div-7">
          <div class="div-8">
            <TotalAmount />
          </div>
        </div>
      </div>
      <div class="list">
        <ul>
          <li class="list-item-day" v-for="item_day in data.groupedList">
            <div class="item-sub">
              <div class="date">
                {{ parseInt(item_day[0].date.split("-")[1]) + "월 " + parseInt(item_day[0].date.split("-")[2]) + "일" }}
              </div>
              <ExpenseListItemAmount :data="item_day" />
            </div>
          <li class="list-item-day-detail" v-for="item_detail in item_day">
            <div class="div-17">
              <div class="div-18">
                <div class="div-19">
                  <div :class="categoryClass(item_detail.category)">{{ item_detail.category }}</div>
                  <div class="div-22">
                    <div class="div-21">{{ item_detail.memo }}</div>
                    <div class="payment">{{ item_detail.payment }}</div>
                  </div>
                  <div class="div-22">{{ (item_detail.class === "지출") ? "- " : "+ " }} {{
                    item_detail.amount.toLocaleString('ko-kr') }}원</div>
                </div>
              </div>
            </div>
          </li>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';
import TotalAmount from '@/components/TotalAmount.vue';
import axios from 'axios';
import ExpenseListItemAmount from './ExpenseListItemAmount.vue';
const data = reactive({ list: "", totalCnt: "", groupedList: "" });
let accountId = "";
const userId = sessionStorage.getItem("id");

const props = defineProps({
  search: {
    type: Object,
    required: true
  }
});

const categoryClass = (category) => {
  if (category === '식비') {
    return 'div-20 category_food';
  } else if (category === '생활') {
    return 'div-20 category_life';
  } else if (category === '교통') {
    return 'div-20 category_traffic';
  } else if (category === '쇼핑/뷰티') {
    return 'div-20 category_shopping';
  }
  else {
    return 'div-20';
  }
};

const updateAccount = (list) => {
  let income = 0;
  let expense = 0;
  let profit = 0;

  list.forEach(e => {
    if (e.class === "수입") {
      income += e.amount;
    } else if (e.class === "지출") {
      expense += e.amount;
    }
  });

  profit = income - expense;

  const accountData = {
    total_income: income,
    total_expand: expense,
    profit: profit,
    id: userId
  };

  axios.put(`http://localhost:3001/account/${userId}`, accountData)
    .then(res => {
      console.log(res.data);
    })
    .catch(e => {
      console.log(e);
    });
};


// 날짜를 키로 잡아서 다시 그룹화 후, 날짜를 기준으로 최신순 정렬하는 메소드
const groupByDate = (list) => {
  const grouped = list.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // 객체의 키를 배열로 변환하여 정렬
  const sortedKeys = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  // 정렬된 키를 기준으로 새로운 객체 생성
  const sortedGrouped = sortedKeys.reduce((acc, key) => {
    acc[key] = grouped[key].slice().reverse();
    return acc;
  }, {});

  return sortedGrouped;
};


const getList = async () => {
  await axios.get(`http://localhost:3001/transactionDetail?user_id=${userId}`)
    .then(res => {
      data.list = res.data;

      data.groupedList = groupByDate(data.list);

      console.log(data.groupedList);
      data.totalCnt = res.data.length;

      updateAccount(data.list);

    })
    .catch(e => {
      console.log(e);
      alert("오류");
    });
}

onMounted(() => {
  getList();
})

// 부모 컴포넌트로부터 받아온 조건을 필터링
const filterList = () => {
  const search = props.search;
  const filteredList = data.list.filter(item => {
    const date = item.date.split('-');

    const yearCondition = !search.date.year || date[0] === search.date.year;
    const monthCondition = !search.date.month || date[1] === search.date.month;
    const dayCondition = !search.date.date || date[2] === search.date.date;
    const dateCondition = yearCondition && monthCondition && dayCondition;

    const classCondition = !search.class || item.class === search.class;
    const categoryCondition = !search.category || item.category === search.category;
    const paymentCondition = !search.payment || item.payment === search.payment;

    return dateCondition && classCondition && categoryCondition && paymentCondition;
  })

  console.log(filteredList);

  data.groupedList = groupByDate(filteredList);
  data.totalCnt = filteredList.length;
};

// props 변경 사항 추적하여 적용
watch(() => props.search, filterList, { deep: true });

</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

.list {
  font-family: JUA, sans-serif;
}

.list-item-day {
  list-style: none;
  margin-bottom: 7%;
}

@media (max-width: 991px) {
  .list-item-day {
    max-width: 100%;
  }
}

.list-item-day-detail {
  list-style: none;
}

@media (max-width: 991px) {
  .list-item-day-detail {
    max-width: 100%;
    width: 100%;
  }
}

.item-sub {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 991px) {
  .item-sub {
    max-width: 100%;
    display: grid;
  }
}

.list {
  margin-top: 1%;
  font-size: larger;
}

@media (max-width: 991px) {
  .list {
    vertical-align: middle;
  }
}

.div {
  display: flex;
  padding-bottom: 31px;
  flex-direction: column;
  z-index: auto;
  position: relative;
}


.div-2 {
  align-self: center;
  display: flex;
  margin-top: -19px;
  width: 100%;
  max-width: 1064px;
  flex-direction: column;

}

@media (max-width: 991px) {
  .div-2 {
    max-width: 100%;
    align-self: center;
    width: 100%;
    flex-direction: column;
  }
}

.div-3 {
  display: flex;
  margin-top: 60px;
  gap: 20px;
  font-weight: 700;
  justify-content: space-between;
}

@media (max-width: 991px) {
  .div-3 {
    max-width: 100%;
    flex-wrap: wrap;
    padding-right: 20px;
    margin-top: 40px;
    width: 95%;
    display: grid;
  }
}

.div-4 {
  display: flex;
  flex-direction: column;
  color: #434343;
}

@media (max-width: 991px) {
  .div-4 {
    margin-left: 8%;
    max-width: 100%;
    width: 100%;
  }
}

.div-5 {
  font: xx-large JUA, sans-serif;
}

.date {
  font: larger 900;
}

.div-7 {
  align-self: start;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

@media (max-width: 991px) {
  .div-7 {
    white-space: initial;
    max-width: 100%;
    width: 100%;
  }
}

.div-8 {
  gap: 9px;
}

@media (max-width: 991px) {
  .div-8 {
    white-space: initial;
    margin-left: 5%;
    max-width: 100%;
    width: 100%;
  }
}

.div-17 {
  background-color: #f8f8f8;
  display: flex;
  margin-top: 7px;
  flex-direction: column;
  color: #434343;
  font-weight: 700;
}

@media (max-width: 991px) {
  .div-17 {
    max-width: 85%;
    margin-right: 10%;
  }
}

.div-18 {
  border-radius: 10px;
  background-color: rgba(248, 248, 248, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
  gap: 10%;
  white-space: nowrap;
  padding: 19px 11px;
  justify-content: space-between;
}

@media (max-width: 991px) {
  .div-18 {
    max-width: 100%;
    padding: 10px 10px;
    flex-wrap: wrap;
    white-space: initial;
    justify-content: center;

  }
}

.div-19 {
  justify-content: space-between;
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  width: 100%;
}

@media (max-width: 991px) {
  .div-19 {
    white-space: initial;
    width: 80%;
    gap: 10%;
  }
}

.div-20 {
  border-radius: 11px;
  background-color: #ffd99f;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 6px 26px;
  font: medium JUA, sans-serif;
}

@media (max-width: 991px) {
  .div-20 {
    font: small JUA, sans-serif;
    width: 100px;
    padding: 1% 2%;

  }
}



.category_traffic {
  border-radius: 11px;
  background-color: #99ff89;
  text-align: center;
  justify-content: center;
  padding: 6px 26px;
  font: medium JUA, sans-serif;
}

@media (max-width: 991px) {
  .category_traffic {
    padding: 1% 2%;
    font: small JUA, sans-serif;
  }
}

.category_shopping {
  border-radius: 11px;
  background-color: #f9f59e;
  text-align: center;
  justify-content: center;
  padding: 6px 26px;
  font: medium JUA, sans-serif;
}

@media (max-width: 991px) {
  .category_shopping {
    white-space: initial;
    padding: 1% 2%;
    font: small JUA, sans-serif;
  }
}

.category_life {
  border-radius: 11px;
  background-color: #9fd7ff;
  text-align: center;
  justify-content: center;
  padding: 6px 26px;
  font: medium JUA, sans-serif;
}

@media (max-width: 991px) {
  .category_life {
    white-space: initial;
    padding: 1% 2%;
    font: small JUA, sans-serif;
  }
}

.category_food {
  border-radius: 11px;
  background-color: #ffade3;
  text-align: center;
  justify-content: center;
  padding: 6px 26px;
  font: medium JUA, sans-serif;
}

@media (max-width: 991px) {
  .category_food {
    white-space: initial;
    padding: 1% 2%;
    font: small JUA, sans-serif;
  }
}

.payment {
  margin: auto 0 0 10%;
  font: medium JUA, sans-serif;
  width: 100%;
  display: flex;
  justify-content: end;
}

@media (max-width: 991px) {
  .payment {
    max-width: 100%;
    width: 100%;
    font: x-small JUA, sans-serif;
    font-weight: 600;
    margin-right: 0%;
    overflow: hidden;
    height: 25px;
  }
}

.div-21 {
  margin: auto 0 0 10%;
  font: medium JUA, sans-serif;
  width: 100%;
  display: end;
}

@media (max-width: 991px) {
  .div-21 {
    max-width: 100%;
    width: 100%;
    font: xx-small JUA, sans-serif;
    font-weight: 900;
    margin-right: 0%;
    overflow: hidden;
    height: 25px;
  }
}

.div-22 {
  margin: auto;
  font: medium JUA, sans-serif;
  display: flex;
  font-weight: 900;
  color: #434343;
  width: 50%;
  justify-content: end;
}

@media (max-width: 991px) {
  .div-22 {
    max-width: 100%;
    width: 100%;
    justify-content: end;
    gap: 30%;
    font: small JUA, sans-serif;
    font-weight: 700;
    color: #434343;
  }
}

.div-23 {
  border-radius: 10px;
  background-color: rgba(248, 248, 248, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-top: 6px;
  width: 100%;
  gap: 20px;
  padding: 19px 11px;
}

@media (max-width: 991px) {
  .div-23 {
    max-width: 100%;
    flex-wrap: wrap;
  }
}

.div-24 {
  display: flex;
  gap: 10px;
}

.div-25 {
  border-radius: 11px;
  background-color: #f9f59e;
  white-space: nowrap;
  text-align: center;
  justify-content: center;
  padding: 6px 14px;
  font: 11px JUA, sans-serif;
}

@media (max-width: 991px) {
  .div-25 {
    white-space: initial;
  }
}

.div-26 {
  margin: auto 0;
  font: 12px JUA, sans-serif;
}

.div-27 {
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 12px JUA, sans-serif;
}

@media (max-width: 991px) {
  .div-27 {
    max-width: 100%;
  }
}

.div-28 {
  border-radius: 10px;
  background-color: rgba(248, 248, 248, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-top: 9px;
  width: 100%;
  gap: 20px;
  white-space: nowrap;
  padding: 19px 11px;
}

@media (max-width: 991px) {
  .div-28 {
    max-width: 100%;
    flex-wrap: wrap;
    white-space: initial;
  }
}

.div-29 {
  display: flex;
  gap: 10px;
}

@media (max-width: 991px) {
  .div-29 {
    white-space: initial;
  }
}

.div-30 {
  border-radius: 11px;
  background-color: #99ff89;
  text-align: center;
  justify-content: center;
  padding: 6px 26px;
  font: 11px JUA, sans-serif;
}

@media (max-width: 991px) {
  .div-30 {
    white-space: initial;
    padding: 0 20px;
  }
}

.div-31 {
  margin: auto 0;
  font: 12px JUA, sans-serif;
}

.div-32 {
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 12px JUA, sans-serif;
}

@media (max-width: 991px) {
  .div-32 {
    max-width: 100%;
  }
}

.div-33 {
  color: #434343;
  margin-top: 8px;
  font: 700 12px JUA, sans-serif;
}

@media (max-width: 991px) {
  .div-33 {
    max-width: 100%;
  }
}

.div-34 {
  border-radius: 10px;
  background-color: rgba(248, 248, 248, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-top: 5px;
  width: 100%;
  gap: 20px;
  color: #434343;
  font-weight: 700;
  white-space: nowrap;
  padding: 19px 11px;
}

@media (max-width: 991px) {
  .div-34 {
    max-width: 100%;
    flex-wrap: wrap;
    white-space: initial;
  }
}

.div-35 {
  display: flex;
  gap: 10px;
}

@media (max-width: 991px) {
  .div-35 {
    white-space: initial;
  }
}

.div-36 {
  border-radius: 11px;
  background-color: #ffade3;
  align-items: start;
  text-align: center;
  justify-content: center;
  padding: 6px 26px;
  font: 11px JUA, sans-serif;
}

@media (max-width: 991px) {
  .div-36 {
    white-space: initial;
    padding: 0 20px;
  }
}

.div-37 {
  margin: auto 0;
  font: 12px JUA, sans-serif;
}

.div-38 {
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 12px JUA, sans-serif;
}

@media (max-width: 991px) {
  .div-38 {
    max-width: 100%;
  }
}
</style>