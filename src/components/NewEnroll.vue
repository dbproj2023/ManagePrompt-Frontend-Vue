<template>
    <div id="new_enroll">
        <div>
            <h2>직원 초기 정보 등록 (관리자용)</h2>
        </div>
        <hr>
        <div>
            <table>
                <tbody>
                    <tr>
                        <th><label for="emp_id">사번</label></th>
                        <td>
                            <input type="text" id="emp_id" name="emp_id" v-model="emp_id" required @input="emp_id = $event.target.value"/>
                            <button type="button" @click="checkEmpId()">사번 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_name">이름</label></th>
                        <td>
                            <input type="text" id="emp_name" name="emp_name" v-model="emp_name" required @focusout="checkEmpName()" @input="emp_name = $event.target.value"/>
                            <p>{{ message_emp_name }}</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="auth_id">아이디</label></th>
                        <td>
                            <input type="text" id="auth_id" name="auth_id" v-model="auth_id" required @input="auth_id = $event.target.value"/>
                            <button type="button" @click="checkAuthId()">중복 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="auth_pw">비밀번호</label></th>
                        <td>
                            <input type="password" id="auth_pw" name="auth_pw" v-model="auth_pw" required @focusout="checkAuthPw()" @input="auth_pw = $event.target.value"/>
                            <p>{{ message_auth_pw }}</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="check_pw">비밀번호 확인</label></th>
                        <td>
                            <input type="password" id="check_pw" name="check_pw" v-model="check_pw" required @focusout="matchAuthPw()" @input="check_pw = $event.target.value"/>
                            <p>{{ message_check_pw }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" @click="enrollSubmit()">등록</button>
        </div>
    </div>
</template>

<script>
import axios from "axios"; // http 통신을 위한 라이브러리

export default {
    data() {
        return {
            emp_id: "",
            emp_name: "",
            auth_id: "",
            auth_pw: "",
            check_pw: "",
            message_emp_name: "",
            message_auth_pw: "",
            message_check_pw: "",
        }
    },
    methods: {
        enrollSubmit() {
            let formData = new FormData();
            formData.append("emp_id", this.emp_id);
            formData.append("emp_name", this.emp_name);
            formData.append("auth_id", this.auth_id);
            formData.append("auth_pw", this.auth_pw);
            formData.append("check_pw", this.check_pw);

            axios.post(`api/v1/auth/new-user`, formData).then((res) => {
                console.log("test code /user : ", res)
                if( res.data == 'success' ){
                    alert("신규 등록이 완료되었습니다.")
                    this.$router.push({path: './newEnroll'});
                }
            });
        },
        checkEmpId() {
            const validate_emp_id = /^\d{8}$/

            console.log("test code empId : ", this.emp_id)
            if( this.emp_id == '' ) {
                alert("사번을 입력해 주세요.")
                return
            } else if( !validate_emp_id.test(this.emp_id) ) {
                alert("사번을 정확히 입력해 주세요.")
                return
            }

            let formData = new FormData();
            formData.append("emp_id", this.emp_id);

            axios.post(`api/v1/auth/checkEMPID`, formData).then((res) => {
                console.log("test code checkEMPID : ", res)
                if( res.data == true ){
                    alert("이미 등록된 사번입니다.")
                } else {
                    alert("등록 가능한 사번입니다.")  // 만들어 준 사번
                }
            });
        },
        checkEmpName() {
            if( this.emp_name == '' ) {
                this.message_emp_name = "이름을 입력해 주세요.";
                return;
            } else {
                this.message_emp_name = "";
                return;
            }
        },
        checkAuthId() {
            if( this.auth_id == '' ) {
                alert("아이디를 입력해 주세요.")
                return
            } else if( this.auth_id.length < 6 || this.auth_id.length > 12 ) {
                alert("아이디는 6자리 이상, 12자리 이하로 작성해야 합니다.")
                return
            }

            let formData = new FormData();
            formData.append("auth_id", this.auth_id);

            axios.post(`api/v1/auth/checkID`, formData).then((res) => {
                console.log("test code auth_id : ", res)
                if( res.data == true ){
                    alert("이미 사용 중인 아이디입니다.")
                }else {
                    alert("사용 가능한 아이디입니다.")
                }
            });
        },
        checkAuthPw() {
            const validate_pw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/
            
            if( this.auth_pw == '' ) {
                this.message_auth_pw = "비밀번호를 입력해 주세요.";
                return;
            } else if( !validate_pw.test(this.auth_pw) ) {
                this.message_auth_pw = "비밀번호는 8글자 이상, 20글자 이하이며 영문, 숫자, 특수문자가 포함되어야 합니다.";
                return;
            } else {
                this.message_auth_pw = "";
                return;
            }
        },
        matchAuthPw() {
            if( this.check_pw == '' ) {
                this.message_check_pw = "비밀번호를 입력해 주세요.";
                return;
            } else if( this.check_pw != this.auth_pw ) {
                this.message_check_pw = "비밀번호가 일치하지 않습니다.";
                return;
            } else {
                this.message_check_pw = "";
                return;
            }
        },
    },
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
        background-color:  #42b983;
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
