<template>
  <div class="wrapper">
    <div class="card-warpper">
      <div class="card-warpper1"> 
        <div>
          <!-- 1-1번 card -->
          <b-card class="table-card" title="프로젝트 참여 직원" style="width: 560px; height: 340px;">
            <!-- <b-table :items="tableData" :fields="tableFields"></b-table>
            <a href="#" class="card-link">Card link</a>
            <b-link href="#" class="card-link">Another link</b-link>
            <div class="button-container">
              <b-button size="sm">Small Button1</b-button>
              <b-button size="sm" style="margin-left: 10px;">Small Button2</b-button>
            </div> -->

          </b-card>
        </div>
        <!-- 1-2번 card -->
        <div style="margin-top: 20px;">
          <b-card class="table-card" title="프로젝트 참여 직원" style="width: 560px; height: 340px; overflow: auto;">
            <el-table class="table-responsive table text-center" header-row-class-name="thead-light"  :data="projects" >
            <el-table-column type="selection" width="60"></el-table-column>

            <el-table-column label="사번" min-width="100px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm ">{{row.PM}}</span>
                </template>
            </el-table-column>

            <el-table-column label="이름"
                             prop="PM"
                             min-width="100px">
            </el-table-column>

            <el-table-column label="직무"
                             prop="PM"
                             min-width="100px">
            </el-table-column>

            <el-table-column label="참여기간"
                             prop="기간"
                             min-width="200px">
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
        <b-card class="table-card" title="직원 정보 조회" style="width: 560px; height: 700px;">
          <div class="employee-search-bar" style="display:flex; align-items: center;">
            <div style="margin-right: 10px;">
              <select name="cards_id" @change="onChange($event)" class="form-select form-control">
                <option value="">선택하세요</option>
                <option value="all">전체</option>
                <option value="PM">PM</option>
                <option value="id">사번</option>
                <option value="skill">스킬</option>
              </select>
              <!-- <b-form-select class="option mt-3" v-model="selected" :options="options" size="sm"></b-form-select> -->
            </div>
            <div class="col-9">  
              <!-- <input type="text" v-model="searchValue"> -->
              <b-form-input v-model="searchValue" placeholder="Enter your name"></b-form-input>
            </div>
          </div>
          <div>
            <el-table  v-if="filteredProjects.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="filteredProjects" >
              <el-table-column type="selection" width="60"></el-table-column>
            
              <el-table-column label="사번" min-width="90px" prop="name">
                <template v-slot="{row}">
                  <span class="font-weight-600 name mb-0 text-sm ">{{row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column label="이름"
                             prop="PM"
                             min-width="100px">
            </el-table-column>

            <el-table-column label="스킬"
                             prop="statusType"
                             min-width="100px">
            </el-table-column>

            <el-table-column label="참여기간"
                             prop="기간"
                             min-width="200px">
            </el-table-column>
            </el-table>

            <div v-else style="padding-top: 20px;">
              해당 직원이 없습니다.
            </div>

            </div>

            <div class="button-container">
              <b-button v-b-modal.modal-2>추가</b-button>

              <b-modal id="modal-2" title="프로젝트 직원 관리">
                <p class="my-4">해당 직원을 프로젝트에 추가하시겠습니까?</p>
              </b-modal>
            </div>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import { BCard } from 'bootstrap-vue'
import project_info from './project_info.vue'
import { Table, TableColumn} from 'element-ui'


export default {
  name: "Project_detail",
  components: {
    BCard,
    project_info,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn

  },
  data() {
    return {
  }
  },
  methods: {
    onChange(e) {
      this.searchType = e.target.value;
      console.log(this.searchType)
      this.searchValue = ''; // Reset search value when search type changes
    }}
    ,
    computed: {
  filteredProjects() {
    if (this.searchValue) {
      const searchValueLowercase = this.searchValue.toLowerCase();
      return this.projects.filter(project => {
        if (this.searchType === 'PM') {
          return project.PM.includes(searchValueLowercase);
        } else if (this.searchType === 'id') {
          const searchValue = parseInt(this.searchValue);
          return project.id === searchValue;
        } else if (this.searchType === 'skill') {
          return project.statusType.includes(searchValueLowercase);
        } else if (this.searchType === 'all') {
          for (const key in project) {
            if (key === 'id' || key === 'skill') {
              return project.statusType.includes(searchValueLowercase) || project.PM.includes(searchValueLowercase); 
            } else if  (key === 'id') {
              return project.id ===  parseInt(this.searchValue);
            }
          }
          return false;
        } else{
          return true; 
        }
      });
    }
    return this.projects;
  }
}
};
</script>



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
  left: 280px;
  top: 50px;
  padding: 30px;
  background-color: #ffffff;
  /* overflow: auto; 수직 스크롤 생성 */
}

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

</style>
