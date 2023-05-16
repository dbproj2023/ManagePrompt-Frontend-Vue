<template>
  <div id="employee">
    <div id="employee-head">
          <h2>직원 관리</h2>
    </div>
    <hr>
    <div class="employee-table">
      <EmployeeTable/> 
    </div>
  </div>
</template>

<script>
  import EmployeeTable from './EmployeeTable.vue'
  export default {
    name: "Employee",
    components: {
      EmployeeTable
    },
    data() {
      return
    }
  };
</script>

<style scoped>
div {
  flex: 1200px;
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
  background-color:  #42b983;
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

.employee-table{
  position: absolute;
  width: 1167.73px;
  height: 514.6px;
  left: 280px;
  top: 100px;
}
</style>
