let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./src/assets/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        inStock: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                variantImage: "./src/assets/vmSocks-green-onWhite.jpg", // путь к фотке
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                variantImage: "./src/assets/vmSocks-blue-onWhite.jpg",
            }
        ],
        cart: 0,



    },
    // methods: {
    //     addToCart() {
    //         this.cart += 1
    //     }
    // },
    //
    // updateProduct(variantImage) {
    //     this.image = variantImage
    // }
})



