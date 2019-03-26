<template>
  <ins class="adsbygoogle"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"
    :data-ad-format="adFormat"
    :style="adStyle"
    :data-full-width-responsive="adFullwidth"
    :data-ad-layout="adLayout">
  </ins>
</template>

<script>
export default {
  props: {
    adClient: {
      type: String,
      required: true
    },
    adSlot: {
      type: String,
      required: true
    },
    adFormat: {
      type: String,
      required: false,
      default: 'auto'
    },
    adStyle: {
      type: String,
      required: false,
      default: 'display: block'
    },
    adFullwidth: {
      type: String,
      required: false,
      default: 'false'
    },
    adLayout: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }
}
</script>
