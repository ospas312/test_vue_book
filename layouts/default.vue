<template>
  <div>
    <Header />
    <PopUp v-if="popUpOpened">
      <Quickview />
    </PopUp>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PopUp from '@/components/ui/PopUp';
import Quickview from '@/components/ui/Quickview';
export default {
  components: {
    Header,
    Footer,
    PopUp,
    Quickview,
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    popUpOpened() {
      const { popup } = this.$store.state;
      return popup.opened;
    },
  },
};
</script>

<style>
html {
  font-family: 'Inter', monospace;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
