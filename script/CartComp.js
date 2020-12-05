Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
            cartUrl: '/getBascket.json',
            cartItems: [],
            isVisibleCart: false,
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJson(`${myAPI + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
            <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart"></button>
            <div class="cart-block" v-show="isVisibleCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @remove="remove">
                </cart-item>
                <button class="header__button-chek">Checkout</button>
                <button class="header__button-go">Go to cart</button>
            </div>
           
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template:
        `<div class="header__cart">
        <img class="header__cart-img" :src="img" alt="basck">
        <div class="header__context">
            <h3 class="header__cart-label">{{cartItem.name}}</h3>
            <div class="header__starts">
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star-half-alt header__star" aria-hidden="true"></i>
            </div>
            <p class="header__price">{{cartItem.quantity}}<span>x</span>{{cartItem.quantity*cartItem.price}}</p>
            
        </div>
        <button class="del-btn" @click="$emit('remove', cartItem)"><i class="fas fa-times-circle header__cross" aria-hidden="true"></i></button>
    </div>`
});
