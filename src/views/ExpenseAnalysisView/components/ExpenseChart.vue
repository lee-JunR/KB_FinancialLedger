<template>
  <div class="div">

    <div class="div-3">

      <div class="div-4">

        <div class="column">
          <google-chart
            type="PieChart"
            :data="chartData"
            :options="chartOptions"
          ></google-chart>
          
        </div>

        <div class="column-2">
          <div class="div-5">
            <div class="total">이번달 지출 : <br /></div>

            <div class="totalValue">{{ totalExpense.toLocaleString() }} 원</div>
            <div class="div-7">
              <div class="div-8">
                <div class="div-9"><div class="div-10">생활</div></div>
                <div class="div-11">{{ categoryPercentages["생활"] }}%</div>
              </div>
              <div class="div-12">{{ totals["생활"].toLocaleString() }} 원</div>
            </div>
            <div class="div-13">
              <div class="div-14">
                <div class="div-15"><div class="div-16">쇼핑/뷰티</div></div>
                <div class="div-17">
                  {{ categoryPercentages["쇼핑/뷰티"] }}%
                </div>
              </div>
              <div class="div-18">
                {{ totals["쇼핑/뷰티"].toLocaleString() }} 원
              </div>
            </div>
            <div class="div-19">
              <div class="div-20">
                <div class="div-21"><div class="div-22">교통</div></div>
                <div class="div-23">{{ categoryPercentages["교통"] }}%</div>
              </div>
              <div class="div-24">{{ totals["교통"].toLocaleString() }} 원</div>
            </div>
            <div class="div-25">
              <div class="div-26">
                <div class="div-27"><div class="div-28">식비</div></div>
                <div class="div-29">{{ categoryPercentages["식비"] }}%</div>
              </div>
              <div class="div-30">{{ totals["식비"].toLocaleString() }} 원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import axios from "axios";
import { GChart } from "vue-google-charts";
import { useDateStore } from "@/stores/date";
export default defineComponent({
  name: "Frame",
  components: {
    "google-chart": GChart,
  },
  setup() {
    const categories = ["생활", "쇼핑/뷰티", "교통", "식비"];

    const chartData = ref([]);
    // Google 차트 옵션
    const chartOptions = ref({
      // 도넛 차트 설정
      pieHole: 0.4, // 도넛의 가운데 공간 비율 설정
      pieSliceText: "percentage", // 각 슬라이스에 표시되는 텍스트 설정
      pieStartAngle: 100, // 차트의 시작 각도 설정
      legend: "none", // 범례 위치 설정
      slices: {
        0: { color: "9FD7FF" },
        1: { color: "F9F59E" },
        2: { color: "99FF89" },
        3: { color: "FFADE3" },
      },
      backgroundColor: "transparent",
      fontSize: 17,
      width:500,
      height:500,
      pieSliceBorderColor: "white",
      pieSliceTextStyle: {
        color: "black", // 텍스트 색상 설정
        fontSize: 17, // 텍스트 크기 설정
        // 텍스트 굵게 설정
      },
    });

    const totals = ref<{ [key: string]: number }>({
      생활: 0,
      "쇼핑/뷰티": 0,
      교통: 0,
      식비: 0,
    });

    let overallTotal = 0;

    const categoryPercentages = ref<{ [key: string]: string }>({
      생활: "0",
      "쇼핑/뷰티": "0",
      교통: "0",
      식비: "0",
    });
    const totalExpense = ref(0);
    const dateStore = useDateStore();
    const fetchData = async () => {
      try {
        overallTotal = 0;
        totals.value = {
          생활: 0,
          "쇼핑/뷰티": 0,
          교통: 0,
          식비: 0,
        };

        const user_id = sessionStorage.getItem("id");
        const response = await axios.get(
          `http://localhost:3001/transactionDetail?user_id=${user_id}`
        );

        console.log(dateStore.month);

        const data = response.data.filter(
          (item: any) => (item.class === "지출") &&
          (parseInt(item.date.split("-")[1]) === parseInt(dateStore.month))
        );

        console.log(data);
        

        data.forEach((item: any) => {
          if (categories.includes(item.category)) {
            totals.value[item.category] += item.amount;
            overallTotal += item.amount;
          }
        });

        totalExpense.value = overallTotal;

        const chartDataArray = [];

        categories.forEach((category) => {
          if (overallTotal > 0) {
            // 각 카테고리의 퍼센티지 계산
            const percentage = (
              (totals.value[category] / overallTotal) * 100
              
            ).toFixed(1);
            // Google 차트 데이터에 추가
            chartDataArray.push([category, parseFloat(percentage)]);
            // 카테고리별 퍼센티지 저장
            categoryPercentages.value[category] = percentage;
          } else {
            categoryPercentages.value[category] = "0";
          }
        });

        // Google 차트에 사용할 데이터 설정
        chartData.value = [["Category", "Percentage"]].concat(chartDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    watch(() => dateStore.month, fetchData, totals)

    return {
      categories,
      totals,
      categoryPercentages,
      totalExpense,
      chartOptions,
      chartData,
    };
  },
});
</script>

<style scoped>
.div {
  background-color: #fff;
  display: flex;
  padding-bottom: 80px;
  flex-direction: column;
}


.div-3 {
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #faebcd;
  align-self: center;
  z-index: 10;
  margin-top: -19px;
  width: 862px;
  max-width: 100%;
  padding: 50px 50px 50px 50px;
}
@media (max-width: 991px) {
  .div-3 {
    border-radius: 20px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #faebcd;
    align-self: center;
    z-index: 10;
    margin-top: -19px;
    width: 74%;
  }
}
.div-4 {
  gap: 20px;
  display: flex;
}
@media (max-width: 991px) {
  .div-4 {
    flex-direction: column;
    align-items: center;
  }
}
.column {
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 45%;
  margin-right: 70px;
  margin-left: -80px;
  margin-top: -30px;
  margin-bottom: -20px;
}
@media (max-width: 991px) {
  .column {
    width: 123%;
    margin-top:-40%;
    align-self: center;
  }
}

.column-2 {
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 55%;
  margin-right: 50px;
}
@media (max-width: 991px) {
  .column-2 {
    width: 95%;
    margin-top: -20%;
    margin-right: 10%;
  }
}
.div-5 {
  display: flex;
  flex-direction: column;
  color: #000;
}
.total {
  font: 400 20px JUA, sans-serif;
}
@media (max-width: 991px) {
  .total {
    font: 400 20px Inter, sans-serif;
  }
}
.totalValue {
  font: 400 32px JUA, sans-serif;
  margin-top: 10px;
  margin-bottom: -5px;
}
.div-7 {
  border-radius: 21px;
  background-color: #f8f8f8;
  display: flex;
  margin-top: 22px;
  width: 100%;
  gap: 20px;
  white-space: nowrap;
  text-align: center;
  padding: 18px 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
@media (max-width: 991px) {
  .div-7 {
    white-space: initial;
  }
}
.div-8 {
  display: flex;
  gap: 19px;
}
@media (max-width: 991px) {
  .div-8 {
    white-space: initial;
  }
}
.div-9 {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 400;
  justify-content: center;
}
@media (max-width: 991px) {
  .div-9 {
    white-space: initial;
  }
}
.div-10 {
  font-family: JUA, sans-serif;
  border-radius: 17px;
  background-color: #9fd7ff;
  justify-content: center;
  padding: 9px 31px;
  font-weight: 500;
}
@media (max-width: 991px) {
  .div-10 {
    white-space: initial;
    padding: 0 20px;
  }
}
.div-11 {
  margin: auto 0;
  font: 300 20px JUA, sans-serif;
}
.div-12 {
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 300 20px JUA, sans-serif;
}
.div-13 {
  border-radius: 21px;
  background-color: #f8f8f8;
  display: flex;
  margin-top: 10px;
  width: 100%;
  gap: 20px;
  white-space: nowrap;
  text-align: center;
  padding: 18px 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
@media (max-width: 991px) {
  .div-13 {
    white-space: initial;
  }
}
.div-14 {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
@media (max-width: 991px) {
  .div-14 {
    white-space: initial;
  }
}
.div-15 {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 400;
  justify-content: center;
}
@media (max-width: 991px) {
  .div-15 {
    white-space: initial;
  }
}
.div-16 {
    font-family: JUA, sans-serif;
  border-radius: 17px;
  background-color: #f9f59e;
  justify-content: center;
  padding: 9px 31px;
  font-weight: 500;
}
@media (max-width: 991px) {
  .div-16 {
    white-space: initial;
    padding: 0 20px;
  }
}
.div-17 {
  margin: auto 0;
  font: 300 20px JUA, sans-serif;
}
.div-18 {
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 300 20px JUA, sans-serif;
}
.div-19 {
  border-radius: 21px;
  background-color: #f8f8f8;
  display: flex;
  margin-top: 10px;
  width: 100%;
  gap: 20px;
  white-space: nowrap;
  text-align: center;
  padding: 18px 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
@media (max-width: 991px) {
  .div-19 {
    white-space: initial;
  }
}
.div-20 {
  display: flex;
  gap: 19px;
}
@media (max-width: 991px) {
  .div-20 {
    white-space: initial;
  }
}
.div-21 {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 400;
  justify-content: center;
}
@media (max-width: 991px) {
  .div-21 {
    white-space: initial;
  }
}
.div-22 {
  font-family: JUA, sans-serif;
  border-radius: 17px;
  background-color: #99ff89;
  justify-content: center;
  padding: 9px 31px;
  font-weight: 500;
}
@media (max-width: 991px) {
  .div-22 {
    white-space: initial;
    padding: 0 20px;
  }
}
.div-23 {
  margin: auto 0;
  font: 300 20px JUA, sans-serif;
}
.div-24 {
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 300 20px   JUA, sans-serif;
}
.div-25 {
  border-radius: 21px;
  background-color: #f8f8f8;
  display: flex;
  margin-top: 10px;
  width: 100%;
  gap: 20px;
  white-space: nowrap;
  text-align: center;
  padding: 18px 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
@media (max-width: 991px) {
  .div-25 {
    white-space: initial;
  }
}
.div-26 {
  display: flex;
  gap: 19px;
}
@media (max-width: 991px) {
  .div-26 {
    white-space: initial;
  }
}
.div-27 {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 400;
  justify-content: center;
}
@media (max-width: 991px) {
  .div-27 {
    white-space: initial;
  }
}
.div-28 {
  font-family: JUA, sans-serif;
  border-radius: 17px;
  background-color: #ffade3;
  justify-content: center;
  padding: 9px 31px;
  font-weight: 500;
}
@media (max-width: 991px) {
  .div-28 {
    white-space: initial;
    padding: 0 20px;
  }
}
.div-29 {
  margin: auto 0;
  font: 300 20px  JUA, sans-serif;
}
.div-30 {
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 300 20px JUA, sans-serif;
}
</style>
