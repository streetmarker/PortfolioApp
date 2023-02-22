<template>
    <div>
        <v-card>
            <!-- <v-form> -->
            <v-text-field
            placeholder="Type username"
            v-model="username"></v-text-field>
            
            <v-text-field 
            placeholder="Type comment"
            v-model="newCom"></v-text-field>
            
            <v-btn
            type="plain"
            color="secondary"
            @click="addComment"
            @keyup.enter="addComment"
            >Add com</v-btn>
        <!-- </v-form> -->
        </v-card>
        <br>
        <!-- {{ this.$store.state.user.email }} -->
        <v-card>
            <v-list>
                <v-list-item
                    v-for="comm in this.sortedComments" :key="comm.text"
                >
                <v-row no-gutters>
                    <v-col>
                        <v-card-text>{{ comm.text }}</v-card-text>
                        <v-card-text><i>{{ comm.username }}</i></v-card-text>
                    </v-col>
                    <v-col>
                        <v-card-text>{{ new Date(comm.date.seconds*1000).toLocaleTimeString() }}</v-card-text>
                        <v-card-text>{{ new Date(comm.date.seconds*1000).toLocaleDateString() }}</v-card-text>
                        {{ comm.id }}
                    </v-col>
                    <v-col v-if="this.$store.state.user">
                        <div v-if="this.$store.state.user">
                        <v-btn v-if="this.$store.state.user" @click="deleteComm(comm.id)">X</v-btn>    
                    </div>
                    </v-col>
                </v-row>
                <!--  && this.$store.state.user.email == 'mjaron4@gmail.com' -->
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import firestore from '../fireconf'
import Filter from 'bad-words';
import { useStore } from "vuex";

export default {
    name: 'LifeIsMemeOverallCommentBox',
    setup() {
    useStore();
    },
    data() {
        return {
            newCom:'',
            comments:[],
            filteredComments:[],
            last:{},
            username:'',
        };
    },

    mounted() {
        this.getComments();
    },
    computed: {
        sortedComments(){
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            // this.lastId = this.filteredComments.sort((a, b) => a.date - b.date)[-1].id;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return this.filteredComments.sort((a, b) => a.date - b.date); // fix unexpected behavior
        },
    },

    methods: {
        async getComments(){
            this.comments = await firestore.queryForComments();
            // console.log(this.comments)
            this.filteredComments = await this.filterComments(this.comments);
            this.comments = this.sortedComments;
            this.saveComments();
            // console.log(this.comments)
        },
        async saveComments(){
            this.last = await this.comments[this.comments.length-1];
            console.log(this.last)
        },
        async addComment(){
            const id = this.last.id
            console.log(id)
            firestore.addCommOverall(Number(id) + 1, this.newCom, this.username ? this.username : "unknown");
            this.getComments();
            setTimeout(() => {
                this.getComments();
            },1000);
        },
        async filterComments(arr){
            const filter = new Filter();
            const newBadWords = ['jebac', 'wyjebane'];
            filter.addWords(...newBadWords);
            // console.log(filter)
            // console.log(arr)
            arr.map((item) => {
                item.text = filter.clean(item.text);
                
                // console.log(item)
            })
            // this.lastId = arr[-1].id
            return arr
        },
        async deleteComm(id){
            firestore.deleteCommOverall(id);
            setTimeout(() => {
                this.getComments();
            },1000);
        }
    },
};
</script>

<style lang="scss" scoped>
.time{
    color:"primary"
}
</style>