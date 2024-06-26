import { createRouter, createWebHistory } from "vue-router";
import MyPage from "./MyPage";
import Product from "./Product";
import MainService from "./MainService";
import Qna from "./Qna";
import Payment from "./Payment";
import MainPage from "@/views/Mainpage";
import Signup from "./Signup";
import Adminpage from "./Adminpage";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/FavoriteProperty",
    component: () =>
      import(
        /* webpackChunkName: "FavoriteProperty" */ "@/views/FavoriteProperty"
      ),
  },
  {
    path: "/PropertyForm",
    component: () =>
      import(/* webpackChunkName: "PropertyForm" */ "@/views/PropertyForm"),
  },
  ...MyPage,
  ...Product,
  ...MainService,
  ...Qna,
  ...Payment,
  ...Signup,
  ...Adminpage
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'instant' }; 
  }
  
});

export default router;
