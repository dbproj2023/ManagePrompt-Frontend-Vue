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

      <div v-else class="text-center result-container">
        <!-- 전체 평가 평점 -->
        <div >
        <b-card class="card1" style="margin-right: 10px;">
            <i class="fa-solid fa-clipboard-list fa-xl"></i>
            <br>
            <br>
            <h6 class="mb-0 text-center" style="margin-bottom: 10px; border-radius: 10px;">{{ this.myName }}의 평가보고서</h6>
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
        <div>
          <b-card class="card2" title="프로젝트 별 평가결과">
            <div class="result" v-for="project in project_list" :key="project">
              <br>
              <div style="display: flex; align-items: center; text-align: center;">
                <i class="fa-solid fa-folder-open fa-xl"></i>
                <h6 style="margin-left: 8px;">{{ project }}</h6>
              </div>

              <br>
              <div style="display: flex; width: 600px;">
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
                  <div class="flex-cell"> {{ period_list[project]['startDate']}} ~ {{ period_list[project]['endDate']}} </div>
                </div>
              </div>
              <p style="padding-top: 10px; text-align: left;"> PM평가 / 동료평가 </p>
              <div style="display: flex ;  width: 600px;">
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
              </div>
          </b-card>
        </div>
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
        const allProjects = [...res.data.cowork_eval.map(find => find.pro_name), ...res.data.pm_eval.map(find => find.pro_name)];
        this.project_list = [...new Set(allProjects)];

        // 동료평가, PM 평가
        for (const project of this.project_list) {
          const coworkEval = res.data.cowork_eval.find(evaluation => evaluation.pro_name === project);
          const pmEval = res.data.pm_eval.find(evaluation => evaluation.pro_name === project);

          const coworkCommunication = coworkEval ? coworkEval.avg_communication_rating : 0;
          const coworkPerformance = coworkEval ? coworkEval.avg_performance_rating : 0;
          this.cowork_eval[project] = [coworkCommunication, coworkPerformance];

          const pmCommunication = pmEval ? pmEval.avg_communication_rating : 0;
          const pmPerformance = pmEval ? pmEval.avg_performance_rating : 0;
          this.pm_eval[project] = [pmCommunication, pmPerformance];

          const projectPeriod1 = res.data.cowork_eval.find(evaluation => evaluation.pro_name === project);
          const projectPeriod2 = res.data.pm_eval.find(evaluation => evaluation.pro_name === project);

          let startDate = projectPeriod1 ? moment(projectPeriod1.start_date).format('YY-MM-DD') : '';
          let endDate = projectPeriod1 ? moment(projectPeriod1.end_date).format('YY-MM-DD') : '';

          if (!startDate && projectPeriod2) {
            startDate = moment(projectPeriod2.start_date).format('YY-MM-DD');
            endDate = moment(projectPeriod2.end_date).format('YY-MM-DD');
          }

          this.period_list[project] = { startDate, endDate };

          console.log(this.period_list);
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
  height: 100px;
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
  height: 150px;
}

.flex-header{
  /* font-weight: bold; */
  height: 150px;
  border: 0.5px solid #F6F6F6; 
  background-color: #E8ECEC;
}

.flex-cell {
  flex: 1;
  padding: 0px;
  width: 200px;
  height: 40px;
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

.card1{
  align-items: center;
  height: 360px;
  width: 300px !important;
  padding-right: 10px;
  margin-right: 10px !important;
  display: 1;
}

.card2{
  width: 900px !important;
}



</style>