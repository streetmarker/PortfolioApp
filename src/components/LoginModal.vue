<template>
  <v-dialog
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="secondary"
        variant="flat"
        v-bind="props"
        prepend-icon="mdi-account-circle"
      >{{name}}</v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar
          color="secondary"
          title="Profile"
        ></v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">Hello {{name}}!</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            @click="isActive.value = false"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
  export default {
    
    props: ['name'],
    data () {
      return {
        // dialog: false,
      }
    },
  }
</script>