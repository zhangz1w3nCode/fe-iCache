import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MonitorView from "../views/cahceMonitor/MonitorView.vue";
import MonitorCenter from "../views/cahceMonitor/MonitorCenter.vue";
import FlowListView from "../views/flowProcess/list/FlowListView.vue";
import FlowDesignView from "../views/flowProcess/create/FlowDesignView.vue";
import FlowQueryDetailView from "../views/flowProcess/list/FlowQueryDetail.vue";
import FlowUpdateDetail from "../views/flowProcess/update/FlowUpdateDetail.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/cache/monitor/view', component: MonitorView },
    { path: '/cache/monitor/center', component: MonitorCenter },
    { path: '/flow/list', component: FlowListView},
    { path: '/flow/design', component: FlowDesignView},
    {
        path: '/flow/query/detail/:record',
        name: 'flowQueryDetail',
        component: FlowQueryDetailView
    },
    {
        path: '/flow/update/detail/:id',
        name: 'flowGraphDetail',
        component: FlowUpdateDetail
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;