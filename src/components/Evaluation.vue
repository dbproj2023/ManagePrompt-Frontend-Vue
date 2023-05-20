<template>
  <div class="Evaluation">
      <div id="Evaluation-head">
          Evaluation
      </div>
      <br>
      <b-card class="project-card">
        <div class="flex-row">
          <div class="flex-cell flex-header">프로젝트</div>
          <div class="flex-cell">
            <select name="cards_id"  class="form-select form-control"  v-model="selectedPro">
              <option value="">선택하세요</option>
              <option value="pro001">1</option>
              <option value="pro002">2</option>
              <option value="pro003">3</option>
            </select>
          </div>
          <div class="flex-cell flex-header">이름</div>
          <div class="flex-cell">
            <select name="cards_id"  class="form-select form-control"  v-model="selectedEmpName">
              <option value="">선택하세요</option>
              <option value="emp001">정아무개</option>
              <option value="emp002">김아무개</option>
              <option value="emp003">박아무개</option>
            </select>
          </div>
        </div>
      </b-card>

      <b-card class="evalEmp-card">
        <div class="flex-row">
          <div class="flex-cell flex-header">프로젝트명</div>
          <div class="flex-cell">배고프다</div>
          <div class="flex-cell flex-header">프로젝트 기간</div>
          <div class="flex-cell">종강</div>
        </div>
        <div class="flex-row">
          <div class="flex-cell flex-header">평가자</div>
          <div class="flex-cell">평가해</div>
          <div class="flex-cell flex-header">피평가자</div>
          <div class="flex-cell">평가받아</div>
        </div>
      </b-card>

      <b-card class="evalFrom-card">
        <span>문항을 읽고 가장 적절한 곳에 체크해주세요.</span>
        <div style="display: flex; padding-top: 20px;">
          <div style="flex:1; text-align: center;">1</div>
          <div style="flex:5">
            <p>이 직원의 업무 추진 실적, 문제 해결, 책임감 등을 종합적으로 고려했을 때 개인 업무 능력은 어떠했는가?</p>
            <div style="display: flex;">
              <b-form-checkbox> 매우 낮은 편이다.</b-form-checkbox>
              <b-form-checkbox> 낮은 편이다</b-form-checkbox>
              <b-form-checkbox> 중간정도이다</b-form-checkbox>
              <b-form-checkbox> 높은 편이다</b-form-checkbox>
              <b-form-checkbox> 매우 높은 편이다</b-form-checkbox>
            </div>
            <div style="padding-top: 20px;">
              <b-form-input style="height:100px" v-model="text" placeholder="Enter your name"></b-form-input>
            </div>
          </div>
        </div>
        <hr style="border: solid 0.1px"> 
        <div style="display: flex; padding-top: 20px;">
          <div style="flex:1; text-align: center;">1</div>
          <div style="flex:5">
            <p>이 직원의 팀원 또는 고객과의 협조, 기여, 협상 등을 종합적으로 고려했을 때 커뮤니케이션 능력은 어떠했는가?</p>
            <div style="display: flex;">
              <b-form-checkbox> 매우 낮은 편이다.</b-form-checkbox>
              <b-form-checkbox> 낮은 편이다</b-form-checkbox>
              <b-form-checkbox> 중간정도이다</b-form-checkbox>
              <b-form-checkbox> 높은 편이다</b-form-checkbox>
              <b-form-checkbox> 매우 높은 편이다</b-form-checkbox>
            </div>
            <div style="padding-top: 20px;">
              <b-form-input style="height:100px" v-model="text" placeholder="Enter your name"></b-form-input>
            </div>
          </div>
        </div>
      </b-card>

      
      
  </div>
</template>

<style scoped>
div {
  flex: 1200px;
}
</style>

<script>
export default {
name: "Evaluation",
data() {
  return {
    selectedPro: '',
    selectedEmpName: '',
    selected: [], // Must be an array reference!
    options: [
      { text: '매우 낮은 편이다', value: '1' },
      { text: '낮은 편이다', value: '2' },
      { text: '중간정도이다', value: '3' },
      { text: '높은 편이다', value: '4' },
      { text: '매우 높은 편이다', value: '5' }
    ]
  }
}
};
</script>

<style scoped>

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
span{
  font-weight: bold;
}

.project-card{
  height: 85px;
  width: 80%;
  padding: auto;
  margin-left: 30px;
}
.evalEmp-card{
  margin-top: 10px;
  height: 120px;
  width: 80%;
  padding: auto;
  margin-left: 30px;
}

.evalFrom-card{
  margin-top: 10px;
  height: 500px;
  width: 80%;
  padding: auto;
  margin-left: 30px;
}

.flex-row{
  display: flex;
}
.flex-header{
  /* font-weight: bold; */
  background-color: #f0f0f0;
  border: 0.6px solid #ccc;
}


.flex-cell {
  flex: 1;
  padding: 8px;
  border: 0.6px solid #ccc;
  white-space: pre-wrap;
  text-align: center;
}

.Evaluation{
  background-color: #ccc;
}
</style>
