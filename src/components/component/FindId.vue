<template>
  <div>
    <h3>아이디 찾기</h3>
    <div>
      <b-form-input type="email" id="emp_email" name="emp_email" v-model="empEmail" placeholder="이메일"/>
      <button class="small-btn" style="cursor: pointer; float: right;" @click="sendToEmail()">이메일 인증 발송</button>
    </div>

    <div>
      <b-form-input type="number" id="verify_code" name="verify_code" v-if="inputVisible" v-model="verifyCode" placeholder="인증코드"/>
      <button v-if="inputVisible" class="small-btn" style="cursor: pointer; float: right;" @click="checkVerifyCode()">인증번호 확인</button>
    </div>

    <div>
      <p type="text" id="hidden_auth_id" name="hidden_auth_id">{{ hiddenAuthId }}</p>
      <button v-if="buttonVisible" class="small-btn" style="cursor: pointer; float: right;" @click="goToLogin()">로그인</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      empEmail: "",
      inputVisible: false,
      verifyCode: "",
      hiddenAuthId: "",
      buttonVisible: false
    }
  },
  methods: {
    sendToEmail() {
      let formData = new FormData();
      formData.append("emp_email", this.empEmail);

      axios.post('/api/v1/auth/checkEmail', formData).then((res) => {
        if( res.data == true ) {
          this.showInput();

          // 인증코드 발송
          let formData2 = new FormData();
          formData2.append("email", this.empEmail);

          axios.post('/api/v1/auth/help/sendEmail', formData2).then((res) => {
            if( res.data.status == 1 ){
              alert(res.data.message); // 이메일이 발송되었습니다.
            }
            else if( res.data.status == 0 ){
              alert(res.data.message); // 이메일 발송 실패
            }
          });
        } else {
          alert("등록되지 않은 이메일입니다.");
        }
      });
    },
    showInput() {
      this.inputVisible = true;
      return;
    },
    checkVerifyCode() {
        let formData = new FormData();
        formData.append("email", this.empEmail);
        formData.append("verifyCode", this.verifyCode);
        console.log("test code formData:", formData);

        // 인증코드가 일치하면 아이디와 비밀번호를 보내달라고 하기
        axios.post('/api/v1/auth/help/verifyEmail', formData ).then((res) => {
            console.log("test code: post 통신");
            if( res.data.status == 1 ){
                alert(res.data.message); // 인증번호 일치
                
                let formData = new FormData()
                formData.append("email", this.empEmail);

                axios.get('/api/v1/auth/help/findID', formData).then((res) => {
                    if( res.data.status == 1 ) {
                        this.hiddenAuthId = res.data.auth_id;
                        this.buttonVisible = true;
                    } else if( res.data.status == 0) {
                        alert(res.data.message); // 관련 정보가 없습니다.
                    }
                });
            }
            else if( res.data.status == 0 ){
                alert(res.data.message); // 인증번호 불일치
            }
        });
    },
    goToLogin() {
        this.$router.push('/login');
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

.small-btn {
    width: 100px;
    height: 25px;
    font-size: 10px;
    line-height: 1.5;
    color: #fff;
    text-transform: uppercase;
    border-radius: 25px;
    background: #33508A;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
    cursor: pointer;
  }
</style>
