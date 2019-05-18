import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../src/assets/global.less'

import _6f6c098b from '../src/layouts/default.vue'
import _77a66d33 from '../src/layouts/login.vue'

const layouts = {_default: _6f6c098b, _login: _77a66d33}

export default {
  head: {
    title: 'Optimus',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {'http-equiv': 'x-ua-compatible', content: 'IE=edge, chrome=1'},
      {hid: 'description', name: 'description', content: '开发平台'}
    ],
    link: [
      {
        rel: 'icon',
        type: 'image\u002Fx-icon',
        href:
          'https:\u002F\u002Fdeepexi.oss-cn-shenzhen.aliyuncs.com\u002Fdeepexi-services\u002Ffavicon32x32.png'
      },
      {}
    ],
    style: [],
    script: []
  },

  render(h, props) {
    const loadingEl = h('nuxt-loading', {ref: 'loading'})
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h(
      'div',
      {
        domProps: {
          id: '__layout'
        },
        key: this.layoutName
      },
      [layoutEl]
    )

    const transitionEl = h(
      'transition',
      {
        props: {
          name: 'layout',
          mode: 'out-in'
        }
      },
      [templateEl]
    )

    return h(
      'div',
      {
        domProps: {
          id: '__nuxt'
        }
      },
      [loadingEl, transitionEl]
    )
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  methods: {
    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if (layout && typeof layout !== 'string')
        throw new Error(
          '[nuxt] Avoid using non-string value as layout property.'
        )

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
