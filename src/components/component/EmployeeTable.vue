<template>
    <div>
        <b-card class="center-card" style="width: 1200px">

        <div>
            <hr style="border: solid 1px;">
            <b-container class="bv-example-row" style="display: flex;">
                <div>
                    <b-row style="width: 1050px;">
                        <b-col class="col-6.3" style="display: flex; align-items: center;">
                            <div style="margin-right: 10px;">프로젝트 참여 기간</div>
                            <b-form-datepicker class="input_date" v-model="inputDate" placeholder="투입일자" style="width:250px; margin-right: 5px;"  @input="handleDateInput"></b-form-datepicker>
                            ~
                            <b-form-datepicker class="output_date" v-model="outputDate" placeholder="탈출일자" style="width:250px; margin-left: 5px;"></b-form-datepicker>
                        </b-col>

                        <b-col class="col-1.5" style="display: flex; align-items: center;">
                            <div class="search-type" style="margin-right: 10px;">직무</div>
                            <div>
                                <select class="form-select form-control" style="width: 130px;" name="role" v-model="role" @change="onChange($event)">
                                    <option value="" selected>선택</option>
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

                    <b-row style="margin-top: 15px; width:1050px;">
                        <b-col class="col-7.5" style="display: flex; align-items: center;">
                            <div style="margin-right: 10px;">프로젝트 명</div>
                            <div>
                                <b-form-input v-model="proName" placeholder="Enter project name" style="width: 230px;"></b-form-input>
                            </div>
                        </b-col>

                        <b-col class="col-7.5" style="display: flex; align-items: center;">
                            <div style="margin-right: 10px;">스킬</div>
                            <div>
                                <b-form-input v-model="skill" placeholder="Enter skill" style="width: 230px;"></b-form-input>
                            </div>
                        </b-col>

                        <b-col class="col-7.5" style="display: flex; align-items: center;">
                            <b-checkbox style="margin-right: 10px;" v-model="absentee">프로젝트에 참여하지 않는 사람만 보기</b-checkbox>
                        </b-col>
                    </b-row>
                </div>

                <div>
                    <b-button @click="sendData" style="height: 100px; width: 100px;">검색</b-button>
                </div>
            </b-container>
            <b-card no-body>

                <br>
                <hr>

                <el-table class="table-responsive table" header-row-class-name="thead-light" :data="filterByProj">
                    <el-table-column label="사번" prop="emp_id" min-width="100px"></el-table-column>
                    
                    <el-table-column label="이름" prop="emp_name" min-width="80px"></el-table-column>

                    <el-table-column label="주민등록번호" prop="emp_ssn" min-width="140px"></el-table-column>

                    <el-table-column label="이메일" prop="emp_email" min-width="200px"></el-table-column>

                    <el-table-column label="학력" prop="emp_acbg" min-width="50px"></el-table-column>

                    <el-table-column label="경력" prop="emp_work_ex" min-width="50px"></el-table-column>

                    <el-table-column label="스킬" prop="emp_skill" min-width="100px">
                        <template v-slot="{row}">
                            <span class="font-weight-600 name mb-0 text-sm">{{ row.emp_skill }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="프로젝트" prop="pro_name" min-width="150px">
                        <template v-slot="{row}">
                            <span class="font-weight-600 name mb-0 text-sm">{{row.pro_name}}</span>
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
            </b-card>
        </div>
        </b-card>
    </div>
</template>

<script>
    import { Table, TableColumn } from 'element-ui'
    import axios from 'axios';
    
    export default {
        name: 'employeeTable',
        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
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
                // emp_id: '',
                // emp_name: '',
            }
        },
        computed: {
            pagedEmployees() {
                const startIndex = (this.currentPage - 1) * this.pageSize;
                const endIndex = startIndex + this.pageSize;
                return this.employees.slice(startIndex, endIndex);
            },
            slicedStartDate() {
                if (this.employee.startDate && this.employee.endDate) {
                    const startyear = this.employee.startDate.slice(2, 4);
                    const startmonth = this.employee.startDate.slice(5, 7);
                    const startday = this.employee.startDate.slice(8, 10);

                    const endyear = this.employee.startDate.slice(2, 4);
                    const endmonth = this.employee.startDate.slice(5, 7);
                    const endday = this.employee.startDate.slice(8, 10);
                    return `${startyear}-${startmonth}-${startday} ~ ${endyear}-${endmonth}-${endday}`
                }
                return '';
            },
            filterByProj() {
                if (this.searchProjValue) {
                    const searchProjValueLowercase = this.searchProjValue.toLowerCase()
                    return this.employees.filter(project => project.proName.toLowerCase().includes(searchProjValueLowercase))
                }
                if (this.searchSkillValue) {
                    const searchSkillValueLowercase = this.searchSkillValue.toLowerCase()
                    return this.employees.filter(project => project.emp_skill.toLowerCase().includes(searchSkillValueLowercase))
                }
                return this.employees
            }
            // filterByProj() {
            //     if (this.searchProjValue) {
            //         const searchProjValueLowercase = this.searchProjValue.toLowerCase()
            //         return this.employees.filter(project => project.proName.toLowerCase().includes(searchProjValueLowercase))
            //     }
            //     return this.employees
            // },
            // filterBySkill() {
            //     if (this.searchSkillValue) {
            //         const searchSkillValueLowercase = this.searchSkillValue.toLowerCase()
            //         return this.employees.filter(project => project.emp_skill.toLowerCase().includes(searchSkillValueLowercase))
            //     }
            //     return this.employees
            // }
        },
        methods: {
            handlePageChange(page) {
                this.currentPage = page;
            },
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
                    page: 0,
                    size: 30,
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
                // this.emp_id = id;
                // this.emp_name = name;
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
            const apiUrl = '/api/v1/user/search';
            try {
                axios.get(apiUrl).then((res) => {
                    console.log('API response:', res.data);
                    this.employees = res.data;
                    this.isLoading = false;
                });
            } catch(error) {
                console.error('Invalid API URL:', apiUrl);
                console.error(error);
            }
        }
    }
</script>

<style>