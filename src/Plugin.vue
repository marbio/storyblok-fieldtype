<template>
  <div>

    <div v-if="!modalIsOpen">
      <p class="uk-text-bold">Search by term</p>
      <div class="uk-flex uk-flex-center">
        <input class="uk-input uk-form-width-medium" v-model="query" placeholder="Search products" />
        <button class="uk-button uk-width-1-1" @click.prevent=openSelection>
          <span uk-icon="arrow-right"></span>
        </button>
      </div>
        <p uk-alert v-if="queryEmpty">Inserisci un termine di ricerca...</p>
      <hr class="uk-divider-icon">
    </div>
    <div class="uk-form" v-if="modalIsOpen">
      <IntegrationSelection :query=query :close=closeSelection></IntegrationSelection>      
    </div>
  </div>
</template>

<script>
import IntegrationSelection from './IntegrationSelection'

export default {
  mixins: [window.Storyblok.plugin],
  data() {
    return {
      query: '',
      modalIsOpen: false,
      queryEmpty: false,
    }
  },
  methods: {



    initWith() {
      return {
        // needs to be equal to your storyblok plugin name
        plugin: 'integration-field-test-marbio',
        query: 'Hello World!',
        products: []
      }
    },

    pluginCreated() {
      this.$sb.getScript('https://cdn.jsdelivr.net/npm/uikit@3.16.21/dist/js/uikit.min.js', () => {
        this.$sb.getScript('https://cdn.jsdelivr.net/npm/uikit@3.16.21/dist/js/uikit-icons.min.js');
      })
    },

    openSelection() {
      if(this.query!=='') {
        this.queryEmpty = false;
        this.modalIsOpen = true;
        this.$emit('toggle-modal', true);
      } else {
        this.queryEmpty = true;
      }
    },

    closeSelection() {
      this.modalIsOpen = false
      this.$emit('toggle-modal', false)
    },
  },
  components: {
    IntegrationSelection
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
<style>
@import 'https://cdn.jsdelivr.net/npm/uikit@3.16.21/dist/css/uikit.min.css';
</style>
