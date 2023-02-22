<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      
      <v-expansion-panels
      v-model="panel"
      multiple
      >
      <v-expansion-panel>
        <v-expansion-panel-title>Register</v-expansion-panel-title>
        <v-expansion-panel-text>
          <main class="login">
            <!-- <section class="forms"> -->
              <form class="register" @submit.prevent="register">
                <!-- <v-card-title readonly>Register</v-card-title> -->
                <v-text-field
                  type="email"
                  placeholder="Email"
                  v-model="register_form.email"
                  />
                <v-text-field
                  type="password"
                  placeholder="password"
                  v-model="register_form.password"
                />
                <v-btn type="submit" block color="success">Register</v-btn>
              </form>
              <!-- </section> -->
            </main>
          </v-expansion-panel-text>
        </v-expansion-panel>
        
        <v-expansion-panel>
          <v-expansion-panel-title>Login</v-expansion-panel-title>
          <v-expansion-panel-text>
            <form class="login" @submit.prevent="login">
              <!-- <v-card-title >Login</v-card-title> -->
              <v-text-field
                type="email"
                placeholder="email"
                v-model="login_form.email"
              />
              <v-text-field
                type="password"
                placeholder="password"
                v-model="login_form.password"
              />
              <v-btn type="submit" block color="info">Login</v-btn>
            </form>
          </v-expansion-panel-text>
        </v-expansion-panel>

      </v-expansion-panels>
      <!-- <v-card class="mx-auto px-6 py-8 elevation-12">
        </v-card> -->
        <!-- <v-spacer></v-spacer>
        <text-field>OR</text-field>
        <v-spacer></v-spacer> -->
        <!-- <v-card class="mx-auto px-6 py-8 elevation-12"> -->
          
      <!-- </v-card> -->
    </v-col>
  </v-row>
  <!-- <div> -->

    <!-- </div> -->
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  data: () => ({
      panel: [1],
      readonly: false,
    }),
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", login_form.value);
    };
    const register = () => {
      store.dispatch("register", register_form.value);
    };

    return {
      login_form,
      register_form,
      login,
      register,
    };
  },
};
</script>
