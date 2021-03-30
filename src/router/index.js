import Vue from 'vue'
import Router from 'vue-router'

import DashBoard from '@/components/Employee/Dashboard'
import NewEmployee from '@/components/Employee/NewEmployee'
import ViewEmployee from '@/components/Employee/ViewEmployee'
import EditEmployee from '@/components/Employee/EditEmployee'

import TodoShow from '@/components/todo/TodoShow'
import TodoIndex from '@/components/todo/TodoIndex'
import TodoUpcoming from '@/components/todo/TodoUpcoming'
import TodoProject from '@/components/todo/TodoProject'

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
            name: "Todo",
            component: TodoIndex
        },
        {
            path: '/upcoming',
            name: "todo-upcoming",
            component: TodoUpcoming
        },
        {
            path: '/project',
            name: "todo-project",
            component: TodoProject
        },
        {
            path: '/:todo_id',
            name: 'todo-show',
            component: TodoShow
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