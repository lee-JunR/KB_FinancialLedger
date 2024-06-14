<template>
    <div class="div">
      <div class="div-9">회원가입</div>
        <SignUp/>
    </div>
  </template>
<script setup>
import SignUp from './components/SignUp.vue';
</script>



  <style scoped>
  .div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0%;
  }
  .div-9 {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    -webkit-text-stroke-width: 1;
    -webkit-text-stroke-color: #000;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #FAEBCD;
    z-index: 10;
    margin-top: -15px;
    width: 586px;
    height: 40px;
    max-width: 100%;
    color: #434343;
    white-space: nowrap;
    padding: 12px 47px;
    font: 400 35px Actor, sans-serif;
  }
  @media (max-width: 991px) {
    .div-9 {
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    -webkit-text-stroke-width: 1;
    -webkit-text-stroke-color: #000;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #FAEBCD;
    z-index: 10;
    margin-top: -15px;
    width: 70%;
    height: 40px;
    color: #434343;
    white-space: nowrap;
    padding: 12px 47px;
    font: 400 35px Actor, sans-serif;
    }
  }
  </style>