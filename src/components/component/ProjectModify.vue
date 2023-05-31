<!-- DetailView.vue -->
<template>
  <div class="wrapper">
    
    <div class="container">
      <div v-if="this.isLoading"> 
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
          <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
        </div>
      </div>
      <div v-else>
      <h2 style="text-align: center;">프로젝트 수정</h2>
      <br>
      <br>
      <b-form-input class="input-data" v-model="proName" placeholder="프로젝트 이름"></b-form-input>      
      <b-form-input class="input-data" v-model="proId" placeholder="프로젝트 아이디"></b-form-input>              
      <b-form-input class="input-data" v-model="clientName" placeholder="발주처 이름"></b-form-input>
      <div style="display: flex;">
        <b-form-datepicker class="input-data" v-model="startDate" placeholder="시작일시" style="width:145px"></b-form-datepicker>
        ~ 
        <b-form-datepicker class="input-data" v-model="endDate" placeholder="종료일시" style="width:145px;"></b-form-datepicker>
      </div>
      <b-form-input class="input-data" v-model="budget" placeholder="예산"></b-form-input>
      <b-form-input class="input-data" v-model="clientEmpName" placeholder="발주처 담당자"></b-form-input>
      <b-form-input class="input-data" v-model="clientEmpPh" placeholder="발주처 담당자 전화번호"></b-form-input>
      <b-form-input class="input-data" v-model="clientEmpEmail" placeholder="발주처 담당자 이메일"></b-form-input>

      <div style="display:flex;">
        <b-button  class="login100-form-btn pro-button addButton inputButton button1"  @click="goBack">취소</b-button>
        <b-button  class="login100-form-btn pro-button addButton inputButton"  @click="ModifyPro">프로젝트 수정</b-button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
// import { BFormInput, BFormDatepicker, BButton } from 'bootstrap-vue'
import axios from "axios"; // http 통신을 위한 라이브러리
const HOST =  "http://localhost:8080";

export default {
  data() {
    return {
      proId: '',
      proName: '',
      clientName: '',
      startDate: null,
      endDate: null,
      budget: '',
      clientEmpName: '',
      clientEmpPh: '',
      clientEmpEmail: '',
      isLoading: true,
    }
  },
  mounted(){
    const apiUrl = `${HOST}/api/v1/proj/${this.$route.params.id}`;
    console.log("여기  !!!!!")
    try {
    const url = new URL(apiUrl);
    console.log('URL:', url);
    axios.get(apiUrl).then((res) => {
      console.log('API response:', res.data);
      console.log(res.data.participantList[0])
      this.project = res.data;
      this.proId = res.data.proId;
      this.proName = res.data.proName;
      this.clientName = res.data.clientName;
      this.startDate = res.data.startDate;
      this.endDate = res.data.endDate;
      this.budget = res.data.budget;
      this.clientEmpName = res.data.clientEmpName;
      this.clientEmpPh = res.data.clientEmpPh;
      this.clientEmpEmail = res.data.clientEmpEmail;
      this.clientId = res.data.cliendId;
      this.isLoading = false;
    });
  } catch (error) {
    console.error('Invalid API URL:', apiUrl);
    console.error(error);
  }
},
  methods: {
    ModifyPro() {
      const apiUrl1 = `${HOST}/api/v1/proj/update/${this.proId}`;
      const apiUrl2 = `${HOST}/api/v1/client/update/${this.clientId}`;


      const formData1 = new FormData();

      console.log(this.startDate,this.endDate, this.budget)

      formData1.append("start_date", this.startDate);
      formData1.append("end_date", this.endDate);
      formData1.append("budget", this.budget);

      const formData2 = new FormData();

      console.log(this.clientName,this.clientEmpName,this.clientEmpPh,this.clientEmpEmail);

      formData2.append("client_name", this.clientName);
      formData2.append("client_emp_name", this.clientEmpName);
      formData2.append("client_emp_ph", this.clientEmpPh);
      formData2.append("client_emp_email", this.clientEmpEmail);

      for (let [key, value] of formData2.entries()) {
        console.log(`${key}: ${value}`);
      }


      try {
      axios
        .patch(apiUrl1, formData1, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("프로젝트 상세정보 업데이트 성공!");
            console.log(res);
            // window.location.reload();
          }
        });


      axios
        .patch(apiUrl2, formData2, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("프로젝트 상세정보(발주처) 업데이트 성공!");
            console.log(res);
            // window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
    this.$router.push(`/project/detail/${this.proId}`);
    window.location.reload();
    },
  goBack(){
    this.$router.go(-1);
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


.button1 {
  margin-right: 10px;
}

.inputButton{
  text-align: center;
  align-items: center;
  width: 145px;
  height: 40px;
}
</style>