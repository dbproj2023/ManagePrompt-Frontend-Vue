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

<<<<<<< HEAD
    <b-nav class="nav-links">
      <b-nav-item :active="$route.path === '/project'" to="/project" class="nav-item">
        <i class="fas fa-list-alt"></i>
        <span class="nav-text">프로젝트 관리</span>
      </b-nav-item>
=======
    <div class="nav">
      <ul>
        <b-navbar-nav>
          <b-nav-item :class="{ active: $route.path === '/project' }" href="/project">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/project', 'gray-icon': $route.path !== '/project' }
            ]" :style="{ color: ($route.path === '/project') ? '#82CACC' : 'gray' }">list_alt</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/project', 'text-active': $route.path === '/project' }]">프로젝트 관리</span>
          </b-nav-item>
>>>>>>> 4add1340f7bc76c17421e305a3cbbbeed0f37d91

      <b-nav-item :active="$route.path === '/employee'" to="/employee" class="nav-item">
        <i class="fas fa-users"></i>
        <span class="nav-text">직원 관리</span>
      </b-nav-item>

<<<<<<< HEAD
      <b-nav-item :active="$route.path === '/evaluation'" to="/evaluation" class="nav-item">
        <i class="fas fa-file-alt"></i>
        <span class="nav-text">평가 보고서 조회</span>
      </b-nav-item>

      <!-- <b-nav-item :active="$route.path === '/mypage'" to="/mypage" class="nav-item">
        <i class="fas fa-user"></i>
        <span class="nav-text">마이페이지</span>
      </b-nav-item> -->
    </b-nav>
=======
          <b-nav-item :class="{ active: $route.path === '/employee' }" href="/employee">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/employee', 'gray-icon': $route.path !== '/employee' }
            ]" :style="{ color: ($route.path === '/employee') ? '#82CACC' : 'gray' }">recent_actors</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/employee', 'text-active': $route.path === '/employee' }]">직원 관리</span>
          </b-nav-item>

          <b-nav-item :class="{ active: $route.path === '/evaluation' }" href="/evaluation">
            <span :class="[
              'material-symbols-outlined',
              'align-middle',
              'icon-spacing',
              { 'text-active': $route.path === '/evaluation', 'gray-icon': $route.path !== '/evaluation' }
            ]" :style="{ color: ($route.path === '/evaluation') ? '#82CACC' : 'gray' }">fact_check</span>
            <span :class="[{'align-middle': true, 'text': $route.path !== '/evaluationuation', 'text-active': $route.path === '/evaluation' }]">평가 보고서 조회</span>
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
>>>>>>> 4add1340f7bc76c17421e305a3cbbbeed0f37d91
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
}

.navbar {
  margin-bottom: 20px;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links .nav-item {
  display: flex;
  align-items: center;
  color: black; /* Change the font color to black */
  border-radius: 20px;
  margin-bottom: 10px;
  transition: background-color 0.3s, color 0.3s;
  padding: 5px 10px;
}

.nav-links .nav-item:hover {
  background-color: #acb8d8;
  color: white;
}

.nav-text {
  margin-left: 8px;
}

.navbar .nav-item i {
  margin-right: 8px;
  color: black; /* Change the icon color to black */
}

.navbar .nav-item i.fa-user {
  font-size: 16px;
}

.navbar .nav-item i.fa-file-alt {
  font-size: 15px;
}

.navbar .nav-item i.fa-users {
  font-size: 14px;
}

.navbar.transparent-bg {
  background-color: white!important; /* Set the background to transparent */
}
</style>
