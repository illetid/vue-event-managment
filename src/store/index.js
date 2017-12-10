import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [{
        id: 'sdfsdf123',
        title: 'new meetup title',
        date: new Date(),
        location: 'Poltava 123 fghfghdgf str',
        description: 'testert',
        imageUrl: 'https://cmeimg-a.akamaihd.net/640/clsd/getty/c64f76dc20c246ca88ee180fe4b4b781'
      },
      {
        id: 'sdfsdf2123',
        title: 'new1 meetup title',
        date: new Date(),
        location: 'Poltava 123 fghfghdgf str',
        description: 'testert',
        imageUrl: 'https://www.petfinder.com/wp-content/uploads/2013/09/cat-black-superstitious-fcs-cat-myths-162286659.jpg'
      }
    ],
    user: null,
    loading: false,
    error: null,
  },

  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((mA, mB) => mA.date > mB.date)
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 2)
    },
    loadedMeetup(state) {
      return (meetupID) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupID
        })
      }
    },
    user (state) {
      return state.user;
    },
    loading (state) {
      return state.loading;
    },
    error (state) {
      return state.error;
    }
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    loadedMeetups ({commit}) {
      commit('setLoading',true);
      firebase.database().ref('meetups').once('value')
      .then(data => {
        const meetups = [];
        const obj = data.val();
        for(let key in obj) {
          meetups.push({
            id : key,
            title : obj[key].title,
            description : obj[key].description,
            imageUrl: obj[key].imageUrl,
            date : obj[key].date,
            location : obj[key].location,
            creatorId : obj[key].creatorId
          })
        }

        commit('setLoadedMeetups',meetups);
        commit('setLoading',false);
      })
      .catch(error => {
        console.log(error);
        commit('setLoading',false);
      })
    },
    createMeetup({
      commit,
      getters
    }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId : getters.user.id
      }
      let imageUrl;
      let key;
      firebase.database().ref('meetups').push(meetup)
        .then((data)=> {
          console.log(data);
          key = data.key;
          // commit('createMeetup', {
          //   ...meetup,
          //   id: key
          // });
          return key;
        }).then(key => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
        return  firebase.storage().ref('meetups/' +key+'.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0];
          return firebase.database().ref('meetups').child(key).update({imageUrl : imageUrl})
        })
        .then(()=> {
              commit('createMeetup', {
            ...meetup,
            imageUrl : imageUrl,
            id: key
          });
        })
        .catch(error =>{
          console.log(error);
        });

     
    },
    signUserUp({
      commit
    }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registerdMeetups: []
            };
            commit('setUser', newUser);
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error);
          }
        )
    },
    signUserIn({
      commit
    }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registerdMeetups: []
            };
            commit('setUser', newUser);
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error);
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registerdMeetups: []});
    },
    logout({commit}) {
      commit('setUser', null);
      firebase.auth().signOut();
    },
    clearError({commit}){
      commit('clearError');
    }
  }

});
