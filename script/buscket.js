'use strict';
/**
 * класс для корзины
 * count - количество товаров в корзине
 */
class Bascket {
    constructor(count) {
        this.count = count;
    }
    /**
     * подсчет общей суммы товаров в корзине
     */
    calcTotalSum() {
        this.count * this.price;
    }
    /**
     * удаление всех товаров из корзины
     */
    clearBascket() { }
    /**
     * купить все товары в корзине
     */
    buyAll() { }
}

/**
 * класс товара в корзине
 */
class GoodInBascket {
    constructor(name, price, img, count = 1) {
        this.name = name;
        this.price = price;
        this.img = img;
        this.count = count;
    }
    /**
     * увеличение количества определенного товара в корзине 
     * @param {number} item 
     */
    addCount(item) {
        this.count += item;
    }
    /**
     * уменьшение количества определенного товара в корзине
     * @param {number} item 
     */
    removeCount(item) {
        this.count -= item;
        if (this.count < 1) {
            removeGood();
        }
    }
    /**
    * удаление товара из корзины
    */
    removeGood() { }
}