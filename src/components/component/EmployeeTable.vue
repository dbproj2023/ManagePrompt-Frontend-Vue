<template>
  <div>
    <b-card class="center-card" style="width: 1200px">
      <div>
        <hr style="border: solid 1px; color: #1D3876">  
        <!-- 검색창 -->
        <b-container class="bv-example-row" style="display: flex; width: 1000px">
          <div>
            <b-row>
              <b-col class="col-7" style="display: flex; align-items: center;">
                <b-form-datepicker class="input_date" v-model="inputDate" placeholder="투입일자" style="width: 250px; height: 50px; margin-right: 5px;" @input="handleDateInput"></b-form-datepicker>
                ~
                <b-form-datepicker class="output_date" v-model="outputDate" placeholder="탈출일자" style="width: 250px; height: 50px; margin-right: 5px;"></b-form-datepicker>
              </b-col>

              <b-col class="col-3">
                <!-- <div> -->
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
                <!-- </div> -->
              </b-col>
            </b-row>
          
            <b-row style="margin-top: 15px;">
              <!-- <b-col class="col-5" style="display: flex; align-items: center;">            
                <b-form-input v-model="proName" placeholder="프로젝트명"></b-form-input>
              </b-col> -->

              <b-col class="col-6" style="display: flex; align-items: center;">
                <b-form-input v-model="skill" placeholder="스킬"></b-form-input>
              </b-col>

              <b-col class="col-5" style="display: flex; align-items: center;" >
                <b-checkbox style="margin-right: 10px;" v-model="isWork" value="1" unchecked-value="0">프로젝트에 참여하지 않는 사람만</b-checkbox>
              </b-col>
            </b-row>
          </div>

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
          <!-- 직원 테이블 -->   
          <b-card class="ProjectTableCard">
            <el-table v-if="this.employees.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="this.employees">
                <el-table-column label="사번" prop="emp_id" min-width="100px" ></el-table-column>
    
                <el-table-column label="이름" prop="emp_name" min-width="80px"></el-table-column>
    
                <el-table-column label="주민등록번호" prop="emp_ssn" min-width="140px"></el-table-column>
    
                <el-table-column label="이메일" prop="emp_email" min-width="150px"></el-table-column>
    
                <el-table-column label="학력" prop="emp_edu" min-width="60px"></el-table-column>

                <el-table-column label="경력" prop="emp_workex" min-width="60px"></el-table-column>

                <el-table-column label="스킬" prop="skill_name" min-width="100px">
                  <!-- <template v-slot="{row}">
                    <span class="font-weight-600 name mb-0 text-sm" style="color: #939CAC">{{ row.skill_name }}</span>
                  </template> -->
                </el-table-column>

                <el-table-column label="참여 프로젝트 수" prop="pro_cnt" min-width="150px">
                  <!-- <template v-slot="{row}">
                    <span class="font-weight-600 name mb-0 text-sm" style="color: #939CAC">{{ row.pro_cnt }}</span>
                  </template> -->
                </el-table-column>

                <el-table-column label="직무" prop="role" min-width="100px"></el-table-column>

                <!-- <el-table-column label="평점" prop="rating" min-width="50px"></el-table-column> -->
                
                <el-table-column label="권한 지정" prop="auth" min-width="100px">
                  <template slot-scope="scope">
                    <div class="avatar-group">
                        <button @click="navigateToAccess(scope.row.emp_id, scope.row.emp_name)" style="cursor: pointer">권한</button>
                    </div>
                  </template>
                </el-table-column>
            </el-table>
  
            <div v-else style="padding-top: 20px;">
              해당 직원이 없습니다.
            </div>
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
        skill: '',
        isWork: 0,
        employees: [],
        isLoading: true,
      }
    },
    methods: {
      isWorkChange() {
        if( this.isWork == 0 ) {
          this.isWork = 1;
          console.log(this.isWork);
        } else if( this.isWork == 1 ) {
          this.isWork = 0;
          console.log(this.isWork);
        }
      },
      sendData() {
        this.employees = [];
        this.isLoading = true;
        const apiUrl = '/api/v1/user/list/search';

        const params = {
          period_start: this.inputDate,
          period_end: this.outputDate,
          role: this.role,
          skill_name: this.skill,
          is_work: this.isWork,
        };

        axios.get(apiUrl, {params}).then((res) => {
          console.log(apiUrl, {params});
          console.log('API response res.data:', res.data);
          // this.employees = res.data;
          this.isLoading = false;

          for( let i = 0 ; i < res.data.length ; i++ ){
            let roleName = "";

            if (res.data[i][0]?.role == 0) {
              roleName = "경영진";
            } else if (res.data[i][0]?.role == 1) {
              roleName = "PM";
            } else if (res.data[i][0]?.role == 2) {
              roleName = "PL";
            } else if (res.data[i][0]?.role == 3) {
              roleName = "분석가";
            } else if (res.data[i][0]?.role == 4) {
              roleName = "설계자";
            } else if (res.data[i][0]?.role == 5) {
              roleName = "프로그래머";
            } else if (res.data[i][0]?.role == 6) {
              roleName = "테스터";
            } else if (res.data[i][0]?.role == 7) {
              roleName = "디자이너";
            } else {
              roleName = "";
            }

            if( i % 2 == 0 ){
              var obj = {
                emp_id : res.data[i][0].emp_id,
                emp_name : res.data[i][0].emp_name,
                emp_ssn : res.data[i][0].emp_ssn,
                emp_email : res.data[i][0].emp_email,
                emp_edu : res.data[i][0].emp_edu,
                emp_workex : res.data[i][0].emp_workex + "년",
                skill_name : res.data[i][0].skill_name,
                role : roleName,
                pro_cnt : res.data[i+1][0]?.proj_count || 0,
              };
              
              this.employees.push( obj );
            }
            console.log("===========================================");
          }
          console.log('API response employees:', this.employees);
        }).catch((error) => {
            console.log('Failed to fetch data:', error);
        });
      },
      navigateToAccess(id, name) {
        this.$router.push({
          path: `/employee/access/${id}`,
          query: { name: name }
        });
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
      }
    },
    mounted() {
      const apiUrl = '/api/v1/user/list';

      // const params = {
      //   period_start: this.inputDate,
      //   period_end: this.outputDate,
      //   role: this.role,
      //   pro_cnt: this.proName,
      //   skill_name: this.skill,
      //   is_work: this.isWork,
      // };
      
      // let formData = new FormData();
      // formData.append("period_start", "");
      // formData.append("period_end", "");
      // formData.append("role", "");
      // formData.append("pro_cnt", "");
      // formData.append("skill_name", "");
      // formData.append("is_work", 0);

      axios.get(apiUrl).then((res) => {
        // console.log('API response res.data:', res.data);
        // console.log('API response res.data[0]:', res.data[0]);
        // console.log('API response res.data[0][0]:', res.data[0][0]);
        // console.log('API response res.data[1]:', res.data[1]);
        // this.employees = res.data;

        // console.log("test code for res.data : " , res.data)
        // console.log("test code for res.data.length : " , res.data.length)
        for( let i = 0 ; i < res.data.length ; i++ ){
          let roleName = "";
          // console.log("test code i : ", i)
          // console.log("test code data : ", res.data[i] )
          // console.log("test code data 2 : ", res.data[i][0] )

          if (res.data[i][0]?.role == 0) {
            roleName = "경영진";
          } else if (res.data[i][0]?.role == 1) {
            roleName = "PM";
          } else if (res.data[i][0]?.role == 2) {
            roleName = "PL";
          } else if (res.data[i][0]?.role == 3) {
            roleName = "분석가";
          } else if (res.data[i][0]?.role == 4) {
            roleName = "설계자";
          } else if (res.data[i][0]?.role == 5) {
            roleName = "프로그래머";
          } else if (res.data[i][0]?.role == 6) {
            roleName = "테스터";
          } else if (res.data[i][0]?.role == 7) {
            roleName = "디자이너";
          } else {
            roleName = "";
          }

          if( i % 2 == 0 ){
            var obj = {
              emp_id : res.data[i][0].emp_id,
              emp_name : res.data[i][0].emp_name,
              emp_ssn : res.data[i][0].emp_ssn,
              emp_email : res.data[i][0].emp_email,
              emp_edu : res.data[i][0].emp_edu,
              emp_workex : res.data[i][0].emp_workex + "년",
              skill_name : res.data[i][0].skill_name,
              role : roleName,
              pro_cnt : res.data[i+1][0]?.proj_count || 0,
            };
            
            this.employees.push( obj );
          }
          console.log("===========================================");
        }
        // console.log("test code employees : ", this.employees);
        
        this.isLoading = false;
      }).catch ((error) => {
        console.error('Invalid API URL:', apiUrl);
        console.error(error);
      });
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
