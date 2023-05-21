<template>
    <div id="find_account">
      <div id="find_account-head">
        <h2>아이디/비밀번호 찾기</h2>
      </div>
      <hr>
      <div>
        <Find_id/>
        <Find_pw/>

      </div>
    </div>
  </template>
  
  <script>
    import Find_id from './Find_id.vue'
    import Find_pw from './Find_pw.vue'
  
    export default {
      name: "FindAccount",
      components: {
        Find_id,
        Find_pw
    
      },
      data() {
      },
      methods: {
      }
    };
  </script>
  
  <style scoped>
    div {
      flex: 1200px;
    }
    button {
      margin: 10px;
    }
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
    a {
      color: #42b983;
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
      position: absolute;
      width: 1167.73px;
      height: 514.6px;
      left: 280px;
      top: 100px;
    }
  </style>
  