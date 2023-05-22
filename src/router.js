import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/Main.vue'
import Login from './components/Login.vue'
import Enroll from './components/Enroll.vue'
import Employee from './components/Employee.vue'
import Project from './components/Project.vue'
import Evaluation from './components/Evaluation.vue'
import Mypage from './components/Mypage.vue'
import Detail from './components/Detail.vue'
// import page2 from './components/.vue'
import ProjectInput from './components/ProjectInput.vue'
import Project_detail from './components/Project_detail.vue'
import ProjectModify from './components/ProjectModify.vue'
// import Change_pw from './components/Change_pw.vue'
// import Access from './components/Access.vue'
import FindAccount from './components/FindAccount.vue'


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
        },
        {
            path: '/Project/detail/:id',
            component: Detail
        },
        {
            path: '/Project_detail',
            component: Project_detail
        }
        ,{
            path: '/ProjectInput',
            component: ProjectInput
        },
        {
            path: '/Project/:id/Modify',
            component: ProjectModify
        },


        {
            path: '/FindAccount',
            component: FindAccount
        }
    ]
})