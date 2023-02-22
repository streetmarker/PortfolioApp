<template>
  <v-dialog transition="dialog-bottom-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        color="secondary"
        variant="tonal"
        v-bind="props"
        prepend-icon="mdi-account-supervisor"
        >Movies</v-btn
      >
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar
          >🎬 Filmography - Top Movies
          <v-card-actions class="justify-end">
            <v-btn
              prepend-icon="mdi-close"
              variant="outlined"
              color="secondary"
              @click="isActive.value = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-toolbar>
        <v-progress-linear
          v-if="waiting"
          indeterminate
          color="secondary"
        ></v-progress-linear>
        <div class="container">
          <v-list>
            <v-row no-gutters>
              <v-list-item v-for="(movie, index) in movies"  :key="movie.title">
                <v-card class="movieSlot" v-if="index < 10">
                  {{ movie.title }}
                  <v-img
                    v-if="movie.image"
                    :lazy-src="lazyScreen"
                    :src="movie.image.url"
                    width="200px"
                    height="200px"
                  ></v-img>
                  <v-img v-else-if="!movie.image" src="https://micras.org/wiki/images/7/78/Image_placeholder.jpg"></v-img>
                </v-card>
              </v-list-item>
            </v-row>
          </v-list>
        </div>
        <v-card-actions class="justify-end">
          <v-btn
            prepend-icon="mdi-close"
            variant="outlined"
            color="secondary"
            @click="isActive.value = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import background from "../assets/background.png";

export default {
  props: ["movies", "waiting"],
  data() {
    return {
      lazyScreen: background,
    };
  },
};
</script>

<style>
.container {
  display: flex;
  align-items: center;
  padding: 10px;
}

/* .container img {
  margin-right: 10px;
  max-width: 100%;
  height: auto;
  min-height: 200px;
  max-height: 20vh; 
  width: auto; 
} */

.movieSlot {
  padding-left: 5vh;
}
</style>
