import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import TodoList from '../components/todoList/todo.vue';
import Base from "../tool/ajaxUtil";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/todo',
      name: 'TodoList',
      component: TodoList
    },
    {
        path: '/AjaxService',
        name: 'AjaxService',
        component: Base
    }
  ]
})
