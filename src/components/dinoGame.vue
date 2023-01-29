<template>
    <div v-html="legacySystemHTML">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Just like JSX! Oh wait... 
        legacySystemHTML: `
        <html>
          <body>
            <MARQUEE>LOL</MARQUEE>
            <h1>idk</h1>
          </body>
        </html>
        `
      }
    }
  }
  </script>