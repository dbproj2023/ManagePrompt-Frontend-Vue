

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
      "/api": { //'/api'가 들어오면 포트 8082(스프링 서버)로 보낸다
        target: "http://localhost:8082/api", 
        changeOrigin: true, // cross origin 
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  outputDir: "../backend/public",
};


// proxy: 중계인 역할
// 