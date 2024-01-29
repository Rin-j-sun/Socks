let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./src/assets/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        inStock: true,
        details: ['80% Хлопка', '20% Полиэстера', 'Унисекс'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./src/assets/vmSocks-green-onWhite.jpg", // путь к фотке
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./src/assets/vmSocks-blue-onWhite.jpg",
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
    },

    methods: {
        addToCart() {
            this.cart += 1
        },
        delitToCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    },

})



