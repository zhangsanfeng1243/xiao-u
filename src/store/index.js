import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
export default new Vuex.Store({
//把获取到的数据res.data.list 存入vuex
state:{
    user:{}
},
mutations:{
    setuser(state,user){
        state.user=user
    }
} ,
plugins: [createPersistedState()]
})