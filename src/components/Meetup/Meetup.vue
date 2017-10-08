<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0 white--text">{{meetup.title}}</h5>
            </div>
          </v-card-title>
          <v-card-media :src="meetup.imageUrl" height="400px" cover>
          </v-card-media>
          <v-card-text>
            <p class="data">
              {{meetup.date | date}} - {{meetup.location}}
            </p>
            <div>
              {{meetup.description}}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat dark to="/">
              <v-icon left>arrow_forward</v-icon>
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup() {
        return this.$store.getters.loadedMeetup(this.id)
      }
    }
  }

</script>
