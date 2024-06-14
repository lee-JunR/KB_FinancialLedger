import { defineStore } from "pinia";
import { ref } from "vue";
import { useFilterStore } from "./filter";

import axios from 'axios';

export const useExpenseListStore = defineStore('expenseList', ()=>{
    
    
    const userId = ref(sessionStorage.getItem("id"));
    const data = ref({list : [], totalCnt : "", groupedList : ""});


    // 부모 컴포넌트로부터 받아온 조건을 필터링
    async function filterList() {
        console.log("filter!");
        if(data.value.list.length ===0 ){
            await getList();
        }
        const filter = useFilterStore();
        console.log(data.value.list);
        const filteredList = data.value.list.filter(item => {
        const date = item.date.split('-');
        
        const yearCondition = !filter.search.date.year || date[0] === filter.search.date.year;
        const monthCondition = !filter.search.date.month || date[1] === filter.search.date.month;
        const dayCondition = !filter.search.date.date || date[2] === filter.search.date.date;
        const dateCondition = yearCondition && monthCondition && dayCondition;

        const classCondition = !filter.search.class || item.class === filter.search.class;
        const categoryCondition = !filter.search.category || item.category === filter.search.category;
        const paymentCondition = !filter.search.payment || item.payment === filter.search.payment;

        return dateCondition && classCondition && categoryCondition && paymentCondition;
        })


        data.value.groupedList = await groupByDate(filteredList);
        data.value.totalCnt = filteredList.length;

        console.log(filteredList);

    };

    async function getList() { 
        await axios.get(`http://localhost:3001/transactionDetail?user_id=${userId.value}`)
        .then(res => {
            data.value.list = res.data;
            console.log(data.value.list);

            data.value.groupedList = groupByDate(data.value.list);

            console.log(data.value.groupedList);
            data.value.totalCnt = res.data.length;

            updateAccount(data.value.list);
            
        })
        .catch(e => {
            console.log(e);
            alert("오류");
        });
    }
    
    // 날짜를 키로 잡아서 다시 그룹화 후, 날짜를 기준으로 최신순 정렬하는 메소드
    function groupByDate (list){
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
    function updateAccount (list) {
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
  
        axios.put(`http://localhost:3001/account/${userId.value}`, accountData)
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
      };
  

    return {userId, data,filterList, getList}


})
