<template>
  <div>
    <Header/>
    <div class="wrap">
      <div class="menu-wrap bg-dark">
        <Nav/>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
// import Nav from './views/nav';
import HelloWorld from './components/Main.vue'
import Nav from './components/Nav.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Nav, 
    Header
  }
}
</script>

<style scoped>
.wrap {
  height: 800px;
  display: flex;
}


</style>