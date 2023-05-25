<template>
    <div id="login">
        <div>
            <h2>로그인</h2>
        </div>
        <hr>
        <form class="form-inputs" name="login_form" method="get">
            <input type="text" id="auth_id" name="auth_id" ref="memberIdInput" v-model="input.auth_id" placeholder="아이디"/>
            <input type="password" id="auth_pw" name="auth_pw" ref="memberPasswordInput" v-model="input.auth_pw" placeholder="비밀번호"/>
            <input type="button" value="로그인" @click="doLogin()">
            <div>
                <a id="find_account" :href="find_account"><strong>아이디/비밀번호 찾기</strong></a>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
const HOST =  "http://localhost:8080";
import loginStore from './login.js'

export default {
    data() {
        return {
            input: {
                auth_id: "",
                auth_pw: ""
            },
            find_account: "/FindAccount"
        }
    },
    methods: {
        doLogin() {
            console.log("test code click doLogin")

            if (this.input.auth_id == "") {
                alert("아이디를 입력하세요.");
                this.$refs.memberIdInput.focus();
                return;
            } else if (this.input.auth_pw == "") {
                alert("패스워드를 입력하세요.");
                this.$refs.memberPasswordInput.focus();
                return;
            }
    
            // test 소스 권한 0의 경영진
            // this.input.auth_id = 'qafffwad';
            // this.input.auth_pw = 'abc01!~!';

            // test 소스 권한 2의 관리자
            // this.input.auth_id = 'rege1212';
            // this.input.auth_pw = 'abc01!~!';

            // test 소스 권한 3의 직원
            // this.input.auth_id = 'awfawfwf';
            // this.input.auth_pw = 'abc01!~!';

            let formData = new FormData();
            formData.append("authId", this.input.auth_id);
            formData.append("authPw", this.input.auth_pw);

            axios.post(`/api/v1/auth/login`, formData ).then((res) => {
                if( res.data != null && res.data != undefined && res.data != '' ){
                    alert("로그인에 성공했습니다")

                    this.$store.commit('setLogin', true)
                    this.$store.commit('setAccGrade', res.data.accessGrade)
                    console.log("test code isLogin-2 : ", this.$store.getters.isLogin)

                    // // 새로운 직원이면
                    // if( res.data.isNewbie == true ){
                    //     // 회원 정보 등록 페이지로 이동
                    //     this.$router.push('/Enroll')
                    // }else{
                    //     // 이전 페이지로 이동
                    //     // this.$router.push('/');
                    //     this.$router.go(-1);
                    // }
                    this.$router.go(-1);
                }
                else if( res.data == '' ){
                    alert("로그인에 실패했습니다.")
                }
            });
        }
    },
    modules: {
        loginStore: loginStore
    }
}
</script>

<style scoped>
    div {
        flex: 1200px;
    }
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #000000;
        text-decoration: none;
        margin: 5px;
        text-align: right;
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

    .employee-table{
        position: absolute;
        width: 1167.73px;
        height: 514.6px;
        left: 280px;
        top: 100px;
    }
</style>
