<template>
    <div id="find_id">
        <!-- <div>
            <h2>아이디 찾기</h2>
        </div>
        <hr> -->
        <form class="form-inputs" name="find_id_form" method="get">
            아이디 찾기
            <input type="email" id="emp_email" name="emp_email" size="15" v-model="input.emp_email" placeholder="이메일"/>
            <!-- <input type="submit" value="확인" @click="check()"> -->
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: {
                emp_email: ""
            }
        }
    },
    methods: {
        check() {
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
