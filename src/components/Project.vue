<template>
  
  <div id="project">
    <div class="project-table">
      <ProjectTable/> 
    </div>
  </div>
</template>

<style scoped>
div {
  flex: 1200px;
}
</style>

<script>
import ProjectTable from './ProjectTable.vue'
export default {
  name: "Project",
  components:{
    ProjectTable
  },
  data() {
    return
    // items: [
    //         { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
    //         { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
    //         { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
    //         { age: 38, first_name: 'Jami', last_name: 'Carney' }
    //       ]
  }
};
</script>

<style scoped>
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

.project-table{
  position: absolute;
  width: 1167.73px;
  height: 514.6px;
  left: 280px;
  top: 100px;
}
</style>
