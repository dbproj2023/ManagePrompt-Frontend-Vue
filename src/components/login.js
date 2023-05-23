import axios from 'axios';

// const HOST =  "http://localhost:8080";
// const apiUrl = `${HOST}/api/v1/auth/login`;
const apiUrl = `/api/v1/auth/login`;

const loginStore = {
	namespaced: true,
	state: {
        auth_id: "",
        accessToken: ""
	},
	getters: {
        // 로그인 여부를 가져옵니다.
        isLogin(state) {
            return state.accessToken == "" ? false : true;
        },
        
	},
	mutations: {
        // auth_id를 설정합니다.
        setAuthId(state, auth_id) {
            state.auth_id = auth_id;
        },
        // accessToken를 설정합니다.
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        // 초기화시킵니다.
        reset(state) {
            state.auth_id = '';
            state.accessToken = '';
        }
	},
	actions: {
        // 로그인합니다.
        async doLogin({ commit }, memberInfo) {
            let result = false;
            let resultErr = null;
            try {
                let res = await axios.post(apiUrl, memberInfo);
                if (res.data.success == true) {
                    console.log("로그인되었습니다.");
                    commit('setAuthId', memberInfo.id);
                    commit('setAccessToken', res.data.accessToken);
                    result = true;
                } else {
                    console.log("로그인되지 않았습니다.");
                    let err = new Error("Request failed with status code 401");
                    err.response = {data:{"success":false, "errormessage":"로그인되지 않았습니다."}};
                    resultErr = err;
                }
            } catch(err) {
                console.log(err);
                if (!err.response) {
                    err.response = {data:{"success":false, "errormessage":err.message}};
                }
                resultErr = err;
            }
            return new Promise((resolve, reject) => {
                if (result) {
                    resolve();
                } else {
                    reject(resultErr);
                }
            });
        },
        // 로그아웃합니다.
	    // doLogout({commit}) {
		//     commit('reset');
        // }
	}
};

export default loginStore;