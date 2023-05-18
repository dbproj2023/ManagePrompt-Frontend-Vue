<template>
    <div id="access">
        <div>
            <h2>권한 설정</h2>
        </div>
        <hr>
        <form class="form-inputs" name="access_form" method="get">
            <div>
                <p>사번</p>
                <!-- <label id="emp_id" name="emp_id">{{ emp_id }}</label> -->
            </div>
            <div>
                <p>이름</p>
                <!-- <label id="emp_name" name="emp_name">{{ emp_name }}</label> -->
            </div>
            <div>
                <p>권한</p>
                <select name="access">
                    <option value="0">대표</option>
                    <option value="1">이사</option>
                    <option value="2">관리자</option>
                    <option value="3">직원</option>
                    <option value="9" selected>승인 전</option>
                </select>
            </div>

            <input type="submit" value="수정" @click="change()">
        </form>
    </div>
</template>

<script>
import emp from './EmployeeTable.vue';
export default {
    data() {
        return {
            // emp_id: emp.emp_id,
            // emp_name: emp.emp_name
        }
    },
    methods: {
        change() {
            
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
