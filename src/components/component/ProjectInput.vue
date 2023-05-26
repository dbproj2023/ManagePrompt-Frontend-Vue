<!-- DetailView.vue -->
<template>
  <div class="wrapper">
    <div class="container">
      <h2>프로젝트 추가</h2>
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
      <b-button @click="createPro">프로젝트 등록</b-button>

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
      clientEmpEmail: ''
    }
  },
  methods: {
    closeDetail() {
      this.$emit('');
    },
    createPro() {
      // if (this.checkInput() === false) {
      //   alert(this.err_message);
      // } else {
        const formData = new FormData();
        formData.append("pro_id", this.proId);
        formData.append("pro_name", this.proName);
        formData.append("client_name", this.clientName);
        formData.append("start_date", this.startDate);
        formData.append("end_date", this.endDate);
        formData.append("budget", this.budget);
        formData.append("client_emp_name", this.clientEmpName);
        formData.append("client_emp_ph", this.clientEmpPh);
        formData.append("client_emp_email", this.clientEmpEmail);

        console.log(formData);
        try {
          axios
            .post(`${HOST}/api/v1/proj/create`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("프로젝트 등록 성공!");
                console.log(res);
                this.$router.push("/project");
              }
            });
        } catch (error) {
          console.log(error);
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