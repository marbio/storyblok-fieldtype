<template>
    <div class="integration-selection">
        <div class="spinner" v-if="loading"></div>
        <div class="integration-results uk-flex uk-flex-column" v-if="!loading">
            <div class="header uk-flex uk-flex-between">
                <span>Risultati: {{ products.total_count }}</span>
                <button class="uk-button" @click.prevent=close>
                    <span uk-icon="close"></span>
                </button>
            </div>
            <div class="uk-flex uk-flex-wrap uk-flex-wrap-around">
                <div v-for="product in products.items" :key="product.sku" class="uk-card uk-card-default uk-card-body uk-width-1-6">
                    <div class="uk-card-media-top">
                        <img :src="product.image.url" />
                    </div>
                    <p>{{product.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getProductsBySearchTerm} from './plugins/query';
export default {
  props: {
    query: String,
    close: Function
  },
  data() {
    return {
      loading: true,
      products: [],
    };
  },
  computed: {
  },
  created() {
    this.load();
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

          this.loading = false;
        });
    },
    load() {
      this.loading = true;
      this.search();
    },
  },
};
</script>

<style>
.integration-selection {
  min-height: 700px;
}

.spinner {
  width: 50px;
  height: 50px;
  background-color: #09b3af;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px);
  }
  50% {
    -webkit-transform: perspective(120px) rotateY(180deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}

.integration-selection__header {
  position: sticky;
  top: 0px;
  background: #ffffff;
  padding-bottom: 10px;
}

.integration-results {
  height: 100%;
  max-height: 600px;
  overflow: scroll;
}

</style>