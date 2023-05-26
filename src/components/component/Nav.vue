<template>
  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="/">
        <img src="../assets/img/logo.png" height="80px" width="250px" class="d-inline-block align-center" alt="Logo">
      </b-navbar-brand>
    </b-navbar>

    <div class="nav">
      <ul>
        <b-navbar-nav>
          <b-nav-item :class="{ active: $route.path === '/Project' }" href="/Project">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/Project', 'gray-icon': $route.path !== '/Project' }
            ]" :style="{ color: ($route.path === '/Project') ? '#82CACC' : 'gray' }">list_alt</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/Project', 'text-active': $route.path === '/Project' }]">프로젝트 관리</span>
          </b-nav-item>


          <b-nav-item :class="{ active: $route.path === '/Employee' }" href="/Employee">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/Employee', 'gray-icon': $route.path !== '/Employee' }
            ]" :style="{ color: ($route.path === '/Employee') ? '#82CACC' : 'gray' }">recent_actors</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/Employee', 'text-active': $route.path === '/Employee' }]">직원 관리</span>
          </b-nav-item>

          <b-nav-item :class="{ active: $route.path === '/Evaluation' }" href="/Evaluation">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/Evaluation', 'gray-icon': $route.path !== '/Evaluation' }
            ]" :style="{ color: ($route.path === '/Evaluation') ? '#82CACC' : 'gray' }">fact_check</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/Evaluationuation', 'text-active': $route.path === '/Evaluation' }]">평가 보고서 조회</span>
          </b-nav-item>

          <!-- <b-nav-item :class="{ active: $route.path === '/Mypage' }" href="/Mypagel">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/Mypage', 'gray-icon': $route.path !== '/Mypage' }
            ]" :style="{ color: ($route.path === '/Mypage') ? '#82CACC' : 'gray' }">badge</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/Mypage', 'text-active': $route.path === '/Mypage' }]">마이페이지</span>
          </b-nav-item> -->
        </b-navbar-nav>
      </ul>
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: 'LotteMartDream';
  font-style: normal;
  font-weight: 600;
  src: url('//cdn.jsdelivr.net/korean-webfonts/1/corps/lottemart/LotteMartDream/LotteMartDreamMedium.woff2') format('woff2'), url('//cdn.jsdelivr.net/korean-webfonts/1/corps/lottemart/LotteMartDream/LotteMartDreamMedium.woff') format('woff');
}

.nav {
  width: 200px;
  height: 100%;
  flex: 3;
  background-color: white;
  font-weight: 100;
  text-align: left;
}


.icon-spacing {
  margin-right: 10px;
}

.align-middle {
  vertical-align: middle;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #AAB1B8 ;
}

.span{
  font: gray;
}

.gray-icon {
  color: gray;
}

.text{
  font-family: "LotteMartDream";
}
/* 
.active {
  background-color: red;
} */


.text-active {
  color: #1D3876; /* Update with the desired color for active text */
  font-weight: 500;
}


.material-symbols-outlined {
  color: #AAB1B8; /* Default icon color */
}

.material-symbols-solid {
  color: #000000; /* Update with the desired color for active icons */
}

</style>

<script>
export default {
  name: "Nav",
  data() {
    return {
      
    }
  }
};
</script>
