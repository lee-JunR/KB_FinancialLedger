<template>
    <div>
        <div class="filterWrapper">
            <div class="filter">
                <div class="date">
                    <label for="date">일자</label> <br>
                    <!-- <button @click="test" id="date">{{ search.date.year }}-{{ search.date.month }}-{{ search.date.date }}</button> -->
                    <!-- <input type="date" name="" id=""> -->
                    <VDatePicker id="date" v-model="current">
                        <template #default="{ inputValue, inputEvents }">
                            <input :value="inputValue" v-on="inputEvents" class="searchInput" />
                        </template>
                    </VDatePicker>
                </div>

                <div class="class">
                    <label for="class">분류</label> <br>
                    <div class="selectWrapper">
                        <select name="class" id="" class="searchInput" v-model="searchCategory.class">
                            <option value="지출">지출</option>
                            <option value="수입">수입</option>
                            <option value="" selected>선택</option>
                        </select>
                    </div>

                </div>
                <div class="category">
                    <label for="category">카테고리</label> <br>
                    <select name="category" id="category" class="searchInput" v-model="searchCategory.category">
                        <option value="식비">식비</option>
                        <option value="교통">교통</option>
                        <option value="생활">생활</option>
                        <option value="쇼핑/뷰티">쇼핑/뷰티</option>
                        <option value="" selected>선택</option>
                    </select>
                </div>

                <div class="payment">
                    <label for="payment">결제 수단</label> <br>
                    <select name="payment" id="payment" class="searchInput" v-model="searchCategory.payment">
                        <option value="현금">현금</option>
                        <option value="카드">카드</option>
                        <option value="" selected>선택</option>
                    </select>
                </div>

                <button class="searchButton" @click="test"><img src="@/assets/img/search.png" alt=""></button>
            </div>


        </div>
        <ExpenseList :search="search"></ExpenseList>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import ExpenseList from "./ExpenseList.vue";
import 'v-calendar/style.css';

export default {
    setup() {
        const current = ref(new Date());
        const searchCategory = reactive({ "class": "", "category": "", "payment": "" });

        const search = ref({
            date: {
                year: current.value.getFullYear().toString(),
                month: (current.value.getMonth() + 1).toString().padStart(2, "0"),
                date: current.value.getDate().toString().padStart(2, "0")
            },
            class: "", //분류 - 수입 지출
            category: "", //식비, 교통
            payment: "", //결제 수단
        });

        function test() {
            search.value.date.year = current.value.getFullYear().toString();
            search.value.date.month = (current.value.getMonth() + 1).toString().padStart(2, "0");
            search.value.date.date = current.value.getDate().toString().padStart(2, "0");
            search.value.class = searchCategory.class;
            search.value.category = searchCategory.category;
            search.value.payment = searchCategory.payment;

            console.log(search.value);
        }
        return { current, search, test, searchCategory };
    },
    components: {
        ExpenseList,
    },


}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

div {
  font-family: JUA, sans-serif;
}
.filterWrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: -20px;
    align-items: center;
    max-width: 876px;
    border-radius: 14px;
    background-color: #FAEBCD;
    position: relative;
    z-index: 10;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.filter {
    display: flex;
    margin: 24px 47px;
    justify-content: space-between;
    width: 80%
}

@media (max-width: 991px) {
    .filter {
        margin: 12px 5px;
    }
}

label {
    color: #434343;
    font-family: JUA, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.searchInput {
    width: 70px;
    color: #8E9393;
    font-family: JUA, sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
}

.searchButton {
    width: 45px;
    color: #8E9393;
    font-family: JUA, sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
}

.searchButton:hover,
.searchInput:hover {
    background-color: rgba(0, 0, 0, 0.3);
}


option {
    background-color: #FAEBCD;
    color: #434343;
    font-family: JUA, sans-serif;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
}

.searchInput .selectOption:hover {
    box-shadow: 0 0 10px 100px #434343 inset;
    background-color: yellow;
    color: #FAEBCD;
}
</style>