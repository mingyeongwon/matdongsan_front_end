import { createStore } from "vuex";
import axiosConfig from "@/apis/axiosConfig";
import search from "./search";
import like from "./like";

const store = createStore({
  state: {
    uemail: "",
    accessToken: "",
  },
  getters: {
    getUemail(state, getters, rootState, rootGetters) {
      return state.uemail;
    },

    getAccessToken(state, getters, rootState, rootGetters) {
      return state.accessToken;
    },
  },
  mutations: {
    setUemail(state, payload) {
      state.uemail = payload;
    },
    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
  },
  actions: {
    saveAuth(context, payload) {
      //전역 상태값 변경
      context.commit("setUemail", payload.uemail);
      context.commit("setAccessToken", payload.accessToken);
      //로컬 파일에 저장
      localStorage.setItem("uemail", payload.uemail);
      localStorage.setItem("accessToken", payload.accessToken);
      //Axios 요청 공통 헤더에 인증 정보 추가
      axiosConfig.addAuthHeader(payload.accessToken);
    },
    //브라우저가 재실행될때 인증정보를 전역상태로 복구
    loadAuth(context, payload) {
      //userId 전역 상태 설정
      context.commit("setUemail", localStorage.getItem("uemail") || "");
      //accessToken 전역 상태 설정
      const accessToken = localStorage.getItem("accessToken") || "";
      context.commit("setAccessToken", accessToken);
      //Axios 요청 공통 헤더에 인증 정보 추가
      if (accessToken !== "") axiosConfig.addAuthHeader(accessToken);
    },
    //로그아웃 할때 인증 정보를 모두 삭제
    deleteAuth(context, payload) {
      //전역 상태값 변경
      context.commit("setUemail", "");
      context.commit("setAccessToken", "");
      //로컬 파일에서 삭제
      localStorage.removeItem("uemail");
      localStorage.removeItem("accessToken");
      //axios 요청 공통 헤더에 인증 정보 제거
      axiosConfig.removeAuthHeader();
    },
  },

  // 루트 하위의 상태 정의
  modules: {
    search: search,
    like: like,
  },
});
export default store;
