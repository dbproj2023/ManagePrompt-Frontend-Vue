<template>
    <div id="find_pw">
        <!-- <div>
            <h2>비밀번호 찾기</h2>
        </div>
        <hr> -->
        <form class="form-inputs" name="find_pw_form" method="get">
            비밀번호 찾기
            <div>
                <input type="text" id="auth_id" name="auth_id" v-model="authId" placeholder="아이디"/>
                <input type="email" id="emp_email" name="emp_email" v-model="empEmail" placeholder="이메일"/>
                <input type="button" value="이메일 인증 발송" @click="sendToEmail()">
            </div>
            <div>
                <input type="number" id="verify_code" name="verify_code" v-if="inputVisible" v-model="verifyCode" placeholder="인증코드"/>
                <input type="button" value="인증번호 확인" v-if="inputVisible" @click="checkVerifyCode()">
            </div>
            <div>
                
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            authId: "",
            empEmail: "",
            inputVisible: false,
            verifyCode: ""
        }
    },
    methods: {
        sendToEmail() {
            let formData = new FormData();
            formData.append("empEmail", this.empEmail);

            axios.post('/api/v1/auth/checkEmail', formData).then((res) => {
                if( res.data == true ) {
                    let formData2 = new FormData();
                    formData2.append("id", this.authId);
                    formData2.append("email", this.empEmail);
                    
                    axios.post('/api/v1/auth/help/resetPW/checkAccountInfo', formData2).then((res) => {
                        if( res.data.status == 1 ) { // 이메일과 일치하는 아이디 있음
                            this.showInput();

                            // 인증코드 발송
                            let formData3 = new FormData();
                            formData3.append("email", this.empEmail);

                            axios.post('/api/v1/auth/help/sendEmail', formData3).then((res) => {
                                if( res.data.status == 1 ){
                                    alert(res.data.message); // 이메일이 발송되었습니다.
                                }
                                else if( res.data.status == 0 ){
                                    alert(res.data.message); // 이메일 발송 실패
                                }
                            });
                        } else { // 이메일과 일치하는 아이디 없음
                            alert("등록되지 않은 아이디입니다.");
                        }
                    });
                } else {
                    alert("등록되지 않은 이메일입니다.");
                }
            });
        },
        showInput() {
            this.inputVisible = true;
            return;
        },
        checkVerifyCode() {
            let formData = new FormData();
            formData.append("email", this.empEmail);
            formData.append("verifyCode", this.verifyCode);
            console.log("test code formData:", formData);

            // 인증코드가 일치하면 아이디와 비밀번호를 보내달라고 하기
            axios.post('/api/v1/auth/help/verifyEmail', formData ).then((res) => {
                console.log("test code: post 통신");
                if( res.data.status == 1 ){
                    alert(res.data.message); // 인증번호 일치
                    
                    // 비밀번호 변경 페이지로 이동
                    this.$router.push('/logoutChangePw');
                }
                else if( res.data.status == 0 ){
                    alert(res.data.message); // 인증번호 불일치
                }
            });
        }
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
