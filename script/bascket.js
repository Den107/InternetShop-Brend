'use strict';
const myAPI = 'https://raw.githubusercontent.com/Den107/InternetShop-Brend/master/responses/getProducts.json';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



/**
 * Описываем базовые классы
 */
class List {
    constructor(url, container, list = listContext) {
        this.container = container;
        this.list = list; // словарь для классов строка 213
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = []; // отфильтрованные товары
        this._init();
    }

    /**
     * получение данных с сервера
     * @param url
     * @returns {Promise<any | never>}
     */
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    /**
     * обработка полученных данных
     * @param data
     */
    handleData(data) {
        this.goods = [...data];
        this.render();
    }

    /**
     * подсчет стоимости всех товаров
     * @returns {*|number}
     */
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            console.log(this.constructor.name);
            const productObj = new this.list[this.constructor.name](product);
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('afterbegin', productObj.render());
        }
    }

    /**
     * метод поиска товаров
     * @param value - поисковый запрос
     */
    // filter(value) {
    //     const regexp = new RegExp(value, 'i');
    //     this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    //     this.allProducts.forEach(el => {
    //         const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
    //         if (!this.filtered.includes(el)) {
    //             block.classList.add('invisible');
    //         } else {
    //             block.classList.remove('invisible');
    //         }
    //     })
    // }
    _init() {
        return false
    }
}

class Item {
    constructor(el, img = 'https://placehold.it/263x280') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {
        return ``;
    }
}

/**
 * Наследуемся от базовых классов
 */
class ProductsList extends List {
    constructor(cart, container = '.content__main', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('fetured-item__cart')) {
                this.cart.addProduct(e.target);
            }
        });
        document.querySelector('.header__form-search').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('#searchInp').value)
        })
    }
}

class ProductItem extends Item {
    render() {
        return `<div class="fetured-item content__fetured-item" data-id="${this.id_product}"><div class="fetured-item__hidden"><button class="fetured-item__cart" data-id="${this.id_product}"
        data-name="${this.product_name}"
        data-price="${this.price}"> <img src= "image/index/cart_featured.png"alt="bascket"><p>Add to Cart</p> </button> </div><img src=${this.img} alt="item"><p class="fetured-item__title">${this.product_name}</p><p class="fetured-item__subtitle">$${this.price}</p></div>`;

    }
}

class Cart extends List {
    constructor(container = ".header__bascket-menu", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }

    /**
     * добавление товара
     * @param element
     */
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
                        // При добавлении нового товара, нас интересует только он один.
                        this.goods = [product];
                        // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * удаление товара
     * @param element
     */
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
                        find.quantity--;
                        this._updateCart(find);
                    } else { // удаляем
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.fetured-item__cart[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * обновляем данные корзины
     * @param product
     * @private
     */
    _updateCart(product) {
        let block = document.querySelector(`.fetured-item__cart[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = product.quantity;
        block.querySelector('.product-price').textContent = product.quantity * product.price;
    }
    _init() {
        document.querySelector('.header__bascket').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('fas')) {
                this.removeProduct(e.target);
            }
        })
    }

}

class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100') {
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class="header__cart" data-id="${this.id_product}">
        <img class="header__cart-img" src=${this.img} alt="basck">
        <div class="header__context">
            <h3 class="header__cart-label">${this.product_name}</h3>
            <div class="header__starts">
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star header__star" aria-hidden="true"></i>
                <i class="fas fa-star-half-alt header__star" aria-hidden="true"></i>
            </div>
            <div class="header__price"><div class="product-quantity">${this.quantity}</div><span>x</span> <div class="product-price">$${this.quantity * this.price}</div></div>
        </div>
        <i class="fas fa-times-circle header__cross" data-id="${this.id_product} aria-hidden="true"></i>
    </div>
    <div class="header__line"></div>`
    }
}

const listContext = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);
