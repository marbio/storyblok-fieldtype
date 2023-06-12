<template>
  <div>
    <form class="uk-form uk-margin-bottom" @submit.prevent="search" v-if="!modalIsOpen">
      <div class="uk-margin">
        <input class="uk-input uk-form-width-medium" v-model="query" placeholder="Search products" />
        <button class="uk-button uk-button-default" type="submit">Search</button>
      </div>
    </form>
    <div class="uk-flex uk-flex-wrap" v-if="modalIsOpen">
      <div slot="actions">
          <a class="uk-button" @click.prevent="closeSelection">
            <i class="uk-icon-close"></i> Close Selection
          </a>
        </div>
      <div v-for="product in products.items" :key="product.sku" style="cursor:pointer;" class="uk-margin-bottom flex">
        <img 
          :src="product.image.url" />
        <p>{{product.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getProductsBySearchTerm} from './plugins/query';

export default {
  mixins: [window.Storyblok.plugin],
  data() {
    return {
      products: [],
      query: '',
      modalIsOpen: false,
    }
  },
  methods: {

    search(){
      if (this.query === '') {
        this.products = []
        return
      }
      fetch(process.env.VUE_APP_GRAPHQL_ENDPOINT + new URLSearchParams(getProductsBySearchTerm(this.query)),{
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(result => {
          this.products = result.data.products;
          this.model.products = this.products.items;
          this.model.query = this.query;
        });
        this.modalIsOpen = true;
        this.$emit('toggle-modal', true);
    },

    initWith() {
      return {
        // needs to be equal to your storyblok plugin name
        plugin: 'integration-field-test-marbio',
        query: 'Hello World!',
        products: []
      }
    },

    pluginCreated() {
      // eslint-disable-next-line
      console.log('View source and customize: https://github.com/storyblok/storyblok-fieldtype')
      console.log('env var ----> '+ process.env.VUE_APP_GRAPHQL_ENDPOINT)
    },

    closeSelection() {
      this.modalIsOpen = false
      this.$emit('toggle-modal', false)
    },
  },
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  }
}
</script>
