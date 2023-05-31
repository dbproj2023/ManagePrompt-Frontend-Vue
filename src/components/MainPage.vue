<template>
  <v-app>
    
      <v-navigation-drawer v-model="drawer" app width="250px" class="no-border" style=" background-color: #F8F9FA;">
      <Nav />
      </v-navigation-drawer>

      <v-app-bar app style="background-color: #33508A;">
          <Header />
      </v-app-bar>

      <v-main class="full-img">
            <Main/>
      </v-main>
    
  </v-app>
</template>


<script>
import Header from './component/Header.vue';
import Nav from './component/Nav.vue'
import Main from './component/Main.vue'
export default {
  name: "MainPage",
  components:{
    Main,
    Nav,
    Header
  },
  data() {
    return {
      drawer:true,
      isLogIn: false
    }
  },
  mounted(){
    let Login = this.$store.getters.isLogin
    this.isLogIn = Login
    console.log("login:", this.isLogIn);
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

.full-img{
  width: 100%;
  height: 100%;
  padding: 0;
  object-fit: cover;
}


</style> 