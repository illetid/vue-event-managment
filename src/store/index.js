import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [{
        id: 'sdfsdf123',
        title: 'new meetup title',
        date: '2017-10-4',
        imageUrl: 'https://cmeimg-a.akamaihd.net/640/clsd/getty/c64f76dc20c246ca88ee180fe4b4b781'
      },
      {
        id: 'sdfsdf2123',
        title: 'new1 meetup title',
        date: '2017-10-4',
        imageUrl: 'https://www.petfinder.com/wp-content/uploads/2013/09/cat-black-superstitious-fcs-cat-myths-162286659.jpg'
      }
    ],
    user: {
      id: 'sdfs435',
      registerdMeetups: ['dfgdfg']
    }
  },
  mutations: {},
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
    }
  },
  actions: {}
});
