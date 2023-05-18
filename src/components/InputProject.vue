<!-- DetailView.vue -->
<template>
    <div class="wrapper">
      <div class="container">
        <h2>프로젝트 추가</h2>
        <br>
        <br>

        <b-form-input class="input-data" v-model="proName" placeholder="프로젝트 이름"></b-form-input>      
        <b-form-input class="input-data" v-model="proName" placeholder="프로젝트 이름"></b-form-input>              
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
        <b-button @click="sendData">수정</b-button>

      </div>
    </div>
  </template>
  
  <script>
  // import { BFormInput, BFormDatepicker, BButton } from 'bootstrap-vue'

  export default {
    data() {
      return {
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
        this.$emit('closeDetail');
      },
      sendData() {
        console.log(this.proName, this.clientName, this.startDate, this.budget, this.clientEmpName, this.clientEmpPh, this.clientEmpEmail)
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