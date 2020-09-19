import * as firebase from 'firebase/app';
import { UserProfile } from '../../models/user';

const initialState = () => {
  return {
    user: null,
    userProfile: null,
    error: null,
  };
};

const getters = {
  user: (store) => store.user,
  error: (store) => store.error,
  isUserAuthenticated: (store) => !!store.user,
};

const actions = {
  async signUp({ commit }, payload) {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
      commit('SET_USER', response.user);
      commit('SET_ERROR', null);
    }
    catch (e) {
      commit('SET_ERROR', e);
    }
  },
  async signInWithEmailAndPassword({ commit }, payload) {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
      commit('SET_USER', response.user);
      commit('SET_ERROR', null);
    }
    catch (e) {
      commit('SET_ERROR', e);
    }
  },
  async signOut({ commit }) {
    try {
      await firebase.auth().signOut();
    } finally {
      commit('SET_USER', null);
      commit('SET_USER_PROFILE', null);
    }
  },
  async loadUserProfile({ commit, state }) {
    const userProfileCollection = firebase.firestore().collection('userProfile');

    try {
      const doc = await userProfileCollection
        .doc(state.user.uid)
        .get();

      if (doc.exists) {
        commit('SET_USER_PROFILE', UserProfile.fromSchema(doc.data()));
      } else {
        // No user profile yet
        const newProfile = new UserProfile();
        await userProfileCollection.doc(state.user.uid).set(newProfile);

        commit('SET_USER_PROFILE', newProfile);
      }
    }
    catch (e) {
      commit('SET_ERROR', e);
    }
  }
};

const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_USER_PROFILE(state, payload) {
    state.userProfile = payload;
  },
  SET_ERROR(state, payload) {
    state.user = null;
    state.error = payload;
  },
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations,
};
