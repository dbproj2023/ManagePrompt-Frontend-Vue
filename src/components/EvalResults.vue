<template>
  <div>
    <div class="result-container">

      <div v-if="isLoading">
          로딩중 !
       </div>
      <div v-else class="result">
        <b-card class="avgresult" title="평가결과 종합" >
          <div class="myProfile">
            <img src="./img/theme/team-1.jpg" height="130px" width="130px" alt="로고" class="logo">
            <p>{{ this.myName }}</p>
          </div>

          <b-card class="rating">종합평가: {{   averageValues}}</b-card>
          <b-card class="rating">커뮤니케이션 평가: {{  averagecommunication}}</b-card>
          <b-card class="rating">업무수행 평가: {{ averageperform }}</b-card>
         
        </b-card>


      </div>
      <div class="result">
        <b-card class="allresult" title="프로젝트 별 평가결과" >
          나는 문어

        </b-card>
        

      </div>
    </div>
  </div>

</template>
  
  
  <script>
  import ProjectTable from './ProjectTable.vue';
  import axios from "axios"; // http 통신을 위한 라이브러리
  const HOST =  "http://localhost:8080";
  
  export default {
    name: "Detail",
      data() {
        return {
          avgflag: true,
          issLoading : true,
          myName: '',
          performrating: [],
          communirating: []
        }
    },
    mounted() {
      const apiUrl = `${HOST}/api/v1/user/info/read`
      try {
      const url = new URL(apiUrl);
      console.log('URL:', url);
      axios.get(apiUrl).then((res) => {
        console.log('API response:', res.data);
        this.myName = res.data.emp_name;
      });
      } catch (error) {
        console.error('Invalid API URL:', apiUrl);
        console.error(error);
      }

      const apiUrl1 = `${HOST}/api/v1/evaluation/coworker/read`
      try {
      const url = new URL(apiUrl1);
      console.log('URL:', url);
      axios.get(apiUrl1).then((res) => {
        console.log("나는 문어")
        console.log('API response:', res.data);

        console.log(res.data.projectEvaluationList[0].evaluationList)

        for (let i = 0; i < res.data.projectEvaluationList.length; i++) {
          const parsingdata = res.data.projectEvaluationList[i].evaluationList
          for (let j=0; j<parsingdata.length; j++){
            console.log(parsingdata[j].communicationRating);
            console.log(parsingdata[j].performanceRating);

            this.performrating.push(parsingdata[j].performanceRating);
            this.communirating.push(parsingdata[j].communicationRating);

          }
              
        // Store empName and empId in the dictionary
        // this.empList[empId] = empName;
      }
        this.myName = res.data.emp_name;
      });
    } catch (error) {
      console.error('Invalid API URL:', apiUrl1);
      console.error(error);
    }
    },
    computed: {
  averagecommunication() {
    if (this.communirating.length === 0) {
      return 0;
    }
    const sum = this.communirating.reduce((acc, curr) => acc + curr);
    return sum / this.communirating.length;
  },
  averageperform() {
    if (this.performrating.length === 0) {
      return 0;
    }
    const sum = this.performrating.reduce((acc, curr) => acc + curr);
    return sum / this.performrating.length;
  },
  averageValues() {
    // Calculate the average of averageperform and averagecommunication
    const commavg = this.communirating.reduce((acc, curr) => acc + curr) /  this.communirating.length;
    const peravg = this.performrating.reduce((acc, curr) => acc + curr) / this.performrating.length;
  
    this.avgflag = false;
    return (commavg+peravg)/2;
  }
},
  }
  ;
  </script>
  
  <style scoped>
  
  h3 {
    left: 500px;
    margin: 30px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  .card-warpper{
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 180px;
    top: 50px;
    padding: 30px;
    background-color: #f5f8f9;;
    /* overflow: auto; 수직 스크롤 생성 */
  }
  
  .table{
    font-size: small;
  }

  .result-container{
    display: flex;
    background-color: #f5f8f9;

  }

  .avgresult{
    padding: auto;
    /* background-color: red; */
    width: 320px;
    height: 430px;
    padding-right: 10px
  }

  .allresult{
    /* background-color: blue; */
    width: 850px;
    height: 785px;
  }
  
  .result{
    margin: 10px;
    padding: 10px;
  }
  
  .myProfile{
    padding-top: 10px;
    text-align: center;
  }

  .rating{
    height: 50px;
    margin: 10px;
  }
</style>