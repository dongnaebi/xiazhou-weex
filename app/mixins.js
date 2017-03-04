/**
 * Created by ebi on 2017/1/23.
 */
import weexVueRouter from 'weex-vue-router'
import routes from './native-router'//web端的路由在web-router里定义，在app.js里引用
Vue.use(weexVueRouter,{routes,weex});

export default {
    data() {
        return {
            rpx: 1,
            apiDomain:'',
            android:weex.config.env.platform.toLowerCase()=='android',
            ios:weex.config.env.platform.toLowerCase()=='ios',
            web:weex.config.env.platform.toLowerCase()=='web'
        }
    },
    created() {
        let self=this;
        let env = weex.config.env;
        let rWidth=env.deviceWidth;
        env.deviceWidth > 828 && (rWidth = env.deviceWidth / 3 * 2);
        self.rpx = 750 / rWidth;
        //self.apiDomain='http://xiazhou.me/example/xiazhou-weex';
        if(!self.web){
            self.apiDomain='http://192.168.31.241:8080';//替换成你电脑的IP，并保证手机能访问到电脑(连同一个wifi就好啦)
        }
    },
    methods: {
        request(opt) {
            const stream = weex.requireModule('stream');
            const self = this;
            let defaultOption = {
                type: "get",
                url: "",
                data: {},
                async: true,
                timeout: 20000,
                dataType: "json"
            };
            let option = self.extendObject(defaultOption, opt);
            return new Promise((resolve, reject) => {
                stream.fetch({
                    method: option.type,
                    url: self.apiDomain+option.url,
                    type: option.dataType,
                    //headers:{'content-type': 'application/json'},
                    body: option.data
                }, (response) => {
                    if (response.ok) {
                        resolve(response.data);
                    } else {
                        reject(response)
                    }
                }, () => {})
            })
        },
        jump(url) {
            /*链接有三种情况：
             * /product/20408.html  开发者定义跳转
             * http://xiazhou.me/#/product/20408.html?from=banner  运维添加的链接
             * http://xiazhou.me/blog/670.html?from=banner#tabs1   原生页面，一般native端都会做链接截取跳转对应页面
             * */
            if (!url || (url.indexOf('http') != 0 && url.indexOf('/') != 0)) {
                console.warn(url + "为非法的链接");
                return;
            }
            const self = this;
            //const nativeEvent = weex.requireModule('nativeEvent');//native端必须扩展这个模块才能正常运行
            let go = to => {
                self.$router.push(to);
            };
            url.indexOf('/') == 0 && go(url); //开发者定义跳转
            url.indexOf('http') == 0 && url.indexOf('/#/') > 0 && go(url.substr(url.indexOf('#') + 1)); //运维添加的链接
            //url.indexOf('http') == 0 && url.indexOf('/#/') == -1 && nativeEvent.skip(url); //原生页面//native端必须扩展这个模块才能正常运行
        },
        extendObject(p, c) {//依赖了babel-plugin-transform-object-rest-spread，其实可以用Object.assign()替代，但是这里要以p为准，p不存在则传入的c无效
            function isEmptyObject(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            }
            var p = p || {};
            var t = isEmptyObject(p) && c ? c : p;
            for (let i in p) {
                if (typeof p[i] === 'object' && p[i] != null) {
                    t[i] = this.extendObject(p[i], c[i]);
                } else {
                    for (var j in c) {
                        i == j && (t[i] = c[j]);
                    }
                }
            }
            return t;
        }
    }
}
