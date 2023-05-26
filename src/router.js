import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/MainPage.vue'
// import Login from './components/component/Login.vue'
import Login from  './components/Login.vue'
import Enroll from './components/component/Enroll.vue'
import Employee from './components/Employee.vue'
import Project from './components/Project.vue'
import Evaluation from './components/Evaluation.vue'
// import Mypage from './components/Mypage.vue'
import Detail from './components/Detail.vue'
// import page2 from './components/.vue'
import ProjectInput from './components/ProjectInput.vue'
// import Project_detail from './components/Project_detail.vue'
import ProjectModify from './components/ProjectModify.vue'
// import Change_pw from './components/Change_pw.vue'
// import Access from './components/Access.vue'
import FindAccount from './components/FindAccount.vue'
// import EvalResult from './components/EvalResults.vue'
// import NewEnroll from './components/NewEnroll.vue'
// import cusEval from './components/EvaluationCustomer.vue'


// const Authentication = () => (to, from, next) => {
//     const isLogin = store.getters['loginStore/isLogin'];
//     if (!isLogin) {
//         next('/login?returnUrl=' + to.fullPath);
//     } else {
//         next();
//     }
// };


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
            path: '/evaluation',
            component: Evaluation
        },
        {
            // path: '/mypage',
            // component: Mypage,
//            beforeEnter: Authentication()
        },
        {
            path: '/project/detail/:id',
            component: Detail
        },
        // {
        //     path: '/Project_detail',
        //     component: Project_detail
        // }
        ,{
            path: '/projectInput',
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
        // {
        //     path: '/Eval',
        //     component: EvalResult 
        // },
        // {
        //     path: '/newEnroll',
        //     component: NewEnroll
        // },{
        //     path:'/cusEval',
        //     component: cusEval
        // }
    ]
})
