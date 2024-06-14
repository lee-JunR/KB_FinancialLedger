<template>
  <div class="dive-10">
    <div class="input-form">
      <div class="input-name" >아이디</div>
      <input 
        :class="isIdChecked ? 'input-area2' : 'input-area-check'" 
        v-model="data.userId" 
        style="
            margin: 0px 0px 0px 0px;
            width: 26%;
            @media(max-width: 991px;) {
              margin-left: 10%;
              margin: 0px 0px 0px 10%;
            }
          "
      />
      <button @click="idCheck" type="submit" class="check-btn">
        중복 확인
      </button>
    </div>
    <div
      v-if="!isIdChecked"
      style="margin-top: 1%; margin-right: 10%; text-align: end; color: red"
    >
      {{ "중복확인을 하십시오." }}
    </div>
    <div class="input-form">
      <div class="input-name">비밀 번호</div>
      <input type="password" class="input-area2" v-model="data.userPw" />
    </div>

    <div class="input-form">
      <div class="input-name">비밀 번호 확인</div>
      <input
        type="password"
        v-model="checkPw"
        :class="isPwChecked ? 'input-area2' : 'input-area-check'"
      />
    </div>

    <div
      v-if="!isPwChecked"
      style="margin-top: 1%; margin-right: 10%; text-align: end; color: red"
    >
      {{ pwChecker }}
    </div>

    <div class="input-form">
      <div class="input-name">이름</div>
      <input class="input-area2" v-model="data.name" />
    </div>
    <div class="input-form">
      <div class="input-name">email</div>
      <input class="input-area2" v-model="data.email" />
    </div>
    <div class="BTN-form">
      <button @click="signUp" type="submit" class="signup-btn">회원가입</button>
      <RouterLink :to="{ name: 'login' }" class="cancel-btn">취소</RouterLink>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const data = reactive({ userId: "", userPw: "", name: "", email: "" });
const checkPw = ref("");
const isPwChecked = ref(false);
const isIdChecked = ref(false);
const id = ref("");
const router = useRouter();

const pwChecker = ref("비밀번호가 일치하지 않습니다.");
watch([() => data.userPw, checkPw], () => {
  if (data.userPw && checkPw) {
    isPwChecked.value = data.userPw.trim() == checkPw.value.trim();
  }
});

const idCheck = () => {
  if(!data.userId) {
    alert("아이디를 입력해주십시오.");
    return;
  }
  axios
    .get(`http://localhost:3001/user?userId=${data.userId}`)
    .then((res) => {
      console.log(res);
      if (res.data.length < 1) {
        alert("사용가능한 아이디 입니다.");
        isIdChecked.value = true;
      } else {
        alert("이미 사용중인 아이디 입니다.");
        return;
      }
    })
    .catch((e) => {
      alert(e);
    });
};

const createAccount = () => {
  const sendData = {
    total_income: 0,
    total_expand: 0,
    profit: 0,
    id: id.value,
  };

  axios
    .post(`http://localhost:3001/account`, sendData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

const getUserList = async () => {
  try {
    const res = await axios.get('http://localhost:3001/user');
    id.value = (parseInt(res.data[res.data.length - 1].id) + 1).toString();
  } catch (e) {
    console.log(e);
    alert("회원가입 실패");
  }
}




const signUp = async () => {
  if (!isIdChecked.value || !isPwChecked.value) {
    alert("중복확인 및 비밀 번호를 확인해주세요.");
    return;
  }
  await getUserList();

  const sendData = {
    id : id.value,
    name: data.name,
    email: data.email,
    userId: data.userId,
    userPw: data.userPw,
  };
  console.log(sendData);

  if (
    sendData.name.trim() == "" ||
    sendData.email.trim() == "" ||
    sendData.userId.trim() == "" ||
    sendData.userPw == ""
  ) {
    alert("필수 사항들을 모두 입력해주십시오.");
    return;
  }
  axios
    .post("http://localhost:3001/user", sendData)
    .then((res) => {
      alert("회원가입 성공");
      createAccount();
      router.push("/login");
    })
    .catch((e) => {
      alert("회원가입 실패");
      return;
    });
};
</script>
<style scoped>
.dive-10 {
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #faebcd;
  display: flex;
  margin-top: 23px;
  width: 662px;
  max-width: 100%;
  flex-direction: column;
  font-weight: 500;
  padding: 2%;
  padding-left: 2%;
  padding-right: 2%;
}
@media (max-width: 991px) {
  .dive-10 {
    border-radius: 20px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #faebcd;
    display: flex;
    margin-top: 23px;
    width: 90%;
    max-width: 100%;
    flex-direction: column;
    font-weight: 500;
    padding: 2%;
    padding-left: 2%;
    padding-right: 2%;
  }
}

.input-area {
  align-items: start;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-color: rgba(224, 224, 224, 1);
  border-style: solid;
  border-width: 1px;
  background-color: #fff;
  align-self: start;
  color: black;
  flex-grow: 1;
  width: fit-content;
  padding: 12px 16px 5px;
  font: 18px Inter, sans-serif;
  margin-left: 6%;
}
@media (max-width: 991px) {
  .input-area {
    align-items: start;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-color: rgba(224, 224, 224, 1);
  border-style: solid;
  border-width: 1px;
  background-color: #fff;
  align-self: start;
  color: black;
  flex-grow: 1;
  width: fit-content;
  padding: 12px 16px 5px;
  font: 18px Inter, sans-serif;
  margin-left: 6%;
  width: 10%;
  }
}

.input-area-check {
  align-items: start;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-color: rgba(224, 224, 224, 1);
  border-style: solid;
  border-width: 1px;
  background-color: #fff;
  align-self: start;
  color: black;
  flex-grow: 1;
  width: 45%;
  padding: 12px 16px 5px;
  font: 18px Inter, sans-serif;
  margin-right: 10%;
  margin-left: 5%;
  border: solid 3px red;
}
@media (max-width: 991px) {
  .input-area-check {
    align-items: start;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-color: rgba(224, 224, 224, 1);
  border-style: solid;
  border-width: 1px;
  background-color: #fff;
  align-self: start;
  color: black;
  flex-grow: 1;
  width: 45%;
  padding: 12px 16px 5px;
  font: 18px Inter, sans-serif;
  margin-right: 10%;
  margin-left: 15%;
  border: solid 3px red;
  }
}
.input-area2 {
  align-items: start;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-color: rgba(224, 224, 224, 1);
  border-style: solid;
  border-width: 1px;
  background-color: #fff;
  align-self: start;
  color: black;
  flex-grow: 1;
  width: 45%;
  padding: 12px 16px 5px;
  font: 18px Inter, sans-serif;
  margin-right: 10%;
  margin-left: 5%;
}
@media (max-width: 991px) {
  .input-area2 {
    align-items: start;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-color: rgba(224, 224, 224, 1);
  border-style: solid;
  border-width: 1px;
  background-color: #fff;
  align-self: start;
  color: black;
  flex-grow: 1;
  width: 45%;
  padding: 12px 16px 5px;
  font: 18px Inter, sans-serif;
  margin-right: 10%;
  margin-left: 15%;
  }
}
.input-form {
  display: flex;
  margin-top: 3%;
  gap: 4%;
  align-items: center;
}
@media (max-width: 991px) {
  .input-form {
    max-width: 100%;
    flex-wrap: wrap;
  }
}
.input-name {
  color: #434343;
  margin-right: -10%;
  margin-left: 0%;
  flex-grow: 1;
  font-size: 23px;
  width: 15%;
  line-height: 50px;
  text-align: center;
}
@media (max-width: 640px) {
  .input-name {
    color: #434343;
  margin-right: -15%;
  margin-left: 0%;
  font-size: 15px;
  width: 25%;
  text-align: center;
  }
}

.BTN-form {
  align-self: center;
  display: flex;
  margin-top: 38px;
  width: 472px;
  max-width: 100%;
  gap: 20px;
  font-size: 24px;
  color: #fff;
  white-space: nowrap;
  line-height: 150%;
  justify-content: space-between;
}
@media (max-width: 991px) {
  .BTN-form {
    align-self: center;
  display: flex;
  margin-top: 38px;
  width: 472px;
  max-width: 100%;
  gap: 20px;
  font-size: 24px;
  color: #fff;
  white-space: nowrap;
  line-height: 150%;
  justify-content: space-between;
  }
}

.check-btn {
  font-family: Inter, sans-serif;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  background-color: #434343;
  padding: 14px 24px;
  color: #fff;
  cursor: pointer;
  border-style: none;
  margin-right: 10%;
  margin-top: -10px;
}
@media (max-width: 991px) {
  .check-btn {
  font-family: Inter, sans-serif;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  background-color: #434343;
  padding: 10%;
  color: #fff;
  width: 20%;
  cursor: pointer;
  border-style: none;
  margin-right: 10%;
}
}
@media (max-width: 991px) {
  .check-btn {
    white-space: initial;
    padding: 0 20px;
  }
}
.check-btn:hover {
  background-color: #545454;
}

.signup-btn {
  font-family: Inter, sans-serif;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
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
  .signup-btn {
    font-family: Inter, sans-serif;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
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
}
.signup-btn:hover {
  background-color: #545454;
}

.cancel-btn {
  font-family: Inter, sans-serif;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
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
  .cancel-btn {
    display: flex;
    font-family: Inter, sans-serif;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
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
}
.cancel-btn:hover {
  background-color: #8e8e8e;
}
</style>
