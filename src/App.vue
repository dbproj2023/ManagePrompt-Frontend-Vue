<template>
  <v-app id ="app">
      <router-view/>

  </v-app>
</template>

<script>
// import Nav from './views/nav';
export default {
  name: 'App',
  components: {

  },
  mounted(){
    let path = this.$route.path
    let isLogin = this.$store.getters.isLogin
    let accGrade = this.$store.getters.getAccGrade
    let status = this.$store.getters.getStatus

    // 홈(메인), 로그인, 계정찾기, 비밀번호 변경(찾기) 제외 나머지 페이지 로그인 후 접근
    if( path != '/' && path != '/login' && path != '/findAccount' && path != '/logoutChangePw' && isLogin == false ){
      this.$router.push('/login');
    }
    // // 로그인 한 사람 다시 로그인 접근 금지
    // else if( path.startsWith('/login') && isLogin == true ) {
    //   this.$router.go(-1);
    // }
    // 권한 2(관리자)만 신규 직원 초기 등록 가능
    else if( path.startsWith('/newEnroll') && accGrade != 2 ) {
      console.log("test code /newEnroll")
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    // 신규 직원만 회원 정보 등록 페이지 접근 가능
    else if( path.startsWith('/enroll') && status == 1 ) {
      console.log("test code status:", status);
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    // else if( path.startsWith('/enroll') && status === 1 ) {
    //   console.log("test code /enroll")
    //   alert("접근 권한이 없습니다.");
    //   this.$router.go(-1);
    // }
    // 권한 2(관리자) 이상 프로젝트 관리 페이지 접근 가능
    else if( path.startsWith('/project') && accGrade >= 3 ) {
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    // 권한 2(관리자) 이상 직원 관리 페이지 접근 가능
    else if( path.startsWith('/employee') && accGrade >= 3 ) {
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    // 권한 4(발주처)만 고객평가 페이지 접근 가능
    else if( path.startsWith('/evaluation/input/customer') && accGrade != 4 ) {
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    // 권한 3(직원) 이상 동료평가 페이지 접근 가능
    else if( path.startsWith('/evaluation/input/employee') && accGrade >= 4 ) {
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    // 권한 3(직원) 이상 평가 결과 페이지 접근 가능
    else if( path.startsWith('/evaluation') && accGrade >= 4 ) {
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    // 발주처는 마이페이지 접근 금지
    else if( path.startsWith('/mypage') && accGrade == 4 ) {
      alert("접근 권한이 없습니다.");
      this.$router.go(-1);
    }
    // 로그인 한 직원 마이페이지 접근 가능
    else if( path.startsWith('/mypage') && isLogin == false ) {
      alert("로그인해주세요.");
      this.$router.push('/login');
    }

    console.log("test code this.$store : ", this.$store )
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
    font-family: 'D2Coding';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/D2Coding.woff') format('woff');
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

@font-face {
    font-family: 'SBAggroB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@import url('//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css');
.project-table {
  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';;
}
</style>