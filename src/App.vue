<template>
  <div>
    <Header/>
    <div class="wrap">
      <div class="menu-wrap">
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

@font-face {
    font-family: 'ONE-Mobile-POP';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-POP.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'GongGothicMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'ONE-Mobile-Title';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-Title.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@import url('//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css');
.project-table {
  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';;
}
</style>