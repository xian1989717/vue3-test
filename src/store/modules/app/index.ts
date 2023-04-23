import { Module } from 'vuex';
import Cookies from 'js-cookie';
import appStateTypes from './types';
import RootStateTypes from '../../types';
// create a new Store Modules.
const appModule: Module<appStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!(Cookies.get('sidebarStatus')) : true,
      withoutAnimation: false,
    },
    device: 'desktop',
    isNeedReloging: false
  },
  mutations: {
    toggle_sidebar: (state: appStateTypes) => {
      // eslint-disable-next-line no-console
      state.sidebar.opened = !state.sidebar.opened;

      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1 as Number);
      } else {
        Cookies.set('sidebarStatus', 0 as Number);
      }
    },
    close_sidebar:(state, withoutAnimation)=>{
      Cookies.set('sidebarStatus', 0 as Number)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    toggle_device: (state, device) => {
      state.device = device
    },
    set_is_need_relogin:(state: appStateTypes, val: Boolean)=>{
      state.isNeedReloging = val
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('toggle_sidebar');
    },
    closeSideBar({commit},{widthoutAnimation}){
      commit('close_sidebar',widthoutAnimation);
    },
    toggleDevice({ commit }, device) {
      commit('toggle_device', device)
    }
  },
  getters: {
    getSidebarState(state:appStateTypes) {
      return state.sidebar.opened;
    },
    getSidebarAnimation(state:appStateTypes) {
      return state.sidebar.withoutAnimation;
    },
    getDeviceState(state:appStateTypes) {
      return state.device;
    },
    getIsNeedReloging(state:appStateTypes){
      return state.isNeedReloging;
    }
  },
};
export default appModule;
