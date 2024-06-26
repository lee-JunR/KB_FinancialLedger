import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDateStore = defineStore('date', () => {
  let today = new Date();
  console.log(today)
  const month = ref(today.getMonth() + 1) ;
  const year = ref(today.getFullYear())

  function increaseMonth(){
    today.setMonth(month.value)
    month.value = today.getMonth() + 1;
    year.value = today.getFullYear(); // 업데이트된 년도

    return {year: year.value ,month : month.value};
  }

  function decreaseMonth(){
    today.setMonth(month.value - 2)
    month.value = today.getMonth() + 1;
    year.value = today.getFullYear(); // 업데이트된 년도

    return {year: year.value ,month : month.value };
  }

  function getYearMonth(){
    return {year : year.value, month: month.value};
  }

  return { month, year, increaseMonth, decreaseMonth , getYearMonth}
})
