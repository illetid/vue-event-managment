<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 >

        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="onSignup">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field name="email" :rules=[rules.email] label="Mail" id="email" type="email" v-model="email" required>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field name="password" label="Password" id="password" type="password" v-model="password" required>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field name="confirmPassword" :rules="[rules.comparePasswords]" label="Confirm Password" id="confirmPassword" type="password"
                        v-model="confirmPassword">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn type="submit">
                        Sign Up
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        rules: {
          comparePasswords: (val) => {
            return this.password === val ? true : 'Password do not match';
          },
          email: (value) => {
            const pattern =
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    watch: {
      user(val) {
        if (val !== null && val !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignup() {
        this.$store.dispatch('signUserUp', {
          email: this.email,
          password: this.password
        })
      }
    }
  }

</script>
