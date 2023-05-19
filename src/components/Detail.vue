<template>
<div class="wrapper">
  <div class="spinner-div" v-if="isLoading">
          로딩중 !
  </div>

  <div v-else>
    <div class="card-warpper">
      <div class="card-warpper1"> 
        <div>
        <b-card class="table-card" title="프로젝트 참여 직원" style="width: 560px; height: 340px;">
        <!-- <p>{{ project.proName}}</p>
        <p>발주금액: {{ project.budget }}원</p>
        <p>참여인원: {{ project.numOfParicipant}}</p>
        <p>PM: {{ project.PM }}</p>
        <p>기간: {{ project.startDate.slice(0,10) }} ~ {{ project.endDate.slice(0,10) }}</p>
        <p>상태: {{ project.status }}</p>
        <p>발주처 이름: {{ project.clientName }}</p> -->
        <div class="flex-table" style="margin-top: 20px;">
        <div class="flex-row">
          <div class="flex-cell flex-header">프로젝트 이름</div>
          <div class="flex-cell">{{project.proname}}</div>
          <div class="flex-cell flex-header">프로젝트 매니저</div>
          <div class="flex-cell">{{ project.PM }}</div>
        </div>
        <div class="flex-row">
          <div class="flex-cell flex-header">프로젝트 </div>
          <div class="flex-cell">{{ project.startDate.slice(0,10) }} ~ {{ project.endDate.slice(0,10)  }}</div>
          <div class="flex-cell flex-header">프로젝트 참여 인원</div>
          <div class="flex-cell">{{ project.numOfParicipant}}</div>
        </div>
        <div class="flex-row">
          <div class="flex-cell flex-header"> 예산</div>
          <div class="flex-cell">{{ project.budget }}원</div>
          <div class="flex-cell flex-header">발주처명</div>
          <div class="flex-cell">{{ project.clientName }}</div>
        </div>

        <div class="flex-row">
          <div class="flex-cell flex-header">발주처 담당자명</div>
          <div class="flex-cell">{{ project.clientEmpName }}원</div>
          <div class="flex-cell flex-header">발주처 전화번호</div>
          <div class="flex-cell">{{project.clientEmpPh}}</div>
        </div>
    </div>
    <div class="button-container">

     <b-button style ="margin-top:10px">수정</b-button>
    </div>

        </b-card>
    </div>
     <!-- 1-2번 card -->
     <div style="margin-top: 20px;">
          <b-card class="table-card" title="프로젝트 참여 직원" style="width: 560px; height: 340px; overflow: auto;">
            <el-table class="table-responsive table text-center" header-row-class-name="thead-light"  :data="project.participantList" >
            <el-table-column type="selection" width="60"></el-table-column>

            <el-table-column label="사번" min-width="100px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm ">{{row.employee.empId}}</span>
                </template>
            </el-table-column>

            <el-table-column label="이름" min-width="80px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm ">{{row.employee.empName}}</span>
                </template>
            </el-table-column>

            <el-table-column label="직무" min-width="80px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm ">{{ row.roleId.roleName }}</span>
                </template>
            </el-table-column>

            <el-table-column label="참여기간" min-width="200px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm ">{{row.startDate.slice(0,10)}}~{{row.endDate.slice(0,10)}}</span>
                </template>
            </el-table-column>

            </el-table>
            <div class="button-container">
              
              <b-button>수정</b-button>
               
              <b-button v-b-modal.modal-1  style="margin-left: 10px;">삭제</b-button>
              <b-modal id="modal-1" title="프로젝트 직원 관리">
                <p class="my-4">해당 직원을 프로젝트에서 삭제하시겠습니까?</p>
              </b-modal>

            </div>
          </b-card>
        </div>
        </div>
        
         <!-- 2번 card -->
      <div class="card-wrapper2">
        <b-card class="table-card" title="직원 정보 조회" style="width: 680px; height: 680px;">
          <div class="employee-search-bar" style="display:flex; align-items: center;">
            <div style="margin-right: 10px; width: 150px">
              <select name="cards_id"  class="form-select form-control"  v-model="selectedValue">
                <option value="">선택하세요</option>
                <option value="emp_id">사번</option>
                <option value="emp_name">이름</option>
                <option value="emp_skill">스킬</option>
              </select>
            </div>
            <div class="col-7">  
              <b-form-input v-model="searchValue" placeholder="Enter your name"></b-form-input>
            </div>
            <div>         
              <b-button @click="sendData" style="margin-left: 5px; width:80px;"> 검색 </b-button>
            </div>
          </div>
          <div>
            <el-table v-if="employees.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="employees" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="20px"></el-table-column>
            
              <el-table-column label="사번" min-width="43px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm ">{{row.empId}}</span>
                </template>
            </el-table-column>

            <el-table-column label="이름"
                             prop="empName"
                             min-width="38px">
            </el-table-column>

            <el-table-column label="스킬"
                             prop="empSkill"
                             min-width="40px">
            </el-table-column>


            <el-table-column label="직무" prop="job" min-width="60px">
              <template v-slot="{ row }">
                <el-input v-model="row.job" placeholder="직무 입력"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="기간" prop="job">
              <template v-slot="{ row }">
                <el-input  type="date" v-model="row.startdate" @input="handleDateRangeInput" placeholder="YY-MM-DD ~ YY-MM-DD"></el-input>
                <el-input  type="date" v-model="row.enddate" @input="handleDateRangeInput" placeholder="YY-MM-DD ~ YY-MM-DD"></el-input>

              </template>
            </el-table-column>

            </el-table>

            <div v-else style="padding-top: 20px;">
              해당 직원이 없습니다.
            </div>
          </div>


            <div class="button-container">
              <b-button @click="logSelectedData" v-b-modal.modal-2 >추가</b-button>

              <b-modal id="modal-2" title="프로젝트 직원 관리">
                <p class="my-4">해당 직원을 프로젝트에 추가하시겠습니까?</p>
              </b-modal>
            </div>
        </b-card>
      </div>
      </div>
      </div>
      </div>
</template>



<style scoped>

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
.card-warpper{
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 200px;
  top: 50px;
  padding: 30px;
  background-color: #f5f8f9;;
  /* overflow: auto; 수직 스크롤 생성 */
}

.table{
  font-size: small;
}


/* .card {
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
    margin: 10px;
    padding: 20px;
    box-shadow: 0 20px 40px 0 rgba(204, 204, 204, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    position: relative;
} */

.button-container {
  display: flex;
  justify-content: flex-end;
  /* margin-bottom: auto; */ 
}

.card-warpper1{
  padding-right: 40px;
  overflow-y: scroll;
  
}
.card-warpper2{
  position: absolute;
  background-color: #f5f8f9;
  overflow-y: scroll;
}

.wrapper{
  height: 100%;
  background-color: #f5f8f9;

}

.option {
  /* Add your styles here */
  /* Example styles */
  width: 100px;
  height: 0px;
  margin-right: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
  color: #333;
}

.option:focus {
  outline: none;
  border-color: #aaa;
  box-shadow: 0 0 3px #aaa;
}

.option .form-control {
  /* Add your styles here */
  /* Example styles */
  height: 32px;
  padding: 4px;
}

.option .form-control:focus {
  /* Add your styles here */
  /* Example styles */
  box-shadow: none;
  border-color: #aaa;
}

.flex-table {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: small;
}

.flex-row {
  display: flex;
  height: 50px;
  text-align: center;
}

.flex-header{
  /* font-weight: bold; */
  background-color: #f0f0f0;
}

.flex-cell {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  white-space: pre-wrap;
  text-align: center;
}

.table-card{
  max-width: 800px;
  overflow-y: scroll;
}

.wrapper{
  flex: 1200px;
}

</style>


<script>
import ProjectTable from './ProjectTable.vue';
import axios from "axios"; // http 통신을 위한 라이브러리
const HOST =  "http://localhost:8080";

export default {
  name: "Detail",
    data() {
      return {
        isLoading: true,
        employees: "",
        project: "",
        searchValue: '',
        selectedValue: '',
        emp_id: '',
        emp_skill: '',
        emp_name: '',
        startDate: '',
        endDate: ''
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
      this.isLoading = false;
    });
  } catch (error) {
    console.error('Invalid API URL:', apiUrl);
    console.error(error);
  }
}
    // this.project = this.projects.find((project) => project.id === projectId);
    ,
    onChange(e) {
      this.searchType = e.target.value;
      console.log(this.searchType)
      this.searchValue = ''; // Reset search value when search type changes
    },
    methods: {
      sendData() {
        const apiUrl = `${HOST}/api/v1/user/search/`;
        console.log("나 여기");
        console.log(this.selectedValue);
        console.log(this.searchValue);

        if (this.selectedValue === "emp_id") {
          this.emp_id = this.searchValue;
        } else if (this.selectedValue === "emp_name") {
          this.emp_name = this.searchValue;
        } else if (this.selectedValue === "emp_skill") {
          this.emp_skill = this.searchValue;
        }


        const params = {
          emp_id: this.emp_id,
          emp_name:  this.emp_name,
          emp_skill: this.emp_skill
        };

      console.log(apiUrl, params);

      axios
        .get(apiUrl, { params })
        .then((res) => {
          console.log(apiUrl, { params });
          console.log('API response:', res.data);
          this.employees = res.data;
        })
        .catch((error) => {
          console.error('Failed to fetch data:', error);
        });

        params = {
          emp_id: "",
          emp_name: "",
          emp_skill: ""
        };
    },
    handleSelectionChange(selectedRows) {
      this.selectedEmployees = selectedRows;
    },
    logSelectedData() {
      for (const employee of this.selectedEmployees) {
        console.log('Start Date:', this.startDate);
        console.log('End Date:', this.endDate);
        console.log(employee.empId, this.project.proId, employee.empName);
      }
    },
  }
}
;
</script>