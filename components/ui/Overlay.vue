<template>
  <div class="overlay" @click="close">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    close(e) {
      this.$store.commit('popup/close');
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
</style>
