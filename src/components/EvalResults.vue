<template>
  <div class="wrapper">
    <div class="result-container">
      <div class="result">
        <b-card class="avgresult" title="평가결과 종합" >
          <div class="myProfile">
            <img src="./img/theme/team-1.jpg" height="130px" width="130px" alt="로고" class="logo">
            <p>{{ this.myName }}</p>
          </div>

          <b-card class="rating">종합평가: {{  averageValues}}</b-card>
          <b-card class="rating">커뮤니케이션 평가: {{  averagecommunication}}</b-card>
          <b-card class="rating">업무수행 평가: {{ averageperform }}</b-card>
         
        </b-card>
      </div>

      <div class="result">
        <b-card class="allresult" title="프로젝트 별 평가결과" >
          <br>
          <span>{{this.projectList[0].proName }}</span>
          <br>
          <div style="display: flex;">
            <div><div class="flex-cell flex-header">프로젝트 이름</div></div>
            <div><div class="flex-cell">{{ this.projectList[0].proName }}</div></div>
            <div><div class="flex-cell flex-header">프로젝트 이름</div></div>
            <div><div class="flex-cell ">{{ slicedStartDate }}</div></div>
          </div>

          <div style="display: flex; padding-top: 10px;">
            <div><div class="flex-cell1 flex-header1" >종합평가 결과</div></div>
            <div><div class="flex-cell1">{{ averageValues}}</div></div>
            <div>
              <div class="flex-cell flex-header">커뮤니케이션 평가</div>
              <div class="flex-cell flex-header">업무수행 평가</div>
          </div>
            <div>
              <div class="flex-cell ">{{ this.communirating[0] }}</div>
              <div class="flex-cell ">{{ this.performrating[0]}}</div>
            </div>
          </div>
          <br>
          <b-card style="padding-top: 10px;">
           {{ this.projectList.communicationDetail }} {{ this.projectList.performanceDetail}}
          </b-card>




        </b-card>
        

      </div>
    </div>
  </div>

</template>
  
  
  <script>
  import axios from "axios"; // http 통신을 위한 라이브러리
  const HOST =  "http://localhost:8080";
  
  export default {
    name: "Detail",
      data() {
        return {
          avgflag: true,
          isLoading: true,
          myName: '',
          performrating: [],
          communirating: [],
          projectList: []
        }
    },
    mounted() {
      const apiUrl1 = `${HOST}/api/v1/evaluation/coworker/read`
      try {
      const url = new URL(apiUrl1);
      console.log('URL:', url);
      axios.get(apiUrl1).then((res) => {
        console.log("나는 문어")
        console.log('API response:', res.data);

        console.log(res.data.projectEvaluationList[0].evaluationList)

        this.myName = res.data.empName;

        for (let i = 0; i < res.data.projectEvaluationList.length; i++) {
          const parsingdata = res.data.projectEvaluationList[i].evaluationList
          for (let j=0; j<parsingdata.length; j++){
            console.log(parsingdata[j].communicationRating);
            console.log(parsingdata[j].performanceRating);

            this.performrating.push(parsingdata[j].performanceRating);
            this.communirating.push(parsingdata[j].communicationRating);

            this.projectList = res.data.projectEvaluationList
            console.log(this.projectList);

          }
          isLoading: false;
              
        // Store empName and empId in the dictionary
        // this.empList[empId] = empName;
      }
       
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
    if  (this.communirating.length === 0 && this.performrating.length === 0){
      return 0
    }
    const commavg = this.communirating.reduce((acc, curr) => acc + curr) /  this.communirating.length;
    const peravg = this.performrating.reduce((acc, curr) => acc + curr) / this.performrating.length;
    return (commavg+peravg)/2;
  }
  ,  slicedStartDate() {
      if (this.projectList[0].startDate && this.projectList[0].endDate) {
        const startyear = this.projectList[0].startDate.slice(2, 4);
        const startmonth = this.projectList[0].startDate.slice(5, 7);
        const startday = this.projectList[0].startDate.slice(8, 10);

        const endyear = this.projectList[0].startDate.slice(2, 4);
        const endmonth =this.projectList[0].startDate.slice(5, 7);
        const endday = this.projectList[0].startDate.slice(8, 10);
        return `${startyear}-${startmonth}-${startday} ~ ${endyear}-${endmonth}-${endday}`}
      return '';
    }
  }
}
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

  .wrapper{
    background-color: #f5f8f9;
    width: 100%;
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
    margin: 5px;
    padding: 5px;
  }
  
  .myProfile{
    padding-top: 10px;
    text-align: center;
  }

  .rating{
    height: 50px;
    margin: 10px;
  }

  .flex-table {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: small;
}

  .flex-header{
  /* font-weight: bold; */
  background-color: #f0f0f0;
}

.flex-cell {
  flex: 1;
  padding: 8px;
  width: 200px;
  border: 1px solid #ccc;
  white-space: pre-wrap;
  text-align: center;
}

.flex-cell1 {
  flex: 1;
  padding: 8px;
  width: 200px;
  border: 1px solid #ccc;
  white-space: pre-wrap;
  text-align: center;
  height: 84px;
}

.flex-header1{
  text-align: center;
  /* font-weight: bold; */
  background-color: #f0f0f0;
  height: 84px;
}
</style>