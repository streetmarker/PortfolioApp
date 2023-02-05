<template>
  <div>
    <div id="loading-screen" v-if="this.wait" @transitionend="transitionEnd">
      <div :style="elementStyles" class="loading-icon"></div>
    </div>
    <v-row no-gutters>
      <v-col cols="12" sm="4"> </v-col>
      <v-col cols="12" sm="5">
        <v-row>
          <!-- <v-toolbar color="light"> -->
          <!-- <v-btn
            stacked
            variant="plain"
            append-icon="mdi-file"
            color="#1D6F42"
            @click="generateExcel()"
            >Download Excel</v-btn
          > -->
          <v-btn
            stacked
            variant="plain"
            append-icon="mdi-mail"
            @click="sendMail()"
            color="primary"
            :disabled="
              this.counter.value >= 15 ||
              this.$store.state.reportTable.length == 0
            "
            >Send Report on {{ this.$store.state.user.email }}</v-btn
          >
          <v-text-field
            prepend-icon="mdi-or"
            variant="plain"
            label="Or type in custom mail"
            v-model="anotherMail"
            append-icon="mdi-send"
            @click:append="sendMail"
          ></v-text-field>
        <!-- </v-toolbar> -->
        </v-row>
      </v-col>
    </v-row>
  </div>
  <br>
</template>

<script>
import requestCounter from "../helpers/requestCounter";
import { useStore } from "vuex";
// import * as XLSX from "xlsx/xlsx.mjs";

export default {
  name: "LifeIsMemeSendMail",
  props: ["address"],
  data() {
    return {
      counter: {
        day: 0,
        value: 0,
      },
      wait: false,
      text: "",
      parsedHtml: this.$store.state.reportTable,
      anotherMail: "",
    };
  },
  setup() {
    useStore();
  },
  computed: {
    elementStyles() {
      return {
        borderTop: `5px solid #8E24AA`,
      };
    },
  },
  async mounted() {
    this.counter = await requestCounter.getData();
  },

  methods: {
    async sendMail() {
      let mail = this.anotherMail.length > 0 ? this.anotherMail : this.address;
      // console.log(mail);
      let html = this.$store.state.reportTable; // pobranie kodu z raportu
      html = html
        .split("")
        .filter((char) => !["\n"].includes(char))
        .join("");
      if (this.counter.value < 15) {
        const options = {
          method: "POST",
          url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
              "c760435012msh8d411278365a25ap1b49cfjsnc37ca6960a24",
            "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
          },
          data: `{"personalizations":[{"to":[{"email":"${mail}"}],"subject":"Life Is Meme!"}],"from":{"email":"sadfrog@example.com"},"content":[{"type":"text/html","value":"<h3>COVID Report</h3><div>${html}</div>"}]}`,
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await this.$http
          .request(options)
          .then(function (response) {
            console.log(response);
            return response;
          })
          .catch((error) => {
            console.log(error);
          });
        await requestCounter.increment();
        this.counter = await requestCounter.getData();
      } else {
        //
      }

      this.wait = true;
      setTimeout(() => {
        this.wait = false;
      }, 2000);
      mail = '';
    },
    transitionEnd() {
      if (!this.wait) {
        this.$el.remove();
      }
    },
    // generateExcel() {
    //   const html = this.$store.state.reportTable;
    //   const doc = new DOMParser().parseFromString(html, "text/xml");
    //   const workbook = XLSX.utils.table_to_book(doc);
    //   XLSX.writeFileXLSX(workbook, "Covid Report.xlsx");
    // },
  },
};
</script>

<style lang="scss" scoped>
#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#757575, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.5s;
}

#loading-screen.fade-out {
  opacity: 0;
}

.loading-icon {
  border: 5px solid #f3f3f3;
  border-top: 5px solid;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
