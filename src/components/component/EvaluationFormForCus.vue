<template>
  <div>
      <div>
      <br>
      <b-card class="evalCus-card">
        <div class="flex-row">
          <div class="flex-cell flex-header">프로젝트명</div>
          <div class="flex-cell">{{ this.client.project_name }}</div>
          <div class="flex-cell flex-header">프로젝트 기간</div>
          <div class="flex-cell">{{ this.client.project_startdate |moment('YYYY-MM-DD') }} ~ {{  this.client.project_endtdate| moment('YYYY-MM-DD')}}</div>
        </div>
        <div class="flex-row">
          <div class="flex-cell flex-header">프로젝트 담당자(PM)</div>
          <div class="flex-cell">{{this.client.pm_name}}</div>
          <div class="flex-cell flex-header">발주처명</div>
          <div class="flex-cell">{{ this.client.client_name }}</div>
        </div>
      </b-card>

      <b-card class="evalFrom-card">
        <span>문항을 읽고 가장 적절한 곳에 체크해주세요.</span>
        <div style="display: flex; padding-top: 20px;">
          <div style="flex:1; text-align: center;">1</div>
          <div style="flex:7">
            <p>프로젝트 일정과 예산 내에서 프로젝트의 목표와 요구사항을 완성했나요?</p>
            <div style="display: flex;">
              <b-form-radio v-model="selectedOption_p" value="1"> 매우 낮은 편이다.</b-form-radio>
              <b-form-radio v-model="selectedOption_p" value="2"> 낮은 편이다</b-form-radio>
              <b-form-radio v-model="selectedOption_p" value="3"> 중간정도이다</b-form-radio>
              <b-form-radio v-model="selectedOption_p" value="4"> 높은 편이다</b-form-radio>
              <b-form-radio v-model="selectedOption_p" value="5"> 매우 높은 편이다</b-form-radio>
            </div>
            <div style="padding-top: 20px;">
              <b-form-input style="height:100px" v-model="perfomInput" placeholder="Enter your name"></b-form-input>
            </div>
          </div>
        </div>
        <hr style="border: solid 0.1px"> 
        <div style="display: flex; padding-top: 20px;">
          <div style="flex:1; text-align: center;">2</div>
          <div style="flex:7">
            <p>프로젝트 진행 과정에서 발주처와의 커뮤니케이션과, 정보 전달과 의사소통이 효과적으로 이루어졌나요?</p>
            <div style="display: flex; align-items: center;">
              <b-form-radio v-model="selectedOption_c" value="1"> 매우 낮은 편이다.</b-form-radio>
              <b-form-radio v-model="selectedOption_c" value="2"> 낮은 편이다</b-form-radio>
              <b-form-radio v-model="selectedOption_c" value="3"> 중간정도이다</b-form-radio>
              <b-form-radio v-model="selectedOption_c" value="4"> 높은 편이다</b-form-radio>
              <b-form-radio v-model="selectedOption_c" value="5"> 매우 높은 편이다</b-form-radio>
            </div>
            <div style="padding-top: 20px;">
              <b-form-input style="height:100px" v-model="commInput" placeholder="Enter your name"></b-form-input>
            </div>
          </div>
        </div>
        <div class="button-container">
          <b-button  @click="registerEval()"  style="margin-top: 10px">평가 등록</b-button>
        </div>
      </b-card>
      </div>
  </div>
</template>

<style scoped>
div {
  flex: 1300px;
}
</style>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
name: "Main",
data() {
  return{
    commInput: '',
    perfomInput: '',
    selectedOption_p: '',
    selectedOption_c: '',
    client: []
  }
},
mounted() {
  const HOST = "http://localhost:8080";
  const apiUrl = `${HOST}/api/v1/evaluation/client/project`;

  axios.get(apiUrl)
    .then(res => {
      console.log(res.data);
      // Handle the response and assign the client data to the client property
      this.client = res.data;
    })
    .catch(error => {
      console.error('Failed to retrieve client data:', error);
    });
},
methods: {
  registerEval(){
    this.isLoading = true;
    const HOST = "http://localhost:8080";
    const apiUrl = `${HOST}/api/v1/evaluation/client/create`

    const formData = new FormData();
    formData.append("communication_rating",parseInt(this.selectedOption_c));
    formData.append("communication_desc", this.commInput);
    formData.append("performance_rating",parseInt(this.selectedOption_p));
    formData.append("performance_desc", this.perfomInput);

    console.log(apiUrl)
    try {
          axios
            .post(apiUrl, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("평가 등록 성공!");
                alert(res.data.message);
                console.log(res);
                window.location.reload();
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
div {
  flex: 1200px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
span{
  font-weight: bold;
}
.project-card{
  height: 85px;
  width: 90%;
  padding: auto;
  margin-left: 30px;
}
.evalCus-card{
  margin-top: 10px;
  height: 120px;
  width: 80%;
  padding: auto;
  margin-left: 30px;
}

.evalFrom-card{
  margin-top: 10px;
  height: 600px;
  width: 80%;
  padding: auto;
  margin-left: 30px;
}

.flex-row{
  display: flex;
}
.flex-header{
  /* font-weight: bold; */
  background-color: #f0f0f0;
  border: 0.6px solid #ccc;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  /* margin-bottom: auto; */ 
}

.flex-cell {
  flex: 1;
  padding: 8px;
  border: 0.6px solid #ccc;
  white-space: pre-wrap;
  text-align: center;
}

.Evaluation{
  background-color: #f5f8f9;
}
</style>
