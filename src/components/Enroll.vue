<template>
    <div id="enroll">
        <div>
            <h2>신규 정보 등록</h2>
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
                        <th><label for="emp_ssn">주민등록번호</label></th>
                        <td>
                            <!-- <input type="text" id="emp_ssn" name="emp_ssn" v-model="emp_ssn" required :rules="ssnRules" @input="emp_ssn = $event.target.value"/> -->
                            <input type="text" id="emp_ssn" name="emp_ssn" v-model="emp_ssn" required @focusout="checkEmpSsn()" @input="emp_ssn = $event.target.value"/>
                            <p>{{ message_emp_ssn }}</p>
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
                            <!-- <input type="password" id="auth_pw" name="auth_pw" v-model="auth_pw" required :rules="passwordRules" @input="auth_pw = $event.target.value"/> -->
                            <input type="password" id="auth_pw" name="auth_pw" v-model="auth_pw" required @focusout="checkAuthPw()" @input="auth_pw = $event.target.value"/>
                            <p>{{ message_auth_pw }}</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="check_pw">비밀번호 확인</label></th>
                        <td>
                            <!-- <input type="password" id="check_pw" name="check_pw" v-model="check_pw" required :rules="passwordCheckRules.concat(passwordConfirmationRule)" @input="check_pw = $event.target.value"/> -->
                            <input type="password" id="check_pw" name="check_pw" v-model="check_pw" required @focusout="matchAuthPw()" @input="check_pw = $event.target.value"/>
                            <p>{{ message_check_pw }}</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_email">이메일</label></th>
                        <td>
                            <!-- <input type="email" id="emp_email" name="emp_email" v-model="emp_email" required :rules="emailRules" @input="emp_email = $event.target.value"/> -->
                            <input type="email" id="emp_email" name="emp_email" v-model="emp_email" required @input="emp_email = $event.target.value"/>
                            <button type="button" @click="checkEmpEmail()">중복 확인</button>   
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_edu">학력</label></th>
                        <td>
                            <input type="text" id="emp_edu" name="emp_edu" v-model="emp_edu" @focusout="checkEmpEdu()" @input="emp_edu = $event.target.value"/>
                            <p>{{ message_emp_edu }}</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_work_ex">경력</label></th>
                        <td>
                            <input type="textarea" id="emp_work_ex" name="emp_work_ex" v-model="emp_work_ex" @focusout="checkEmpWorkEx()" @input="emp_work_ex = $event.target.value"/>
                            <p>{{ message_emp_work_ex }}</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_skill">스킬</label></th>
                        <td>
                            <input type="textarea" id="emp_skill" name="emp_skill" v-model="emp_skill" @focusout="checkEmpSkill()" @input="emp_skill = $event.target.value"/>
                            <p>{{ message_emp_skill }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" @click="enrollSubmit()">등록</button>
        </div>
    </div>
</template>

<script>
const HOST =  "http://localhost:8080";

import axios from "axios"; // http 통신을 위한 라이브러리

export default {
    data() {
        return {
            emp_id: "",
            emp_name: "",
            emp_ssn: "",
            auth_id: "",
            auth_pw: "",
            check_pw: "",
            emp_email: "",
            emp_edu: "",
            emp_work_ex: "",
            emp_skill: "",
            message_emp_name: "",
            message_emp_ssn: "",
            message_auth_pw: "",
            message_check_pw: "",
            message_emp_edu: "",
            message_emp_work_ex: "",
            message_emp_skill: "",
            // ssnRules: [
            //     v => !!v || '주민등록번호를 작성해주세요',
            //     v => /.+-+./.test(v) || '주민등록번호 형식으로 작성해주세요'
            // ],
            // passwordRules: [
            //     v => !!v || '비밀번호를 작성해주세요',
            //     v => (v && v.length >= 5 && v.length <= 20) || '비밀번호는 8글자 이상 20글자 이하로 작성해주세요',
            //     v => /(ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz)/.test(v) || '영문 대소문자를 포함해야합니다',
            //     v => /(?=.*\d)/.test(v) || '숫자를 포함해야합니다',
            //     v => /([~`!@#$%^&*<>?/])/.test(v) || '특수문자를 포함해야합니다 [~`!@#$%^&*<>?/]'
            // ],
            // passwordCheckRules: [
            //     v => !!v || '비밀번호를 작성해주세요',
            //     v => (v && v.length >= 5 && v.length <= 20) || '비밀번호는 8글자 이상 20글자 이하로 작성해주세요',
            //     v => /(ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz)/.test(v) || '영문 대소문자를 포함해야합니다',
            //     v => /(?=.*\d)/.test(v) || '숫자를 포함해야합니다',
            //     v => /([~`!@#$%^&*<>?/])/.test(v) || '특수문자를 포함해야합니다 [~`!@#$%^&*<>?/]'
            // ],
            // emailRules: [
            //     v => !!v || '이메일을 작성해주세요',
            //     v => /.+@.+\..+/.test(v) || '이메일 형식으로 작성해주세요'
            // ],
        }
    },
    // computed: {
    //     passwordConfirmationRule() {
    //         return () =>
    //             this.auth_pw !== this.confirmPassword || "패스워드가 일치하지 않습니다";
    //     }
    // },
    methods: {
        // enrollSubmit() {
        //     const validate = this.$refs.form.validate()
        //     if(validate) {
        //         let saveData = {};
        //         saveData.emp_id = this.emp_id;
        //         saveData.emp_name = this.emp_name;
        //         saveData.emp_ssn = this.emp_ssn;
        //         saveData.auth_id = this.auth_id;
        //         saveData.auth_pw = this.auth_pw;
        //         saveData.check_pw = this.check_pw;
        //         saveData.emp_email = this.emp_email;
        //         saveData.emp_edu = this.emp_edu;
        //         saveData.emp_work_ex = this.emp_work_ex;
        //         saveData.emp_skill = this.emp_skill;

        //         try {
        //             this.$axios.post(`${HOST}/api/v1/auth/user`, JSON.stringify(saveData), {
        //             headers: {
        //                 "Content-Type": `application/json`,
        //                 },
        //             })
        //             .then((response) => {
        //                 console.log(response)
        //                 if (response.data.errorCode === 400) {
        //                     alert(response.data.errorMessage)
        //                 }
        //                 else {
        //                     alert("신규 등록이 완료되었습니다. 로그인 화면으로 돌아갑니다")
        //                     this.$router.push({path: './Login'});
        //                 }
        //             })
        //             .catch(error => {
        //                 console.log(error.response);
        //             });
        //         } catch (error) {
        //             console.error(error);
        //         }
        //     }
        // },

        enrollSubmit() {
            let formData = new FormData();
            formData.append("emp_id", this.emp_id);
            formData.append("emp_name", this.emp_name);
            formData.append("emp_ssn", this.emp_ssn);
            formData.append("auth_id", this.auth_id);
            formData.append("auth_pw", this.auth_pw);
            formData.append("check_pw", this.check_pw);
            formData.append("emp_email", this.emp_email);
            formData.append("emp_edu", this.emp_edu);
            formData.append("emp_work_ex", this.emp_work_ex);
            formData.append("emp_skill", this.emp_skill);

            axios.post(`api/v1/auth/user`, formData).then((res) => {
                console.log("test code /user : ", res)
                if( res.data == 'success' ){
                    alert("신규 등록이 완료되었습니다. 로그인 화면으로 돌아갑니다.")
                    this.$router.push({path: './Login'});
                }
            });
        },

        // linkTologin() {
        //     this.$router.push({path:"./Login"});
        // },
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
        checkEmpSsn() {
            const validate_ssn = /^\d{6}-\d{7}$/
            
            if( this.emp_ssn == '' ) {
                this.message_emp_ssn = "주민등록번호를 입력해 주세요.";
                return;
            } else if( !validate_ssn.test(this.emp_ssn) ) {
                this.message_emp_ssn = "형식에 맞는 주민등록번호를 입력해 주세요.";
                return;
            } else {
                this.message_emp_ssn = "";
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
        checkEmpEmail() {
            const validate_email = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
            if( this.emp_email == '' ) {
                alert("이메일을 입력해 주세요.")
                return
            } else if( !validate_email.test(this.emp_email) ) {
                alert("이메일 형식에 맞게 입력해야 합니다.")
                return
            }
            
            let formData = new FormData();
            formData.append("emp_email", this.emp_email);

            axios.post(`api/v1/auth/checkEmail`, formData).then((res) => {
                console.log("test code emp_email : ", res)
                if( res.data == true ){
                    alert("이미 사용 중인 이메일입니다.")
                }else {
                    alert("사용 가능한 이메일입니다.")
                }
            });
        },
        checkEmpEdu() {
            if( this.emp_edu == '' ) {
                this.message_emp_edu = "학력을 입력해 주세요.";
                return;
            } else {
                this.message_emp_edu = "";
                return;
            }
        },
        checkEmpWorkEx() {
            if( this.emp_work_ex == '' ) {
                this.message_emp_work_ex = "경력을 입력해 주세요.";
                return;
            } else if( isNaN(this.emp_work_ex) ) {
                this.message_emp_work_ex = "경력을 정확히 입력해 주세요."
                return;
            } else {
                this.message_emp_work_ex = "";
                return;
            }
        },
        checkEmpSkill() {
            if( this.emp_skill == '' ) {
                this.message_emp_skill = "스킬을 입력해 주세요.";
                return;
            } else {
                this.message_emp_skill = "";
                return;
            }
        }
        // enroll() {
        //     // DB에 등록
        // }
    },
    // setup() {
        
    // },
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
