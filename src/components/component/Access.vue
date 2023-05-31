<template>
  <div class="wrapper">
    <div class="container">
      <h2>직원 권한 설정</h2>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>

      <b-form-input class="input-data" v-model="empId" placeholder="사번" readonly></b-form-input>
      
      <br>

      <b-form-input class="input-data" v-model="empName" placeholder="이름" readonly></b-form-input>
      
      <br>
    
      <div style="display: flex;">
        <select class="form-select form-control" style="width: 130px;" name="access_grade" v-model="accessGrade">
          <option value="">권한</option>
          <option value="0">대표</option>
          <option value="1">이사</option>
          <option value="2">관리자</option>
          <option value="3">직원</option>
          <option value="4">발주처</option>
          <option value="9">승인 전</option>
        </select>
      </div>
      
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>

      <div style="display: flex;">         
        <button @click="setPermission()" class="login100-form-btn profile-button eval-button" style="cursor: pointer" type="button">권한 설정</button>
        <button @click="cancle()" class="login100-form-btn profile-button eval-button" style="cursor: pointer" type="button">취소</button>
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
        
        if(res.data.status == 1) {
          alert(res.data.message); // 권한 변경 완료
        } else {
          alert(res.data.message); // 권한 변경 실패
        }
      }).catch((error) => {
        console.error('Failed to fetch data:', error);
      });
    },
    cancle() {
      this.$router.go(-1);
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

.small-btn {
    width: 100px;
    height: 25px;
    font-size: 10px;
    line-height: 1.5;
    color: #fff;
    text-transform: uppercase;
    border-radius: 25px;
    background: #33508A;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
    cursor: pointer;
  }
</style>
