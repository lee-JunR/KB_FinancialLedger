<template lang="">
  <div>
    <ExpenseChart />
  </div>
</template>
<script>
import ExpenseChart from "./components/ExpenseChart.vue";
import {onMounted} from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: "MyComponent", // 컴포넌트 이름을 정의합니다
  components: {
    ExpenseChart, // 컴포넌트를 등록합니다
  },
  setup() {
    const router = useRouter();
    onMounted(() => {
      if(!sessionStorage.getItem("id")) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }
    });
  }
};
</script>
<style lang=""></style>
