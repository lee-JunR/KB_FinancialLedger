import { defineStore } from "pinia";
import { ref } from "vue";
export const useFilterStore = defineStore('filter', ()=>{
    const current = ref(new Date());
    const searchCategory = ref({"class" : "", "category" : "", "payment" : ""});

    const search = ref({
        date : {
            year : current.value.getFullYear().toString(), 
            month: (current.value.getMonth()+1).toString().padStart(2,"0"), 
            date : current.value.getDate().toString().padStart(2, "0") 
        },
        class : "", //분류 - 수입 지출
        category: "", //식비, 교통
        payment : "", //결제 수단
    });

    function test(searchCategory){
        search.value.date.year = current.value.getFullYear().toString();
        search.value.date.month = (current.value.getMonth()+1).toString().padStart(2,"0");
        search.value.date.date = current.value.getDate().toString().padStart(2, "0");
        search.value.class = searchCategory.class;
        search.value.category = searchCategory.category;
        search.value.payment = searchCategory.payment;
        
        console.log(search.value);
    }
    return {current,search, test};

})
