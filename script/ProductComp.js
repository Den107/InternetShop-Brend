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
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
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
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
        };
    },

    template:
        //     `
        //     <div class="product-item">
        //                 <img :src="img" alt="Some img">
        //                 <div class="desc">
        //                     <h3>{{product.product_name}}</h3>
        //                     <p>{{product.price}}₽</p>
        //                     <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
        // <!-- 1                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>-->
        // <!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
        //                 </div>
        //             </div>
        //             `

        `<div class="fetured-item content__fetured-item product-item">
                        <div class="fetured-item__hidden">
                            <button class="fetured-item__cart buy-btn" @click="cartAPI.addProduct(product)>
                                <img src="image/index/cart_featured.png" alt="bascket">
                                <p>Add to Cart</p>
                            </button>
                        </div>
                        <img :src="img" alt="item">
                        <p class="fetured-item__title">{{product.name}}</p>
                        <p class="fetured-item__subtitle">{{product.price}}$</p>
                    </div>`
    //todo решить вопрос с кнопкой

});
