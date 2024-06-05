import { createRouter, createWebHistory } from "vue-router";

import UserList from "../views/dashboards/user/UserList.vue";
import AddUser from "../views/dashboards/user/AddUser.vue";
import OrganizationList from "../views/dashboards/organization/OrganizationList.vue";
import OrganizationListAdmin from "../views/dashboards/organization/OrganizationListAdmin.vue";
import OrganizationNewAdmin from "../views/dashboards/organization/OrganizationNewAdmin.vue";
import OrganizationAdd from '../views/dashboards/organization/OrganizationAdd.vue';
import OrganizationDetail from '../views/dashboards/organization/OrganizationDetail.vue';

// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
// ELIMINAR
// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
import Login from "../views/auth/signin/Login.vue";
import Home from "../views/Home.vue";
// import admin from "../middlewares/admin.js"; MIDDLEWARE --------------------------
import adminCreator from "../middlewares/admin_creator.js";
import guest from "../middlewares/guest.js";
import auth from "../middlewares/auth.js";
// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
  },
  {
    path: "/user/list",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/user/add",
    name: "addUser",
    component: AddUser,
  },
  {
    path: "/organization/list",
    name: "OrganizationList",
    component: OrganizationList,
  },
  {
    path: "/organization/adminlist",
    name: "Organization List Admin",
    component: OrganizationListAdmin,
  },
  {
    path: "/organization/newadminorganization",
    name: "Organization New Admin",
    component: OrganizationNewAdmin,
  },
  {
    path: "/organization/detail",
    name: "OrganizationDetail",
    component: OrganizationDetail,
  },
  {
    path: '/organizations/add',
    name: 'OrganizationAdd',
    component: OrganizationAdd,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      middleware: [auth, adminCreator],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

// /////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////
// IMPLEMENTACION DE MIDDLEWARE
// /////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////

// function nextFactory(context, middleware, index) {
//   const subsequentMiddleware = middleware[index];
//   if (!subsequentMiddleware) return context.next;

//   return (...parameters) => {
//     context.next(...parameters);
//     const nextMiddleware = nextFactory(context, middleware, index + 1);
//     subsequentMiddleware({ ...context, next: nextMiddleware });
//   };
// }


// router.beforeEach((to, from, next) => {
//   if (!to.meta.middleware) {
//     to.meta.middleware = [auth];
//   }

//   const middleware = to.meta.middleware;

//   const context = {
//     from,
//     next,
//     router,
//     to,
//   };
//   const nextMiddleware = nextFactory(context, middleware, 1);

//   return middleware[0]({ ...context, next: nextMiddleware });
// });

// /////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////
// FIN IMPLEMENTACION DE MIDDLEWARE
// /////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////

export default router;
