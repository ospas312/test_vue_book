<template>
  <div class="container">
    <Stories />
  </div>
</template>

<script>
import Stories from '@/components/Stories.vue';
export default {
  components: {
    Stories,
  },
  data() {
    return {};
  },
  methods: {},
  /*computed:{
    popUpOpened() {
      return this.$store.getters['popup/getPopUpOpened'];
    }
  }*/
};
</script>

<style>
.container {
  width: 100%;
  min-width: 320px;
  margin: 0 auto;
  font-family: 'Inter', monospace;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
