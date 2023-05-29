<template>
  <div class="wrapper">
    <div class="container">
      <h2>직원 권한 설정</h2>
      <br>
      <br>

      <b-form-input class="input-data" v-model="empId" placeholder="사번"></b-form-input>
      
      <b-form-input class="input-data" v-model="empName" placeholder="이름"></b-form-input>
      
      <div style="display: flex;">
        <select class="form-select form-control" style="width: 130px;" name="access_grade" v-model="accessGrade">
          <option value="0">대표</option>
          <option value="1">이사</option>
          <option value="2">관리자</option>
          <option value="3">직원</option>
          <option value="4">발주처</option>
          <option value="9">승인 전</option>
        </select>
      </div>
      
      <div>         
        <button @click="setPermission()" class="login100-form-btn pro-button search-button" type="button">권한 설정</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      empId: this.$route.params.id, // EmployeeTable에서 선택한 row의 이름, 아이디 가져오기
      empName: this.$route.query.name,
      accessGrade: '',
    }
  },
  methods: {
    setPermission() {
      const formData = new FormData();
      formData.append('emp_id', this.empId);
      formData.append('emp_name', this.empName);
      formData.append('access_grade', this.accessGrade);

      axios.patch('/api/v1/auth/role/update', formData).then((res) => {
        console.log({ formData });
        console.log('API response:', res.data);
      }).catch((error) => {
        console.error('Failed to fetch data:', error);
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: #fff;
  width:444px;
  height: 724px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.input-data{
margin-bottom: 10px;
width: 300px;
}
</style>