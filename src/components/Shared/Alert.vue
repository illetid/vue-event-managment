<template>
  <v-alert color="error" icon="error" dismissible @input="onClose">
    This is a success alert that is closable.
  </v-alert>
</template>
<script>
export default {
  methods : {
      onClose() {
          this.$emmit('dismissed')
      }
  }
}
</script>
