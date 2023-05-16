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
                            <input type="text" id="emp_id" name="emp_id" @input="emp_id = $event.target.value"/>
                            <button type="button" @click="check_emp_id()">사번 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_name">이름</label></th>
                        <td>
                            <input type="text" id="emp_name" name="emp_name" @input="emp_name = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="auth_id">아이디</label></th>
                        <td>
                            <input type="text" id="auth_id" name="auth_id" @input="auth_id = $event.target.value"/>
                            <button type="button" @click="check_auth_id()">중복 확인</button>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="auth_pw">비밀번호</label></th>
                        <td>
                            <input type="password" id="auth_pw" name="auth_pw" @input="auth_pw = $event.target.value"/>
                            <p>영문 대소문자, 숫자, 특수문자 중 3종류 이상을 조합하여 8글자 이상 20글자 이하로 작성</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="check_pw">비밀번호 확인</label></th>
                        <td>
                            <input type="password" id="check_pw" name="check_pw" @input="check_pw = $event.target.value"/>
                            <p id="match">비밀번호가 일치합니다</p>
                            <p id="not_match">비밀번호가 일치하지 않습니다</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_email">이메일</label></th>
                        <td>
                            <input type="email" id="emp_email" name="emp_email" @input="emp_email = $event.target.value"/>
                            <button type="button" @click="check_emp_email()">중복 확인</button>   
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_work_ex">경력</label></th>
                        <td>
                            <input type="textarea" id="emp_work_ex" name="emp_work_ex" @input="emp_work_ex = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_skill">스킬</label></th>
                        <td>
                            <input type="textarea" id="emp_skill" name="emp_skill" @input="emp_skill = $event.target.value"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" @click="enroll()">등록</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            emp_id: "",
            emp_name: "",
            auth_id: "",
            auth_pw: "",
            check_pw: "",
            emp_email: "",
            emp_work_ex: "",
            emp_skill: ""
        }
    },
    methods: {
        check_emp_id() {
            // DB에 있는 emp_id에서 검색
        },
        check_auth_id() {
            // DB에 있는 auth_id와 중복 확인
        },
        check_emp_email() {
            // DB에 있는 emp_email과 중복 확인
        },
        enroll() {
            // DB에 등록
        }
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
