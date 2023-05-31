<template>
  <div>
    <b-card class="center-card" style="width: 1200px">
    <div>
      <hr style="border: solid 1px; color: #1D3876">  
      <!-- 검색창 -->
      <b-container class="bv-example-row" style="display: flexwidth: 1000px">
        <div>
        <b-row>
          <b-col class="col-3.5">
            <div>
              <select v-model="selectedStatus" style=" height: 50px;"  @change="onChange($event)" class="form-select form-control">
              <option value="">상태</option>
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
              <option value="예정">예정</option>
              <option value="취소">취소</option>
              </select>
            </div>
          </b-col>

          <b-col class="col-3.5">
            <div>
              <select v-model="selectedYear" style=" height: 50px;" @change="onChange($event)" class="form-select form-control">
              <option value="">년도</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
            </div>
          </b-col>
          
          <b-col class="col-7" style="display: flex; align-items: center;" >
           <b-form-datepicker class="input-data" v-model="startDate" placeholder="시작일시" style="width:250px; height: 50px; margin-right: 5px;"  @input="handleDateInput"></b-form-datepicker>
            ~ 
            <b-form-datepicker class="input-data" v-model="endDate" placeholder="종료일시" style="width:250px;  height: 50px; margin-left: 5px;"></b-form-datepicker>
          </b-col>
        
        
         
        </b-row>

        <b-row style="margin-top: 15px;">
          
          <b-col class="col-3.5" style="display: flex; align-items: center;">            
            <b-form-input v-model="proName" placeholder="프로젝트명"></b-form-input>
          </b-col>
          <b-col class="col-3.5" style="display: flex; align-items: center;">
            <b-form-input v-model="clientName" placeholder="발주처명">
            </b-form-input>
          </b-col>
          <b-col class="col-7" style="display: flex; align-items: center;" >
            <b-form-input type="number" v-model="budget_start" placeholder="최소 예산" style="width: 250px; margin-right: 5px;"/>
            ~
            <b-form-input type="number" v-model="budget_end" placeholder="최대 예산" style="width: 250px;  margin-left: 5px; margin-right:5px" />
            원
          </b-col>

        </b-row>
        </div>
        <div>

        </div>
      </b-container>
      <hr style="color: #1D3876;"/>
    </div>

    <div style="display: flex; justify-content: flex-end;">
      <button @click="sendData" class="login100-form-btn pro-button addButton" style="width: 200px" type="button">검색</button>
      <button @click="goToProjectInput" class="login100-form-btn pro-button addButton" style="width: 200px" type="button">프로젝트 추가</button>
    </div>
    
    <div>
    <div class="spinner-div" v-if="isLoading">
      <b-card class="ProjectTableCard" style="min-height: 450px;">
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
          <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
        </div>
      </b-card>
    </div>


    <div v-else style="padding-top: 20px;">
    <!-- 프로젝트 테이블 -->   
    <b-card class="ProjectTableCard">
      <el-table v-if="projects.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="this.projects">
            <el-table-column label="프로젝트 이름" prop="pro_name" min-width="200px" >
            </el-table-column>

            <el-table-column label="기간" min-width="200px" prop="name">
             <template v-slot="{row}">
               <span class="font-weight-600 name mb-0 text-sm "  style="color: #939CAC">{{row.start_date | moment('YYYY-MM-DD')}} ~ {{row.end_date | moment('YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="예산" prop="budget" min-width="120px"></el-table-column>

            <el-table-column label="발주처명" prop="client_name" min-width="180px"></el-table-column>
            <el-table-column label="진행상태" min-width="200px" prop="status">
              <template v-slot="{ row, $index }">          
                <badge class="badge-dot mr-4">
                  <i :class="`bg-${projectStatus(row.start_date, row.end_date, $index)[1]}`"></i>
                  <span class="font-weight-600 name mb-0 text-sm" style="color: #939CAC" prop="status">{{projectStatus(row.start_date, row.end_date, $index )[0]}} </span>
                </badge>
              </template>
            </el-table-column>


            <el-table-column min-width="50px">
              <template slot-scope="scope">
                <div class="avatar-group">
                  <img
                    alt="Image placeholder"
                    height="30px"
                    src="../assets/img/more.png"
                    @click="navigateToDetail(scope.row.pro_id)"
                    style="cursor: pointer"
                  >
                </div>
              </template>
            </el-table-column>
        </el-table>

        <div v-else style="padding-top: 20px;">
              해당 프로젝트가 없습니다.
        </div>
        <span v-if="this.cntflag" class="font-weight-600 name mb-0 text-sm text-right"  style="color: #939CAC">
          총 프로젝트 수: {{ this.cnt }}개 / 발주금액: {{ this.total_budget }}원
        </span>
      </b-card>
    </div>
  </div>
</b-card>
</div>
</template>

<script>; 
import { Pagination, Table, TableColumn } from 'element-ui';
import moment from 'moment';


import axios from "axios"; // http 통신을 위한 라이브러리
const HOST =  "http://localhost:8080";


 export default {
  name: 'ProjectTable',
      components: {
        [Pagination.name]: Pagination,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    data() {
      return {
        proName: '',
        selectedStatus: '',
        selectedYear: '',
        clientName: '',
        startDate: '', endDate: '',
        budget_start: '',
        budget_end: '',
        projects: [],
        isLoading: true,
        cnt: 0, total_budget: 0 , 
        cntflag: false,
        }
    },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    goToProjectInput() {
      this.$router.push('/project/input');
    },
    sendData() {
      this.isLoading = true;
      const apiUrl = `${HOST}/api/v1/proj/lists/search`;
      console.log('프로젝트 검색', this.isLoading);

      const params = {
        period_start: this.startDate.toString(),
        period_end: this.endDate.toString(),
        pro_name: this.proName,
        client_name: this.clientName,
        budge_start: this.budget_start,
        budge_end: this.budget_end,
        page: 0,
        size: 30,
        sort: "emp_id,desc",
    };
    
      axios.get(apiUrl, {params})
        .then((res) => {
          console.log(apiUrl, { params })
          console.log('API response:', res.data);

        
          this.projects = res.data;

          for (let i = 0; i < this.projects.length; i++) {
            const project = this.projects[i];
            const startDate = project.start_date;
            const endDate = project.end_date;

            const [status, color] = this.projectStatus(startDate, endDate, i);
            this.projects.state = status;           
              }

          this.isLoading = false
          if (res.status===200){
            // 년도 검색
            if (this.selectedYear !== '') {
              this.projects = this.projects.filter(project => {
                const projectYear = project.start_date.slice(0,4);
                this.cntflag = true;
                return projectYear === this.selectedYear;
              });
            }
            if (this.selectedStatus !== '') {
              this.projects = this.projects.filter(project => {
                console.log(project);
                const projectState = project.state;
                console.log(projectState, "adkfjalkdfjkalfjkl");
                return projectState === this.selectedStatus;
              });
              }


            const apiUrl2 = `${HOST}/api/v1/proj/lists/search/summary`;
            const params2 = {year: parseInt(this.selectedYear)};
            axios.get(apiUrl2, {params: params2})
            .then((res) => {
              console.log(apiUrl2, { params: params2 })
              console.log('API response:', res.data);
              this.cnt = res.data.cnt;
              this.total_budget = res.data.total_budget;
            })
            .catch((error) => {
              console.error('Failed to fetch data:', error);
            }
            
            );

         }
        console.log("=========");
        console.log(this.projects);
        console.log("=========");
        this.isLoading = false;

      //    var obj = {
      //         number : i+1,
      //         pro_id: res.data.projectList[i].proId,
      //         progress_year : res.data.projectList[i].startDate.charAt(0) + res.data.projectList[i].startDate.charAt(1) + res.data.projectList[i].startDate.charAt(2) + res.data.projectList[i].startDate.charAt(3),
      //         participation_period : res.data.projectList[i].startDate.slice(0,10)+'-'+res.data.projectList[i].endDate.slice(0,10),
      //         pro_name : res.data.projectList[i].proName,
      //         role : res.data.projectList[i].roleName,
      //         progress_state: this.state
      //     };
                                  
      //     this.project_list.push( obj );
      // }
      
        //  상태 검색 수정 안됨 ㄱ- 하
        // if (this.selectedStatus != ''){
        //   this.projects = this.projects.filter(project => {
        //     console.log()
        //     console.log(this.projects.status, this.selectedStatus);
        //     return this.projects.status === this.selectedStatus;
        //   });
        // }
        // })
        // .catch((error) => {
        //   console.error('Failed to fetch data:', error);
        //  });
    })
    },
    navigateToDetail(id) {
      this.$router.push(`/project/detail/${id}`);
    },
    onChange(e) {
      this.searchType = e.target.value;
      console.log(this.searchType)
      this.searchProject = ''; // Reset search value when search type changes
    },
    handleDateInput(newValue) {
      if (newValue === this.value) {
        // Same date is selected, reset the value
        this.value = null;
      }
    },
    projectStatus(rowstartDate, rowendDate, index) {
      const currentDate = moment().format('YYYY-MM-DD');
      const startDate = moment(rowstartDate).format('YYYY-MM-DD');
      const endDate = moment(rowendDate).format('YYYY-MM-DD');

      if (startDate === endDate){
        this.projects[index].state = '취소';
        return ["취소", 'secondary']
      } else if (currentDate < startDate) {
        this.projects[index].state = '예정';
        return ["예정",'danger'];
      } else if (currentDate > endDate) {
        this.projects[index].state = '완료'; 
        return ["완료","success"];
      }  else {
        this.projects[index].state = '진행중';
        return ["진행중",'warning'];
      }


  },
},
  mounted() {
  const apiUrl = '/api/v1/proj/lists';
  try {
    // const url = new URL(apiUrl);
    // console.log('URL:', url);
    axios.get(apiUrl).then((res) => {
      console.log("=======");
      console.log('API response:', res.data);
      this.projects = res.data;
      this.isLoading = false
    });
  } catch (error) {
    console.error('Invalid API URL:', apiUrl);
    console.error(error);
  }
}

}
</script>
<style>
.wrapper {
  background-color: #E3F5F5;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.small-input {
  width: 100px;
}

.option .form-control {
  height: 27.9px;
  padding: 4px;
}

.option .form-control:focus {
  box-shadow: none;
  border-color: #aaa;
}

.ProjectTableCard {
  border: none !important;
  border-radius: 10px;
}

.custom-header th {
  color: #1D3876;
  background-color: #F4F8F8 !important;
}

.addButton {
  color: #1D3876;
  background-color: #F4F8F8 !important;
}

.center-card {
  overflow: hidden;
  width: 1200px;
  height: auto;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  background-color: rgb(237, 240, 242);
  position: relative;
}



.ProjectTableCard {
  border: none !important;
  border-radius: 10px;
}


</style>
