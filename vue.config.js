

const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave : false
// })

// 백앤드 연동
module.exports = {
  lintOnSave: false,

  devServer: {
    proxy: {
      "/api": { //'/api'가 들어오면 포트 3000(스프링 서버)로 보낸다
        target: "http://localhost:3000/api", 
        changeOrigin: true, // cross origin 
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  outputDir: "../backend/public",

  transpileDependencies: [
    'vuetify'
  ]
};


// proxy: 중계인 역할
// 
