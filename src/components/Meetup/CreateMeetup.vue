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
        <!--   <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="imageUrl" v-model="imageUrl" id="imageUrl" label="Image Url" required>

              </v-text-field>
            </v-flex>
          </v-layout> -->
            <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
             <v-btn raised @click="onPickFile"> Upload Image</v-btn>
             <input type="file" style="display: none;"
              @change="onFilePicked"
              accept="image/*" ref="fileInput">
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
        image : '',
        location: '',
        title: '',
        date: new Date(),
        time: new Date(),
      }
    },
    methods: {
      onCreateMeetup() {
        if (!this.formIsValid) {
          return;
        }
        if(!this.image) return;
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          image : this.image,
          description: this.description,
          date: this.submittableDateTime
        };
        this.$store.dispatch('createMeetup', meetupData);
        this.$router.push('/meetups')
      },
      onPickFile() {
        this.$refs.fileInput.click();
      },
      onFilePicked(e) {
        const files = e.target.files;
        let fileName = files[0].name;
        if(fileName.lastIndexOf('.') <= 0) {
          return alert('provide valid file')
        }

        const fileReader = new FileReader();
        fileReader.addEventListener('load',()=> {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
      }
    },
    computed: {
      formIsValid() {
        return this.title != '' && this.location != '' && this.imageUrl != '' && this.description != ''
      },
      submittableDateTime () {
            const date = new Date(this.date)
            if (typeof this.time === 'string') {
              let hours = this.time.match(/^(\d+)/)[1]
              const minutes = this.time.match(/:(\d+)/)[1]
              date.setHours(hours)
              date.setMinutes(minutes)
            } else {
              date.setHours(this.time.getHours())
              date.setMinutes(this.time.getMinutes())
            }
            return date
          }
    }
  }

</script>
