<template>
  <div class="wrapper">
    <div class="container">
      <h2>아이디/비밀번호 찾기</h2>
      <br>
      <br>
      <br>
      <FindId/>
      <FindPw/>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import FindId from './FindId.vue'
import FindPw from './FindPw.vue'

  export default {
    name: "FindAccount",
    components: {
      FindId,
      FindPw
    },
    data() {
      return {
      }
    },
    methods: {
    }
  };
</script>

<style scoped>
.wrapper {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: #fff;
  width:444px;
  height: 724px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.input-data{
margin-bottom: 10px;
width: 300px;
}

.small-btn {
    width: 100px;
    height: 25px;
    font-size: 10px;
    line-height: 1.5;
    color: #fff;
    text-transform: uppercase;
    border-radius: 25px;
    background: #33508A;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
    cursor: pointer;
  }
</style>
