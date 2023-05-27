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
              <option v-for="(proName, proId) in proList" :key="proId" :value="proName">{{ proName }}</option>
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
          <div class="flex-cell"> {{ this.myName }}</div>
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
          <div style="flex:1; text-align: center;">2</div>
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
          <button class="login100-form-btn input-button" type="button" @click="registerEval"  style="margin-top: 10px">평가 등록</button>
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
    proList: {},
    commInput: '',
    perfomInput:'',
    myName: ''
  }
},
mounted(){
  // proId = this.selectedPro
  // proId = 'pro001'

    const apiUrl1 = `${HOST}/api/v1/user/search/proj/list`;
    console.log("여기  !!!!!")
    try {
    const url = new URL(apiUrl1);
    console.log('URL:', url);
    axios.get(apiUrl1).then((res) => {
      console.log('API response:', res.data);
      // console.log(res.data.participantList[0])
      this.project = res.data;

      for (let i = 0; i < this.project.projectList.length; i++) {
        const proId = this.project.projectList[i].proId;
        const proName = this.project.projectList[i].proName;
        this.proList[proId] = proName;
              // Store empName and empId in the dictionary
      }
      
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
    console.log(this.proList); 

    const apiUrl = `${HOST}/api/v1/user/info/read`
    try {
    const url = new URL(apiUrl);
    console.log('URL:', url);
    axios.get(apiUrl).then((res) => {
      console.log('API response:', res.data);
      this.myName = res.data.emp_name;
    });
  } catch (error) {
    console.error('Invalid API URL:', apiUrl);
    console.error(error);
  }
    
    const selectedProId = Object.entries(this.proList).find(
      ([proId, proName]) => proName === this.selectedPro
    );
    console.log(selectedProId);
    const apiUrl2 = `${HOST}/api/v1/proj/${selectedProId[0]}`;
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

        if (this.myName != empName){
          this.empList[empId] = empName;
        }
        
        // Store empName and empId in the dictionary
      }
      console.log(this.empList);

    });
  } catch (error) {
    console.error('Invalid API URL:', apiUrl);
    console.error(error);
  }
  },
  registerEval(){
    const selectedEmpId = Object.keys(this.empList).find(
      (empId) => this.empList[empId] === this.selectedEmpName
    );

    const selectedProId = Object.entries(this.proList).find(
      ([proId, proName]) => proName === this.selectedPro
    );

    console.log(selectedProId[1], selectedEmpId ,this.selectedOption_p, this.selectedOption_c, this.commInput, this.perfomInput)

    const apiUrl = `${HOST}/api/v1/evaluation/coworker/create`


    const formData = new FormData();
    formData.append("pro_name", selectedProId[1]);
    formData.append("coworker_emp_id", selectedEmpId);
    formData.append("communication_rating",parseInt(this.selectedOption_c));
    formData.append("communication_desc", this.commInput);
    formData.append("performance_rating",parseInt(this.selectedOption_p));
    formData.append("performnace_desc", this.perfomInput);

    for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

    console.log(apiUrl)
    try {
          axios
            .post(apiUrl, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              if (res.status === 200) {

                console.log("평가 등록 성공!");
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

.input-button {
  margin-top: 10px;
  width: 120px;
  height: 40px;
  background-color: #394F85;
  /* background-color: #c1d9db; */
  /* #33508A; */
  color: white;
  font-size: 12px;
}


.evalFrom-card{
  margin-top: 10px;
  height: 600px;
  width: 80%;
  padding: auto;
  margin-left: 30px;
}

.flex-table {
  display: flex;
  flex-direction: column;
  border: 0.5px solid #F6F6F6; 
  border-collapse: collapse;
  font-size: small;
}

.flex-row {
  display: flex;
  border: 0.5px solid #F6F6F6; 

}

.flex-header{
  /* font-weight: bold; */
  border: 0.5px solid #F6F6F6; 
  background-color: #E8ECEC;
}

.flex-cell {
  flex: 1;
  padding: 8px;
  /* border: 0.5px solid #ccc; */
  white-space: pre-wrap;
  text-align: center;
  border: 0.5px solid #F6F6F6; /* Set a lighter border color */

}

.button-container {
  display: flex;
  justify-content: flex-end;
  /* margin-bottom: auto; */ 
}



</style>
