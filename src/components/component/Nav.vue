<template>
  <div class="nav-wrapper">
      <b-navbar-brand href="/">
        <v-img
          :src="require('../assets/img/logo.svg')"
          class="my-3"
          contain
          height="50"
        />      
      </b-navbar-brand>
    
      <hr>

    <div class="nav" style="height:800px">
        <b-navbar-nav>
          <b-nav-item :class="{ active: $route.path === '/project' }" href="/project">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/project', 'gray-icon': $route.path !== '/project' }
            ]" :style="{ color: ($route.path === '/project') ? '#82CACC' : 'gray'}">list_alt</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/project', 'text-active': $route.path === '/project' }]" style="font-size:15px">프로젝트 관리</span>
          </b-nav-item>

          <b-nav-item :class="{ active: $route.path === '/employee' }" href="/employee">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/employee', 'gray-icon': $route.path !== '/employee' }
            ]" :style="{ color: ($route.path === '/employee') ? '#82CACC' : 'gray' }">recent_actors</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/employee', 'text-active': $route.path === '/employee' }]" style="font-size:15px">직원 관리</span>
          </b-nav-item>

          <b-nav-item :class="{ active: $route.path === '/evaluation' }" href="/evaluation">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/evaluation', 'gray-icon': $route.path !== '/evaluation' }
            ]" :style="{ color: ($route.path === '/evaluation') ? '#82CACC' : 'gray' }">fact_check</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/evaluationuation', 'text-active': $route.path === '/evaluation' }]" style="font-size:15px">평가 보고서 조회</span>
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


    </div>
  </div>
</template>

<style scoped>
.nav-wrapper {
  margin: 15px;
  height: 700px;
  background-color: #FDFDFD;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden; 

}

.navbar {
  margin-bottom: 20px;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-nav,
.nav,
.b-navbar-nav{
  padding: 0px;
  text-align: left;
}

.nav-links .nav-item {
  display: flex;
  align-items: center;
  color: black;
  border-radius: 20px;
  margin-bottom: 10px;
  transition: background-color 0.3s, color 0.3s;
  white-space: nowrap;
  line-height: 1; /* Adjust the value as needed */
}

/* .nav-links .nav-item {
  display: flex;
  align-items: center;
  color: black; 
  border-radius: 20px;
  margin-bottom: 10px;
  transition: background-color 0.3s, color 0.3s;
  padding: 5px 10px;
  white-space: nowrap;
} */

.nav-links .nav-item:hover {
  background-color: #cbd1e3;
  color: white;
}

.nav-item {
  padding: 5px;
  display: flex;
  align-items: center;
  color: #AAB1B8;
  border-radius: 20px;
  margin: 5px 0;
  transition: background-color 0.3s, color 0.3s;
  font-family: 'D2Coding';
  font-size: 10px;
  line-height: 1; /* Adjust the value as needed */
}

.nav-item.active {
  background-color: #acb3c4;
  width: 150px;
  color: black !important;
  /* color: white; */
}

.nav-links .nav-item {
  /* Your existing styles */
  white-space: nowrap; /* Add this line to prevent text wrapping */
}

.nav-item.active .material-symbols-outlined {
  color: white;
}

.nav-item:hover {
  background-color: #acb3c4;
  color: white;
}

.nav-text,
.icon-text {
  margin-left: 4px;
}

span{
  padding-left: 10px;
  color:black
}
.navbar .nav-item i {
  margin-right: 8px;
  color: black; /* Change the icon color to black */
}


.navbar.transparent-bg {
  background-color: white!important; /* Set the background to transparent */
}

</style>