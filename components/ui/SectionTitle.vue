<template>
  <h2 :class="['section-title', placeTitle]">
    <slot></slot>
  </h2>
</template>

<script>
export default {
  props: {
    placeTitle: { type: String, required: false },
  },
};
</script>

<style scoped>
.section-title {
  max-width: 413px;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  color: #000000;
  margin: 0;
  transition: 0.3s;
}

@media screen and (max-width: 1280px) {
  .section-title {
    max-width: 367px;
    font-size: 28px;
    line-height: 32px;
  }
}

@media screen and (max-width: 1024px) {
  .section-title {
    max-width: 288px;
  }
}

@media screen and (max-width: 768px) {
  .section-title {
    max-width: 380px;
  }
}
@media screen and (max-width: 768px) and (max-width: 1280px) {
  .section-title {
    font-size: 24px;
    line-height: 28px;
  }
}

@media screen and (max-width: 320px) {
  .section-title {
    max-width: 290px;
    font-size: 18px;
    line-height: 21px;
  }
}
</style>
