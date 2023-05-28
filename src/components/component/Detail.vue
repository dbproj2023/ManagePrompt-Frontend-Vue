<template>
<div>
     
  <div class="spinner-div" v-if="isLoading">
  <b-card class="ProjectTableCard" style="min-height: 800px;">
    <div class="spinner-container" style="padding-top: 300px;">
      <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
    </div>
  </b-card>
</div>


  <div v-else>
    <div class="card-warpper">
      <div class="card-warpper1"> 
        <div>
        <b-card class="table-card" style="width: 560px; height: 340px;">
          <h6>프로젝트 정보</h6>
        <div class="flex-table" style="margin-top: 20px;">
        <div class="flex-row">
          <div class="flex-cell flex-header">프로젝트 이름</div>
          <div class="flex-cell">{{project.proName}}</div>
          <div class="flex-cell flex-header">프로젝트 매니저</div>
          <div class="flex-cell">{{ pmName }}</div>
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
          <div class="flex-cell">{{ project.clientEmpName }}</div>
          <div class="flex-cell flex-header">발주처 전화번호</div>
          <div class="flex-cell">{{project.clientEmpPh}}</div>
        </div>

        <div class="flex-row">
          <div class="flex-cell flex-header"> 사내 평가</div>
          <div class="flex-cell">
            커뮤니케이션 평가:  {{ averageValues.commavg }}
            업무수행 평가: {{ averageValues.peravg }}
          </div>
          <div class="flex-cell flex-header">고객 평가</div>
          <div class="flex-cell">
            커뮤니케이션 평가: {{ project.clientEvaluationList.communicationRating}}
            업무수행 평가: {{ project.clientEvaluationList.performanceRating}}
          </div>
        </div>
    </div>
    <div class="button-container">
      <button class="login100-form-btn pro-button" type="button" @click="goToProjectModify">프로젝트 수정</button>
      <!-- <b-button @click="goToProjectModify" style="margin-top: 10px">프로젝트 수정</b-button> -->
    </div>

        </b-card>
    </div>
     <!-- 1-2번 card -->
     <div style="margin-top: 20px;">
          <b-card class="table-card" style="width: 560px; height: 320px; overflow: auto;">
            <h6>프로젝트 참여 직원</h6>
            <br>
            <br>
          
            <el-table class="table-responsive table text-center"  header-row-class-name="thead-light"  :data="project.participantList" @selection-change="handleSelectionChange"  size="small">
            <el-table-column type="selection" width="20px"></el-table-column>

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
                  <span class="font-weight-600 name mb-0 text-sm" @click="editRole(row)">{{ row.roleId.roleName }}</span>
                <el-input v-model="row.editing" v-show="row.isEditing" @blur="saveRole(row)" ref="roleInput"></el-input>
                  <!-- <span class="font-weight-600 name mb-0 text-sm ">{{ row.roleId.roleName }}</span> -->
                </template>
            </el-table-column>


            <el-table-column label="참여기간" min-width="200px" prop="name">
              <template v-slot="{ row }">
                <span class="font-weight-600 name mb-0 text-sm" @click="editPeriod(row)">
                  {{ row.startDate.slice(0,10) }}~
                  {{ row.endDate.slice(0,10)}}
                </span>
                <el-input v-model="row.editing" v-show="row.isEditing" @blur="savePeriod(row)" ref="periodInput"></el-input>
              </template>
            </el-table-column>

            </el-table>
            <div class="button-container">
              <button class="login100-form-btn pro-button" type="button" @click="modifyRow">직원 수정</button>
                <b-modal id="modal-1" title="프로젝트 직원 관리">
                  <p class="my-4">해당 직원을 프로젝트에서 수정하시겠습니까?</p>
                </b-modal>

            </div>
          </b-card>
        </div>
        </div>
        
         <!-- 2번 card -->
      <div class="card-wrapper2">
        <b-card class="table-card" style="width: 600px; height: 685px;">
          <h6>직원 정보 조회</h6>
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
              <button @click="sendData" class="login100-form-btn pro-button search-button" type="button">검색</button>
            </div>
          </div>
          <div>
            <el-table v-if="employees.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="employees" @selection-change="handleSelectionChange"  size="small">
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
                <el-input  type="date" v-model="row.startDate" placeholder="YY-MM-DD ~ YY-MM-DD"></el-input>
                <el-input  type="date" v-model="row.endDate" placeholder="YY-MM-DD ~ YY-MM-DD"></el-input>
              </template>
            </el-table-column>

            </el-table>

            <div v-else style="padding-top: 20px;">
              해당 직원이 없습니다.
            </div>
          </div>


            <div class="button-container">
              <button  v-b-modal.modal-2 class="login100-form-btn pro-button" type="button">직원 추가</button>
              <!-- <b-button  v-b-modal.modal-2 >추가</b-button> -->
              <b-modal id="modal-2" title="프로젝트 직원 관리" @ok="logSelectedData">
                <p class="my-4">해당 직원을 프로젝트에 추가하시겠습니까?</p>
              </b-modal>
            </div>
        </b-card>
      </div>
      </div>
      </div>
      </div>
</template>


<script>
// import ProjectTable from './ProjectTable.vue';
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
        endDate: '',
        roleId: '',
        selectedRows: [],
        mapping: {
          경영진: 1,
          PM: 2,
          PL: 3,
          분석가: 4,
          설계자: 5,
          프로그래머: 6,
          테스터: 7,
          디자이너: 8
        },
        communicationRatingList: [],
        performanceRatingList:[],
      }
  },
  mounted(){
    console.log("dajkflkjlskjalkjflkajflak")
    const apiUrl = `${HOST}/api/v1/proj/${this.$route.params.id}`;
    const apiUrl2 = `${HOST}/api/v1/user/search/`;

    const params = {
          emp_id: this.emp_id,
          emp_name:  this.emp_name,
          emp_skill: this.emp_skill
        };

    console.log("여기  !!!!!")
    try {
    const url = new URL(apiUrl);
    console.log('URL:', url);
    axios.get(apiUrl).then((res) => {
      console.log('API response:', res.data);
      console.log(res.data.participantList[0])
      this.project = res.data;
      console.log(this.project.cl);
      this.isLoading = false;
    });

    axios.get(apiUrl2, { params })
        .then((res) => {
          console.log(apiUrl, { params });
          console.log('API response:', res.data);
          this.employees = res.data;
        })
        .catch((error) => {
          console.error('Failed to fetch data:', error);
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
      goToProjectModify() {
      this.$router.push(`/project/${this.project.proId}/modify`);
    },
      editPeriod(row) {
        this.$set(row, 'isEditing', true);
        this.$set(row, 'editing', `${row.startDate.slice(0, 10)}~${row.endDate.slice(0, 10)}`);
        this.$nextTick(() => {
          const inputEl = this.$refs.periodInput.$refs.input;
          inputEl.focus();
        });
      },
      savePeriod(row) {
        this.$set(row, 'isEditing', false);
        // Extract the start and end dates from the edited value
        const [start, end] = row.editing.split('~');
        // Perform any necessary validation or formatting on the dates
        // ...
        // Update the row's start and end dates
        row.startDate = start;
        row.endDate = end;
      }, 
      editRole(row) {
        this.$set(row, 'isEditing', true);
        this.$set(row, 'editing', `${row.roleId.roleName}`);
        this.$nextTick(() => {
          const inputEl = this.$refs.roleInput.$refs.input;
          inputEl.focus();
        });
      },
      saveRole(row) {
        this.$set(row, 'isEditing', false);
        const role = row.editing;
        row.roleId.roleName = role;

       
        row.roleId.roleId = this.mapping[role];
      },
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
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },
    logSelectedData() {
      for (const row of this.selectedRows) {
        console.log('Selected Job:', row.job, row.startDate, row.endDate);
        console.log(row.empName, row.empId);

        const formData = new FormData();

        console.log(this.project.proId)
        console.log(row);

       
        console.log(row.job,this.mapping[row.job])

   

        formData.append("pro_id", this.project.proId);
        formData.append("emp_id", row.empId);
        formData.append("start_date", row.startDate);
        formData.append("end_date", row.endDate);
        formData.append("role_id",this.mapping[row.job]);
        formData.append("emp_name", row.empName);


        try {
          axios
            .post(`${HOST}/api/v1/proj/member/add`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("프로젝트 참여 직원 등록 성공!");
                console.log(res);
                window.location.reload();
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    
    },
    modifyRow() {
    for (const row of this.selectedRows) {
      console.log(row.employee.empId);
      console.log(row.startDate);
      console.log(row.endDate);
      console.log(this.project.proId)
      console.log(row.employee.empName)
      console.log(this.mapping[row.roleId.roleName]);
      console.log(this.project.proId)

      const formData = new FormData();
      
      console.log(row)

      formData.append("pro_id", this.project.proId);
      formData.append("emp_id", row.employee.empId);
      formData.append("start_date", row.startDate);
      formData.append("end_date", row.endDate);
      formData.append("role_id",  this.mapping[row.roleId.roleName]);
      formData.append("emp_name", row.employee.empName);

      console.log("=============")

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
          axios
            .patch(`${HOST}/api/v1/proj/member/update`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("프로젝트 참여 직원 업데이트 성공!");
                console.log(res);
                setTimeout(() => {
                window.location.href = window.location.href;
              }, 4000);
              }
            });
        } catch (error) {
          console.log(error);
        }
    }
    window.location.reload();
  }
    },
  computed:{
    averageValues(){
      console.log("안녕하세요")
      console.log(this.project.empEvaluationList);

      if (this.project.empEvaluationList.length === 0) {
        return 0
      }

      console.log("jhhjjjjj")
      console.log(this.project.empEvaluationList , this.project.empEvaluationList.length)

      for (let i =0; i<this.project.empEvaluationList.length; i++){
        for (let j = 0; j<this.project.empEvaluationList[i].evaluationList.length; j++){
          console.log(this.project.empEvaluationList[i].evaluationList[j].communicationRating);
          console.log(this.project.empEvaluationList[i].evaluationList[j].performanceRating);

          this.communicationRatingList.push(this.project.empEvaluationList[i].evaluationList[j].communicationRating);
          this.performanceRatingList.push(this.project.empEvaluationList[i].evaluationList[j].performanceRating);
        }
      }
      console.log("=======");
      console.log(this.communicationRatingList.length);
      console.log(this.performanceRatingList.length);

      if (this.communicationRatingList.length===0 && this.performanceRatingList.length===0 ){
        return {}
      }
      const commavg = this.communicationRatingList.reduce((acc, curr) => acc + curr) /  this.communicationRatingList.length;
      const peravg = this.performanceRatingList.reduce((acc, curr) => acc + curr) /  this.performanceRatingList.length;


      return {commavg, peravg}

    },
  //   averageValues() {
  //     console.log("=========")
  //     console.log(this.project.empEvaluationList);

  //       if  ( this.project.empEvaluationList === 0 ){
  //       return 0
  //     }
  //   console.log(this.project.empEvaluationList[0].evaluationList[0])

  //     for (let i = 0; i < this.project.empEvaluationList.length; i++) {
  //       const communication_rating = this.project.empEvaluationList[i].evaluationList.communicationRating;
  //       const performance_rating = this.project.empEvaluationList[i].evaluationList.performanceRating;

  //       this.communicationRatingList.push(communication_rating);
  //       this.performanceRatingList.push(performance_rating )
  //     }
   
  //   const commavg = this.communicationRatingList.reduce((acc, curr) => acc + curr) /  this.communicationRatingList.length;
  //   const peravg = this.performanceRatingList.reduce((acc, curr) => acc + curr) /this.performanceRatingList.length;
  //   console.log(commavg, peravg);

  //   if  ( this.project.empEvaluationList === 'NaN' ){
  //    return {}
  //   }
  //   return { commavg, peravg };
  // }
  pmName(){
    console.log(this.project.participantList);
    for (const participant of this.project.participantList) {
      if (participant.roleId.roleName == 'PM'){
        return participant.employee.empName

      }
    }
  }

  }
  }
;
</script>

<style scoped>

h10 {
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


.table{
  font-size: small;
}

.card-warpper{
  display: flex;
  position: absolute;
  padding-top: 30px;
  /* width: 100%; */
  /* height: 100%; */
  /* left: 200px; */
  /* top: 50px; */
  /* background-color: #ffffff;; */
  /* overflow: auto; 수직 스크롤 생성 */
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
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    position: relative;
} */

.button-container {
  display: flex;
  justify-content: flex-end;
  /* margin-bottom: auto; */ 
}

.card-warpper1{
  padding-left: 20px;
  padding-right: 20px;
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
  border: 0.5px solid #ccc;
  padding: 8px;
  font-size: 14px;
  color: #333;
}

.option:focus {
  outline: none;
  border-color: #aaa;
  box-shadow: 0 0 3px #aaa;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.mb-0 {
  color: black
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

.table-card{
  max-width: 800px;
  overflow-y: scroll;
}

.pro-button {
  margin-top: 10px;
  width: 120px;
  height: 30px;
  background-color: #394F85;
  /* background-color: #c1d9db; */
  /* #33508A; */
  color: white;
  font-size: 12px;
}

.table-responsive {
  max-height: 500px; 
  overflow-y: auto;
  color: black;
}

.table-responsive .el-table__row {
  height: 20px; /* Adjust the desired row height here */
}

.search-button{
  margin-left: 5px; 
  height: 35px; 
  width:100px;
}

</style>

