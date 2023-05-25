<template>
    <div>
        <div>
            <b-card class="participate_table">
                <el-table v-if="project_list.length > 0" class="table-responsive table" header-row-class-name="thead-light" :data="project_list">
                    <el-table-column label="번호" prop="number" min-width="60px"></el-table-column>

                    <el-table-column label="연도" prop="progress_year" min-width="80px"></el-table-column>

                    <el-table-column label="참여기간" prop="participation_period" min-width="200px"></el-table-column>

                    <el-table-column label="프로젝트명" prop="pro_name" min-width="150px"></el-table-column>

                    <el-table-column label="직무" prop="role" min-width="80px"></el-table-column>

                    <el-table-column label="진행 상태" prop="progress_state" min-width="150px"></el-table-column>

                    <!-- 완료된 평가에만 버튼 만들어 평가할 수 있도록 -->
                    <el-table-column label="평가" prop="evaluation" min-width="150px">
                        <template slot-scope="scope">
                            <div class="avatar-group">
                                <button @click="navigateToAccess(scope.row.pro_name, scope.row.roll, scope.row.participation_period)" style="cursor: pointer">권한</button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>

                <div v-else style="padding-top: 20px;">
                    프로젝트 참여 내역이 없습니다.
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
    import { Table, TableColumn } from 'element-ui';
    import axios from "axios";

    export default {
        name: 'ParticipateProjTable',
        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        data() {
            return {
                number: '',
                progress_year: 0,
                participation_period: '',
                pro_name: '',
                role: '',
                progress_state: '',
                project_list: [],
            }
        },
        mounted() {
            const apiUrl = '/api/v1/user/search/proj/list';
            console.log("test code: 들어옵니까")
            
            try {
                axios.get(apiUrl).then((res) => {
                    console.log('API response:', res.data.projectList);
                    
                    this.project_list = res.data.projectList;
                    console.log('project_list:', this.project_list);

                    for(let i=0; i<this.project_list.length; i++) {
                        this.number = i;
                        this.progress_year = this.project_list[i].startDate.charAt(0) + this.project_list[i].startDate.charAt(1) + this.project_list[i].startDate.charAt(2) + this.project_list[i].startDate.charAt(3);
                        this.participation_period = "기간";
                        this.pro_name = this.project_list[i].proName;
                        this.role = this.project_list[i].roleName;
                        this.progress_state = "상태";

                        console.log("test code:", this.number, this.progress_year, this.pro_name, this.role);
                    }
                });
            } catch (error) {
                console.error('Invalid API URL:', apiUrl);
                console.error(error);
            }
        },
        methods: {
            navigateToAccess(pro_name, roll, participation_period) {
                
            }
        }
    }
</script>

<style>