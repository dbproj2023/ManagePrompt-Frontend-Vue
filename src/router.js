import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/MainPage.vue'
// import Login from './components/component/Login.vue'
import Login from  './components/Login.vue'
import Enroll from './components/component/Enroll.vue'
import Employee from './components/Employee.vue'
import Project from './components/Project.vue'
import Mypage from './components/MyPage.vue'
import ProDetail from './components/ProjectDetail.vue'
// import page2 from './components/.vue'
// import ProjectInput from './components/ProjectInput.vue'
import ProjectInput from './components/component/ProjectInput.vue'
// src/components/component/ProjectInput.vue
// import Project_detail from './components/component/Project_detail.vue'
import ProjectModify from './components/component/ProjectModify.vue'
import Change_pw from './components/component/Change_pw.vue'
import LogoutChangePw from './components/component/LogoutChangePw.vue'
import Access from './components/component/Access.vue'
import FindAccount from './components/component/FindAccount.vue'
import NewEnroll from './components/component/NewEnroll.vue'
import UnauthorizedEmp from './components/component/UnauthorizedEmp.vue'

// 프로젝트 평가
import Evaluation from './components/EvaluationResult.vue'
import EvaluationInput from './components/EvaluationInput.vue'
import EvaluationInputForCus from './components/EvaluationInputCus.vue'



Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/enroll',
            component: Enroll
        },
        {
            path: '/employee',
            component: Employee
        },
        {
            path: '/project',
            component: Project
        },
        {
            path: '/mypage',
            component: Mypage
        },
        {
            path: '/project/detail/:id',
            component: ProDetail
        },
        {
            path: '/project/input',
            component: ProjectInput
        },
        {
            path: '/project/:id/modify',
            component: ProjectModify
        },
        {
            path: '/findAccount',
            component: FindAccount
        },
        {
            path: '/evaluation',
            component: Evaluation 
        },
        {
            path: '/evaluation/input/employee',
            component: EvaluationInput
        },
        {
            path: '/evaluation/input/customer',
            component: EvaluationInputForCus
        },
        {
            path: '/newEnroll',
            component: NewEnroll
        },
        {
            path: '/employee/unauthorized',
            component: UnauthorizedEmp
        },
        {
            path: '/employee/access/:id',
            component: Access
        },
        {
            path: '/changePw',
            component: Change_pw
        },
        {
            path: '/logoutChangePw',
            component: LogoutChangePw
        }
    ]
})
