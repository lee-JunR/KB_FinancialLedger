<template>
  <div class="container">
    <div class="button" @click="openModal">+</div>
    <quick-add-form v-if="isModalOpen" @close="closeModal"></quick-add-form>
  </div>
</template>
<script>
import QuickAddForm from "./QuickAddForm.vue";

export default {
  components: {
    QuickAddForm,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
<style scoped>
.container {
  position: relative;
  z-index: 1000; /* Ensure the button is above other content */
}

.button {
  position: fixed;
  bottom: 40px;
  right: 50px;
  width: 100px;
  height: 100px;
  background-color: #f2b74e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 90px;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

@media (max-width: 991px) {
  .button {
    position: fixed;
    bottom: 40px;
    right: 50px;
    width: 80px;
    height: 80px;
    background-color: #f2b74e;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 75px;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    margin-right: 5%;

  }
}
</style>
