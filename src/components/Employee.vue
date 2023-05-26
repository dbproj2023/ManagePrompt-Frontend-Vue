<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app width="250px" class="no-border" style=" background-color: #F8F9FA;">
      <Nav />
    </v-navigation-drawer>

  <v-app-bar app style="background-color: #394F86;">
      <Header />
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <EmployeeTable/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import EmployeeTable from './component/EmployeeTable.vue'
import Header from './component/Header.vue';
import Nav from './component/Nav.vue'

export default {
  name: "Employee",
  components: {
    EmployeeTable,
    Nav,
    Header
  },
  data() {
    return {
    }
  }
};
</script>

<style scoped>
div {
  flex: 1200px;
}


</style>
