<template>
  <div id="mypage">
    <div id="mypage-head">
      <h2>마이페이지</h2>
    </div>
    <hr>
    <div>
      <button type="button" @click="navigateToChangePW()">비밀번호 변경</button>
      <button type="submit">저장</button>
      <MyprofileTable/>
      <hr>
      <ParticipateProjTable/>
    </div>
  </div>
</template>

<script>
  import MyprofileTable from './MyprofileTable.vue'
  import ParticipateProjTable from './ParticipateProjTable.vue'

  export default {
    name: "Mypage",
    components: {
      MyprofileTable,
      ParticipateProjTable
    },
    data() {
    },
    methods: {
      navigateToChangePW() {
        this.$router.push(`/ChangePW`);
      },
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
