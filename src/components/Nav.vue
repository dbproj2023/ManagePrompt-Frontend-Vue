<template>
    <div class="nav #B0BEC5--text">
      <ul>
      <b-navbar-nav>
         <b-nav-item href="/">
           <font color="#B0BEC5"> &nbsp;&nbsp;메인(임시페이지)</font>
        </b-nav-item>

        <b-nav-item href="/Project">
          <img src="./img/theme/project-management.png" height="30px" width="30px" class="d-inline-block align-center" alt="Kitten">
          <font color="#B0BEC5"> &nbsp;&nbsp;프로젝트 관리</font>
        </b-nav-item>
          
          <b-nav-item href="/Emloyee">
            <img src="./img/theme/division.png" height="30px" width="30px" class="d-inline-block align-center" alt="Kitten">
            <font color="#B0BEC5"> &nbsp; 직원 관리</font>
          </b-nav-item>

          <b-nav-item href="/Evaluation">
            <img src="./img/theme/satisfaction.png" height="30px" width="30px" class="d-inline-block align-center" alt="Kitten">
            <font color="#B0BEC5">&nbsp; &nbsp;평가</font>
          </b-nav-item>

          <b-nav-item href="/Mypage">
            <img src="./img/theme/avatar.png" height="30px" width="30px" class="d-inline-block align-center" alt="Kitten">
            <font color="#B0BEC5">&nbsp;마이페이지</font>
          </b-nav-item>
      </b-navbar-nav>
    </ul>
    </div>
      <!-- <div> -->
        <!-- <b-navbar variant="faded" type="light">
          <b-navbar-brand href="/Project">
            <img src="./img/theme/icon4.png" height="50px" width="50px" class="d-inline-block align-center" alt="Kitten">
            프로젝트 관리
          </b-navbar-brand>
        </b-navbar>

        <b-navbar variant="faded" type="light">
          <b-navbar-brand href="/Employee">
            <img src="./img/theme/icon2.png" height="50px" width="50px" class="d-inline-block align-center" alt="Kitten">
            직원 관리
          </b-navbar-brand>
        </b-navbar>

        <b-navbar variant="faded" type="light">
          <b-navbar-brand href="/Evaluation">
            <img src="./img/theme/icon3.png" height="50px" width="30px" class="d-inline-block align-center" alt="Kitten">
            평가
          </b-navbar-brand>
        </b-navbar>

        <b-navbar variant="faded" type="light">
          <b-navbar-brand href="/Mypage">
            <img src="./img/theme/icon1.png" class="d-inline-block align-center" alt="Kitten">
            마이페이지
          </b-navbar-brand>
        </b-navbar> -->
      <!-- </div> -->
  </template>

     
<style>
.nav{
  width:280px;
  height: 100%;
  flex: 4;
  /* border: 1px solid #ccc; */
  background-color: white;
}

</style>

<script>

export default {
  name: "Nav",
  data() {
  }
};
</script>