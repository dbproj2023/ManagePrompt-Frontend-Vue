<template>
    <v-app>
      <v-content style="background-color:#F5F5F5;">
        <v-container fluid>
          <Login/>
        </v-container>
      </v-content>
    </v-app>
  </template>
  
  
  <script>
  // import Evaluation from './component/EvaluationResults.vue'
  import Header from './component/Header.vue';
  import Nav from './component/Nav.vue'
  import Login from  './component/Login.vue'

  export default {
    name: "Project",
    components:{
    Login,
    Nav,
    Header
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
  div {
    flex: 1200px;
  }
  
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