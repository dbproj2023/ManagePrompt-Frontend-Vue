<template>
    <div>
        <div class="spinner-div" v-if="isLoading">
        <b-card class="spinner-table">
            <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
            </div>
        </b-card>
        </div>
        <div v-else>
            <b-card class="participate_table">
                <p class="text-uppercase text-sm">My Project</p>
                <el-table v-if="project_list.length > 0" class="table-responsive table" header-row-class-name="thead-light" :data="project_list">
                    <el-table-column label="번호" prop="pro_id" min-width="60px"></el-table-column>

                    <el-table-column label="연도" prop="progress_year" min-width="80px"></el-table-column>

                    <el-table-column label="참여기간" prop="participation_period" min-width="200px"></el-table-column>

                    <el-table-column label="프로젝트명" prop="pro_name" min-width="150px"></el-table-column>

                    <el-table-column label="직무" prop="role" min-width="80px"></el-table-column>

                    <el-table-column label="진행 상태" prop="progress_state" min-width="80px"></el-table-column>

                    <!-- 완료된 평가에만 버튼 만들어 평가할 수 있도록 -->

                    <el-table-column label="평가" prop="evaluation" min-width="150px">
                        <template slot-scope="scope">
                            <div class="avatar-group">
                                <button v-if="(scope.row.progress_state === '종료')" class="login100-form-btn profile-button eval-button" @click="navigateToAccess(scope.row.pro_id, scope.row.pro_name)" style="cursor: pointer">평가</button>
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
                project_list: [],
                isLoading: true,
                state: ''

            }
        },
        mounted() {
            const apiUrl = '/api/v1/user/search/proj/list';
            console.log("test code: 들어옵니까")
            
            try {
                axios.get(apiUrl).then((res) => {
                    console.log('API response:', res.data.projectList);

                    for(let i=0; i < res.data.projectList.length; i++) {
                        const startDate = res.data.projectList[i].startDate.slice(0, 10);
                        const endDate = res.data.projectList[i].endDate.slice(0, 10);
                        const currentDate = new Date().toISOString().slice(0, 10);

                        if (currentDate < startDate) {
                        } else if (currentDate >= startDate && currentDate <= endDate) {
                            this.state = "진행중";
                        } else if (currentDate > endDate) {
                            this.state = "종료";
                        } else if (startDate === endDate){
                            this.state = "취소"
                        }

                        var obj = {
                            number : i+1,
                            pro_id: res.data.projectList[i].proId,
                            progress_year : res.data.projectList[i].startDate.charAt(0) + res.data.projectList[i].startDate.charAt(1) + res.data.projectList[i].startDate.charAt(2) + res.data.projectList[i].startDate.charAt(3),
                            participation_period : res.data.projectList[i].startDate.slice(0,10)+'-'+res.data.projectList[i].endDate.slice(0,10),
                            pro_name : res.data.projectList[i].proName,
                            role : res.data.projectList[i].roleName,
                            progress_state: this.state
                        };
                                                
                        this.project_list.push( obj );
                    }
                    this.isLoading = false;
                });
            } catch (error) {
                console.error('Invalid API URL:', apiUrl);
                console.error(error);
            }


        },
        methods: {
            navigateToAccess(pro_id, pro_name) {
                // this.$router.push('/evaluation/input/employee');
                this.$router.push({
                    path: '/evaluation/input/employee',
                    query: {
                        pro_id : pro_id,
                        pro_name: pro_name
                    }
                });
            },
            getCurrentDate() {
                const date = new Date();
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const day = ('0' + date.getDate()).slice(-2);
                this.currentDate = `${year}-${month}-${day}`;
                }
        }
    }
</script>

<style>
.spinner-div{
    width: 1214px;
    height: 162px;
}

.eval-button{
    height: 30px;
}

</style>