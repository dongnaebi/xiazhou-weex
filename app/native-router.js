/**
 * Created by zhouz on 2017/2/12.
 */
const basePath='http://192.168.31.241:8080/dist';//替换成你电脑的IP，并保证手机能访问到电脑(连同一个wifi就好啦)
//const basePath='http://xiazhou.me/example/xiazhou-weex/dist';
export default [
    {path:'/',component:basePath+'/index.js'},
    {path:'/list/:id',component:basePath+'/product/list.js'},
    {path:'/product/:id',component:basePath+'/product/detail.js'}
];