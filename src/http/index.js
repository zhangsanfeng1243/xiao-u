//封装get ,post
//重写
import axios from 'axios'
import router from '../router/index'
import store from '../store/index'

let instance = axios.create({
    baseURL: "",
    timeout: 6000
})

function get(url, params) {
    return instance.get(url, {
        params
    })
}
function post(url, params) {
    return instance.post(url,params)
}
//请求拦截，所有的http请求都会被拦截下来
 instance.interceptors.request.use((config) => {
    // config 关于请求的所有信息
    console.log(config)
    // 
    config.headers.authorization = store.state.user.token
    return config
 })


//  // 相应拦截
 instance.interceptors.response.use((res) => {
    console.log(res)
    if (res.data.code == 403) {
        // 跳到登录页
        router.push("/login")
    }
    return res
 })


export default {
    get,
    post
}