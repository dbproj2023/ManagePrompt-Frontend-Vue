<template>
    <div>
        <div class="card shadow-lg mt-n6">
            <div class="card-body p-3">
                <div class="row gx-4">
                    <div class="col-auto">
                        <i class="fa-solid fa-address-card fa-xl"></i>                   
                     </div>
                    <div class="col-auto my-auto">
                    <div class="h-100">
                    <h5 class="mb-1">직원 이름 !!!!!!</h5>
                    <p class="mb-0 font-weight-bold text-sm">Prompt Solution</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <br>
    <div class="card shadow-lg mt-n6">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0" style="font-weight: bold">My Profile</p>

              </div>
            </div>
       <div class="card-body p-3">
              <p class="text-uppercase text-sm">User Information</p>
              <div class="row">
                <div class="col-md-6">
                   <label for="example-text-input" class="form-control-label">사번</label>
                   <input  class="form-control" type="text" id="emp_id" name="emp_id" v-model="emp_id" @input="emp_id = $event.target.value"/>
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">이름</label >
                    <input  class="form-control" type="text" id="emp_name" name="emp_name" v-model="emp_name" @input="emp_name = $event.target.value"/>
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">입사일자</label>
                  <input  class="form-control" type="text" id="emp_jncmp_ymd" name="emp_jncmp_ymd" v-model="emp_join_date" @input="emp_jncmp_ymd = $event.target.value"/>
                </div>
                <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">학력</label >
                <input  class="form-control" type="text" id="emp_edu" name="emp_edu" v-model="emp_edu" @input="emp_edu = $event.target.value"/>
                </div>
                <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">경력</label >
                <input  class="form-control" type="textarea" id="emp_work_ex" name="emp_work_ex" v-model="emp_work_ex" @input="emp_work_ex = $event.target.value"/>
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">스킬</label >
                    <input  class="form-control" type="textarea" id="emp_skill" name="emp_skill" v-model="emp_skill" @input="emp_skill = $event.target.value"/>
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">CONTACT INFORMATION</p>
              <div class="row">
              <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">전화번호</label >
                    <input  class="form-control" type="tel" id="emp_ph" name="" v-model="emp_ph" @input="emp_ph = $event.target.value"/>
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">이메일</label>
                  <input  class="form-control" type="email" id="emp_email" name="emp_email" v-model="emp_email" @input="emp_email = $event.target.value"/>
                </div>
                </div>
              </div>
              <div class="button-container" style="display:felx; margin:10px">
                <button class="login100-form-btn profile-button" type="button" @click="navigateToChangePW()">비밀번호 변경</button>
                <button class="login100-form-btn profile-button" type="button" @click="saveData()">내 정보 수정</button>
              </div>
              <br>
              
            </div>
           </div>
        </div>
    </div>
    </div>
</template>

<script>
    import { Table, TableColumn } from 'element-ui'
    import axios from 'axios'

    export default {
        name: 'MyprofilefileTable',
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
            axios.get('/api/v1/user/info/read').then((res) => {
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
            }).catch((error) => {
                console.log(error);
            });
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
                const formData = new FormData();
                formData.append("emp_edu", this.emp_edu);
                formData.append("emp_ph", this.emp_ph);
                formData.append("emp_email", this.emp_email);
                formData.append("emp_workex", this.emp_work_ex);
                formData.append("emp_skill", this.emp_skill);

                try{
                    axios.patch('/api/v1/user/info/update', formData).then((res) => {
                        console.log("res.data:", res.data);
                        alert(res.data.message);
                        window.location.reload();
                    });
                } catch(error) {
                    console.error(error);
                }
            }
        }
    }
</script>

<style>
.profile-button {
  margin-top: 10px;
  width: 120px;
  height: 40px;
  background-color: #394F85;
  /* background-color: #c1d9db; */
  /* #33508A; */
  color: white;
  font-size: 12px;
}

</style>
