<template>
    <div >
        <v-progress-linear
        indeterminate
        v-if="!isMounted"
        color="secondary"
        ></v-progress-linear>
        <h1>Rent bike</h1>
        <!-- {{ filtered }}
        {{ query }} -->
        <v-btn @click="test">get</v-btn>
        <v-text-field title="type city" v-model="query"></v-text-field>
        <!-- {{ filtered }} -->
        <!-- <v-list  v-if="isMounted">
            <v-list-item
            style="padding-bottom: 5px;"
            v-for="company in filtered" :key="company.name">
                <v-row no-gutters>
                    <v-btn color="primary" >check</v-btn>
                    <p style="color: darkorange;"> {{ company.city }}</p>
                    <p> - </p>
                    <p>{{ company.name }}</p>
                </v-row>
            </v-list-item>
        </v-list> -->

    <v-data-table
    :headers="headers"
    v-model:page="page"
    :items-per-page="5"
    :items="filtered"
    :total-items="622"
    v-if="isMounted">
  </v-data-table>
  <v-pagination
      v-model="page"
      :length="100"
      color="primary"
      class="my-4"
    ></v-pagination>
        <v-text-field >{{ comp }}</v-text-field> 
        <!-- <v-text-field >{{ filtered }}</v-text-field>  -->
    </div>
</template>

<script>
export default {
    name: 'LifeIsMemeRentBike',

    data() {
        return {
            isMounted: false,
            companies:{},
            query:'',
            filtered:[],
            page: 1,
            itemsPerPage: 5,
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'City', value: 'city' },
                { text: 'Details', value: 'details' },
            ],
        };
    },

    beforeMount() {
        // const tmp = await this.getCompanies();
        // console.log(this.getCompanies())
        // this.getCompanies().then(() => {
        //     this.isMounted = true;
        // })
    },


    methods: {
        test(){
            this.getCompanies().then(() => {
            this.isMounted = true;
            })
        },
        async getCompanies(){
            const options = {
            method: "GET",
            url: "https://community-citybikes.p.rapidapi.com/networks.json",
            headers: {
                "X-RapidAPI-Key": process.env.VUE_APP_RAPIDAPI_KEY,
                "X-RapidAPI-Host": 'community-citybikes.p.rapidapi.com',
            },
            };

            const response = await this.$http
            .request(options)
            .then(function (response) {
                // console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
                return error;
            });
            this.companies = response
        },
        filterByInput(el, query){
            return el.toLowerCase().includes(query.toLowerCase())
        },
        async filter() {
            this.filtered = await this.companies.filter(company => {
                return this.filterByInput(company.city, this.query)
            });
        },

    },
    computed: {
        comp() {
            if(this.isMounted)
            return this.filter()
            else return ''
        }
    }
};
</script>

<style lang="scss" scoped>

</style>