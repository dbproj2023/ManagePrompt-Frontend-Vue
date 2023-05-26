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
              <select v-model="selectedStatus"  @change="onChange($event)" class="form-select form-control">
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
              <select v-model="selectedStatus"  @change="onChange($event)" class="form-select form-control">
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
            <b-form-input type="number" v-model="budge_start" placeholder="최소 예산" style="width: 250px; margin-right: 5px;"/>
            ~
            <b-form-input type="number" v-model="budge_end" placeholder="최대 예산" style="width: 250px;  margin-left: 5px; margin-right:5px" />
            원
          </b-col>

        </b-row>
        </div>
        <div>

        </div>

        <!-- <div>
          <button @click="goToProjectInput" class="login100-form-btn pro-button addButton" type="button">프로젝트 추가</button>

          <b-button @click="sendData" style="height: 100px; width: 100px"> 검색 </b-button>
        </div> -->
      </b-container>
      <hr style="color: #1D3876;"/>
    </div>

    <div style="display: flex; justify-content: flex-end;">
      <button @click="sendData" class="login100-form-btn pro-button addButton" style="width: 200px" type="button">검색</button>
      <button @click="goToProjectInput" class="login100-form-btn pro-button addButton" style="width: 200px" type="button">프로젝트 추가</button>
    </div>
   
    
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
      <el-table v-if="projects.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="pagedProjects">
            <el-table-column label="프로젝트 이름" prop="proName" min-width="100px" >
            </el-table-column>

            <el-table-column label="참여기간" min-width="150px" prop="name">
             <template v-slot="{row}">
               <span class="font-weight-600 name mb-0 text-sm ">{{row.startDate.slice(0,10)}} ~ {{row.endDate.slice(0,10)}}</span>
              </template>
            </el-table-column>

            <el-table-column label="예산" prop="budget" min-width="140px"></el-table-column>

            <el-table-column label="발주처명" prop="clientName" min-width="140px"></el-table-column>



            <!-- <el-table-column label="Status" min-width="200px" prop="status">
              <template v-slot="{ row }">          
                <badge class="badge-dot mr-4" type="">
                  <i :class="`bg-${projectStatus(row)[1]}`"></i>
                  <span class="status" :class="`text-${projectStatus(row)[1]}`"></span>
                </badge>
              </template>
            </el-table-column> -->

            <!-- <el-table-column label="Status" min-width="100px" prop="status"></el-table-column> -->

            <el-table-column min-width="50px">
              <template slot-scope="scope">
                <div class="avatar-group">
                  <img
                    alt="Image placeholder"
                    height="30px"
                    src="../assets/img/more.png"
                    @click="navigateToDetail(scope.row.proId)"
                    style="cursor: pointer"
                  >
                </div>
              </template>
            </el-table-column>

            <el-pagination v-if="projects.length > 0"
            class="pagination"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="projects.length"
            @current-change="handlePageChange"
          ></el-pagination>
        </el-table>

        <div v-else style="padding-top: 20px;">
              해당 프로젝트가 없습니다.
        </div>

        
    </b-card>
  </div>
</b-card>

  </div>

  
</template>

<script>
//  import projects from 'projects'
// import RangeDatePicker from 'vue-easy-range-date-picker'; 
import { Pagination, Table, TableColumn } from 'element-ui';


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
        currentPage: 1,
        pageSize: 10,
        proName: '',
        selectedStatus: '',
        clientName: '',
        startDate: '',
        endDate: '',
        budge_start: '',
        budge_end: '',
        // responsePosts: [],
        projects: [],
        isLoading: true
        }
    },
  computed: {
    pagedProjects() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.projects.slice(startIndex, endIndex);
    },
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
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    goToProjectInput() {
      this.$router.push('/projectInput');
    },
      sendData() {
        console.log("dajflak")
        this.isLoading = true;
        const apiUrl = `${HOST}/api/v1/proj/lists/search`;
        console.log("나 여기")

        // console.log(this.clientName)
        // console.log(this.startDate)
        // console.log(this.budge_start)

        const params = {
        period_start: this.startDate,
        period_end: this.endDate,
        pro_name: this.proName,
        client_name: this.clientName,
        budge_start: this.budge_start,
        budge_end: this.budge_end,
        page: 0,
        size: 30,
        sort: "emp_id,desc",
      };
      
      axios.get(apiUrl, {params})
        .then((res) => {
          console.log(apiUrl, { params })
          console.log('API response:', res.data);
          this.projects = res.data;
          this.isLoading = false
        })
        .catch((error) => {
          console.error('Failed to fetch data:', error);
        });
    },
    navigateToDetail(id) {
      console.log("나 여깄어")
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
    projectStatus(row) {
      const currentDate = new Date();
      const startDate = new Date(row.startDate.slice(0,10));
      const endDate = new Date(row.endDate.slice(0,10));

      if (currentDate < startDate) {
        return ["예정",'danger'];
      } else if (currentDate > endDate) {
        return ["완료","success"];
      } else if (currentDate = endDate){
        return ["취소", 'secondary']
      } else {
        return ["진행중",'warning'];
      }
  },
},
  mounted() {
  const apiUrl = '/api/v1/proj/lists';
  console.log("여기  !!!!!")
  try {
    // const url = new URL(apiUrl);
    // console.log('URL:', url);
    axios.get(apiUrl).then((res) => {
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
