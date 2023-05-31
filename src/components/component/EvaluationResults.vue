<template>
  <div>
    <div class="result-container">
      <div class="spinner-div" v-if="isLoading">
      <b-card class="ProjectTableCard" style="height: 800px; width: 1200px;">
        <div class="spinner-container" style="padding-top: 300px;">
          <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
        </div>
      </b-card>
    </div>
          
  <div v-else class="p-3  text-center">
  <b-card class="card2">
  <i class="fa-solid fa-clipboard-list fa-xl"></i>   
  <br>
  <br>
  <h6 class="mb-0 text-center" style="margin-bottom: 10px; border-radius: 10px;">  {{ this.myName }}의 평가보고서 </h6>
  <hr class="my-3 horizontal dark" />
  <div class="p-3 pt-0 text-center card-body" style="border-radius: 10px;">
    <div>
      <br>

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
      <br>
      <hr class="my-3 horizontal dark" />
      
    </div>
  </div>
  </b-card>
</div>

    <div class="result" v-for="project in project_list" :key="project">
    <b-card class="allresult" title="프로젝트 별 평가결과">
    <br>
    <div style="display: flex; align-items: center; text-align: center;">
      <i class="fa-solid fa-folder-open fa-xl"></i>
      <h6 style="margin-left: 8px;">{{ project }}</h6>
    </div>

    <h6></h6>
    <br>
    <div style="display: flex;">
      <div>
        <div class="flex-cell flex-header">프로젝트 이름</div>
      </div>
      <div>
        <div class="flex-cell">{{ project }}</div>
      </div>
      <div>
        <div class="flex-cell flex-header">프로젝트 기간</div>
      </div>
      <div>
        <div class="flex-cell"> {{ period_list[project][0]}} ~ {{ period_list[project][1]}} </div>
      </div>
    </div>
    <p style="padding-top: 10px;"> PM평가 / 동료평가 </p>
    <div style="display: flex;">
      <div>
        <div class="flex-cell flex-header">PM 업무수행 평가</div>
        <div class="flex-cell flex-header">PM 커뮤니케이션 평가</div>
      </div>
      <div>
        <div class="flex-cell">{{ pm_eval[project][0] }}</div>
        <div class="flex-cell">{{ pm_eval[project][1] }}</div>
      </div>
      <div>
        <div class="flex-cell flex-header">커뮤니케이션 평가</div>
        <div class="flex-cell flex-header">업무수행 평가</div>
      </div>
      <div>
        <div class="flex-cell">{{ cowork_eval[project][0] }}</div>
        <div class="flex-cell">{{ cowork_eval[project][1] }}</div>
      </div>
    </div>
    <br>
  </b-card>
</div>

    </div>
  </div>

</template>
  
  
  <script>
  import axios from "axios"; // http 통신을 위한 라이브러리
  const HOST =  "http://localhost:8080";
  import moment from "moment";
  
  export default {
    name: "Detail",
      data() {
        return {
          avgflag: true,
          isLoading: true,
          myName: '',
          cowork_eval: {},
          pm_eval: {},
          project_list: [],
          period_list: {},
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

        for (let i = 0; i < res.data.cowork_eval.length; i++) {
          const proName = res.data.cowork_eval[i].pro_name;
          const communication1 = res.data.cowork_eval[i].avg_communication_rating ?? 0;
          const performance1 = res.data.cowork_eval[i].avg_performance_rating ?? 0;

          const startDate = moment(res.data.cowork_eval[i].start_date).format('YY-MM-DD');
          const endDate =  moment(res.data.cowork_eval[i].end_date).format('YY-MM-DD');
          console.log(startDate, endDate);


          this.project_list.push(proName);
          this.cowork_eval[proName] = [communication1, performance1];
          this.period_list[proName] = [startDate, endDate];

          const communication2 = 0;
          const performance2 = 0;

          for (let j=0; j<res.data.pm_eval.length; j++){
            if (proName == res.data.pm_eval[i].pro_name){
              communication2 = res.data.pm_eval[i].avg_communication_rating;
              performance2 = res.data.pm_eval[i].avg_performance_rating;
            }
          }
          this.pm_eval[proName] = [communication2, performance2];
        }

        this.isLoading = false;
       
      });
    } catch (error) {
      console.error('Invalid API URL:', apiUrl1);
      console.error(error);
    }
    },
    computed: {

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

  .result{
    padding-top: 18px;
    width: 900px;
    min-height: 260px;
  }

  .spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

 
.flex-table {
  width: 500px;
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
  width: 200px;
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
  height: 380px;
  margin: 5px;
  padding: 5px;
  background-color: #FFFFFF;
}


.total-table{
  width: 250px;
  margin: auto;
}

.card2{
  padding-left: 0px;
  height: 375px;
}
</style>