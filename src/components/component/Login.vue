<template>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-t-50 p-b-90">

          <form class="login100-form form-input validate-form flex-sb flex-w" name="login_form" method="get">
            <span class="login100-form-title p-b-51">
              Member Login
            </span>
  
            <div class="wrap-input100 validate-input m-b-16">
              <input class="input100" type="text" id="auth_id" name="auth_id" ref="memberIdInput" v-model="input.auth_id" placeholder="아이디">
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
  
            <div class="wrap-input100 validate-input m-b-16">
              <input class="input100" type="password" id="auth_pw" name="auth_pw" ref="memberPasswordInput" v-model="input.auth_pw" placeholder="비밀번호">
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>
  
            <div class="flex-sb-m w-full p-t-3 p-b-24">
  
              <div>
                <a href="find_accoun" class="txt1">
                  비밀번호 찾기
                </a>
              </div>
            </div>

            <div class="container-login100-form-btn m-t-17">
              <button class="login100-form-btn" type="button" @click="doLogin()">
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  const HOST =  "http://localhost:8080";
  import loginStore from './login.js'
  
  export default {
      data() {
          return {
              input: {
                  auth_id: "",
                  auth_pw: ""
              },
              find_account: "/FindAccount"
          }
      },
      methods: {
          doLogin() {
              console.log("test code click doLogin")
  
              if (this.input.auth_id == "") {
                  alert("아이디를 입력하세요.");
                  this.$refs.memberIdInput.focus();
                  return;
              } else if (this.input.auth_pw == "") {
                  alert("패스워드를 입력하세요.");
                  this.$refs.memberPasswordInput.focus();
                  return;
              }
      
              // test 소스 권한 0의 경영진
              // this.input.auth_id = 'qafffwad';
              // this.input.auth_pw = 'abc01!~!';
  
              // test 소스 권한 2의 관리자
              // this.input.auth_id = 'rege1212';
              // this.input.auth_pw = 'abc01!~!';
  
              // test 소스 권한 3의 직원
              // this.input.auth_id = 'awfawfwf';
              // this.input.auth_pw = 'abc01!~!';
  
              let formData = new FormData();
              formData.append("authId", this.input.auth_id);
              formData.append("authPw", this.input.auth_pw);
  
              axios.post(`/api/v1/auth/login`, formData ).then((res) => {
                  if( res.data != null && res.data != undefined && res.data != '' ){
                      alert("로그인에 성공했습니다")
  
                      this.$store.commit('setLogin', true)
                      this.$store.commit('setAccGrade', res.data.accessGrade)
                      console.log("test code isLogin-2 : ", this.$store.getters.isLogin)
  
                      // // 새로운 직원이면
                      // if( res.data.isNewbie == true ){
                      //     // 회원 정보 등록 페이지로 이동
                      //     this.$router.push('/Enroll')
                      // }else{
                      //     // 이전 페이지로 이동
                      //     // this.$router.push('/');
                      //     this.$router.go(-1);
                      // }
                      this.$router.go(-1);
                  }
                  else if( res.data == '' ){
                      alert("로그인에 실패했습니다.")
                  }
              });
          }
      },
      modules: {
          loginStore: loginStore
      }
  }
  </script>


<style scoped>
  .limiter {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .container-login100 {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background:#33508A;
  }

  .wrap-login100 {
    width: 100%;
    max-width: 700px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    padding: 54px 65px 60px 65px;
  }

  .login100-form {
    width: 100%;
  }

  .login100-form-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 20px;
  }

  .wrap-input100 {
    position: relative;
    width: 100%;
    z-index: 1;
    margin-bottom: 16px;
  }

  .input100 {
    font-size: 15px;
    line-height: 1.5;
    color: #333333;
    display: block;
    width: 100%;
    background: #e6e6e6;
    height: 50px;
    border-radius: 25px;
    padding: 0 30px 0 68px;
  }

  .focus-input100 {
    display: block;
    position: absolute;
    border-radius: 25px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    color: #33508A;
    transform: translateY(50%);
    padding-left: 68px;
    padding-right: 25px;
    overflow: hidden;
  }

  /* .focus-input100::before {
    content: "\f007";
    font-family: FontAwesome;
    font-size: 18px;
    color: #33508A;
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translateY(-50%);
  } */

  .symbol-input100 {
    font-size: 18px;
    color: #33508A;
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translateY(-50%);
  }

  .flex-sb {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex-w {
    display: flex;
    flex-wrap: wrap;
  }

  .contact100-form-checkbox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }

  .input-checkbox100 {
    opacity: 0;
    position: absolute;
    margin-right: -25px;
  }

  .label-checkbox100 {
    font-size: 15px;
    color: #333333;
    line-height: 1.5;
    cursor: pointer;
    padding-left: 25px;
    position: relative;
    padding-top: 1px;
  }

  .label-checkbox100::before {
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    border: 1px solid #33508A;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-radius: 2px;
  }

  .input-checkbox100:checked + .label-checkbox100::before {
    display: block;
    background-color: #33508A;
  }

  .container-login100-form-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 17px;
  }

  .login100-form-btn {
    font-size: 15px;
    line-height: 1.5;
    color: #fff;
    text-transform: uppercase;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    background: #33508A;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
    cursor: pointer;
  }

  .login100-form-btn:hover {
    background-color: #333333;
  }

  .txt1 {
    font-size: 15px;
    line-height: 1.5;
    color: #333333;
  }

  .txt2 {
    font-size: 15px;
    line-height: 1.5;
    color: #33508A;
    text-decoration: underline;
  }

  .txt2:hover {
    color: #333333;
    text-decoration: none;
  }

  .p-t-3 {
    padding-top: 3px;
  }

  .p-t-12 {
    padding-top: 12px;
  }

  .p-t-17 {
    padding-top: 17px;
  }

  .p-t-24 {
    padding-top: 24px;
  }

  .p-t-55 {
    padding-top: 55px;
  }

  .p-b-24 {
    padding-bottom: 24px;
  }

  .p-b-51 {
    padding-bottom: 51px;
  }

  .m-b-16 {
    margin-bottom: 16px;
  }

  .m-t-17 {
    margin-top: 17px;
  }

  .p-l-57 {
    padding-left: 57px;
  }

  .txt-center {
    text-align: center;
  }

  .txt-right {
    text-align: right;
  }

  .txt-left {
    text-align: left;
  }

  .m-t-20 {
    margin-top: 20px;
  }

  .m-b-20 {
    margin-bottom: 20px;
  }

  .m-l-25 {
    margin-left: 25px;
  }

  .m-r-25 {
    margin-right: 25px;
  }

  .p-t-40 {
    padding-top: 40px;
  }

  .p-b-40 {
    padding-bottom: 40px;
  }

  .p-l-55 {
    padding-left: 55px;
  }

  .p-r-55 {
    padding-right: 55px;
  }

  .p-l-15 {
    padding-left: 15px;
  }

  .p-r-15 {
    padding-right: 15px;
  }

  .p-t-25 {
    padding-top: 25px;
  }

  .p-b-25 {
    padding-bottom: 25px;
  }

  .m-b-10 {
    margin-bottom: 10px;
  }

  .m-t-10 {
    margin-top: 10px;
  }

  .m-b-25 {
    margin-bottom: 25px;
  }

  .m-t-49 {
    margin-top: 49px;
  }

  .m-b-48 {
    margin-bottom: 48px;
  }

  .m-b-52 {
    margin-bottom: 52px;
  }

  .p-b-15 {
    padding-bottom: 15px;
  }

  .m-b-15 {
    margin-bottom: 15px;
  }
</style>
