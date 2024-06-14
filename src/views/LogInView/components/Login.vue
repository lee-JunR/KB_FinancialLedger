<template>
  <div class="container">
    <div class="IDdiv">
      <div class="IDLabel">ID :</div>
      <input
        v-model="data.id"
        class="IDInput"
        type="text"
        placeholder="아이디를 입력하세요."
      />
    </div>

    <div class="PWdiv">
      <div class="PWLabel">PW :</div>
      <input
        v-model="data.pw"
        class="PWInput"
        type="password"
        placeholder="비밀번호를 입력하세요."
      />
    </div>

    <div class="BTNdiv">
      <button @click="checkId" type="submit" class="loginBTN">Log In</button>
      <RouterLink :to="{ name: 'signup' }" type="button" class="JoinBTN"
        >Sign up</RouterLink
      >
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import axios from "axios";
import router from "@/router";

const data = reactive({ id: "", pw: "" });

const checkId = () => {
  axios
    .get(`http://localhost:3001/user?userId=${data.id}`)
    .then((res) => {
      //console.log(res.data[0]);
      if (res.data.length < 1) {
        alert("아이디를 확인 하십시오.");
        return;
      }
      if (res.data[0].userPw.trim() != data.pw.trim()) {
        //console.log(data.pw, res.data[0].userPw);
        alert("비밀번호를 확인 하십시오.");
        return;
      }
      alert("로그인 성공");
      sessionStorage.setItem("id", res.data[0].id);
      //console.log(res.data);
      router.push("/");
    })
    .catch((e) => {
      console.log(e);
      alert("에러. 관리자에게 문의하십시오.");
    });
};
</script>

<style scoped>
.container {
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #faebcd;
  display: flex;
  margin-top: 42px;
  width: 662px;
  max-width: 100%;
  flex-direction: column;
    font-family: JUA, sans-serif;
  font-weight: 500;
  line-height: 150%;
  padding: 69px 48px 40px;
}
@media (max-width: 991px) {
  .container {
    width: 500px;
    padding: 69px 0px;

  }
}

@media (max-width: 991px) {
  .div-10 {
    margin-top: 40px;
    padding: 0 20px;
  }
}
.IDdiv {
  display: flex;
}
@media (max-width: 991px) {
  .IDdiv {
    max-width: 100%;
    flex-wrap: wrap;
  }
}
.IDLabel {
  color: #434343;
  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  border-style: solid;
  width: 15%;
  text-align: start;
  font: 36px JUA, sans-serif;
  padding-left: 10%;
}
.IDInput {
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-color: rgba(224, 224, 224, 1);
  border-style: solid;
  border-width: 1px;
  background-color: #ffffff;
  flex-grow: 1;
  width: fit-content;
  padding: 2%;
  font: 23px JUA, sans-serif;
  color: black;
}
@media (max-width: 991px) {
  .IDLabel {
    font-size: 25px;
  }
  .IDInput {
    max-width: 100%;
    padding: 1px 10px;
    margin-top: 0px;
    margin-right: 5px;
  }
}
.PWdiv {
  display: flex;
  margin-top: 5%;
}
@media (max-width: 991px) {
  .PWdiv {
    max-width: 100%;
    flex-wrap: wrap;
  }
}
.PWLabel {
  color: #434343;
  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  border-style: solid;
  text-align: start;
  width: 15%;

  font: 36px JUA, sans-serif;
  padding-left: 10%;
}
.PWInput {
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-color: rgba(224, 224, 224, 1);
  border-style: solid;
  border-width: 1px;
  background-color: #fff;
  color: black;
  flex-grow: 1;
  width: fit-content;
  padding: 2%;
  font: 23px JUA, sans-serif;
}
@media (max-width: 991px) {
  .PWLabel {
    font-size: 25px;
    width: 14%;

  }
  .PWInput {
    max-width: 80%;

    padding: 1px 10px;
    margin-top: 0px;
    margin-left: 5px;
    margin-right: 5px;
  }
}
.BTNdiv {
  align-self: center;
  display: flex;
  margin-top: 10%;
  width: 70%;
  font-size: 24px;
  color: #fff;
    font-family: JUA, sans-serif;
  white-space: nowrap;
  justify-content: space-between;
}
@media (max-width: 991px) {
  .BTNdiv {
    margin-top: 40px;
    white-space: initial;
    justify-content: space-between;
  }
}
.loginBTN {
    font-family: JUA, sans-serif;
  border-radius: 8px;
  cursor: pointer;
  height: 60px;
  width: 180px;
  font-size: 25px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  background-color: #f7c873;
  color: black;
  border-style: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 991px) {
  .loginBTN {
    white-space: initial;
    padding: 0 15px;
    width: 150px;
  }
}
.loginBTN:hover {
  background-color: #5c5c5c;
}

.JoinBTN {
    font-family: JUA, sans-serif;
  border-radius: 8px;
  cursor: pointer;
  height: 60px;
  width: 180px;
  font-size: 25px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  background-color: #f7c873;
  color: black;
  border-style: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 991px) {
  .JoinBTN {
    white-space: initial;
    padding: 0 15px;
    width: 150px;

  }
}
.JoinBTN:hover {
  background-color: #8e8e8c;
}
</style>
