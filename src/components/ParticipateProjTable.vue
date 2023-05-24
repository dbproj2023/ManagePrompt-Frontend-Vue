<template>
    <div>
        <b-card no-body>
            <el-table class="table-responsive table" header-row-class-name="thead-light" :data="projects">
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
        </b-card>
    </div>
</template>

<script>
    import { Table, TableColumn } from 'element-ui'

    export default {
        name: 'light-table',
        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        data() {
            return {
                projects: [{
                    number: 1,
                    progress_year: 2023,
                    participation_period: '2023/04/01 - 2023/06/01',
                    pro_name: 'ManagePrompt',
                    role: 'PM',
                    progress_state: '진행중'
                }, {
                    number: 2,
                    progress_year: 2022,
                    participation_period: '2022/09/01 - 2022/12/31',
                    pro_name: 'DatabaseProject',
                    role: 'PL',
                    progress_state: '완료'
                }]
            }
        }
    }
</script>

<style>