<template>
  <div>
    <div>
      <hr style="border: solid 1px">  
      <!-- 검색창 -->
      <b-container class="bv-example-row" style="display: flex">
        <div>
        <b-row style="width:1050px">
          <b-col class="col-6.3" style="display: flex; align-items: center;">
          <div style="margin-right: 10px;">일정</div>
          <b-form-datepicker class="input-data" v-model="startDate" placeholder="시작일시" style="width:250px; margin-right: 5px;"  @input="handleDateInput"></b-form-datepicker>
            ~ 
          <b-form-datepicker class="input-data" v-model="endDate" placeholder="종료일시" style="width:250px; margin-left: 5px;"></b-form-datepicker>
        </b-col>
        
          <b-col class="col-5" style="display: flex; align-items: center;" >
            <div class="search-type" style="margin-right: 10px;">
              발주금액
            </div>
              <b-form-input type="number" v-model="budge_start" placeholder="최소 예산" style="width: 150px; margin-right: 5px;"/>
              ~
              <b-form-input type="number" v-model="budge_end" placeholder="최대 예산" style="width: 150px;  margin-left: 5px; margin-right:5px" />
              원
          </b-col>
        </b-row>

        <b-row style="margin-top: 15px; width:1050px;" >
          <b-col class="col-7.5" style="display: flex; align-items: center;">
            <div style="margin-right: 10px;">
              프로젝트 명
            </div>
            <div>  
              <b-form-input v-model="proName" placeholder="Enter your name" style="width: 230px ;"></b-form-input>
            </div>
          </b-col>
          <b-col class="col-7.5" style="display: flex; align-items: center;">
            <div style="margin-right: 10px;">
              발주처 명 
            </div>
            <!-- <div style="margin-right: 10px;">
              <select name="cards_id" @change="onChange($event)" class="form-select form-control">
                <option value="">프로젝트명/발주처명</option>
                <option value="프로젝트명">프로젝트명</option>
                <option value="발주처명">발주처명</option>
              </select>
            </div> -->
            <div>  
              <b-form-input v-model="clientName" placeholder="Enter your name" style="width: 230px ;"></b-form-input>
            </div>
          </b-col>
          <b-col  class="col-1.5" style="display: flex; align-items: center;" >
            <div class="search-type" style="margin-right: 10px;">
              상태
            </div>
            <div>
              <select v-model="selectedStatus"  @change="onChange($event)" class="form-select form-control" style="width: 130px;">
              <option value="">상태</option>
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
              <option value="예정">예정</option>
              <option value="취소">취소</option>
            </select>
            </div>
          </b-col>
        </b-row>
        </div>
        <div>
          <b-button @click="sendData" style="height: 100px; width: 100px"> 검색 </b-button>
        </div>
      </b-container>
      <hr/>
    </div>
    
    
    <div class="spinner-div" v-if="isLoading">
      로딩중 !

    </div>

    <div v-else style="padding-top: 20px;">
    <!-- 프로젝트 테이블 -->   
    <b-card class="ProjectTableCard">
      <el-table v-if="projects.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="projects">
            <el-table-column label="프로젝트 이름"
                             prop="proName"
                             min-width="100px">
            </el-table-column>

            <el-table-column label="참여기간" min-width="150px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm ">{{row.startDate.slice(0,10)}} ~ {{row.endDate.slice(0,10)}}</span>
                </template>
            </el-table-column>


            <el-table-column label="예산"
                             prop="budget"
                             min-width="140px">
            </el-table-column>


            <el-table-column label="발주처명"
                             prop="clientName"
                             min-width="140px">
            </el-table-column>

<!-- 
            <el-table-column label="Status" min-width="200px" prop="status">
              <template v-slot="{ row }">          
                <badge class="badge-dot mr-4" type="">
                  <i :class="`bg-${projectStatus(row)[1]}`"></i>
                  <span class="status" :class="`text-${projectStatus(row)[1]}`">0</span>
                </badge>
              </template>
            </el-table-column> -->
       
            <el-table-column min-width="50px">
              <template slot-scope="scope">
                <div class="avatar-group">
                  <img
                    alt="Image placeholder"
                    height="30px"
                    src="./img/theme/more.png"
                    @click="navigateToDetail(scope.row.proId)"
                    style="cursor: pointer"
                  >
                </div>
              </template>
            </el-table-column>
        </el-table>

        <div v-else style="padding-top: 20px;">
              해당 프로젝트가 없습니다.
        </div>
    </b-card>
  </div>
  </div>

  
</template>

<script>
//  import projects from 'projects'
// import RangeDatePicker from 'vue-easy-range-date-picker'; 
 import { Table, TableColumn} from 'element-ui'

import axios from "axios"; // http 통신을 위한 라이브러리
const HOST =  "http://localhost:8080";


 export default {
  name: 'ProjectTable',
      components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
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
  },
  methods: {
      sendData() {
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
      this.$router.push(`/Project/detail/${id}`);
    },
    onChange(e) {
      this.searchType = e.target.value;
      console.log(this.searchType)
      this.searchProject = ''; // Reset search value when search type changes
    },
  //   projectStatus(row) {
  //     const currentDate = new Date();
  //     const startDate = new Date(row.startDate.slice(0,10));
  //     const endDate = new Date(row.endDate.slice(0,10));

  //     if (currentDate < startDate) {
  //       return ["예정",'danger'];
  //     } else if (currentDate > endDate) {
  //       return ["완료","success"];
  //     } else if (currentDate = endDate){
  //       return ["취소", 'secondary']
  //     } else {
  //       return ["진행중",'warning'];
  //     }
  // },
},
  mounted() {
  const apiUrl = `${HOST}/api/v1/proj/lists`;
  try {
    const url = new URL(apiUrl);
    console.log('URL:', url);
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

.small-input{
  width: 100px;
}

.option .form-control {
  /* Add your styles here */
  /* Example styles */
  height: 27.9px;
  padding: 4px;
}

.option .form-control:focus {
  /* Add your styles here */
  /* Example styles */
  box-shadow: none;
  border-color: #aaa;
}

.ProjectTableCard {
  max-height: 700px; /* Set the maximum height of the table container */
  overflow-y: auto;
}



b-form-datepicker {
  width: 150px;
}
</style>