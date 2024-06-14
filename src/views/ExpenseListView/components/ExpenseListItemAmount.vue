<template>
                <div class="div-11">
                    <div class="div-12">수입 :</div>
                    <div class="div-13">{{ amount.totalIncome.toLocaleString('ko-KR') }}원</div>
                    <div class="div-14">
                        <div class="div-15">지출 :</div>
                        <div class="div-16">{{ amount.totalExpense.toLocaleString('ko-KR') }}원</div>
                    </div>
                </div>
</template>


<script setup>
import { reactive, onMounted } from 'vue';

const amount = reactive({totalIncome : 0, totalExpense : 0});

const props = defineProps({
    data : {type : Object, required: true}
})

onMounted(() => {
    props.data.forEach(element => {
        if(element.class === "지출") {
            amount.totalExpense += element.amount;
        }
        else if(element.class === "수입") {
            amount.totalIncome += element.amount;
        }
    });
})


</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
    .div-11 {
    align-self: end;
    display: flex;
    gap: 9px;
    font-size: medium;
    color: #434343;
  }
  @media (max-width: 991px) {
    .div-11 {
      margin-top: 3%;
    }
  }
  .div-12 {
    font-family: JUA, sans-serif;
  }
  .div-13 {
    font-family: JUA, sans-serif;
  }
  .div-14 {
    display: flex;
    gap: 2px;
  }
  @media (max-width: 991px) {
    .div-14 {
      white-space: initial;
    }
  }
  .div-15 {
    font-family: JUA, sans-serif;
    flex-grow: 1;
  }
  .div-16 {
    font-family: JUA, sans-serif;
  }
</style>