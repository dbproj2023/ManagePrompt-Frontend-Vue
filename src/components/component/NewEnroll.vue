<template>
  <div class="wrapper">
    <div class="container">
      <h2>직원 초기 정보 등록</h2>
      <h2>(관리자용)</h2>
      <br>
      <br>

      <div style="display: flex;">
        <select class="form-select form-control" style="width: 130px;" name="join_year" v-model="selectedYear" @change="checkJoinYear($event)">
          <option value="">입사년도</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
        <p>{{ messageJoinYear }}</p>
      </div>

      <div style="display: flex;">
        <select class="form-select form-control" style="width: 130px;" name="roll" v-model="selectedRoll" @change="checkRoll($event)">
          <option value="">직무</option>
          <option value="0">경영진</option>
          <option value="1">PM</option>
          <option value="2">PL</option>
          <option value="3">분석가</option>
          <option value="4">설계자</option>
          <option value="5">프로그래머</option>
          <option value="6">테스터</option>
          <option value="7">디자이너</option>
        </select>
        <p>{{ messageRoll }}</p>
      </div>

      <div>
        <button type="button" @click="createEmpId()">사번 생성</button>
        <b-form-input class="input-data" v-model="empId" placeholder="사번"></b-form-input>
        <button type="button" @click="checkEmpId()">중복 확인</button>
      </div>
      
      <div>
        <b-form-input class="input-data" v-model="empName" placeholder="이름"></b-form-input>
        <p>{{ messageEmpName }}</p>
      </div>

      <div>
        <button type="button" @click="createAuthId()">아이디 생성</button>
        <b-form-input class="input-data" v-model="authId" placeholder="아이디"></b-form-input>
        <button type="button" @click="checkAuthId()">중복 확인</button>
      </div>

      <div>
        <button type="button" @click="createAuthPw()">비밀번호 생성</button>
        <b-form-input class="input-data" v-model="authPw" placeholder="비밀번호"></b-form-input>
        <!-- <button type="button" @click="checkAuthPw()">중복 확인</button> -->
      </div>

      <div>
        <b-form-input class="input-data" v-model="empSsn" placeholder="주민등록번호"></b-form-input>
      </div>
      
      <div>
        <b-form-input class="input-data" v-model="empEdu" placeholder="학력"></b-form-input>
      </div>
      
      <div>
        <b-form-input class="input-data" v-model="empWorkEx" placeholder="경력"></b-form-input>
      </div>

      <div>
        <b-form-input class="input-data" v-model="empSkill" placeholder="스킬"></b-form-input>
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
        selectedYear: "",
        selectedRoll: "",
        empId: "",
        empName: "",
        authId: "",
        authPw: "",
        empSsn: "",
        empEdu: "",
        empWorkEx: "",
        empSkill: "",
        messageJoinYear: "",
        messageRoll: "",
        messageEmpName: "",
        messageAuthPw: "",
        selectedYear: "",
        selectedRoll: "",
        clickEmpId: false,
        clickAuthId: false,
        strJoinYear: "",
        strRoll: "",
        strEmpId: "",
        strRandomNum: "",
      }
    },
    methods: {
      enrollSubmit() {
        const validate_empId = /^\d{8}$/
        const validate_pw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/

        console.log("test code empId : ", this.empId)
        if( this.empId == '' ) {
            alert("사번을 생성해 주세요.");
            return;
        } else if( !validate_empId.test(this.empId) ) {
            alert("사번을 정확히 입력해 주세요.");
            return;
        }

        if( this.clickEmpId == false ) {
            alert("사번 중복 여부를 확인해주세요.");
            return;
        }

        if( this.empName == '' ) {
            alert("이름을 입력해 주세요.");
            return;
        }

        if( this.authId == '' ) {
            alert("아이디를 생성해 주세요.");
            return;
        } else if( this.authId.length < 6 || this.authId.length > 12 ) {
            alert("아이디는 6자리 이상, 12자리 이하로 생성해야 합니다.");
            return;
        }
        
        if( this.clickAuthId == false ) {
            alert("아이디 중복 여부를 확인해주세요.");
            return;
        }

        if( this.authPw == '' ) {
            alert("비밀번호를 생성해 주세요.");
            return;
        } else if( !validate_pw.test(this.authPw) ) {
            alert("비밀번호는 8글자 이상, 20글자 이하이며 영문, 숫자, 특수문자가 포함되어야 합니다.");
            return;
        }

        let formData = new FormData();
        formData.append("emp_id", this.empId);
        formData.append("emp_name", this.empName);
        formData.append("auth_id", this.authId);
        formData.append("auth_pw", this.authPw);
        formData.append("emp_ssn", this.empSsn);
        formData.append("emp_edu", this.empEdu);
        formData.append("emp_work_ex", this.empWorkEx);
        formData.append("emp_skill", this.empSkill);

        axios.post(`api/v1/auth/new-user`, formData).then((res) => {
          console.log("test code /user : ", res)
          console.log("test code /user22 : ", res.data.id)

          if( res.data ){
            console.log("test code: ?")
            alert("초기 정보 등록이 완료되었습니다.")
            window.location.reload();
          }
        });
      },
      checkJoinYear(e) {
        console.log("test code this.selectedYear: ", this.selectedYear);

        this.strJoinYear = this.selectedYear.toString();
        console.log("test code this.strJoinYear: ", this.strJoinYear);

        this.strJoinYear = e.target.value.toString();
        console.log("test code this.strJoinYear: ", this.strJoinYear);
      },
      checkRoll(e) {
        console.log("test code this.selectedRoll: ", this.selectedRoll);

        this.strRoll = this.selectedRoll.toString();
        console.log("test code strRoll: ", this.strRoll);

        this.strRoll = e.target.value.toString();
        console.log("test code strRoll: ", this.strRoll);
      },
      createEmpId() {
        // 사번 생성 버튼 누르면 알람창으로 입사년도, 직무 입력 받아 해당 사번 생성해서 화면에 띄우기 -> empId가 되는 것
        console.log("test code empId : ", this.empId)
        
        if( this.selectedYear == "" ) {
            this.messageJoinYear = "입사년도를 선택해 주세요.";
            return;
        }
        if( this.selectedRoll == "" ) {
            this.messageRoll = "직무를 선택해 주세요.";
            return;
        }

        this.strEmpId = this.strJoinYear.charAt(2) + this.strJoinYear.charAt(3) + '0' + this.strRoll;
        console.log("test code strEmpId : ", this.strEmpId)

        this.strRandomNum = this.generateRandomCode(4)
        console.log("test code strRandomNum : ", this.strRandomNum)

        this.strEmpId = this.strEmpId + this.strRandomNum;
        console.log("test code strEmpId : ", this.strEmpId)

        this.empId = parseInt(this.strEmpId);
        console.log("test code empId : ", this.empId)
      },
      checkEmpId() {
        this.clickEmpId = true;

        const validate_empId = /^\d{8}$/

        console.log("test code empId : ", this.empId)
        if( this.empId == '' ) {
          alert("사번을 생성해 주세요.")
          return;
        } else if( !validate_empId.test(this.empId) ) {
          alert("사번을 정확히 입력해 주세요.")
          return
        }

        let formData = new FormData();
        formData.append("empId", this.empId);

        axios.post(`api/v1/auth/checkEMPID`, formData).then((res) => {
          console.log("test code checkEMPID : ", res)
          if( res.data == true ){
            alert("이미 등록된 사번입니다. 다시 생성해 주세요.")
          } else {
            alert("등록 가능한 사번입니다.")  // 만들어 준 사번
          }
        });
      },
      checkEmpName() {
        // -> empName이 되는 것
        if( this.empName == '' ) {
          this.messageEmpName = "이름을 입력해 주세요.";
          return;
        } else {
          this.messageEmpName = "";
          return;
        }
      },
      createAuthId() {
        // 아이디 생성 버튼 누르면 아이디 형식에 맞게 랜덤 생성해서 화면에 띄우기 -> authId가 되는 것
        this.strRandomNum = this.generateRandomCode(8);
        this.authId = "e" + this.strRandomNum;
        console.log("test code authId : ", this.authId);
      },
      checkAuthId() {
        this.clickAuthId = true;

        if( this.authId == '' ) {
          alert("아이디를 생성해 주세요.")
          return
        } else if( this.authId.length < 6 || this.authId.length > 12 ) {
          alert("아이디는 6자리 이상, 12자리 이하로 생성해야 합니다.")
          return
        }

        let formData = new FormData();
        formData.append("authId", this.authId);

        axios.post(`api/v1/auth/checkID`, formData).then((res) => {
          console.log("test code authId : ", res)
          if( res.data == true ){
            alert("이미 사용 중인 아이디입니다. 다시 생성해 주세요.")
          }else {
            alert("사용 가능한 아이디입니다.")
          }
        });
      },
      createAuthPw() {
        this.strRandomNum = Math.random().toString(36).substr(2,12);
        this.authPw = this.strRandomNum + "!";
        console.log("test code authPw : ", this.authPw);
      },
      checkAuthPw() {
        // 비밀번호 생성 버튼 누르면 비밀번호 형식에 맞게 랜덤 생성해서 화면에 띄우기 -> authPw가 되는 것
        const validate_pw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/
        
        if( this.authPw == '' ) {
          this.messageAuthPw = "비밀번호를 생성해 주세요.";
          return;
        } else if( !validate_pw.test(this.authPw) ) {
          this.messageAuthPw = "비밀번호는 8글자 이상, 20글자 이하이며 영문, 숫자, 특수문자가 포함되어야 합니다.";
          return;
        } else {
          this.messageAuthPw = "";
          return;
        }
      },
      generateRandomCode(n) {
        let str = ''
        for (let i = 0; i < n; i++) {
          str += Math.floor(Math.random() * 10)
        }
        return str
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
