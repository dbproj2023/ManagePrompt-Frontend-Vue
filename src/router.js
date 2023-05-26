import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/MainPage.vue'
// import Login from './components/component/Login.vue'
import Login from  './components/Login.vue'
import Enroll from './components/component/Enroll.vue'
import Employee from './components/Employee.vue'
import Project from './components/Project.vue'
import Evaluation from './components/Evaluation.vue'
// import Mypage from './components/component/Mypage.vue'
import ProDetail from './components/ProjectDetail.vue'
// // import page2 from './components/.vue'
import ProjectInput from './components/component/ProjectInput.vue'
// import Project_detail from './components/component/Project_detail.vue'
import ProjectModify from './components/component/ProjectModify.vue'
// // import Change_pw from './components/Change_pw.vue'
// // import Access from './components/Access.vue'
import FindAccount from './components/component/FindAccount.vue'
// import EvalResult from './components/component/EvalResults.vue'
// import NewEnroll from './components/component/NewEnroll.vue'
// import cusEval from './components/component/EvaluationCustomer.vue'


const Authentication = () => (to, from, next) => {
    const isLogin = store.getters['loginStore/isLogin'];
    if (!isLogin) {
        next('/login?returnUrl=' + to.fullPath);
    } else {
        next();
    }
};


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
            path: '/Employee',
            component: Employee
        },
        {
            path: '/Project',
            component: Project
        },
        {
            path: '/Evaluation',
            component: Evaluation
        }
        // {
        //     path: '/Mypage',
        //     component: Mypage,
//            beforeEnter: Authentication()
        // },
        ,{
            path: '/Project/detail/:id',
            component: ProDetail
        },
        // {
        //     path: '/Project_detail',
        //     component: Project_detail
        // }
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
