<template>
    <div id="find_id">
        <!-- <div>
            <h2>아이디 찾기</h2>
        </div>
        <hr> -->
        <form class="form-inputs" name="find_id_form" method="get">
            아이디 찾기
            <div>
                <input type="email" id="emp_email" name="emp_email" v-model="empEmail" placeholder="이메일"/>
                <input type="button" value="이메일 인증 발송" @click="sendToEmail()">
            </div>
            <div>
                <input type="number" id="verify_code" name="verify_code" v-if="inputVisible" v-model="verifyCode" placeholder="인증코드"/>
                <input type="button" value="인증번호 확인" v-if="inputVisible" @click="checkVerifyCode()">
            </div>
            <div>
                <p type="text" id="hidden_auth_id" name="hidden_auth_id">{{ hiddenAuthId }}</p>
                <input type="button" value="로그인" v-if="buttonVisible" @click="goToLogin()">
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            empEmail: "",
            inputVisible: false,
            verifyCode: "",
            hiddenAuthId: "",
            buttonVisible: false
        }
    },
    methods: {
        sendToEmail() {
            let formData = new FormData();
            formData.append("emp_email", this.empEmail);

            axios.post('/api/v1/auth/checkEmail', formData).then((res) => {
                if( res.data == true ) {
                    this.showInput();

                    // 인증코드 발송
                    let formData2 = new FormData();
                    formData2.append("email", this.empEmail);

                    axios.post('/api/v1/auth/help/sendEmail', formData2).then((res) => {
                        if( res.data.status == 1 ){
                            alert(res.data.message); // 이메일이 발송되었습니다.
                        }
                        else if( res.data.status == 0 ){
                            alert(res.data.message); // 이메일 발송 실패
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
                    
                    let formData = new FormData()
                    formData.append("email", this.empEmail);

                    axios.get('/api/v1/auth/help/findID', formData).then((res) => {
                        if( res.data.status == 1 ) {
                            this.hiddenAuthId = res.data.auth_id;
                            this.buttonVisible = true;
                        } else if( res.data.status == 0) {
                            alert(res.data.message); // 관련 정보가 없습니다.
                        }
                    });
                }
                else if( res.data.status == 0 ){
                    alert(res.data.message); // 인증번호 불일치
                }
            });
        },
        goToLogin() {
            this.$router.push('/login');
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
