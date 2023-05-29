<template>
  <div>
    <b-card class="center-card" style="width: 1200px">
      <div>
        <hr style="border: solid 1px; color: #1D3876">  
        <!-- 검색창 -->
        <b-container class="bv-example-row" style="display: flexwidth: 1000px">
          <div>
            <b-row>
              <b-col class="col-7" style="display: flex; align-items: center;">
                <b-form-datepicker class="input_date" v-model="inputDate" placeholder="투입일자" style="width: 250px; height: 50px; margin-right: 5px;" @input="handleDateInput"></b-form-datepicker>
                ~
                <b-form-datepicker class="output_date" v-model="outputDate" placeholder="탈출일자" style="width: 250px; height: 50px; margin-right: 5px;"></b-form-datepicker>
              </b-col>

              <b-col class="col-2">
                <div>
                  <select v-model="role" style=" height: 50px;" @change="onChange($event)" class="form-select form-control">
                    <option value="">직무</option>
                    <option value="0">경영진</option>
                    <option value="1">PM</option>
                    <option value="2">PL</option>
                    <option value="3">분석가</option>
                    <option value="4">설계자</option>
                    <option value="5">프로그래머</option>
                    <option value="6">테스터</option>
                    <option value="7">디자이너</option>
                  </select>
                </div>
              </b-col>
            </b-row>
          
            <b-row style="margin-top: 15px;">
              <b-col class="col-5" style="display: flex; align-items: center;">            
                <b-form-input v-model="proName" placeholder="프로젝트명"></b-form-input>
              </b-col>

              <b-col class="col-2.5" style="display: flex; align-items: center;">
                <b-form-input v-model="skill" placeholder="스킬"></b-form-input>
              </b-col>

              <b-col class="col-5" style="display: flex; align-items: center;" >
                <b-checkbox style="margin-right: 10px;" v-model="absentee">프로젝트에 참여하지 않는 사람만</b-checkbox>
              </b-col>
            </b-row>
          </div>

          <!-- <div>
          </div> -->
        </b-container>
        <hr style="color: #1D3876;"/>
      </div>
  
      <div style="display: flex; justify-content: flex-end;">
        <button @click="sendData()" class="login100-form-btn pro-button addButton" style="width: 200px" type="button">검색</button>
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
            <el-table v-if="this.employees.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="this.employees">
                <el-table-column label="사번" prop="emp_id" min-width="100px" ></el-table-column>
    
                <el-table-column label="이름" prop="emp_name" min-width="80px"></el-table-column>
    
                <el-table-column label="주민등록번호" prop="emp_ssn" min-width="140px"></el-table-column>
    
                <el-table-column label="이메일" prop="emp_email" min-width="200px"></el-table-column>
    
                <el-table-column label="학력" prop="emp_edu" min-width="50px"></el-table-column>

                <el-table-column label="경력" prop="emp_workex" min-width="50px"></el-table-column>

                <el-table-column label="스킬" prop="skill_name" min-width="100px">
                  <template v-slot="{row}">
                    <span class="font-weight-600 name mb-0 text-sm" style="color: #939CAC">{{ row.skill_name }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="프로젝트" prop="pro_id" min-width="150px">
                  <template v-slot="{row}">
                    <span class="font-weight-600 name mb-0 text-sm" style="color: #939CAC">{{ row.pro_id }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="직무" prop="role" min-width="80px"></el-table-column>

                <el-table-column label="평점" prop="rating" min-width="50px"></el-table-column>
                
                <el-table-column label="권한 지정" prop="auth" min-width="100px">
                  <template slot-scope="scope">
                    <div class="avatar-group">
                        <button @click="navigateToAccess(scope.row.emp_id, scope.row.emp_name)" style="cursor: pointer">권한</button>
                    </div>
                  </template>
                </el-table-column>
            </el-table>
  
            <div v-else style="padding-top: 20px;">
              해당 프로젝트가 없습니다.
            </div>
          
            <!-- <span v-if="this.cntflag" class="font-weight-600 name mb-0 text-sm text-right"  style="color: #939CAC">
              총 직원 수: {{ this.cnt }}명
            </span> -->
          </b-card>
        </div>
      </div>
    </b-card>
  </div>
</template>
  
<script>
  import { Pagination, Table, TableColumn } from 'element-ui';
  import Header from './Header.vue';
  import Nav from './Nav.vue'
  import axios from "axios";

  export default {
    name: 'EmployeeTable',
    components: {
      Nav,
      Header,
      [Pagination.name]: Pagination,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        inputDate: '',
        outputDate: '',
        role: '',
        proName: '',
        skill: '',
        absentee: '',
        employees: [],
        isLoading: true,
        searchProjValue: '',
        searchSkillValue: '',
        // cnt: 0,
        // cntflag: false,
        // currentPage: 1,
        // pageSize: 10
      }
    },
    computed: {
      // pagedEmployees() {
      //   const startIndex = (this.currentPage - 1) * this.pageSize;
      //   const endIndex = startIndex + this.pageSize;
      //   return this.employees.slice(startIndex, endIndex);
      // },
      // slicedStartDate() {
      //   if (this.employee.startDate && this.employee.endDate) {
      //     const startyear = this.employee.startDate.slice(2, 4);
      //     const startmonth = this.employee.startDate.slice(5, 7);
      //     const startday = this.employee.startDate.slice(8, 10);

      //     const endyear = this.employee.startDate.slice(2, 4);
      //     const endmonth = this.employee.startDate.slice(5, 7);
      //     const endday = this.employee.startDate.slice(8, 10);
      //     return `${startyear}-${startmonth}-${startday} ~ ${endyear}-${endmonth}-${endday}`
      //   }
      //   return '';
      // },
    },
    methods: {
      // handlePageChange(page) {
      //   this.currentPage = page;
      // },
      sendData() {
        this.isLoading = true;
        const apiUrl = '/api/v1/user/list';

        const params = {
          period_start: this.inputDate,
          period_end: this.outputDate,
          role: this.role,
          pro_name: this.proName, // 프로젝트 이름으로 가져와야 함
          skill_name: this.skill,
          is_work: this.absentee,
          // page: 0,
          // size: 30,
          sort: "emp_id,desc",
        };

        axios.get(apiUrl, { params }).then((res) => {
          console.log(apiUrl, { params });
          console.log('API response:', res.data);
          this.employees = res.data;
          this.isLoading = false;
        }).catch((error) => {
            console.log('Failed to fetch data:', error);
        });
      },
      navigateToAccess(id, name) {
        this.$router.push(`/access/${id}`);
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
    },
    mounted() {
      const apiUrl = '/api/v1/user/list';

      let formData = new FormData();
      formData.append("period_start", "");
      formData.append("period_end", "");
      formData.append("role", "");
      formData.append("pro_id", "");
      formData.append("skill_name", "");
      formData.append("is_work", 0);

      axios.post(apiUrl, formData).then((res) => {
        console.log('API response:', res.data);
        this.employees = res.data;
        this.isLoading = false;
      }).catch ((error) => {
        console.error('Invalid API URL:', apiUrl);
        console.error(error);
      });
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
