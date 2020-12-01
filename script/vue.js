'use strict';
const myAPI = 'https://raw.githubusercontent.com/Den107/InternetShop-Brend/lesson5/responses';

const app = new Vue({
    el: '#app',
    data: {
        searchLine: '',
        isVisibleCart: false,
        filtered: [],
        products: [],
        catalogUrl: '/getProducts.json',
        imgCatalog: 'https://placehold.it/100x115'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.name));
        },


    },
    mounted() {
        this.getJson(`${myAPI + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
})