<template>
    <v-toolbar
    color="secondary"
    :elevation="24"
    title="😷 Covid Report"
    ></v-toolbar>
    
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
    <br>
<v-row no-gutters>
    <v-toolbar color="light-grey" style="height: 100px;">
        
      <v-btn
      stacked
      variant="plain"
      append-icon="mdi-file"
      color="#21A366"
      @click="generateExcel()"
      >Download Excel</v-btn>
    <SendMail />
  
  </v-toolbar></v-row>
    </div>
</template>

<script>
import { useStore } from "vuex";
import * as XLSX from "xlsx/xlsx.mjs";
import axios from 'axios'; // tmp
import SendMail from './SendMail.vue'


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
  components: {
    SendMail,
  },
  setup() {
    useStore();
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
          "X-RapidAPI-Key": process.env.VUE_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.VUE_APP_RAPIDAPI_HOST_COVID,
        },
      };
      const response = await this.$http
        .request(options)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
          return error;
        });
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
              <style>table {  border-collapse: collapse;  width: 100%;  max-width: 800px;  margin: 0 auto;  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);  background-color: #fff;  font-family: 'Roboto', sans-serif;}table th,table td {  padding: 1rem;  text-align: left;}table th {  background-color: #f2f2f2;font-weight: bold;  color: #444;}table td {  border-bottom: 1px solid #f2f2f2;}table tr:hover {  background-color: #f5f5f5;}</style>
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
