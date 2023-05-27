import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexPersistedState } from 'vue-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createVuexPersistedState({
    storage: window.sessionStorage // store를 session storage 에 유지
  })],
  state: {
    isLogin: false, // 로그인 여부
    accGrade: 9, // 0-관리자 / 9-승인전
    // status: 0,
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    getAccGrade(state) {
      return state.accGrade;
    },
    // getStatus(state) {
    //   return state.status;
    // },
  },
  mutations: {
    setLogin(state, data) {
      state.isLogin = data;
      console.log("state.isLogin data:", data);
    },
    setAccGrade(state, accGrade) {
      state.accGrade = accGrade;
    },
    // setStatus(state, status) {
    //   state.status = status;
    // },
    // setLogout(state, data) {
    //   state.isLogin = data;
    // }
  },
  actions: {
    // logout({ commit }) {
    //     commit('setLogin', false);
    //     commit('setAccGrade', '');
    // }
  }
});
