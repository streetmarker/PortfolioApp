<template>
    <div>
        <v-btn @click="sendMail()" color="primary" :disabled="this.counter.value>=15">SEND IT</v-btn>
        <v-progress-circular
        v-if="this.wait"
        color="primary"
        indeterminate
        :size="54"
        :width="6"
        ></v-progress-circular>
    <!-- <div v-if="`${process.env.NODE_ENV}`==='development'">{{ counter }}</div> -->
    </div>
</template>

<script>

import requestCounter from '../helpers/requestCounter'

export default {
    name: 'LifeIsMemeSendMail',
    props:['address'],
    data() {
        return {
            counter:{
                day:0,
                value:0,
            },
            wait:false,
            text:'',
        };
    },

    async mounted() {
        this.counter = await requestCounter.getData();
    },

    methods: {
      async sendMail(){
        // setTimeout(() => {
        //     this.wait = true;
        //     setTimeout(function () {
        //         this.wait = false;
        //     }, 3000);
        // }, 3000);
        if(this.counter.value<15){
            const options = {
            method: 'POST',
            url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'c760435012msh8d411278365a25ap1b49cfjsnc37ca6960a24',
                'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
            },
            data: `{"personalizations":[{"to":[{"email":"${this.address}"}],"subject":"Life Is Meme!"}],"from":{"email":"sadfrog@example.com"},"content":[{"type":"text/plain","value":"Hello, World!"}]}`
            };

            const response = await this.$http
            .request(options)
            .then(function (response){
                console.log(response)
                return response
            })
            .catch((error) => {
                console.log(error);
            })
            await requestCounter.increment();
            this.counter = await requestCounter.getData();
        }
        else{
            //
        }
      }  
    },
};
</script>

<style lang="scss" scoped>

</style>