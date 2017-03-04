/**
 * Created by ebi on 2017/1/19.
 */
import "weex-vue-render"
import searchbox from './components/searchbox.vue'
import nativeEvent from './modules/nativeEvent'

Vue.component('searchbox', searchbox);//安装组件

weex.registerModule('nativeEvent',nativeEvent);//安装模块

