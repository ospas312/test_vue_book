<template>
  <article class="instagram__story">
    <a :href="picUrl" class="instagram__link"
      ><img :src="picUrl" :alt="instagramPicAlt" class="instagram__image"
    /></a>
  </article>
</template>

<script>
export default {
  props: ['picUrl', 'instagramPicAlt'],
};
</script>

<style scoped>
.instagram__story {
  cursor: pointer;
}

.instagram__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
</style>
