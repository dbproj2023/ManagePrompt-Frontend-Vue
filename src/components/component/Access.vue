<template>
    <v-app>
        <v-main style="background-color: #394F86">
            <v-container fluid>
                <div class="limiter">
                    <div class="container-login100">
                        <div class="wrap-login100 p-t-50 p-b-90">
                        <form class="login100-form form-input validate-form flex-sb flex-w" name="access_form" method="get">
                            <span class="login100-form-title p-b-51">
                            직원 권한 설정
                            </span>
                
                            <div class="wrap-input100 validate-input m-b-16">
                            <label>사번</label>
                            <p class="input100" id="emp_id" name="emp_id" ref="memberIdInput">{{ empID }}</p>
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                            </div>
                
                            <div class="wrap-input100 validate-input m-b-16">
                            <label>이름</label>
                            <p class="input100" id="emp_name" name="emp_name" ref="memberIdInput">{{ empName }}</p>
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                            </div>
                
                            <div class="wrap-input100 validate-input m-b-16">
                            <label>권한</label>
                            <select class="form-select form-control" style="width: 130px;" name="access_grade" v-model="accessGrade">
                                <option value="0">대표</option>
                                <option value="1">이사</option>
                                <option value="2">관리자</option>
                                <option value="3">직원</option>
                                <option value="4">발주처</option>
                                <option value="9">승인 전</option>
                            </select>
                            <!-- <p class="input100" id="access_grade" name="access_grade" ref="memberIdInput">{{ accessGrade }}</p> -->
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                            </div>

                            <div class="container-login100-form-btn m-t-17">
                            <button class="login100-form-btn" type="button" @click="setPermission()">수정</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import axios from 'axios';
    import Header from './Header.vue';
    import Nav from './Nav.vue'

    export default {
        name: "Access",
        components: {
            Nav,
            Header
        },
        data() {
            return {
                empID: "",
                empName: "",
                accessGrade: ""
            }
        },
        methods: {
            setPermission() {
                const formData = new FormData();
                formData.append('emp_id', this.empID);
                formData.append('emp_name', this.empName);
                formData.append('access_grade', this.accessGrade);

                axios.patch('/api/v1/auth/role/update', formData).then((res) => {
                    console.log({ formData });
                    console.log('API response:', res.data);
                }).catch((error) => {
                    console.error('Failed to fetch data:', error);
                });
            }
        }
    };
</script>

<style scoped>
    div {
        flex: 1200px;
    }
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

    .search-bar{
        position: absolute;
        width: 1167.73px;
        height: 100px;
        left: 300px;
        top: 150px;
        flex-wrap: nowrap;
    }

    .head-name{
        position: absolute;
        width: 219px;
        height: 10px;
        left: 300px;
        top: 100px;
        font-style: normal;
        font-weight: 600;
        font-size: 30px;
        line-height: 36px;
        color: #000000;
    }
    .project-table{
        position: center;
        width: 1167.73px;
        height: 514.6px;
        margin: 30px;
        top: 50px;
    }

    .wrapper{
        position: absolute;
        width: 100%;
        height: 1000px;
        left: 280px;
        top: 50px;
        background-color: white;
        /* #f5f8f9; */
    }

    .title { 
        font-family: 'KimjungchulGothic-Bold', 'Sans-serif'; 
    }
</style>