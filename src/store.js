import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexPersistedState } from 'vue-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createVuexPersistedState()],
  state: {
    isLogin: false, // 로그인 여부
    accGrade: 9, // 0-관리자 / 9-승인전
  },
  mutations: {
    setLogin(state, data) {
      state.isLogin = data;
    },
    setAccGrade(state, accGrade) {
      state.accGrade = accGrade;
    },
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    getAccGrade(state) {
      return state.accGrade;
    },
  },
});
