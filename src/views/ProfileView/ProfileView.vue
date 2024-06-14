<template>
  <div class="div">
    <div class="sub">프로필</div>


    <div class="profile-backgorund">

      <div class="div-11">
        <div class="left">
          <img loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4f3d69ee5ab28f9f7be2a51eb8d17f1e87b79f8a501d4a56786bf57e6ba664a?"
            class="img-6" />
          <button @click="logout" type="submit" class="div-13">
            <div class="div-14">Logout</div>
            <img loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/63108a120f338f09152579ce8344d5d8fc5ab117164278b660b5c66fb80cfd98?"
              class="img-7" />
          </button>
        </div>

        <div class="right">
          <div class="userInfo">
            <div class="div-16">이름: {{ data.name }}</div>
            <div class="div-17">ID: {{ data.userId }}</div>
            <div class="div-18">Email:{{ data.email }}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';

const router = useRouter();
const data = reactive({ name: "", userId: "", email: "" });

const logout = () => {
  alert("로그아웃 되었습니다.");
  sessionStorage.removeItem("id");
  router.push("/login");

}

onMounted(() => {
  if(!sessionStorage.getItem("id")){
      router.push("/login");  
    }
  else{
    const userId = sessionStorage.getItem("id");
    console.log(userId);
    
    axios.get(`http://localhost:3001/user?id=${userId}`)
    .then(res => {
        const userData = res.data[0];
        console.log(userData);
        data.name = userData.name;
        data.userId = userData.userId;
        data.email = userData.email;
    })
    .catch(e => {
        alert("오류");
        console.log(e);
        router.push("/login");
    })
  }

})

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Nanum+Myeongjo&display=swap');

.div {
  display: flex;
  padding-bottom: 73px;
  flex-direction: column;
  align-items: center;
  font-family: JUA, sans-serif;
}

.sub {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: #000;
  justify-content: center;
  border-radius: 14px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #FAEBCD;
  z-index: 10;
  width: 590px;
  height: 100%;
  max-width: 100%;
  color: #434343;
  white-space: nowrap;
  padding: 12px 47px;
  font: 400 30px JUA, sans-serif;
  text-align: center;
  margin-top: -15px;
}

@media (max-width: 991px) {
  .sub {
    font-size: 30px;
    white-space: initial;
    padding: 10px 20px;
  }
}

.profile-backgorund {
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.59);
  background-color: #FFFFFF;
  margin-top: 35px;
  width: 850px;
  height: 400px;
  max-width: 100%;
  padding: 80px 66px;
}

@media (max-width: 991px) {
  .profile-backgorund {
    padding: 0 20px;
    height: 100%;
  }
}

.div-11 {
  gap: 20px;
  display: flex;
}

@media (max-width: 991px) {
  .div-11 {
    flex-direction: column;
    align-items: center;
    gap: 0px;
  }
}

.left {
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 35%;
  margin-left: 60px;
  margin-top: 30px;
}

@media (max-width: 991px) {
  .left {
    width: 35%;
    margin: 10px 0 0 0;

  }
}

.div-12 {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  font-size: 20px;
  color: #000;
  font-weight: 700;
  white-space: nowrap;
  line-height: 150%;
  margin: auto 0;
}

@media (max-width: 991px) {
  .div-12 {
    margin-top: 40px;
    white-space: initial;
  }
}

.img-6 {
  aspect-ratio: 1.02;
  object-fit: auto;
  object-position: center;
  width: 100%;

}

.div-13 {
  border-radius: 15px;
  background-color: #d9d9d9;
  display: flex;
  margin-top: 20px;
  gap: 5%;
  font-size: large;
  justify-content: space-between;
  padding: 10px 38px 10px 80px;
  font-weight: 700;
  cursor: pointer;
  border-width: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.59);
}

@media (max-width: 991px) {
  .div-13 {
    white-space: initial;
    padding: 7px 20px;
    
  }
}

.div-13:hover {
  background-color: #f2f2f2;
}

.div-14 {
  font-family: JUA, sans-serif;
  padding-left: 20%;
}

.img-7 {
  aspect-ratio: 1.23;
  object-fit: auto;
  object-position: center;
  width: 26px;
  fill: #000;
}

.right {
  width: 40%;
  margin-left:30px;
  
}

@media (max-width: 991px) {
  .right {
    width: 100%;
    height: 100%;
  }
}

.userInfo {

  margin: 10% 10% 5% 5%;
  font-size: 19px;
  color: #000;
  font-weight: 600;
  line-height: 150%;
  background-color: #FFFFFF;
  padding-left: 30px;
  border-left: 4px solid #000;
  height: 330px;
}

@media (max-width: 991px) {
  .userInfo {
    margin-top: 0px;
    height: 100%;
  }
}

.div-16,
.div-17,
.div-18 {
  margin-top: 20px;
  /* 모든 자식 요소에 동일한 상단 마진을 설정 */
}

.do-hyeon-regular {
  font-family: "Do Hyeon", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>