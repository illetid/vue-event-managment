<template>
  <v-alert color="info" icon="info" dismissible @input="onClose" :value="true">
    {{text}}
  </v-alert>
</template>
<script>
export default {
  props: ['text'],
   data() {
      return {
      }
   },
  methods : {
      onClose() {
          this.$emit('dismissed')
      }
  }
}
</script>
