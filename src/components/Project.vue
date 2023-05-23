<template>
  <div class="wrapper">
    <h3 class="title">프로젝트 관리</h3>
    <div class="project-table">
      <ProjectTable/> 
    </div>

<!--     
    <div class="popup-container" v-if="displayDetail">
      <div> 
      <ProjectInput class="popup" @closeDetail="handleCloseDetail" />
      </div>
    </div>
     -->

    <!-- <b-button @click="goToProjectInput">프로젝트 추가</b-button>
    <b-button @click="displayDetail = true">프로젝트 추가</b-button>
    <b-button a href="/project_detail">프로젝트 데테일(임시버튼)</b-button>
    -->
  </div>
</template>

<style scoped>
div {
  flex: 1200px;
}

.popup{
  background: #fff;
  width:100%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: blue;
}

/* .popup {
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
} */
</style>

<script>
import router from '@/router';
import ProjectInput from './ProjectInput.vue'
import ProjectTable from './ProjectTable.vue'
export default {
  name: "Project",
  components:{
    ProjectTable,
    ProjectInput
  },
  data() {
    return {
    }
  },
  methods: {
  }
};
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

.search-bar{
  position: absolute;
  width: 1167.73px;
  height: 100px;
  left: 300px;
  top: 150px;
  flex-wrap: nowrap;
}

.head-name{
  position: absolute;
  width: 219px;
  height: 10px;
  left: 300px;
  top: 100px;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #000000;
}
.project-table{
  position: center;
  width: 1167.73px;
  height: 514.6px;
  margin: 30px;
  top: 50px;
}

.wrapper{
  position: absolute;
  width: 100%;
  height: 1000px;
  left: 280px;
  top: 50px;
  background-color: white;
  /* #f5f8f9; */
}

.title { 
  font-family: 'KimjungchulGothic-Bold', 'Sans-serif'; 
}
</style>