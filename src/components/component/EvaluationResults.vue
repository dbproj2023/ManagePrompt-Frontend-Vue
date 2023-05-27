<template>
  <div>
    <div class="result-container">
    <div class="p-3 mx-4 text-center card-header">
      <!-- <div class="icon icon-shape icon-lg bg-gradient-success shadow text-center border-radius-lg" style="margin-left: 80px;"> -->
        <i class="fa-solid fa-clipboard-list fa-xl"></i>   
        <h6 class="mb-0 text-center" style="margin-bottom: 10px"> 평가보고서 </h6>
        <!-- </div> -->
        <hr class="my-3 horizontal dark" />
      <div class="p-3 pt-0 text-center card-body">
        <div class="spinner-div" v-if="isLoading">
          <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
          </div>
        </div>
        <div v-else>
          <h6 class="mb-0 text-center"> {{ this.myName }}</h6>

          <div class="flex-table total-table" style="margin-top: 20px;">
            <div class="flex-row">
              <div class="flex-cell flex-header">종합 평가</div>
              <div class="flex-cell">{{ this.total_avg_rating }}</div>
            </div>
            <div class="flex-row">
              <div class="flex-cell flex-header">업무수행 평가</div>
              <div class="flex-cell">{{ this.avg_communication_rating }}</div>
            </div>
            <div class="flex-row">
              <div class="flex-cell flex-header">커뮤니케이션 평가</div>
              <div class="flex-cell">{{ this.avg_performance_rating }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div class="result">
        <b-card class="allresult" title="프로젝트 별 평가결과" >
          <br>
          <div style="display: flex; text-align: center; align-items: center;">
            <i class="fa-solid fa-folder-open fa-xl"></i>
            <h6> {{  }}</h6>
          </div>
          <h6> {{ slicedStartDate }} </h6>

          <br>
          <div style="display: flex;">
            <div><div class="flex-cell flex-header">프로젝트 이름</div></div>
            <div><div class="flex-cell">{{}}</div></div>
            <div><div class="flex-cell flex-header">프로젝트 기간</div></div>
            <div><div class="flex-cell ">{{  }}</div></div>
          </div>

          <div style="display: flex; padding-top: 10px;">
            <div>
              <div class="flex-cell flex-header">PM 업무수행 평가</div>
              <div class="flex-cell flex-header">PM 커뮤니케이션 평가</div>
          </div>
            <div>
              <div class="flex-cell ">{{  }}</div>
              <div class="flex-cell ">{{  }}</div>
            </div>
            <div>
              <div class="flex-cell flex-header">커뮤니케이션 평가</div>
              <div class="flex-cell flex-header">업무수행 평가</div>
          </div>
            <div>
              <div class="flex-cell ">{{ }}</div>
              <div class="flex-cell ">{{ }}</div>
            </div>
          </div>
          <br>
          <b-card style="padding-top: 10px;">
           <!-- {{ projectEvaluationList.communicationDetail }} {{ projectEvaluationList.performanceDetail}} -->
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
          cowork_eval: {},
          pm_evla: {},
          avg_communication_rating:0, 
          total_avg_rating: 0,
          avg_performance_rating: 0,
        }
    },
    mounted() {
      const apiUrl1 = `${HOST}/api/v1/evaluation/coworker/read`
      try {
      const url = new URL(apiUrl1);
      console.log('URL:', url);
      axios.get(apiUrl1).then((res) => {
        console.log(res.data);
        console.log('API response:', res.data.all_eval[0]);
        this.avg_communication_rating =  res.data.all_eval[0].avg_communication_rating
        this.total_avg_rating =  res.data.all_eval[0].total_avg_rating
        this.avg_performance_rating =  res.data.all_eval[0].avg_performance_rating

        this.myName = res.data.cowork_eval[0].emp_name

        console.log(res.data.cowork_eval);
        console.log(res.data.pm_eval);

        for (let i = 0; i<res.data.cowork_eval.length; i++){
          const proName = res.data.cowork_eval.pro_name;
          const communication = res.data.cowork_eval.avg_communication_rating;
          const performance = res.data.cowork_eval.avg_performance_rating;

          this.cowork_eval.push([communication, performance]);
        }

        // this.proName = res.projectEvaluationList[0].proName;
        // this.myName = res.data.empName;

        // console.log("===", res.projectEvaluationList);

        
        // for (let i = 0; i < res.projectEvaluationList.length; i++) {
        //   const roleName = res.projectEvaluationList[i].roleName;
        //   console.log(roleName);
        //   const parsingdata = res.projectEvaluationList[i].evaluationList
        //   for (let j=0; j<parsingdata.length; j++){
        //     console.log(parsingdata[j].communicationRating);
        //     console.log(parsingdata[j].performanceRating);
            
        //     if (roleName === 'PM'){
        //       this.pmrating['performrating'].push(parsingdata[j].performanceRating);
        //       this.pmrating['communirating'].push(parsingdata[j].communicationRating);
        //     } else{
        //       this.rating['performrating'].push(parsingdata[j].performanceRating);
        //       this.rating['communirating'].push(parsingdata[j].communicationRating);
        //     }
        //   }
        //   false;

        //   if (this.pmrating.communirating.length===0){
        //     this.PMratingP = 0
        //     this.PMratingC = 0
        //   } else{
        //     this.PMratingP = this.pmrating.performrating.reduce((acc, curr) => acc + curr);
        //     this.PMratingC = this.pmrating.communirating.reduce((acc, curr) => acc + curr);
        //   }

        //   if (this.rating.communirating.length===0){
        //     this.ratingP = 0
        //     this.ratingC = 0
        //   } else{
        //     this.ratingP = this.rating.performrating.reduce((acc, curr) => acc + curr);
        //     this.ratingC = this.rating.communirating.reduce((acc, curr) => acc + curr);
        //   }

        //   console.log(this.PMratingP, this.PMratingC, this.ratingP, this.ratingC);
          this.isLoading = false;
      // }
       
      });
    } catch (error) {
      console.error('Invalid API URL:', apiUrl1);
      console.error(error);
    }
    },
    computed: {
  // averagecommunication() {
  //   if (this.communirating.length === 0) {
  //     return 0;
  //   }
  //   const sum = this.communirating.reduce((acc, curr) => acc + curr);
  //   return sum / this.communirating.length;
  // },
  // averageperform() {
  //   if (this.performrating.length === 0) {
  //     return 0;
  //   }
  //   const sum = this.performrating.reduce((acc, curr) => acc + curr);
  //   return sum / this.performrating.length;
  // },
  // averageValues() {
  //   // Calculate the average of averageperform and averagecommunication
  //   if  (this.communirating.length === 0 && this.performrating.length === 0){
  //     return 0
  //   }
  //   const commavg = this.communirating.reduce((acc, curr) => acc + curr) /  this.communirating.length;
  //   const peravg = this.performrating.reduce((acc, curr) => acc + curr) / this.performrating.length;
  //   return (commavg+peravg)/2;
  // }
   slicedStartDate() {
    // console.log(res.data.projectEvaluationList)
      // if (res.data.projectEvaluationList[0].startDate && res.data.projectEvaluationList[0].endDate) {
      //   const startyear = res.data.projectEvaluationList[0].startDate.slice(2, 10);
      //   // const startmonth = projectEvaluationList[0].startDate.slice(5, 7);
      //   // const startday = projectEvaluationList[0].startDate.slice(8, 10);

      //   const endyear = res.data.projectEvaluationList[0].startDate.slice(2, 10);
      //   // const endmonth =projectEvaluationList[0].startDate.slice(5, 7);
      //   // const endday = projectEvaluationList[0].startDate.slice(8, 10);
      //   return `${startyear} ~ ${endyear}`}
      // return '';
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
  }

  .avgresult{
    padding: auto;
    /* background-color: red; */
    width: 320px;
    height: 350px;
    padding-right: 10px
  }

  .allresult{
    /* background-color: blue; */
    width: 850px;
    height: 785px;
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
  border: 0.5px solid #F6F6F6; 
  border-collapse: collapse;
  font-size: small;
}

.flex-row {
  display: flex;
  border: 0.5px solid #F6F6F6; 

}

.flex-header{
  /* font-weight: bold; */
  border: 0.5px solid #F6F6F6; 
  background-color: #E8ECEC;
}

.flex-cell {
  flex: 1;
  padding: 8px;
  /* border: 0.5px solid #ccc; */
  white-space: pre-wrap;
  text-align: center;
  border: 0.5px solid #F6F6F6; /* Set a lighter border color */
}


.flex-header1{
  text-align: center;
  /* font-weight: bold; */
  background-color: #f0f0f0;
  height: 84px;
}

.card-header{
  width: 300px;
  height: 300px;
  margin: 5px;
  padding: 5px;
}

.total-table{
  width: 250px;
  margin: auto;
}
</style>