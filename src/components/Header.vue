<template>
  <div class="header">
    <img src="./img/theme/logo.png" alt="로고" class="logo">
    <!-- 나머지 헤더 내용 -->
  </div>
</template>



<style scoped>
div {
  position: sticky;
  height: 50px;
  background-color: #c5dae3;
  /* border-bottom: 1px solid #ebebeb; */
}
.float-right {
    position: sticky;}

.logo {
  width: 280px; /* 로고 이미지의 너비 */
  height: 50px; /* 로고 이미지의 높이를 자동으로 조정 */
  margin-right: 10px; /* 로고 이미지 오른쪽 여백 */
  /* align-items: center; */
}
</style>

<script>
export default {
  name: "Header",
  data() {
  }
};
</script>