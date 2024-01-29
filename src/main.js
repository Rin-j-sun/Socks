let eventBus = new Vue();

Vue.component('product-review', {
    template: `

      <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Пожалуйста, исправьте следующие ошибки:</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      </p>

      <p>
        <label for="name">Имя:</label>
        <input id="name" v-model="name" placeholder="Имя">
      </p>

      <p>
        <label for="review">Оставить отзыв:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Рейтинг:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <label for="recommend">Вы бы порекомендовали этот продукт?</label><br>
        <input type="radio" id="recommend-yes" value="yes" v-model="recommend"> <label for="recommend-yes">Да</label><br>
        <input type="radio" id="recommend-no" value="no" v-model="recommend"> <label for="recommend-no">Нет</label>
      </p>

      <p>
        <input type="submit" value="Отправить">
      </p>
      </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if (!this.name) this.errors.push("Имя обязательно.");
            if (!this.review) this.errors.push("Отзыв обязателен.");
            if (!this.rating) this.errors.push("Рейтинг обязателен.");
            if (!this.recommend) this.errors.push("Рекомендация обязательна.");

            if (this.errors.length === 0) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                };

                eventBus.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;

            }

        }
    }
});


// Вкладки

Vue.component('product-tabs', {
    template: `
      <div>
      <ul>
       <span class="tab"
             :class="{ activeTab: selectedTab === tab }"
             v-for="(tab, index) in tabs"
             @click="selectedTab = tab"
       >{{ tab }}</span>
      </ul>
      <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>
      <div v-show="selectedTab === 'Make a Review'">
        <product-review></product-review>
      </div>
      <div v-show="selectedTab === 'Shipping'">
        <shipping-tab :premium="premium"></shipping-tab>
      </div>
      <div v-show="selectedTab === 'Details'">
        <details-tab :details="details"></details-tab>
      </div>
      </div>
    `,
    props: {
        reviews: {
            type: Array,
            required: true
        },
        premium: {
            type: Boolean,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'
        }
    }
});



Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },

        cart: {
            type: Array,
            required: true
        },

        reviews: {
        type: Array,
        required: true
}
    },
    template: `
   <div class="product">
    <div class="product-image">
           <img :src="image" :alt="altText"/>
       </div>

       <div class="product-info">
           <h1>{{ title }}</h1>
           <p v-if="inStock">In stock</p>
           <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>
           <div
                   class="color-box"
                   v-for="(variant, index) in variants"
                   :key="variant.variantId"
                   :style="{ backgroundColor:variant.variantColor }"
                   @mouseover="updateProduct(index)"
           ></div>
          
           <button
                   v-on:click="addToCart"
                   :disabled="!inStock"
                   :class="{ disabledButton: !inStock }"
           >
               Add to cart
           </button>    
       </div>

    <product-tabs :reviews="reviews" :premium="premium" :details="details"></product-tabs>
   
       </div>
 `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            altText: "A pair of socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./src/assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./src/assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        вудшеFromCart() {
            if (this.cart.length > 0) {
                this.$emit('remove-from-cart', this.cart[this.cart.length - 1]);
            }
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
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }
    }
})

Vue.component('shipping-tab', {
    template: `
    <div>
      <p>Shipping Details:</p>
      <p v-if="premium">Free Shipping</p>
      <p v-else>Shipping Cost: $2.99</p>
    </div>
  `,
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    }
});

Vue.component('details-tab', {
    template: `
    <div>
      <p>Product Details:</p>
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    </div>
  `,
    props: {
        details: {
            type: Array,
            required: true
        }
    }
});

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        reviews: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        }
    },

    delitFromCart(id) {
            let index = this.cart.indexOf(id);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },

    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        });
    },

})
