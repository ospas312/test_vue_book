<template>
  <div :class="['block-container', containerClass]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    containerClass: { type: String, required: false },
  },
};
</script>

<style scoped>
.block-container {
  max-width: 1440px;
  padding: 0px 60px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
@media screen and (max-width: 1280px) {
  .block-container {
    padding: 0px 50px;
  }
}

@media screen and (max-width: 768px) {
  .block-container {
    padding: 0px 40px;
  }
}
@media screen and (max-width: 320px) {
  .block-container {
    padding: 0px 15px;
  }
}
</style>
