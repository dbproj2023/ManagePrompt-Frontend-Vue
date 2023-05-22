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
                            <button type="button" @click="check_emp_id()">사번 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_name">이름</label></th>
                        <td>
                            <input type="text" id="emp_name" name="emp_name" v-model="emp_name" required @input="emp_name = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_ssn">주민등록번호</label></th>
                        <td>
                            <input type="text" id="emp_ssn" name="emp_ssn" v-model="emp_ssn" required :rules="ssnRules" @input="emp_ssn = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="auth_id">아이디</label></th>
                        <td>
                            <input type="text" id="auth_id" name="auth_id" v-model="auth_id" required @input="auth_id = $event.target.value"/>
                            <button type="button" @click="check_auth_id()">중복 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="auth_pw">비밀번호</label></th>
                        <td>
                            <input type="password" id="auth_pw" name="auth_pw" v-model="auth_pw" required :rules="passwordRules" @input="auth_pw = $event.target.value"/>
                            <p>영문 대/소문자, 숫자, 특수문자를 조합하여 8글자 이상 20글자 이하로 작성</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="check_pw">비밀번호 확인</label></th>
                        <td>
                            <input type="password" id="check_pw" name="check_pw" v-model="check_pw" required :rules="passwordCheckRules.concat(passwordConfirmationRule)" @input="check_pw = $event.target.value"/>
                            <!-- <p id="match">비밀번호가 일치합니다</p>
                            <p id="not_match">비밀번호가 일치하지 않습니다</p> -->
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_email">이메일</label></th>
                        <td>
                            <input type="email" id="emp_email" name="emp_email" v-model="emp_email" required :rules="emailRules" @input="emp_email = $event.target.value"/>
                            <button type="button" @click="check_emp_email()">중복 확인</button>   
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_edu">학력</label></th>
                        <td>
                            <input type="text" id="emp_edu" name="emp_edu" v-model="emp_edu" @input="emp_edu = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_work_ex">경력</label></th>
                        <td>
                            <input type="textarea" id="emp_work_ex" name="emp_work_ex" v-model="emp_work_ex" @input="emp_work_ex = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_skill">스킬</label></th>
                        <td>
                            <input type="textarea" id="emp_skill" name="emp_skill" v-model="emp_skill" @input="emp_skill = $event.target.value"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" @submit.prevent="enrollSubmit()">등록</button>
        </div>
    </div>
</template>

<script>
const HOST =  "http://localhost:8080";

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
            ssnRules: [
                v => !!v || '주민등록번호를 작성해주세요',
                v => /.+-+./.test(v) || '주민등록번호 형식으로 작성해주세요'
            ],
            passwordRules: [
                v => !!v || '비밀번호를 작성해주세요',
                v => (v && v.length >= 5 && v.length <= 20) || '비밀번호는 8글자 이상 20글자 이하로 작성해주세요',
                v => /(ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz)/.test(v) || '영문 대소문자를 포함해야합니다',
                v => /(?=.*\d)/.test(v) || '숫자를 포함해야합니다',
                v => /([~`!@#$%^&*<>?/])/.test(v) || '특수문자를 포함해야합니다 [~`!@#$%^&*<>?/]'
            ],
            passwordCheckRules: [
                v => !!v || '비밀번호를 작성해주세요',
                v => (v && v.length >= 5 && v.length <= 20) || '비밀번호는 8글자 이상 20글자 이하로 작성해주세요',
                v => /(ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz)/.test(v) || '영문 대소문자를 포함해야합니다',
                v => /(?=.*\d)/.test(v) || '숫자를 포함해야합니다',
                v => /([~`!@#$%^&*<>?/])/.test(v) || '특수문자를 포함해야합니다 [~`!@#$%^&*<>?/]'
            ],
            emailRules: [
                v => !!v || '이메일을 작성해주세요',
                v => /.+@.+\..+/.test(v) || '이메일 형식으로 작성해주세요'
            ],
        }
    },
    computed: {
        passwordConfirmationRule() {
            return () =>
                this.auth_pw !== this.confirmPassword || "패스워드가 일치하지 않습니다";
        }
    },
    methods: {
        enrollSubmit() {
            const validate = this.$refs.form.validate()
            if(validate) {
                let saveData = {};
                saveData.emp_id = this.emp_id;
                saveData.emp_name = this.emp_name;
                saveData.emp_ssn = this.emp_ssn;
                saveData.auth_id = this.auth_id;
                saveData.auth_pw = this.auth_pw;
                saveData.check_pw = this.check_pw;
                saveData.emp_email = this.emp_email;
                saveData.emp_edu = this.emp_edu;
                saveData.emp_work_ex = this.emp_work_ex;
                saveData.emp_skill = this.emp_skill;

                try {
                    this.$axios.post(`${HOST}/api/v1/auth/user`, JSON.stringify(saveData), {
                    headers: {
                        "Content-Type": `application/json`,
                        },
                    })
                    .then((response) => {
                        console.log(response)
                        if (response.data.errorCode === 400) {
                            alert(response.data.errorMessage)
                        }
                        else {
                            alert("신규 등록이 완료되었습니다. 로그인 화면으로 돌아갑니다")
                            this.$router.push({path: './Login'});
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        },
        // linkTologin() {
        //     this.$router.push({path:"./Login"});
        // },
        // check_emp_id() {
        //     // DB에 있는 emp_id에서 검색
        // },
        // check_auth_id() {
        //     // DB에 있는 auth_id와 중복 확인
        // },
        // check_emp_email() {
        //     // DB에 있는 emp_email과 중복 확인
        // },
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
