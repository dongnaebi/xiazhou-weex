/**
 * Created by ebi on 2017/2/8.
 */

import index from './pages/index.vue'
import list from './pages/product/list.vue'
const detail = resolve => require(['./pages/product/detail.vue'], resolve);

const routes = [
    { path: '/', component: index },
    { path: '/list/:id', component: list },
    { path: '/product/:id', component: detail }
];
export default routes