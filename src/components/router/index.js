import { createStore } from 'vuex';
import loginStore from '@/components/login';
import store from '@store';

router.beforeEach((to, from, next) => {
    if(to.path == "/") { //
        const isLogin = store.getters['loginStore/isLogin'];
        if(!isLogin) {
            next('/login?returnUrl=' + to.fullPath);
        } else {
            next();
        }
    } else { //
        next(); //
    } //
});
export default createStore({
    module: {
        loginStore: loginStore
    }
});