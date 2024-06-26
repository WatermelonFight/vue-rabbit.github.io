//axios
import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useUserStore} from '@/stores/user'
//vue3不能在setup使用useRouter
import router from "@/router";

//创建实例
const httpInstance = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

//axios请求拦截器
httpInstance.interceptors.request.use(config =>{
    //1.从pinia获取数据
    // 在函数外部使用 useUserStore() 可能会导致未初始化的错误。
    const userStore = useUserStore()
    const token = userStore.useInfo.token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},e =>Promise.reject(e))

//axios响应式拦截器
//res=>res.data是对res中的data部分进行提取，也就是处理相应对象，后面调用接口请求数据时无需再加.data
httpInstance.interceptors.response.use(res => res.data,e=>{
    const userStore = useUserStore()
    //统一错误提醒
    ElMessage({type:'warning',message:e.response.data.message})
    // console.log(222,e);
    //401token失效处理
    if(e.response.status === 401){
        userStore.clearUserInfo()
        router.push('/login')
    }
    // 对于 await 后面直接跟着一个数据（非 Promise 对象），
    // 实际上会隐式地将这个数据包装成一个 resolved 状态的 Promise 对象
    // 所以成功返回的不用手动封装成promise
    // 使用try/catch块或者e => Promise.reject(e)来处理异步操作中的异常，可以避免程序中断
    return Promise.reject(e)
})

export default httpInstance