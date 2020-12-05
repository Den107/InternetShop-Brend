Vue.component('products', {
    data() {
        return {
            catalogUrl: '/getProducts.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/263x280',
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.name));
        }
    },
    mounted() {
        this.$parent.getJson(`${myAPI + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },

    template:
        `<div class="fetured-item content__fetured-item product-item">
                        <div class="fetured-item__hidden">
                            <button class="fetured-item__cart buy-btn" @click="cartAPI.addProduct(product)"><img src="image/index/cart_featured.png" alt="bascket">
                                <p>Add to Cart</p></button>
                        </div>
                        <img :src="img" alt="item">
                        <p class="fetured-item__title">{{product.name}}</p>
                        <p class="fetured-item__subtitle">{{product.price}}$</p>
                    </div>`


});
