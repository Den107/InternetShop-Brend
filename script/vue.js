'use strict';

const app = new Vue({
    el: '#app',
    data: {
        searchLine: '',
        isVisibleCart: false,
    },
    methods: {
        // filterGoods() {
        //     console.log(this.searchLine);
        //     const regexp = new RegExp(this.searchLine, 'ig');
        //     nameOfProduct.forEach(name => {
        //         if (regexp.test(name.innerText)) {
        //             name.parentNode.style = 'display: block;';
        //         } else if (value === '') {
        //             name.parentNode.style = 'display: block;';
        //         } else name.parentNode.style = 'display: none;';
        //     })
        // },

    }
})