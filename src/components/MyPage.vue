<template>
    <v-app>
      <v-navigation-drawer v-model="drawer" app width="250px" class="no-border" style="background-color: #F8F9FA;">
        <Nav />
      </v-navigation-drawer>
  
      <v-app-bar app style="background-color: #394F86;" class="no-border">
        <Header />
      </v-app-bar>
  
      <v-main>
        <v-container fluid>
          <br><br>
          <MyprofileTable/>
          <br>
          <hr> 
          <br> 
          <ParticipateProjTable/>
        </v-container>
      </v-main>
    </v-app>
  </template>

  
<script>
// import ProjectInput from '../components/ProjectInput.vue'
import Header from './component/Header.vue';
import Nav from './component/Nav.vue'
import MyprofileTable from './component/MyprofileTable.vue'
import ParticipateProjTable from './component/ParticipateProjTable.vue'

export default {
  name: "Mypage",
  components:{
    MyprofileTable , ParticipateProjTable,
    Nav,
    Header
  },
  data() {
    return {
      drawer: true
        }
  },
  methods: {
  }
};
</script>

<style>


/* .wrapper {
  background-color: #E3F5F5;
} */


.button-container {
  display: flex;
  justify-content: flex-end;
}

.small-input {
  width: 100px;
}

.option .form-control {
  height: 27.9px;
  padding: 4px;
}

.option .form-control:focus {
  box-shadow: none;
  border-color: #aaa;
}

.mypageCard {
  border: none !important;
  border-radius: 10px;
}

.addButton {
  color: #394F85;
  height: 30px;
  width: 100px;
  background-color: #F4F8F8 !important;
}

.center-card {
  overflow: hidden;
  width: 1000px; 
  height: auto;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  background-color: aliceblue;
}

.mypageCard {
  border: none !important;
  border-radius: 10px;
}

/* Update the styles for the background */

.v-main {
  position: relative;
  background-color: #F8F9FA;
}

.v-main:before {
  content: "";
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background-color: #33508A
}



.v-navigation-drawer:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background-color: #394F86;
  z-index: -1;
}



/* Update the styles for the navigation bar */
.v-navigation-drawer .v-list-item,
.v-navigation-drawer .v-list-item--link {
  color: #F8F9FA;;
}

.v-navigation-drawer .v-navigation-drawer__border {
  display: none
}

</style>
