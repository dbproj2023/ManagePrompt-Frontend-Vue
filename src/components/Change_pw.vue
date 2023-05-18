<template>
    <div id="change_pw">
        <div>
            <h2>비밀번호 변경</h2>
        </div>
        <hr>
        <form class="form-inputs" name="change_pw_form" method="get">
            <input type="password" id="pre_emp_pw" name="pre_emp_pw" size="15" v-model="input.pre_emp_pw" placeholder="이전 비밀번호"/>
            <input type="password" id="new_emp_pw" name="new_emp_pw" size="15" v-model="input.new_emp_pw" placeholder="새로운 비밀번호"/>
            <input type="password" id="new_emp_pw_check" name="new_emp_pw_check" size="15" v-model="input.new_emp_pw_check" placeholder="비밀번호 확인"/>
            <input type="submit" value="변경" @click="change()">
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: {
                pre_emp_pw: "",
                new_emp_pw: "",
                new_emp_pw_check: ""
            }
        }
    },
    methods: {
        change() {
            if(this.input.pre_emp_pw != "" && this.input.new_emp_pw != "" && this.input.new_emp_pw_change != "") {
                if(this.input.pre_emp_pw == this.$parent.mockAccount.pre_emp_pw) {
                    this.$emit("authenticated", true);
                    // this.$router.replace({ name: "Secure" });
                } else {
                    console.log("비밀번호가 일치하지 않습니다");
                }
            } else {
                console.log("모두 입력해야 합니다");
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
