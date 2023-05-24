<template>
  <div id ="app">
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
import Nav from './components/Nav.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Nav, 
    Header
  },
  mounted(){
    let isLogin = this.$store.getters.isLogin
    let path = this.$route.path
    let accGrade = this.$store.getters.getAccGrade
    console.log("test code ?? : ", this.$route)

    console.log("test code App.vue mounted isLogin : ", isLogin)
    console.log("test code App.vue mounted path : ", path)
    console.log("test code App.vue mounted accGrade : ", accGrade)

    /* 홈(메인), 로그인 제외 접근 */
    if( path != '/' && path != '/Main' && path != '/Login' && isLogin == false ){
      this.$router.push('/Login');
    }
    /* 신규 직원 등록 시 권한 2 */
    else if( path.startsWith('/newEnroll') && accGrade != 2 ) {
      console.log("test code /newEnroll")
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    // else if( path.startsWith('/Enroll') && 뉴비 == true ) {
    //   console.log("test code /Enroll")
    //   alert("접근 권한이 없습니다.");
    //   this.$router.go(-1);
    // }
    /* 프로젝트 접근 시 권한 3 미만 */
    else if( path.startsWith('/Project') && accGrade >= 4 ) {
      console.log("test code /Project")
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    /* 직원관리 접근 시 권한 2 미만 */
    else if( path.startsWith('/Emloyee') && accGrade >= 3 ) {
      console.log("test code /Emloyee")
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    /* 평가 접근 시 권한 3 미만 */
    else if( path.startsWith('/Evaluation') && accGrade >= 4 ) {
      console.log("test code /Evaluation")
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    /* 마이페이지 */
    else if( path.startsWith('/Mypage') && isLogin == false ) {
      console.log("test code /Mypage")
      alert("로그인해주세요.");
      this.$router.push('/Login');
    }
  }
}
</script>

<style scoped>
.wrap {
  height: 1300px;
  display: flex;
}

.menu-wrap{
  width:200px;
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

@font-face {
    font-family: 'KimjungchulGothic-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/KimjungchulGothic-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

@import url('//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css');
.project-table {
  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';;
}
</style>
