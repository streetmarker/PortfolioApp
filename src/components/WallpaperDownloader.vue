<template>
    <div>
      <!-- Wyświetlaj miniaturę tapety -->
      <img v-bind:src="wallpaper.thumbnail" v-bind:alt="wallpaper.name" />
      <!-- Wyświetl nazwę tapety -->
      <p>{{ wallpaper.name }}</p>
      <!-- Przycisk do pobierania tapety -->
      <a v-bind:href="wallpaper.url" download>Pobierz</a>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WallpaperDownloader',
    props: {
      wallpaper: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  /* Możesz dodać tutaj stylizację dla komponentu */
  </style>
  