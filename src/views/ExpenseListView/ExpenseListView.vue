<template>
    <div>
        <ExpenseFilter></ExpenseFilter>
    </div>
</template>
<script>
import ExpenseFilter from './components/ExpenseFilter.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
export default {
    components :{
        ExpenseFilter,
    },
    setup() {
        const router = useRouter();

        onMounted(() => {
            if(!sessionStorage.getItem("id")){
                alert("로그인이 필요합니다.");
                router.push("/login");
                return;
            }
        })
    }
}
</script>
<style>
    
</style>