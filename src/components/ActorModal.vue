<template>
    <v-dialog
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="secondary"
          variant="tonal"
          v-bind="props"
          prepend-icon="mdi-account-supervisor"
        >Details</v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card >
          <v-toolbar
            color="secondary"
            :title="actor.name"
          >🎬</v-toolbar>

          <div class="container">
            <v-img :src="actor.image.url" ></v-img>
          <v-card-text>
            <div class="text-h5 ">DOB: 👶{{ actor.birthDate }}</div>
          </v-card-text>
          <v-card-text>
            <div class="text-h5 pa-12">Born: 🎈{{ actor.birthPlace }}</div>
          </v-card-text>
          <!-- <v-card-text> -->
            <!-- <div class=" pa-12">{{ actor.miniBios[0].text }}</div> -->
          <!-- </v-card-text> -->
          <v-card-text>
            <div class="text-h4 pa-12">
                Known for:
                <v-list lines="one" v-if="actor.trademarks">
                    
                    <v-list-item class="text-h5"
                    v-for="mark in actor.trademarks"
                    :key="mark"
                    >
                    <v-row no-gutters>
                    <v-list-item-action>
                        <Icon icon="mdi:circle-small" />
                    </v-list-item-action>
                        {{ mark }}
                    </v-row>
                </v-list-item>
                </v-list>
                <p v-else>We don't know for this actor 😯</p>
            </div>
          </v-card-text>
          </div>
          <v-card-actions class="justify-end">
            <v-btn
            prepend-icon="mdi-close" variant="outlined"
            color="secondary"
              @click="isActive.value = false"
            >Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </template>

  <script>
  import { Icon } from '@iconify/vue';

export default {
	components: {
		Icon,
	},
      props:['actor'],
      data () {
        return {
            //
        }
      },
    }
  </script>

<style>
.container {
  display: flex;
  align-items: center;
  padding:10px;
}

.container img {
  margin-right: 10px;
  max-height: 20vh; /* Set the height of the image as per your requirement */
  width: auto; /* Set the width of the image as per your requirement */
}

</style>