<template>
    <v-app>
        <v-main style="background-color: #394F86">
            <v-container fluid>
                <div class="limiter">
                    <div class="container-login100">
                        <div class="wrap-login100 p-t-50 p-b-90">
                        <form class="login100-form form-input validate-form flex-sb flex-w" name="access_form" method="get">
                            <span class="login100-form-title p-b-51">
                            비밀번호 변경
                            </span>
                
                            <div class="wrap-input100 validate-input m-b-16">
                            <input class="input100" type="password" id="old_pw" name="old_pw" ref="memberIdInput" v-model="oldPW" placeholder="이전 비밀번호">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                            </div>
                
                            <div class="wrap-input100 validate-input m-b-16">
                            <input class="input100" type="password" id="new_pw" name="new_pw" ref="memberIdInput" v-model="newPW" placeholder="새로운 비밀번호">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                            </div>
                
                            <div class="wrap-input100 validate-input m-b-16">
                            <input class="input100" type="password" id="new_pw_re" name="new_pw_re" ref="memberIdInput" v-model="newPWRe" placeholder="비밀번호 확인">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                            </div>

                            <div class="container-login100-form-btn m-t-17">
                            <button class="login100-form-btn" type="button" @click="sendData()">확인</button>
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
                oldPW: "",
                newPW: "",
                newPWRe: ""
            }
        },
        methods: {
            sendData() {
                const formData = new FormData();
                formData.append('old_pw', this.oldPW);
                formData.append('new_pw', this.newPW);
                formData.append('new_pw_re', this.newPWRe);

                axios.patch('/api/v1/auth/help/resetPW', formData).then((res) => {
                    console.log({ formData });
                    console.log('API response:', res.data);

                    if(res.data.status == 2) {
                        alert(res.data.message);
                        this.$router.go(-1);
                    } else if(res.data.status == 1) {
                        alert(res.data.message);
                    } else {
                        alert(res.data.message);
                    }
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