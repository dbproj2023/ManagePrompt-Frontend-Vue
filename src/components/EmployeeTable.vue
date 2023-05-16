<template>
    <div>
        <b-card no-body>
            <form>
                <span>프로젝트 참여 기간: </span>
                <input type="date">

                <span>직무: </span>
                <input type="text" list="role">
                <datalist id="role">
                    <option value="경영진"></option>
                    <option value="PM"></option>
                    <option value="PL"></option>
                    <option value="분석가"></option>
                    <option value="설계자"></option>
                    <option value="프로그래머"></option>
                    <option value="테스터"></option>
                    <option value="디자이너"></option>
                </datalist>

                <span>프로젝트 명: </span>
                <input type="text" v-model="searchProjValue">

                <span>스킬: </span>
                <input type="text" v-model="searchSkillValue">

                <label>
                    <input type="checkbox" name="non-participant" value="1">프로젝트에 참여하지 않는 사람만 보기
                </label>
            </form>

            <br>
            <hr>

            <el-table class="table-responsive table" header-row-class-name="thead-light" :data="filterByProj">
                <el-table-column label="사번" prop="emp_id" min-width="100px"></el-table-column>
                
                <el-table-column label="이름" prop="emp_name" min-width="80px"></el-table-column>

                <el-table-column label="주민등록번호" prop="emp_ssn" min-width="140px"></el-table-column>

                <el-table-column label="이메일" prop="emp_email" min-width="200px"></el-table-column>

                <el-table-column label="학력" prop="emp_acbg" min-width="50px"></el-table-column>

                <el-table-column label="경력" prop="emp_work_ex" min-width="50px"></el-table-column>

                <el-table-column label="스킬" prop="emp_skill" min-width="100px"></el-table-column>

                <el-table-column label="프로젝트" min-width="150px" prop="pro_name">
                    <template v-slot="{row}">
                        <span class="font-weight-600 name mb-0 text-sm">{{row.pro_name}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="직무" prop="role" min-width="80px"></el-table-column>

                <el-table-column label="평점" prop="rating" min-width="50px"></el-table-column>

                <el-table-column label="권한 지정" prop="auth" min-width="100px"></el-table-column>
            </el-table>
        </b-card>
    </div>
</template>

<script lang="ts">
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
                    emp_id: 23000001,
                    emp_name: "정은",
                    emp_ssn: "000926-4******",
                    emp_email: "abc01@prompt.com",
                    emp_acbg: "학사",
                    emp_work_ex: 1,
                    emp_skill: "Vue",
                    pro_name: "pro01",
                    role: "경영진",
                    rating: 5
                }, {
                    emp_id: 23050002,
                    emp_name: "봉현수",
                    emp_ssn: "000414-3******",
                    emp_email: "abc02@prompt.com",
                    emp_acbg: "석사",
                    emp_work_ex: 3,
                    emp_skill: "Spring",
                    pro_name: "pro02",
                    role: "프로그래머",
                    rating: 2
                }, {
                    emp_id: 23070003,
                    emp_name: "양슬빈",
                    emp_ssn: "000929-4******",
                    emp_email: "abc03@prompt.com",
                    emp_acbg: "고졸",
                    emp_work_ex: 0,
                    emp_skill: "Vue",
                    pro_name: "pro02",
                    role: "디자이너",
                    rating: 3
                }, {
                    emp_id: 23010004,
                    emp_name: "김현중",
                    emp_ssn: "980000-1******",
                    emp_email: "abc04@prompt.com",
                    emp_acbg: "박사",
                    emp_work_ex: 5,
                    emp_skill: "Spring",
                    pro_name: "pro01",
                    role: "PM",
                    rating: 4
                }],
                searchProjValue: '',
                searchSkillValue: ''
            }
        },
        computed: {
            filterByProj() {
                if (this.searchProjValue) {
                    const searchProjValueLowercase = this.searchProjValue.toLowerCase()
                    return this.projects.filter(project => project.pro_name.toLowerCase().includes(searchProjValueLowercase))
                }
                return this.projects
            },
            filterBySkill() {
                if (this.searchSkillValue) {
                    const searchSkillValueLowercase = this.searchSkillValue.toLowerCase()
                    return this.projects.filter(project => project.emp_skill.toLowerCase().includes(searchSkillValueLowercase))
                }
                return this.projects
            }
        }
    }
</script>

<style>