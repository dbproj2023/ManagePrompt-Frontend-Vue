<template>
  <div>
    <div>
      <hr style="border: solid 1px">  
      <!-- 검색창 -->
      <b-container class="bv-example-row">
        <b-row>
          <b-col  class="col-2" style="display: flex; align-items: center;" >
            <div style="margin-right: 10px;">
              년도
            </div>
            <div>
              <select v-model="selectedYear" name="cards_id" @change="onChange($event)" class="form-select form-control" style="width: 130px;">
                <option value="">년도</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </b-col>
          <b-col class="col-2" style="display: flex; align-items: center;" >
            <div>
              일정
            </div>
            <div>
              <!-- <RangeDatePicker v-model="dates"/> -->
            </div>
          </b-col>
          <b-col class="col-2" style="display: flex; align-items: center;" >
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
          <b-col class="col-6.8" style="display: flex; align-items: center;">
            <div style="margin-right: 10px;">
              검색어
            </div>
            <div style="margin-right: 10px;">
              <select name="cards_id" @change="onChange($event)" class="form-select form-control">
                <option value="">프로젝트명/발주처명</option>
                <!-- <option value="전체">전체</option> -->
                <option value="프로젝트명">프로젝트명</option>
                <option value="발주처명">발주처명</option>
              </select>
            </div>
            <div>  
              <b-form-input v-model="searchProject" placeholder="Enter your name" style="width: 300px ;"></b-form-input>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <hr/>
    </div>
    
    

  
    <!-- 프로젝트 테이블 -->   
    <b-card class="ProjectTableCard">
        <el-table v-if="this.projects.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="this.projects" >
            <!-- <el-table-column label="Project Id" min-width="100px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm ">{{row.proId}}</span>
                </template>
            </el-table-column> -->

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


            <el-table-column label="Status" min-width="200px" prop="status">
              <template v-slot="{ row }">          
                <badge class="badge-dot mr-4" type="">
                  <i :class="`bg-${projectStatus(row)[1]}`"></i>
                  <span class="status" :class="`text-${projectStatus(row)[1]}`">{{ projectStatus(row)[0] }}</span>
                </badge>
              </template>
            </el-table-column>
       
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
        searchProject: '',
        selectedStatus: '',
        filteredSearchType: '',
        selectedYear: '',
        responsePosts: [],
        projects: []
        }
    },
computed: {
  // filteredProjects() {
  //   if (this.searchProject) {
  //     const searchProjectLowercase = this.searchProject.toLowerCase();
  //     return this.projects.filter(project => {
  //       if (this.searchType === '프로젝트명') {
  //         console.log(project)
  //         return project.title.includes(searchProjectLowercase);
  //       } else if (this.searchType === '발주처명') {
  //         return project.PM.includes(searchProjectLowercase);
  //       } 
  //       else{
  //         return true; 
  //       }
  //     }
  //     );
  //   }  if (this.selectedStatus) {
  //     return this.projects.filter(project => {
  //       if (this.searchType != ''){
  //       return project.status === this.selectedStatus
  //     }
  //   });
  // } if (this.selectedYear) {
  //     return this.projects.filter(project => {
  //       if (this.searchType != ''){
  //         console.log( parseInt(project.기간.slice(0,4)))
  //       return project.기간.slice(0,4) === this.selectedYear
  //     }
  //   });}

  //   return this.projects;

  // },

},
  methods: {
    navigateToDetail(id) {
      this.$router.push(`/Project/detail/${id}`);
    },
    onChange(e) {
      this.searchType = e.target.value;
      console.log(this.searchType)
      this.searchProject = ''; // Reset search value when search type changes
    },
    projectStatus(row) {
      const currentDate = new Date();
      const startDate = new Date(row.startDate.slice(0,10));
      const endDate = new Date(row.endDate.slice(0,10));

      if (currentDate < startDate) {
        return ["예정",'danger'];
      } else if (currentDate > endDate) {
        return ["완료","success"];
      } else {
        return ["진행중",'warning'];
      }
  },
},
  mounted() {
  const apiUrl = `${HOST}/api/v1/proj/lists`;
  console.log("여기  !!!!!")
  try {
    const url = new URL(apiUrl);
    console.log('URL:', url);
    axios.get(apiUrl).then((res) => {
      console.log('API response:', res.data);
      this.projects = res.data;
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
  height: 28px;
  padding: 4px;
}

.option .form-control:focus {
  /* Add your styles here */
  /* Example styles */
  box-shadow: none;
  border-color: #aaa;
}


</style>
