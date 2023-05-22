<template>
  <div class="Evaluation">
      <div>
      <br>
      <b-card class="project-card">
        <div class="flex-row">
          <div class="flex-cell flex-header">프로젝트</div>
          <div class="flex-cell">
            <select name="cards_id"  class="form-select form-control"  v-model="selectedPro" v-on:change="proSelection">
            <option value="">선택하세요</option>
              <option value="pro001">Project A</option>
              <option value="pro002">Project B</option>
              <option value="pro003">Project C</option>
            </select>
          </div>
          <div class="flex-cell flex-header">이름</div>
          <div class="flex-cell">
            <select name="cards_id" class="form-select form-control" v-model="selectedEmpName">
              <option value="">선택하세요</option>
              <option v-for="(empName, empId) in empList" :key="empId" :value="empName">{{ empName}}</option>
            </select>
          </div>
        </div>
      </b-card>

      <b-card class="evalEmp-card">
        <div class="flex-row">
          <div class="flex-cell flex-header">프로젝트명</div>
          <div class="flex-cell">{{ this.project.proName}}</div>
          <div class="flex-cell flex-header">프로젝트 기간</div>
          <div class="flex-cell">{{ slicedStartDate }}</div>
        </div>
        <div class="flex-row">
          <div class="flex-cell flex-header">평가자</div>
          <div class="flex-cell"> it's me</div>
          <div class="flex-cell flex-header">피평가자</div>
          <div class="flex-cell">{{this.selectedEmpName }}</div>
        </div>
      </b-card>

      <b-card class="evalFrom-card">
        <span>문항을 읽고 가장 적절한 곳에 체크해주세요.</span>
        <div style="display: flex; padding-top: 20px;">
          <div style="flex:1; text-align: center;">1</div>
          <div style="flex:5">
            <p>이 직원의 업무 추진 실적, 문제 해결, 책임감 등을 종합적으로 고려했을 때 개인 업무 능력은 어떠했는가?</p>
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
          <div style="flex:1; text-align: center;">1</div>
          <div style="flex:5">
            <p>이 직원의 팀원 또는 고객과의 협조, 기여, 협상 등을 종합적으로 고려했을 때 커뮤니케이션 능력은 어떠했는가?</p>
            <div style="display: flex;">
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
          <b-button  @click="registerEval"  style="margin-top: 10px">프로젝트 등록</b-button>
        </div>
      </b-card>
      </div>
  </div>
</template>

<script>
import axios from "axios"; // http 통신을 위한 라이브러리
const HOST =  "http://localhost:8080";
export default {
name: "Evaluation",
data() {
  return {
    selectedPro: '',
    selectedEmpName: '',
    project: '',
    endDate: null,
    startDate: null,
    proName: '',
    text: '',
    selectedOption_p: '',
    selectedOption_c: '',
    empList: {},
    commInput: '',
    perfomInput:''
  }
},
mounted(){
    const apiUrl1 = `${HOST}/api/v1/user/search/proj/list`;
    console.log("여기  !!!!!")
    try {
    const url = new URL(apiUrl1);
    console.log('URL:', url);
    axios.get(apiUrl1).then((res) => {
      console.log('API response:', res.data);
      console.log(res.data.participantList[0])
      this.project = res.data;
      console.log(project)
    });
  } catch (error) {
    console.error('Invalid API URL:', apiUrl1);
    console.error(error);
  }
  // proId = this.selectedPro
  // proId = 'pro001'

 },
 computed: {
    slicedStartDate() {
      if (this.project.startDate && this.project.endDate) {
        const startyear = this.project.startDate.slice(2, 4);
        const startmonth = this.project.startDate.slice(5, 7);
        const startday = this.project.startDate.slice(8, 10);

        const endyear = this.project.startDate.slice(2, 4);
        const endmonth = this.project.startDate.slice(5, 7);
        const endday = this.project.startDate.slice(8, 10);
        return `${startyear}-${startmonth}-${startday} ~ ${endyear}-${endmonth}-${endday}`}
      return '';
    }
  }
,
 methods: {
  proSelection() {
    // 선택된 값에 따라 작업 수행
    console.log(this.selectedPro);   
    const apiUrl2 = `${HOST}/api/v1/proj/${this.selectedPro}`;
    try {
    const url = new URL(apiUrl2);
    console.log('URL:', url);
    axios.get(apiUrl2).then((res) => {
      console.log('API response:', res.data);
      console.log(res.data.participantList[0].employee)
      this.project = res.data;
      this.isLoading = false;

      for (let i = 0; i < res.data.participantList.length; i++) {
        const empName = res.data.participantList[i].employee.empName;
        const empId = res.data.participantList[i].employee.empId;
        
        // Store empName and empId in the dictionary
        this.empList[empId] = empName;
      }
      console.log(this.empList);

    });
  } catch (error) {
    console.error('Invalid API URL:', apiUrl);
    console.error(error);
  }
  },
  registerEval(){
    const selectedId = Object.keys(this.empList).find(
      (empId) => this.empList[empId] === this.selectedEmpName
    );
    console.log(selectedId ,this.selectedOption_p, this.selectedOption_c, this.commInput, this.perfomInput)
  }
}
};
</script>

<style scoped>
div {
  flex: 1300px;
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
  width: 80%;
  padding: auto;
  margin-left: 30px;
}
.evalEmp-card{
  margin-top: 10px;
  height: 120px;
  width: 80%;
  padding: auto;
  margin-left: 30px;
}

.evalFrom-card{
  margin-top: 10px;
  height: 550px;
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
