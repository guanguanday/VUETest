import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import HelloWorld from '../components/HelloWorld.vue';
import TodoList from '../components/todoList/todo.vue';

Vue.use(Router);
Vue.use(Vuex);

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
    }
  ]
})
