<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app width="250px" class="no-border" style=" background-color: #F8F9FA;">
      <Nav/>
    </v-navigation-drawer>

    <v-app-bar app style="background-color: #394F86;">
      <Header/>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <div>
          <b-card class="center-card" style="width: 1200px">
            <div>
              <hr style="border: solid 1px; color: #1D3876">  
              <hr style="color: #1D3876;"/>
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
                <b-card class="ProjectTableCard">
                  <el-table v-if="this.employees.length > 0" class="table-responsive table text-center" header-row-class-name="thead-light" :data="this.employees">
                      <el-table-column label="사번" prop="emp_id" min-width="150px" ></el-table-column>
          
                      <el-table-column label="이름" prop="emp_name" min-width="100px"></el-table-column>

                      <el-table-column label="아이디" prop="auth_id" min-width="150px"></el-table-column>

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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { Pagination, Table, TableColumn } from 'element-ui';
  import Header from './Header.vue';
  import Nav from './Nav.vue'
  import axios from "axios";

  export default {
    name: 'UnauthorizedEmp',
    components: {
      Nav,
      Header,
      [Pagination.name]: Pagination,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        employees: [],
        isLoading: true,
      }
    },
    methods: {
      navigateToAccess(id, name) {
        this.$router.push({
          path: `/employee/access/${id}`,
          query: { name: name }
        });
      }
    },
    mounted() {
      const apiUrl = '/api/v1/auth/role/unrecognized';

      axios.get(apiUrl).then((res) => {
        console.log("미승인 res.data:", res.data);
        this.isLoading = false;

        for(let i=0; i<res.data.length; i++) {
          if(res.data[i].discrete == "승인전") {
            var obj = {
              emp_id: res.data[i].emp_id,
              emp_name: res.data[i].emp_name,
              auth_id: res.data[i].auth_id,
            }
            this.employees.push(obj);
          }
          console.log(this.employees);
        }
      }).catch ((error) => {
        console.error('Invalid API URL:', apiUrl);
        console.error(error);
      });
    }
  }
</script>

<style>
  div {
    flex: 1200px;
  }

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
