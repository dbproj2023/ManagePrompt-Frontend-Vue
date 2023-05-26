<template>
    <v-app>
      <v-content style="background-color:#F5F5F5;">
        <v-container fluid>
          <Login/>
        </v-container>
      </v-content>
    </v-app>
  </template>
  
  
  <script>
  // import Evaluation from './component/EvaluationResults.vue'
  import Header from './component/Header.vue';
  import Nav from './component/Nav.vue'
  import Login from  './component/Login.vue'

  export default {
    name: "Project",
    components:{
    Login,
    Nav,
    Header
    },
    data() {
      return {
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
  };
  </script>
  
  <style scoped>
  div {
    flex: 1200px;
  }
  
  h3 {
    left: 500px;
    margin: 30px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  .search-bar{
    position: absolute;
    width: 1167.73px;
    height: 100px;
    left: 300px;
    top: 150px;
    flex-wrap: nowrap;
  }
  
  .head-name{
    position: absolute;
    width: 219px;
    height: 10px;
    left: 300px;
    top: 100px;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    color: #000000;
  }
  .project-table{
    position: center;
    width: 1167.73px;
    height: 514.6px;
    margin: 30px;
    top: 50px;
  }
  
  .wrapper{
    position: absolute;
    width: 100%;
    height: 1000px;
    left: 280px;
    top: 50px;
    background-color: white;
    /* #f5f8f9; */
  }
  
  .title { 
    font-family: 'KimjungchulGothic-Bold', 'Sans-serif'; 
  }
  </style>