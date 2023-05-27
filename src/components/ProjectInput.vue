<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app width="250px" class="no-border" style=" background-color: #F8F9FA;">
      <Nav />
    </v-navigation-drawer>

  <v-app-bar app style="background-color: #394F86;">
      <Header />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <ProjectInput/>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import Header from './component/Header.vue';
import Nav from './component/Nav.vue'
import ProjectInput from './component/ProjectInput.vue'
export default {
  name: "ProjectInput",
  components:{
    ProjectInput,
    Nav,
    Header
  },
  data() {
    return {
      isLoading: true,
      drawer: true

    }
  },
  methods: {
  }
};
</script>

<style>


.wrapper {
  background-color: #E3F5F5;
}


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

.ProjectTableCard {
  border: none !important;
  border-radius: 10px;
}

.addButton {
  
  color: white !important;
  background-color: #394F86 !important;
}


.center-card {
  overflow: hidden;
  width: 1000px; /* Adjust the width as needed */
  height: auto; /* Adjust the height as needed */
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  background-color: aliceblue;
}

.ProjectTableCard {
  border: none !important;
  border-radius: 10px;
}

/* Update the styles for the background */
.v-main{
  background-color: #F8F9FA;
}

.v-main:before
 {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background-color:#394F86;
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
