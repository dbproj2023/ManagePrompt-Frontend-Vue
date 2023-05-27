<template>
  <div class="header">
    <div class="icon">

      
     
      <!-- 로그인 했을때 때 -->
      <div v-if = this.isLogIn class="header">
      <div class="icon">
      <div class="login-container" @click="showDropdown">
        <div class="user-icon">
          <i class="fa-solid fa-circle-user" style="color: #ffffff;"></i>
        </div>
        <span class="header-text">{{ myName }}</span>
        <div :class="{'dropdown-menu': true, 'show': isDropdownVisible}">
          <a class="dropdown-item" href="/mypage">MyPage</a>
          <a class="dropdown-item" href="/logout">Logout</a>
        </div>
      </div>
      </div>
    </div>
    
    <!--로그인 안했을 때 -->
    <div v-else class="login-container">
        <div class="login-text" @click="goToLogin">
          <i class="login-title fa-solid fa-right-to-bracket fa-2xs" style="color: #ffffff;"></i>
          <span class="header-text">Sign in</span>
        </div>
      </div>

  </div>
  </div>
</template>

<style scoped>
.icon {
  position: fixed;
  top: 0;
  right: 0;
  padding-right: 50px;
  padding-top: 13px;
  font-size: 28px;
}
</style>

<script>
import axios from "axios"; // http 통신을 위한 라이브러리
const HOST =  "http://localhost:8080";
export default {
  name: "Header",
  data() {
    return {
      isDropdownVisible: false,
      iconColor: '#AAB1B8',
      isLogIn: false,
      myName: ''

    };
  },
  mounted(){
    let Login = this.$store.getters.isLogin
    this.isLogIn = Login
    console.log(this.isLogIn);

    const apiUrl = `${HOST}/api/v1/user/info/read`;
     try {
     const url = new URL(apiUrl);
     console.log('URL:', url);
     axios.get(apiUrl).then((res) => {
       console.log('API response:', res.data);
       this.myName = res.data.emp_name;
     });
   } catch (error) {
     console.error('Invalid API URL:', apiUrl);
     console.error(error);
   }



  },
  methods: {
    showDropdown: function() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    goToLogin: function(){
      this.$router.push({path: './login'});
    }
  },
};
</script>

<style>
.group-icon {
  cursor: pointer;
}

.arrow-icon {
  cursor: pointer;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 8px;
  z-index: 1;
}

.dropdown-menu li {
  cursor: pointer;
  padding: 6px 12px;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}

.material-symbols-outlined,
span {
  color: white;
  font-size: 18px; 
  text-align: center;
}

.header-text{
  padding-left: 10px;
  font-family: 'ONE-Mobile-Title';
  color: #ffffff;

}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Adjust the height as needed */
  position: relative;
  cursor: pointer;
}

.login-text {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.login-title {
  margin-right: 5px;
}






.header {
  position: relative;
  height: 50px;
  background-color: #33508A;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}



.user-icon {
  margin-right: 8px;
}


.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 200px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: none;
  padding: 8px 0;
  z-index: 1;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  color: #33508A;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}
</style>
