<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn router to='/meetups' class="primary" large>
          Explore Meetups
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn router to='/meetup/new' class="primary" large>
          Organize Meetup
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item v-for="item in meetups" v-bind:src="item.imageUrl" :key="item.id">
              <div class="title">
                  {{item.title}}
             </div>   
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
        <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
       Join to our meetup
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        meetups: [{
          id: 'sdfsdf123',
          title: 'new meetup title',
          imageUrl: 'https://cmeimg-a.akamaihd.net/640/clsd/getty/c64f76dc20c246ca88ee180fe4b4b781'
        },
        {
          id: 'sdfsdf2123',
          title: 'new1 meetup title',
          imageUrl: 'https://www.petfinder.com/wp-content/uploads/2013/09/cat-black-superstitious-fcs-cat-myths-162286659.jpg'
        }]
      }
    }
  }

</script>

<style scoped>
.title {
    position: absolute;
    bottom: 50px;
    color: #fff;
    background: rgba(0,0,0,0.5);
    font-size: 2px;
    width: 100%;
    left: 0;
    text-align: center;
    padding: 20px;
}
</style>
