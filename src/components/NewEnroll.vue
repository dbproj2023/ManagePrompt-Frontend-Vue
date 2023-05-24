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
                        <th><label for="join_year">입사년도</label></th>
                        <td>
                            <select class="form-select form-control" style="width: 130px;" name="join_year" v-model="selectedYear" @change="checkJoinYear($event)">
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                            <p>{{ message_join_year }}</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="roll">직무</label></th>
                        <td>
                            <select class="form-select form-control" style="width: 130px;" name="role" v-model="selectedRoll" @change="checkRoll($event)">
                                <option value="0">경영진</option>
                                <option value="1">PM</option>
                                <option value="2">PL</option>
                                <option value="3">분석가</option>
                                <option value="4">설계자</option>
                                <option value="5">프로그래머</option>
                                <option value="6">테스터</option>
                                <option value="7">디자이너</option>
                            </select>
                            <p>{{ message_roll }}</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_id">사번</label></th>
                        <td>
                            <button type="button" @click="createEmpId()">사번 생성</button>
                            <input type="text" id="emp_id" name="emp_id" v-model="emp_id" required :values="emp_id" @input="emp_id = $event.target.value"/>
                            <button type="button" @click="checkEmpId()">중복 확인</button>
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
                            <button type="button" @click="createAuthId()">아이디 생성</button>
                            <input type="text" id="auth_id" name="auth_id" v-model="auth_id" required :values="auth_id" @input="auth_id = $event.target.value"/>
                            <button type="button" @click="checkAuthId()">중복 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="auth_pw">비밀번호</label></th>
                        <td>
                            <button type="button" @click="createAuthPw()">비밀번호 생성</button>
                            <input type="text" id="auth_pw" name="auth_pw" v-model="auth_pw" required :values="auth_pw" @focusout="checkAuthPw()" @input="auth_pw = $event.target.value"/>
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
            join_year: "",
            roll: "",
            emp_id: "",
            emp_name: "",
            auth_id: "",
            auth_pw: "",
            message_join_year: "",
            message_roll: "",
            message_emp_name: "",
            message_auth_pw: "",
            selectedYear: "",
            selectedRoll: "",
            str_join_year: "",
            str_roll: "",
            str_emp_id: "",
            str_random_num: "",
            str_emp_id: "",
        }
    },
    methods: {
        enrollSubmit() {
            const validate_emp_id = /^\d{8}$/
            const validate_pw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/

            console.log("test code empId : ", this.emp_id)
            if( this.emp_id == '' ) {
                alert("사번을 생성해 주세요.");
                return;
            } else if( !validate_emp_id.test(this.emp_id) ) {
                alert("사번을 정확히 입력해 주세요.");
                return;
            }

            if( this.emp_name == '' ) {
                alert("이름을 입력해 주세요.");
                return;
            }

            if( this.auth_id == '' ) {
                alert("아이디를 생성해 주세요.");
                return;
            } else if( this.auth_id.length < 6 || this.auth_id.length > 12 ) {
                alert("아이디는 6자리 이상, 12자리 이하로 생성해야 합니다.");
                return;
            }

            if( this.auth_pw == '' ) {
                alert("비밀번호를 생성해 주세요.");
                return;
            } else if( !validate_pw.test(this.auth_pw) ) {
                alert("비밀번호는 8글자 이상, 20글자 이하이며 영문, 숫자, 특수문자가 포함되어야 합니다.");
                return;
            }

            let formData = new FormData();
            formData.append("emp_id", this.emp_id);
            formData.append("emp_name", this.emp_name);
            formData.append("auth_id", this.auth_id);
            formData.append("auth_pw", this.auth_pw);

            axios.post(`api/v1/auth/new-user`, formData).then((res) => {
                console.log("test code /user : ", res)
                if( !isNaN(res.data) ){ // 뭘로 받아야 되지...?
                    alert("초기 정보 등록이 완료되었습니다.")
                    this.$router.push({path: './newEnroll'});
                }
            });
        },
        checkJoinYear(e) {
            console.log("test code this.selectedYear: ", this.selectedYear);

            this.str_join_year = this.selectedYear.toString();
            console.log("test code this.str_join_year: ", this.str_join_year);

            this.str_join_year = e.target.value.toString();
            console.log("test code this.str_join_year: ", this.str_join_year);
        },
        checkRoll(e) {
            console.log("test code this.selectedRoll: ", this.selectedRoll);

            this.str_roll = this.selectedRoll.toString();
            console.log("test code str_roll: ", this.str_roll);

            this.str_roll = e.target.value.toString();
            console.log("test code str_roll: ", this.str_roll);
        },
        createEmpId() {
            // 사번 생성 버튼 누르면 알람창으로 입사년도, 직무 입력 받아 해당 사번 생성해서 화면에 띄우기 -> emp_id가 되는 것
            console.log("test code empId : ", this.emp_id)
            
            if( this.selectedYear == "" ) {
                this.message_join_year = "입사년도를 선택해 주세요.";
                return;
            }
            if( this.selectedRoll == "" ) {
                this.message_roll = "직무를 선택해 주세요.";
                return;
            }

            this.str_emp_id = this.str_join_year.charAt(2) + this.str_join_year.charAt(3) + '0' + this.str_roll;
            console.log("test code str_emp_id : ", this.str_emp_id)

            this.str_random_num = this.generateRandomCode(4)
            console.log("test code str_random_num : ", this.str_random_num)

            this.str_emp_id = this.str_emp_id + this.str_random_num;
            console.log("test code str_emp_id : ", this.str_emp_id)

            this.emp_id = parseInt(this.str_emp_id);
            console.log("test code emp_id : ", this.emp_id)
        },
        checkEmpId() {
            const validate_emp_id = /^\d{8}$/

            console.log("test code empId : ", this.emp_id)
            if( this.emp_id == '' ) {
                alert("사번을 생성해 주세요.")
                return;
            } else if( !validate_emp_id.test(this.emp_id) ) {
                alert("사번을 정확히 입력해 주세요.")
                return
            }

            let formData = new FormData();
            formData.append("emp_id", this.emp_id);

            axios.post(`api/v1/auth/checkEMPID`, formData).then((res) => {
                console.log("test code checkEMPID : ", res)
                if( res.data == true ){
                    alert("이미 등록된 사번입니다. 다시 생성해 주세요.")
                } else {
                    alert("등록 가능한 사번입니다.")  // 만들어 준 사번
                }
            });
        },
        checkEmpName() {
            // -> emp_name이 되는 것
            if( this.emp_name == '' ) {
                this.message_emp_name = "이름을 입력해 주세요.";
                return;
            } else {
                this.message_emp_name = "";
                return;
            }
        },
        createAuthId() {
            // 아이디 생성 버튼 누르면 아이디 형식에 맞게 랜덤 생성해서 화면에 띄우기 -> auth_id가 되는 것
            this.str_random_num = this.generateRandomCode(8);
            this.auth_id = "e" + this.str_random_num;
            console.log("test code auth_id : ", this.auth_id);
        },
        checkAuthId() {
            if( this.auth_id == '' ) {
                alert("아이디를 생성해 주세요.")
                return
            } else if( this.auth_id.length < 6 || this.auth_id.length > 12 ) {
                alert("아이디는 6자리 이상, 12자리 이하로 생성해야 합니다.")
                return
            }

            let formData = new FormData();
            formData.append("auth_id", this.auth_id);

            axios.post(`api/v1/auth/checkID`, formData).then((res) => {
                console.log("test code auth_id : ", res)
                if( res.data == true ){
                    alert("이미 사용 중인 아이디입니다. 다시 생성해 주세요.")
                }else {
                    alert("사용 가능한 아이디입니다.")
                }
            });
        },
        createAuthPw() {
            this.str_random_num = Math.random().toString(36).substr(2,12);
            this.auth_pw = this.str_random_num + "!";
            console.log("test code auth_pw : ", this.auth_pw);
        },
        checkAuthPw() {
            // 비밀번호 생성 버튼 누르면 비밀번호 형식에 맞게 랜덤 생성해서 화면에 띄우기 -> auth_pw가 되는 것
            const validate_pw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/
            
            if( this.auth_pw == '' ) {
                this.message_auth_pw = "비밀번호를 생성해 주세요.";
                return;
            } else if( !validate_pw.test(this.auth_pw) ) {
                this.message_auth_pw = "비밀번호는 8글자 이상, 20글자 이하이며 영문, 숫자, 특수문자가 포함되어야 합니다.";
                return;
            } else {
                this.message_auth_pw = "";
                return;
            }
        },
        generateRandomCode(n) {
            let str = ''
            for (let i = 0; i < n; i++) {
                str += Math.floor(Math.random() * 10)
            }
            return str
        }
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
