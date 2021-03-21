import Vue from 'vue'
import Router from 'vue-router'

import DashBoard from '@/components/Employee/Dashboard'
import NewEmployee from '@/components/Employee/NewEmployee'
import ViewEmployee from '@/components/Employee/ViewEmployee'
import EditEmployee from '@/components/Employee/EditEmployee'

import TodoPage from '@/components/TodoPage'
import TodoDetail from '@/components/TodoDetail'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '*',
            component: () =>
                import ('@/views/NotFoundPage.vue'),
        },
        {
            path: '/',
            name: 'TodoPage',
            component: TodoPage
        },
        {
            path: '/:todo_id',
            name: 'todo-detail',
            component: TodoDetail
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashBoard
        },
        {
            path: '/dashboard/new',
            name: 'new-employee',
            component: NewEmployee
        },
        {
            path: '/dashboard/edit/:employee_id',
            name: 'edit-employee',
            component: EditEmployee
        },
        {
            path: '/:employee_id',
            name: 'view-employee',
            component: ViewEmployee
        },
    ]
});