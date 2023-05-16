<template>
  <div>
    <Header/>
    <div class="wrap">
      <div class="menu-wrap bg-dark">
        <Menu/>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
// import Nav from './views/nav';
import HelloWorld from './components/Main.vue'
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Menu, 
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