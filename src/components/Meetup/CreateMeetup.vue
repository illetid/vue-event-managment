<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h3>
          Create a new meetup
        </h3>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" v-model="title" id="title" label="Title" required>

              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="location" v-model="location" id="location" label="Location" required>

              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="imageUrl" v-model="imageUrl" id="imageUrl" label="Image Url" required>

              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img height="300px" :src="imageUrl" alt="preview image">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="description" v-model="description" id="description" multi-line label="description" required>

              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
              <v-time-picker format="24hr" v-model="time"></v-time-picker>
              <p>date - {{date}} | time - {{time}}</p>

            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn type="submit" class="primary" :disabled="!formIsValid">
                Create meetup
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        description: '',
        imageUrl: '',
        location: '',
        title: '',
        date: null,
        time: null
      }
    },
    methods: {
      onCreateMeetup() {
        if (!this.formIsValid) {
          return;
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.subtmittableDate
        };
        this.$store.dispatch('createMeetup', meetupData);
        this.$router.push('/meetups')
      }
    },
    computed: {
      formIsValid() {
        return this.title != '' && this.location != '' && this.imageUrl != '' && this.description != ''
      },
      subtmittableDate() {
        const date = new Date(this.date);
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1];
          const minutes = this.time.match(/:(\d+)/)[1];
          date.setHours(hours);
          date.setMinutes(minutes);
        } else {
          date.setHours(this.time.getHours());
          date.setMinutes(this.time.getMinutes());
          return date
        }
      }
    }
  }

</script>
