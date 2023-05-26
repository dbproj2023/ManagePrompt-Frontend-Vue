<template>
    <div>
        <div>
            <button type="button" @click="navigateToChangePW()">비밀번호 변경</button>
            <button type="button" @click="saveData()">저장</button>
        </div>
        
        <b-card no-body>
            <img src="" alt="사원의 증명사진" width="" height="">
            <table>
                <tbody>
                    <tr>
                        <th><label for="emp_id">사번</label></th>
                        <td>
                            <input type="text" id="emp_id" name="emp_id" v-model="emp_id" @input="emp_id = $event.target.value"/>
                        </td>
                        <th><label for="emp_name">이름</label></th>
                        <td>
                            <input type="text" id="emp_name" name="emp_name" v-model="emp_name" @input="emp_name = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_jncmp_ymd">입사일자</label></th>
                        <td>
                            <input type="text" id="emp_jncmp_ymd" name="emp_jncmp_ymd" v-model="emp_join_date" @input="emp_jncmp_ymd = $event.target.value"/>
                        </td>
                        <th><label for="emp_edu">학력</label></th>
                        <td>
                            <input type="text" id="emp_edu" name="emp_edu" v-model="emp_edu" @input="emp_edu = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_ph">전화번호</label></th>
                        <td>
                            <input type="tel" id="emp_ph" name="" v-model="emp_ph" @input="emp_ph = $event.target.value"/>
                        </td>
                        <th><label for="emp_email">이메일</label></th>
                        <td>
                            <input type="email" id="emp_email" name="emp_email" v-model="emp_email" @input="emp_email = $event.target.value"/>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="emp_work_ex">경력</label></th>
                        <td>
                            <input type="textarea" id="emp_work_ex" name="emp_work_ex" v-model="emp_work_ex" @input="emp_work_ex = $event.target.value"/>
                        </td>
                        <th><label for="emp_skill">스킬</label></th>
                        <td>
                            <input type="textarea" id="emp_skill" name="emp_skill" v-model="emp_skill" @input="emp_skill = $event.target.value"/>
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
                emp_ph: "",
                emp_email: "",
                emp_work_ex: "",
                emp_skill: "",
                emp_join_date: "",
                created_at: ""
            }
        },
        mounted() {
            try {
                axios.get('api/v1/user/info/read').then((res) => {
                    console.log('API response:', res.data);
                    this.emp_id = res.data.emp_id;
                    this.emp_name = res.data.emp_name;
                    this.emp_ssn = res.data.emp_ssn;
                    this.emp_edu = res.data.emp_edu;
                    this.emp_ph = res.data.emp_ph;
                    this.emp_email = res.data.emp_email;
                    this.emp_work_ex = res.data.emp_workex;
                    this.emp_skill = res.data.emp_skill;
                    this.created_at = res.data.created_at;
                    this.emp_join_date = this.extractedDate();
                });
            } catch (error) {
                console.error(error);
            }
        },
        methods: {
            extractedDate() {
                const date = new Date(this.created_at); // MySQL 생성 시간을 JavaScript Date 객체로 변환
                const extracted = date.toISOString().slice(0, 10); // 날짜만 추출 (YYYY-MM-DD 형식)
                return extracted;
            },
            navigateToChangePW() {
                this.$router.push(`/changePW`);
            },
            saveData() {
                const formData = new FormData;
                formData.append("emp_edu", this.emp_edu);
                formData.append("emp_ph", this.emp_ph);
                formData.append("emp_email", this.emp_email);
                formData.append("emp_workex", this.emp_work_ex);
                formData.append("emp_skill", this.emp_skill);

                try{
                    axios.patch('/api/v1/user/info/update', formData).then((res) => {
                        console.log("res.data:", res.data);
                    });
                } catch(error) {
                    console.error(error);
                }
            }
        }
    }
</script>

<style>
