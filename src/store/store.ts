import { register } from 'register-service-worker';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import router from '../router'
import { auth } from '../fireconf'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

// Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  // tutaj umieść pola store'a
  counter: number
  user: null
}

const store: StoreOptions<RootState> = {
  state: {
    // tutaj ustaw wartości początkowe dla pól store'a
    counter: 0,
    user: null // auth
  },
  mutations: {
    // tutaj umieść mutacje
    setMyVariable(state, newValue: number) {
      state.counter = newValue;
    },
    incrementNum(state) {
      state.counter++
    },
    SET_USER (state, user) {
      state.user = user
    },
    CLEAR_USER (state) {
      state.user = null
    }
  },
  actions: {
    // tutaj umieść akcje
    async login ({ commit }, details) { // auth
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/invalid-email':
            alert("Wrong email")
            break
          case 'auth/missing-email':
            alert("No email provided")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert(error.message)
        }
        return
      }
      commit ('SET_USER', auth.currentUser)
      router.push({ name: 'HelloWorld' })
    },
    async register ({ commit }, details) {
      const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/invalid-email':
            alert("Wrong email")
            break
          case 'auth/missing-email':
            alert("No email provided")
            break
          case 'auth/email-already-in-use':
            alert("Email in use")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert(error.message)
        }
        return
      }
      commit ('SET_USER', auth.currentUser)
      router.push('/hello')
    },
    async logout ({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/')
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/' ) {
            router.push('/hello')
          }
        }
      })
    }
  },
  modules: {
    // tutaj umieść moduły store'a
  }
};

export default new Vuex.Store<RootState>(store);
