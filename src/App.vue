<template>
  <v-app light>
    <v-navigation-drawer class="hidden-md-and-up" v-model="drawer" light enable-resize-watcher>
      <v-list dense>
        <v-list-tile v-for="item in menuItems" router :to="item.link" :key="item.title">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}

            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="indigo" dark fixed>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">
          Meetups
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in menuItems" router :to="item.link" :key="item.title">
          <v-icon left>
            {{item.icon}}
          </v-icon>
          {{item.title}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
       
      }
    },
    computed: {
      menuItems() {
        let menuItems = [{
            icon: 'face',
            title: 'Sign up',
            link: '/signup'
          },
          {
            icon: 'lock_open',
            title: 'Sign in',
            link: '/signin'
          }
        ];
        if (this.userIsAuth) {
          menuItems = [{
              icon: 'rss_feed',
              title: 'Vue meetup',
              link: '/meetups'
            },
            {
              icon: 'room',
              title: 'Organize Meetup',
              link: '/meetup/new'
            },
            {
              icon: 'person',
              title: 'Profile',
              link: '/profile'
            },
          ]
        }
        return menuItems
      },
      userIsAuth() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }

</script>
