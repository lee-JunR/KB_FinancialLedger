<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import QuickAddButton from './components/QuickAddButton.vue';
import QuickAddForm from './components/QuickAddForm.vue';

const setTheme = () => {
  const theme = sessionStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.setAttribute('theme', 'dark');
  } else {
    document.documentElement.setAttribute('theme', 'light');
  }
};

// 컴포넌트가 로드될 때 테마를 설정
onMounted(() => {
  setTheme();
});

const route = useRoute();

const shouldHideQuickAddButton = () => {
  const hidePaths = ['/login', '/signup', '/profile'];
  return hidePaths.includes(route.path);
};
</script>

<template>
  <NavBar></NavBar>
  <RouterView />
  <QuickAddButton v-if="!shouldHideQuickAddButton()" />
</template>

<style>
body {
  background-color: #F8F8F8;
}

html[theme="light"] {
  transition: 0.4s;
}

html[theme="dark"] {
  filter: invert(100%) hue-rotate(180deg) sepia(100%) brightness(130%);
  transition: 0.4s;
}
</style>
