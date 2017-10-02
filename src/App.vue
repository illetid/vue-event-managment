<template>
  <v-app light>
    <main>
      <v-navigation-drawer persistent v-model="drawer" light enable-resize-watcher>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar class="indigo" dark fixed>
        <v-toolbar-title>Meetups</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>
            <v-icon left>rss_feed</v-icon>
            Vue meetup
          </v-btn>
          <v-btn riased>Link Two</v-btn>
          <v-btn flat>Link Three</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true
      }
    }
  }

</script>