let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        brand: "Abibas",
        selectedVariant: 0,
        onSale: true,
        altText: "A pair of socks",
        details: ['80% Хлопка', '20% Полиэстера', 'Унисекс'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./src/assets/vmSocks-green-onWhite.jpg", // путь к фотке
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./src/assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0
    },

    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }


    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },

        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },

        sale(){
            if(this.onSale === true) {
                return this.brand + ' ' + this.product + ' on sale !';
            }
        }
    },


})
