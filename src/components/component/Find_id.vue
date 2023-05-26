<template>
    <div id="find_id">
        <!-- <div>
            <h2>아이디 찾기</h2>
        </div>
        <hr> -->
        <form class="form-inputs" name="find_id_form" method="get">
            아이디 찾기
            <div>
                <input type="email" id="emp_email" name="emp_email" v-model="emp_email" placeholder="이메일"/>
                <input type="button" value="이메일 인증 발송" @click="sendToEmail()">
            </div>
            <div>
                <input type="text" id="verify_code" name="verify_code" v-if="input_visible" v-model="verify_code" placeholder="인증코드"/>
                <input type="button" value="인증번호 확인" v-if="input_visible" @click="checkVerifyCode()">
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            emp_email: "",
            input_visible: false,
            verify_code: ""
        }
    },
    methods: {
        sendToEmail() {
            this.showInput();

            let formData = new FormData();
            formData.append("email", this.emp_email);

            // 이메일이 DB에 있는 지 확인하고 인증코드 발송하게 해달라고 하기
            axios.post('/api/v1/auth/help/sendEmail', formData ).then((res) => {
                if( res.data.status == 1 ){
                    alert(res.data.message);
                }
                else if( res.data.status == 0 ){
                    alert(res.data.message);
                }
            });
        },
        showInput() {
            this.input_visible = true;
            return;
        },
        checkVerifyCode() {
            let formData = new FormData();
            formData.append("email", this.emp_email);
            formData.append("verifyCode", this.verify_code);

            // 인증코드가 일치하면 아이디와 비밀번호를 보내달라고 하기
            axios.post('/api/v1/auth/help/verifyEmail', formData ).then((res) => {
                if( res.data.status == 1 ){
                    alert(res.data.message);
                    
                    // this.$router.push('/Login');
                }
                else if( res.data.status == 0 ){
                    alert(res.data.message);
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
