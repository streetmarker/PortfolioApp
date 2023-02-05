<template>
  <h2>COVID-19 Europe Status</h2>
  <div>
    <!-- <v-btn icon="mdi-refresh" color="primary" @click="this.getEuropeData()"></v-btn> -->
    <br />
    <v-col cols="12" sm="4">
      <v-alert
        v-if="this.report.length == 0"
        border="start"
        variant="outlined"
        density="default"
        type="error"
      >
        Connection error, please try again later on contact administrator
      </v-alert>
    </v-col>
    <v-table fixed-header height="500px">
      <thead>
        <tr>
          <th class="text-left">Country</th>
          <th class="text-left">Total Cases</th>
          <th class="text-left">Rank</th>
          <th class="text-left">Case_Fatality_Rate</th>
          <th class="text-left">Recovery_Proporation</th>
          <th class="text-left">Infection_Risk</th>
          <th class="text-left">Total_Tests</th>
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
    <v-toolbar color="light">
    <v-btn
      stacked
      variant="plain"
      append-icon="mdi-file"
      color="#21A366"
      @click="generateExcel()"
      >Download Excel</v-btn
    ></v-toolbar><v-btn @click="getZlecenia()">{{ test }}</v-btn>
  </div>
</template>

<script>
import { useStore } from "vuex";
import * as XLSX from "xlsx/xlsx.mjs";
import axios from 'axios'; // tmp
const API_URL = 'http://localhost:3000/zlecenia';

export default {
  name: "LifeIsMemeSiteDashboard",

  data() {
    return {
      report: [],
      html: ``,
      error: "",
      test:{}
    };
  },
  setup() {
    useStore();
  },
  mounted() {
    this.getEuropeData();
  },

  methods: {
    
    async getZlecenia() {
      try {
        const response = await axios.get(API_URL);
        console.log(response);
        const zlecenia = response.data;
        console.log(zlecenia);
        this.test = zlecenia;
      } catch (error) {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error('Error', error.message);
        }
      }
    },
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
      // try {
      const response = await this.$http
        .request(options)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
          return error;
        });
      // console.log(response);
      // } catch (error) {
      //   console.log(error)
      // }
      try {
        response.sort((a, b) => {
          return a.rank - b.rank;
        });
        this.report = response;
        this.html = `
        <table>
        <thead>
            <tr>
              <th>Country</th>
              <th>Total Cases</th>
              <th>Rank</th>
              <th>Case_Fatality_Rate</th>
              <th>Recovery_Proporation</th>
              <th>Infection_Risk</th>
              <th>Total Tests</th>
              <th>Population</th>
            </tr>
          </thead>
          `;
        this.report.forEach((element) => {
          this.html += `
        <tbody>
            <tr>
              <td>${element.Country}</td>
              <td>${element.TotalCases.toLocaleString("en-US")}</td>
              <td>${element.rank}</td>
              <td>${element.Case_Fatality_Rate}</td>
              <td>${element.Recovery_Proporation}</td>
              <td>${element.Infection_Risk}</td>
              <td>${parseFloat(element.TotalTests).toLocaleString("en-US")}</td>
              <td>${parseFloat(element.Population).toLocaleString("en-US")}</td>
              </tr>
              </tbody>
              `;
        });
        this.html+=`
          </table>`
        // html do store
        this.$store.commit("setReport", this.html);
      } catch (e) {
        this.error = response;
      }
    },
    generateExcel() {
      const html = this.$store.state.reportTable;
      const doc = new DOMParser().parseFromString(html, "text/xml");
      const workbook = XLSX.utils.table_to_book(doc);
      XLSX.writeFileXLSX(workbook, "Covid Report.xlsx");
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");
h2 {
  background-color: #c62828;
  font-weight: bold;
  text-align: center;
  font-family: "Playfair Display";
  font-size: 2rem;
  padding: 5px;
  // width: 50%;
}
</style>
