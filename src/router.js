import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/Main.vue'
import Login from './components/Login.vue'
import Enroll from './components/Enroll.vue'
import Employee from './components/Employee.vue'
import Project from './components/Project.vue'
import Evaluation from './components/Evaluation.vue'
import Mypage from './components/Mypage.vue'

// import page2 from './components/.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/Login',
            component: Login
        },
        {
            path: '/Enroll',
            component: Enroll
        },
        {
            path: '/Emloyee',
            component: Employee
        },
        {
            path: '/Project',
            component: Project
        },
        {
            path: '/Evaluation',
            component: Evaluation
        },
        {
            path: '/Mypage',
            component: Mypage
        }
    ]
})