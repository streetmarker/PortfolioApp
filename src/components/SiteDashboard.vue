<template>
  <center><v-text>COVID-19 Europe Status</v-text></center>
  <div>
    <!-- <v-btn icon="mdi-refresh" color="primary" @click="this.getEuropeData()"></v-btn> -->
    <v-table fixed-header height="500px">
      <thead>
        <tr>
          <th class="text-left">Country</th>
          <th class="text-left">Total Cases</th>
          <th class="text-left">Rank</th>
          <th class="text-left">Case_Fatality_Rate</th>
          <th class="text-left">Recovery_Proporation</th>
          <th class="text-left">Infection_Risk</th>
          <th class="text-left">Total Tests</th>
          <th class="text-left">Population</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in report" :key="data.Country">
          <td>{{ data.Country }}</td>
          <td>{{ data.TotalCases.toLocaleString("en-US") }}</td>
          <td>{{ data.rank }}</td>
          <td>{{ data.Case_Fatality_Rate }}</td>
          <td>{{ data.Recovery_Proporation }}</td>
          <td>{{ data.Infection_Risk }}</td>
          <td>{{ parseFloat(data.TotalTests).toLocaleString("en-US") }}</td>
          <td>{{ parseFloat(data.Population).toLocaleString("en-US") }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  name: "LifeIsMemeSiteDashboard",

  data() {
    return {
      report: [],
    };
  },

  mounted() {
    this.getEuropeData();
  },

  methods: {
    async getEuropeData() {
      const options = {
        method: "GET",
        url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/europe",
        headers: {
          "X-RapidAPI-Key":
            "c760435012msh8d411278365a25ap1b49cfjsnc37ca6960a24",
          "X-RapidAPI-Host":
            "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
        },
      };

      const response = await this.$http
        .request(options)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
      try {
        response.sort((a, b) => {
          return a.rank - b.rank;
        });
        this.report = response;
      } catch (e) {
        this.error = response;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");
v-text {
  background-color: rgb(187, 10, 10);
  font-weight: bold;
  text-align: center;
  font-family: "Playfair Display", serif;
  font-size: 2rem;
}
</style>
