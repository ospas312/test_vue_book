<template>
  <div :class="storyClass">
    <div class="storyImagesClass">
      <img
        :class="storyImageClass"
        :src="storyImageSrc"
        :alt="storyImageAlt"
        @click="$emit('storyClick')"
      />
    </div>
    <p :class="storyAuthorClass">{{ storyAuthor }}</p>
    <p :class="storyTitleClass">{{ storyTitle }}</p>
    <p v-if="storyText != undefined" :class="storyTextClass">{{ storyText }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'storyClass',
    'storyImageClass',
    'storyImageSrc',
    'storyImageAlt',
    'storyAuthor',
    'storyTitle',
    'storyTextClass',
    'storyText',
    'storyTitleClass',
    'storyAuthorClass',
  ],
};
</script>

<style scoped>
.story__image:hover {
  cursor: pointer;
  transform: scale(1.04);
}
.storyImagesClass {
  width: 100%;
  position: relative;
  padding-bottom: 100%;
  margin-bottom: 20px;
}
.story {
  display: flex;
  flex-direction: column;
}

.story_detail {
  flex-direction: row;
}
.story__image {
  /*width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 20px;*/
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 1024px) {
  .story__image {
    margin-bottom: 14px;
  }
}

.story__image:hover {
  cursor: pointer;
}
.story__author {
  max-width: 300px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 22px;
  color: #000000;
  margin: 0 0 14px 0;
}

@media screen and (max-width: 1024px) {
  .story__author {
    font-size: 18px;
    line-height: 22px;
  }
}

.story__title {
  max-width: 250px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #666666;
  margin: 0;
}
</style>
