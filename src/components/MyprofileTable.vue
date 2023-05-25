<template>
    <div>
        <b-card no-body>
            <img src="" alt="사원의 증명사진" width="" height="">
            <table>
                <tbody>
                    <tr>
                        <th><label for="emp_id">사번</label></th>
                        <td>
                            <input type="text" id="emp_id" name="emp_id" value="23050002" @input="emp_id = $event.target.value"/>
                        </td>
                        <th><label for="emp_name">이름</label></th>
                        <td>
                            <input type="text" id="emp_name" name="emp_name" value="봉현수" @input="emp_name = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_jncmp_ymd">입사일자</label></th>
                        <td>
                            <input type="text" id="emp_jncmp_ymd" name="emp_jncmp_ymd" value="2020/03/01" @input="emp_jncmp_ymd = $event.target.value"/>
                        </td>
                        <th><label for="emp_acbg">학력</label></th>
                        <td>
                            <input type="text" id="emp_acbg" name="emp_acbg" value="석사" @input="emp_acbg = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_tel">전화번호</label></th>
                        <td>
                            <input type="tel" id="emp_tel" name="" value="010-1234-5678" @input="emp_tel = $event.target.value"/>
                        </td>
                        <th><label for="emp_email">이메일</label></th>
                        <td>
                            <input type="email" id="emp_email" name="emp_email" value="abc02@prompt.com" @input="emp_email = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_work_ex">경력</label></th>
                        <td>
                            <input type="textarea" id="emp_work_ex" name="emp_work_ex" value="3" @input="emp_work_ex = $event.target.value"/>
                        </td>
                        <th><label for="emp_skill">스킬</label></th>
                        <td>
                            <input type="textarea" id="emp_skill" name="emp_skill" value="Spring" @input="emp_skill = $event.target.value"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </b-card>
    </div>
</template>

<script>
    import { Table, TableColumn } from 'element-ui'
    import axios from 'axios'

    export default {
        name: 'MyprofileTable',
        components: {
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        data() {
            return {
                emp_id: "",
                emp_name: "",
                emp_ssn: "",
                emp_edu: "",
                emp_email: "",
                emp_work_ex: "",
                emp_skill: "",
                emp_ph: "",
                created_at: ""
            }
        },
        mounted() {
            try {
                axios.get('/api/v1/user/info/read').then((res) => {
                    console.log('API response:', res.data);
                    this.project = res.data;
                });
            } catch (error) {
                console.error(error);
            }
        },
        computed: {
        }
    }
</script>

<style>
