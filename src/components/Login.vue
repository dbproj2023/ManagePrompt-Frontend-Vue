<template>
    <div id="login">
        <div>
            <h2>로그인</h2>
        </div>
        <hr>
        <form class="form-inputs" name="login_form" method="get">
            <input type="text" id="emp_id" name="emp_id" size="15" v-model="input.emp_id" placeholder="아이디"/>
            <input type="password" id="emp_pw" name="emp_pw" size="15" v-model="input.emp_pw" placeholder="비밀번호"/>
            <input type="submit" value="로그인" @click="login()">
            <div>
                <a id="find_id" :href="find_id"><strong>아이디 찾기</strong></a>
                <a id="find_pw" :href="find_pw"><strong>비밀번호 찾기</strong></a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: {
                emp_id: "",
                emp_pw: ""
            },
            find_id: "#",
            find_pw: "#",
        }
    },
    methods: {
        login() {
            if(this.input.emp_id != "" && this.input.emp_pw != "") {
                if(this.input.emp_id == this.$parent.mockAccount.emp_id && this.input.emp_pw == this.$parent.mockAccount.emp_pw) {
                    this.$emit("authenticated", true);
                    // this.$router.replace({ name: "Secure" });
                } else {
                    console.log("아이디/비밀번호가 일치하지 않습니다.");
                }
            } else {
                console.log("아이디와 비밀번호가 있어야 합니다.");
            }
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
