import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import OnboardingSkills from "../views/Onboarding/OnboardingSkills";
import GetFeedbackDash from "../views/GetFeedbackDash";
import GiveFeedbackDash from "../views/GiveFeedbackDash";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/onboarding',
    name: 'OnboardingSkills',
    component: OnboardingSkills
  },
  {
    path: '/getfeedbackdash',
    name: 'GetFeedbackDash',
    component: GetFeedbackDash
  },
  {
    path: '/givefeedbackdash',
    name: 'GiveFeedbackDash',
    component: GiveFeedbackDash
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
