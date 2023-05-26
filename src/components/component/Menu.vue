<template>
  <div class="nav-bar">
    <nav class="navbar"> 
      <ul class="navbar-nav mr-auto">
        <b-navbar-nav class>
            <b-nav-item href="/">메인(임시페이지)</b-nav-item>
            <b-nav-item href="/project">프로젝트 관리</b-nav-item>
            <b-nav-item href="/employee">직원 관리</b-nav-item>
            <b-nav-item href="/evaluation">평가</b-nav-item>
            <b-nav-item href="/mypage">내 정보 수정</b-nav-item>
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
  background-color: #f5f8f9;
}
</style>

<script>
export default {
  name: "Menu",
  data() {
  }
};
</script>
