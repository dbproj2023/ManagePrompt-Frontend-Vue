<template>
  <div class="wrapper">
    <div class="container">
      <h2>신규 직원 정보 등록</h2>
      <br>
      <br>

      <div style="display: flex;">
        <b-form-input type="text" class="input-data" v-model="authId" placeholder="아이디"></b-form-input>
        <button type="button" @click="checkAuthId()">중복 확인</button>
      </div>

      <div style="display: flex;">
        <b-form-input type="password" class="input-data" v-model="authPw" placeholder="비밀번호"></b-form-input>
        <p>{{ messageAuthPw }}</p>
      </div>

      <div style="display: flex;">
        <b-form-input type="password" class="input-data" v-model="checkPw" placeholder="비밀번호 확인"></b-form-input>
        <p>{{ messageCheckPw }}</p>
      </div>

      <div style="display: flex;">
        <b-form-input type="tel" class="input-data" v-model="empPh" placeholder="전화번호"></b-form-input>
        <p>{{ messageEmpPh }}</p>
      </div>

      <div style="display: flex;">
        <b-form-input type="email" class="input-data" v-model="empEmail" placeholder="이메일"></b-form-input>
        <button type="button" @click="checkEmpEmail()">중복 확인</button>
      </div>

      <div>
        <button @click="enrollSubmit()" class="login100-form-btn pro-button search-button" type="button">등록</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        empId: "",
        empName: "",
        authId: "",
        authPw: "",
        checkPw: "",
        empPh: "",
        empEmail: "",
        empSsn: "",
        empEdu: "",
        empWorkEx: "",
        empSkill: "",
        messageAuthPw: "",
        messageCheckPw: "",
        messageEmpPh: ""
      }
    },
    mounted() {
      axios.get('/api/v1/user/info/read').then((res) => {
        console.log('API response:', res.data);
        this.empId = res.data.emp_id;
        this.empName = res.data.emp_name;
        this.empSsn = res.data.emp_ssn;
        this.empEdu = res.data.emp_edu;
        this.empPh = res.data.emp_ph;
        this.empEmail = res.data.emp_email;
        this.empWorkEx = res.data.emp_workex;
        this.empSkill = res.data.emp_skill;
      }).catch ((error) => {
        console.error('Invalid API URL:', apiUrl);
        console.error(error);
      });
    },
    methods: {
      enrollSubmit() {
        if( this.authId == '' ) {
          alert("아이디를 생성해 주세요.");
          return;
        } else if( this.authId.length < 6 || this.authId.length > 12 ) {
          alert("아이디는 6자리 이상, 12자리 이하로 생성해야 합니다.");
          return;
        }
        
        this.checkAuthPw();

        this.matchAuthPw();

        this.checkEmpPh();

        const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
        if( this.empEmail == '' ) {
          alert("이메일을 입력해 주세요.");
          return;
        } else if( !validateEmail.test(this.empEmail) ) {
          alert("이메일 형식에 맞게 입력해야 합니다. (aaa@aaa.aaa)");
          return;
        }

        // if( this.clickAuthId == false ) {
        //   alert("아이디 중복 여부를 확인해주세요.");
        //   return;
        // }
        
        // const validatePw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/
        // if( this.authPw == '' ) {
        //   alert("비밀번호를 생성해 주세요.");
        //   return;
        // } else if( !validatePw.test(this.authPw) ) {
        //   alert("비밀번호는 8글자 이상, 20글자 이하이며 영문, 숫자, 특수문자가 포함되어야 합니다.");
        //   return;
        // }

        let formData = new FormData();
        formData.append("emp_id", this.empId);
        formData.append("emp_name", this.empName);
        formData.append("auth_id", this.authId);
        formData.append("auth_pw", this.authPw);
        formData.append("emp_ph", this.empPh);
        formData.append("emp_email", this.empEmail);
        formData.append("emp_ssn", this.empSsn);
        formData.append("emp_edu", this.empEdu);
        formData.append("emp_work_ex", this.empWorkEx);
        formData.append("emp_skill", this.empSkill);

        axios.patch(`api/v1/auth/user`, formData).then((res) => {
          if( res.data == 'success' ) {
            alert("신규 등록이 완료되었습니다. 로그인 화면으로 돌아갑니다.");
            this.$router.push({path: './login'});
          }
        });
      },
      checkAuthId() {
        if( this.authId == '' ) {
            alert("아이디를 입력해 주세요.");
            return;
        } else if( this.authId.length < 6 || this.authId.length > 12 ) {
            alert("아이디는 6자리 이상, 12자리 이하로 작성해야 합니다.");
            return;
        }

        let formData = new FormData();
        formData.append("auth_id", this.authId);

        axios.post(`api/v1/auth/checkID`, formData).then((res) => {
            if( res.data == true ) {
              alert("이미 사용 중인 아이디입니다.");
            } else {
              alert("사용 가능한 아이디입니다.");
            }
        });
      },
      checkAuthPw() {
        const validatePw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        
        if( this.authPw == '' ) {
          this.messageAuthPw = "비밀번호를 입력해 주세요.";
          return;
        } else if( !validatePw.test(this.authPw) ) {
          this.messageAuthPw = "비밀번호는 8글자 이상, 20글자 이하이며 영문, 숫자, 특수문자가 포함되어야 합니다.";
          return;
        } else {
          this.messageAuthPw = "";
          return;
        }
      },
      matchAuthPw() {
        if( this.checkPw == '' ) {
          this.messageCheckPw = "비밀번호를 입력해 주세요.";
          return;
        } else if( this.checkPw != this.authPw ) {
          this.messageCheckPw = "비밀번호가 일치하지 않습니다.";
          return;
        } else {
          this.messageCheckPw = "";
          return;
        }
      },
      checkEmpEmail() {
        const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
        if( this.empEmail == '' ) {
          alert("이메일을 입력해 주세요.");
          return;
        } else if( !validateEmail.test(this.empEmail) ) {
          alert("이메일 형식에 맞게 입력해야 합니다. (aaa@aaa.aaa)");
          return;
        }
        
        let formData = new FormData();
        formData.append("empEmail", this.empEmail);

        axios.post(`api/v1/auth/checkEmail`, formData).then((res) => {
          if( res.data == true ) {
            alert("이미 사용 중인 이메일입니다.");
          } else {
            alert("사용 가능한 이메일입니다.");
          }
        });
      },
      checkEmpPh() {
        const validatePh = /^\d{3}-\d{3,4}-\d{4}$/;
        
        if( this.empPh == '' ) {
          this.messageEmpPh = "전화번호를 입력해 주세요.";
          return;
        } else if( !validatePh.test(this.empPh) ) {
          this.messageEmpPh = "전화번호 형식에 맞게 입력해야 합니다. (010-0000-0000)";
          return;
        } else {
          this.messageEmpPh = "";
          return;
        }
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    background: #fff;
    width:444px;
    height: 724px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .input-data{
  margin-bottom: 10px;
  width: 300px;
  }
</style>
