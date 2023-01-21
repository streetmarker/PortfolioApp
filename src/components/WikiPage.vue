<template>
    <div>
        <!-- <v-btn @click="fetchArticle('Vue.js')">Search Wiki</v-btn>
        <div  v-html="this.articleContent"></div> -->
        <v-color-picker
        v-model="c1"
        hide-inputs
        show-swatches
        ></v-color-picker>
        <v-chip
        class="ma-2"
        :color="this.c1"
        variant="outlined"
        >
        <v-icon start icon="mdi-server-plus"></v-icon>
        Server Status
        </v-chip>
    </div>
</template>

<script>
// import wiki  from 'wikijs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const wiki = require('wikijs');

export default {
    // name: 'LifeIsMemeWiki',

    data() {
        return {
            articleContent: '',
            loading: false,
            c1: "#00ff00",
        }
    },

    methods: {
        async fetchArticle(title) {
    //         this.loading = true
    //         const wikipedia = new Wikijs()
    //         const article = await wikipedia.page(title)
    //         this.articleContent = await article.html()
    //         this.loading = false
            const endpoint = 'https://en.wikipedia.org/w/api.php';

            const params = {
            action: 'query',
            format: 'json',
            titles: title,
            prop: 'revisions',
            rvprop: 'content',
            formatversion: 2,
            origin: '*'
            };

            const queryString = new URLSearchParams(params).toString();

            const tmp = await fetch(`${endpoint}?${queryString}`)
            .then(response => response.json())
            .then(data => {
                return data.query.pages[0].revisions[0].content;
            });
            this.articleContent = this.wikipediaToHtml(tmp);
            console.log(typeof(tmp))
            console.log(this.articleContent)
        },
        wikipediaToHtml(wikipediaMarkup) {
            // Replace newlines with spaces
            wikipediaMarkup = wikipediaMarkup.replace(/\n/g, ' ');

            // Extract templates
            const templates = {};
            wikipediaMarkup = wikipediaMarkup.replace(/\{\{(.+?)\}\}/g, (match, template) => {
                const key = `TEMPLATE-${Math.random().toString(36).substring(2)}`;
                templates[key] = template;
                return key;
            });

            // Convert wikipedia links to HTML links
            wikipediaMarkup = wikipediaMarkup.replace(/\[\[([^[\]|]+)(\|[^[\]]+)?\]\]/g, (match, link, label) => {
                label = label ? label.substring(1) : link;
                return `<a href="https://en.wikipedia.org/wiki/${link}">${label}</a>`;
            });

            // Restore templates
            wikipediaMarkup = wikipediaMarkup.replace(/TEMPLATE-.+?/g, key => templates[key]);

            // Return the final HTML
            return wikipediaMarkup;

            // // Replace newlines with spaces
            // wikipediaMarkup = wikipediaMarkup.replace(/\n/g, ' ');

            // // Extract templates
            // const templates = {};
            // wikipediaMarkup = wikipediaMarkup.replace(/\{\{(.+?)\}\}/g, (match, template) => {
            //     const key = `TEMPLATE-${Math.random().toString(36).substring(2)}`;
            //     templates[key] = template;
            //     return key;
            // });

            // // Convert wikipedia links to HTML links
            // wikipediaMarkup = wikipediaMarkup.replace(/\[\[([^[\]|]+)(\|[^[\]]+)?\]\]/g, (match, link, label) => {
            //     label = label ? label.substring(1) : link;
            //     return `<a href="https://en.wikipedia.org/wiki/${link}">${label}</a>`;
            // });

            // // Process templates
            // wikipediaMarkup = wikipediaMarkup.replace(/TEMPLATE-.+?/g, key => {
            //     const template = templates[key];
            //     const [name, ...params] = template.split('|');
            //     if (name === 'Infobox scientist') {
            //     // Create an infobox table
            //     let html = '<table><tbody>';
            //     for (const param of params) {
            //         const [key, value] = param.split('=');
            //         html += `<tr><th>${key.trim()}</th><td>${value.trim()}</td></tr>`;
            //     }
            //     html += '</tbody></table>';
            //     return html;
            //     }
            //     // Return the template as plain text for other templates
            //     return template;
            // });

            // // Return the final HTML
            // console.log(wikipediaMarkup)
            // return wikipediaMarkup;
            }
    },
};
</script>

<style lang="scss" scoped>
</style>
