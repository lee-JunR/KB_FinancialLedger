<template>
  <nav class="navbar">
    <div class="topSection">
      <div class="logosection">
        <RouterLink :to="{ name: 'home' }">
          <img loading="lazy" src='@/assets/img/logo.png' class="logo-img" />
        </RouterLink>
      </div>

      <div class="datesection">
        <button class="monthManageButton" @click="decreaseMonth">
          <img loading="lazy" src="@/assets/img/leftArrow.png" class="nav-icon" />
        </button>
        <div class="date-text">
          <div class="month">{{ date.month }}월</div>
          <div class="year">{{ date.year }}</div>
        </div>
        <button @click="increaseMonth" class="monthManageButton">
          <img loading="lazy" src="@/assets/img/rightArrow.png" class="nav-icon" />
        </button>
      </div>
    </div>

    <div class="bottomSection">
      <ul class="menuSection">
        <li>
          <RouterLink :to="{ name: 'home' }">
            <img src="@/assets/img/calendar.png" alt="달력" class="nav-icon-menu">
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'expenses' }">
            <img src="@/assets/img/list.png" alt="소비리스트" class="nav-icon-menu">
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'analysis' }">
            <img src="@/assets/img/analyze.png" alt="분석" class="nav-icon-menu">
          </RouterLink>
        </li>
      </ul>

      <ul class="option">
        <li>
          <img loading="lazy" src="@/assets/img/dark.png" class="nav-icon-option" @click="toggleTheme" />
        </li>
        <li>
          <RouterLink :to="{ name: 'profile' }">
            <img loading="lazy" src="@/assets/img/Account_circle.png" class="nav-icon-option" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useDateStore } from '@/stores/date';
import { ref, computed, onMounted } from 'vue';

const isDarkMode = ref(false);
const date = useDateStore();

const decreaseMonth = () => {
  console.log(date.decreaseMonth());
};

const increaseMonth = () => {
  console.log(date.increaseMonth());
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? "dark" : "light";
  sessionStorage.setItem("theme", theme);
  document.documentElement.setAttribute('theme', theme);
};


onMounted(() => {
  const storedTheme = sessionStorage.getItem('theme');
  if (storedTheme) {
    isDarkMode.value = storedTheme === 'dark';
    document.documentElement.setAttribute('theme', storedTheme);
  }
});
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');


.navbar {
  background-color: #f7c873;
  width: 100%;
  height: 172px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: JUA, sans-serif;
}

@media (max-width: 991px) {
  .navbar {
    flex-direction: column;
    align-items: center;
    gap: 0px;
    height: 200px;
    justify-content: normal;
  }
}

.topSection {
  display: flex;
  width: 61%;
  justify-content: space-between;
}

@media (max-width: 991px) {
  .topSection {
    flex-direction: column;
    align-items: center;
  }
}

.logosection {
  width: 293px;
  height: 107px;
  margin: 46px auto 19px 33px;
}

@media (max-width: 991px) {
  .logosection {
    margin: 0;
    width: 200px;
    height: 70px;
  }

  .logosection img {
    width: 100%;
    height: 100%;
  }
}

.datesection {
  display: flex;
  align-items: center;
}

@media (max-width: 991px) {
  .datesection {
    margin-bottom: 10px;
  }
}

.datesection .nav-icon {
  margin: 0 50px;
  height: 15px;
}

.datesection .date-text {
  width: 100px;
  font-family: JUA, sans-serif;
}

.datesection .monthManageButton {
  height: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.datesection .monthManageButton:hover {
  background-color: #bc9856;
}

.month {
  color: #434343;
  font-family: Inter;
  font-size: 45px;
  font-family: JUA, sans-serif;
  font-weight: 700;
  line-height: normal;
  text-align: center;
}

@media (max-width: 991px) {
  .month {
    font-size: 30px;
  }
}

.year {
  color: #434343;
  font-family: Inter;
  font-size: 25px;
  font-family: JUA, sans-serif;
  font-weight: 400;
  line-height: normal;
  text-align: center;
}

@media (max-width: 991px) {
  .year {
    font-size: 15px;
  }
}

.bottomSection {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
  padding-right: 10px;
}

@media (max-width: 991px) {
  .bottomSection {
    width: 100%;
    justify-content: center;
    padding-right: 0;
  }
}

.bottomSection ul {
  padding-left: 0;
}

.bottomSection li {
  border-radius: 5px;
}

.bottomSection li:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

@media (max-width: 991px) {
  .bottomSection ul {
    margin: 0;
  }

  .bottomSection li {
    height: 30px;
  }

  .bottomSection li img {
    height: 100%;
    width: 100%;
  }
}

.menuSection {
  list-style: none;
  display: flex;
  align-items: center;
}

.menuSection li {
  margin: 0 5px;
}

@media (max-width: 991px) {
  .menuSection li:nth-child(2) {
    height: 25px;
    width: 30px;
  }

  .menuSection li:nth-child(3) {
    height: 30px;
    width: 35px;
    margin-left: 0px;
  }
}

.option {
  list-style: none;
  display: flex;
  align-items: center;
  cursor: pointer;
}

@media (max-width: 991px) {
  .option li {
    width: 33px;
    height: 34px;
  }
}
</style>