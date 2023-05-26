<template>
  <div class="header">
    <div class="icon">

  
      <!-- 로그인 안했을 때 -->
      <!-- <div class="login-container">
        <div class="login-text" @click="goToLogin">
          <i class="login-title fa-solid fa-right-to-bracket fa-2xs" style="color: #ffffff;"></i>
          <span class="header-text">Sign in</span>
        </div>
      </div> -->


      <!-- 로그인 했을 때 -->
      <div class="login-container" @click="showDropdown">
      <i class="fa-solid fa-circle-user" style="color: #ffffff;"></i>
      <span  class="header-text">{{ this.myName }}</span>
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
      isLoggedIn: false,
      myName: ''

    };
  },
  mounted(){
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
      console.log(this.isDropdownVisible);
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
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Adjust the height as needed */
}

.login-text {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.login-title {
  margin-right: 5px;
}

.header-text {
  color: #ffffff;
}



</style>
