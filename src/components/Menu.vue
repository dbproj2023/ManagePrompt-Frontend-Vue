<template>
  <div class="nav-bar bg-dark">
    <nav class="navbar-dark bg-dark"> 
      <ul class="navbar-nav mr-auto">
        <b-navbar-nav class>
            <b-nav-item href="/">메인(임시페이지)</b-nav-item>
            <b-nav-item href="/Project">프로젝트 관리</b-nav-item>
            <b-nav-item href="/Emloyee">직원 관리</b-nav-item>
            <b-nav-item href="/Evaluation">평가</b-nav-item>
            <b-nav-item href="/Mypage">내 정보 수정</b-nav-item>
        </b-navbar-nav>
      </ul>
    </nav>
  </div>
</template>

<style>
div {
  flex: 150px;
}
.wrapper{
  background-color: white;
}
</style>

<script>
export default {
  name: "Menu",
  data() {
  }
};
</script>
