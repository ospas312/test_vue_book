<template>
  <section class="full-story">
    <container>
      <div class="full-story__container">
        <img
          class="full-story__image"
          :src="`${baseUrl}${currentStory.ImageUrl[0].url}`"
          :alt="currentStory.author"
        />
        <p class="full-story__author">
          {{ `${currentStory.author}:` }}
          <span class="full-story__quote">{{ currentStory.title }}</span>
        </p>
        <div class="full-story__inner-container">
          <a href="#" class="full-story__share">Поделитесь &UpperRightArrow;</a>
          <p class="full-story__date">{{ dateFormat(currentStory.date) }}</p>
        </div>
      </div>
      <p class="full-story__text" v-html="currentStory.text"></p>
      <div class="full-story__flying-borders">
        <a href="#" class="full-story__share-social"
          >Поделитесь этой статьей в своих социальных сетях &UpperRightArrow;</a
        >
      </div>
      <div class="stories__container">
        <story
          v-for="story in stories.slice(0, storiesOnPage)"
          :key="story.id"
          :storyImageSrc="`${baseUrl}${story.ImageUrl[0].url}`"
          :storyImageAlt="story.author"
          :storyAuthor="story.author"
          :storyTitle="story.title"
          :storyClass="'story'"
          :storyImageClass="'story__image'"
          :storyAuthorClass="'story__author'"
          :storyTitleClass="'story__title'"
          @storyClick="storyClickHandler(story.id)"
        />
      </div>
      <nxt-button
        @btnClick="$router.push('/stories')"
        :buttonType="'button'"
        :buttonClass="'stories__button-more'"
        :buttonText="buttonMoreData"
      />
    </container>
  </section>
</template>

<script>
import Story from '@/components/ui/Story.vue';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button.vue';
export default {
  components: {
    story: Story,
    container: Container,
    'nxt-button': Button,
  },
  data() {
    return {
      buttonMoreData: 'Больше статей',
      storiesOnPage: 4,
      storiesOnPageDesktop: 4,
      storiesOnPageTabled: 3,
      storiesOnPageMobile: 2,
      baseUrl: process.env.BASE_URL,
    };
  },
  async fetch({ store, route }) {
    await store.dispatch('stories/fetchStoryWithId', { id: route.params.id });
  },
  beforeMount() {
    this.$store.dispatch('stories/fetchStories');
  },

  computed: {
    stories() {
      return this.$store.getters['stories/getStories'];
    },
    currentStory() {
      return this.$store.getters['stories/getCurrentStory'];
    },
  },
  methods: {
    dateFormat(dateString) {
      const date = new Date(dateString);
      const monthNames = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const monthName = monthNames[monthIndex];
      const year = date.getFullYear();
      return `${day} ${monthName} ${year}`;
    },
    storyClickHandler(id) {
      this.$router.push(`/stories/${id}`);
    },
  },
  mounted: function() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.storiesOnPage = this.storiesOnPageDesktop;
      }
      if (window.innerWidth <= 768 && window.innerWidth > 320) {
        this.storiesOnPage = this.storiesOnPageTabled;
      }
      if (window.innerWidth <= 320) {
        this.storiesOnPage = this.storiesOnPageMobile;
      }
    });
    /* При загузке станицы выставляем значение */
    if (window.innerWidth > 768) {
      this.storiesOnPage = this.storiesOnPageDesktop;
    }
    if (window.innerWidth <= 768 && window.innerWidth > 320) {
      this.storiesOnPage = this.storiesOnPageTabled;
    }
    if (window.innerWidth <= 320) {
      this.storiesOnPage = this.storiesOnPageMobile;
    }
  },
};
</script>

<style scoped>
.full-story {
  padding: 100px 0;
}

@media screen and (max-width: 768px) {
  .full-story {
    padding: 80px 0;
  }
}

.full-story__container {
  display: grid;
  grid-template-areas:
    'image title  '
    'image container ';
  grid-template-columns: 580px 1fr;

  column-gap: 60px;
}

@media screen and (max-width: 1280px) {
  .full-story__container {
    grid-template-columns: 518px 1fr;
  }
}

@media screen and (max-width: 1024px) {
  .full-story__container {
    grid-template-columns: 407px 1fr;
  }
}

@media screen and (max-width: 768px) {
  .full-story__container {
    grid-template-areas:
      'title'
      'image'
      'container';
    grid-template-columns: 1fr;
    row-gap: 60px;
    margin: 0 auto;
  }
}
.full-story__image {
  width: 580px;
  height: 580px;
  grid-area: image;
  object-fit: cover;
}
@media screen and (max-width: 768px) {
  .full-story__image {
    width: 420px;
    height: 420px;
    justify-self: center;
  }
}

.full-story__author {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 38px;
  line-height: 48px;
  color: #000000;
  padding: 30px 0 0;
  margin: 0;
  grid-area: title;
  border-top: 1px solid #efefef;
}

@media screen and (max-width: 1280px) {
  .full-story__image {
    width: 518px;
    height: 518px;
  }
}
@media screen and (max-width: 1024px) {
  .full-story__image {
    width: 407px;
    height: 407px;
  }
  .full-story__author {
    font-size: 30px;
    line-height: 38px;
  }
}

@media screen and (max-width: 768px) {
  .full-story__author {
    padding: 20px 24px 0;
  }
}
.full-story__quote {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 48px;
  color: #000000;
  padding: 0;
  margin: 0;
}

@media screen and (max-width: 1024px) {
  .full-story__quote {
    font-size: 30px;
    line-height: 38px;
  }
}
.full-story__inner-container {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  grid-area: container;
  align-self: flex-end;
  box-sizing: border-box;
}

.full-story__share {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #121212;
  text-decoration: none;
  transition: 0.3s;
  padding: 0;
  margin: 0 0 30px 0;
}

.full-story__share:hover {
  opacity: 0.8;
}
.full-story__date {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  text-align: right;
  color: #121212;
  padding: 0;
  margin: 0 0 30px 0;
  grid-area: date;
}
.full-story__text {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  color: #000000;
  padding: 130px 270px 70px;
  margin: 0;
}
.full-story__text >>> p {
  font-size: 22px;
  line-height: 30px;
}

.full-story__text >>> blockquote {
  font-size: 22px;
  line-height: 30px;
  margin: 0;
  font-weight: 600;
}
@media screen and (max-width: 1280px) {
  .full-story__text {
    padding: 120px 230px 60px;
    font-size: 20px;
    line-height: 28px;
  }
}

@media screen and (max-width: 1024px) {
  .full-story__text {
    padding: 90px 142px 46px;
    font-size: 18px;
    line-height: 27px;
  }
}
@media screen and (max-width: 768px) {
  .full-story__text {
    padding: 100px 24px 80px;
  }
}
.full-story__flying-borders {
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  max-width: 780px;
  margin: 0 auto;
  min-height: 84px;
}
.full-story__share-social {
  max-width: 780px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #121212;
  margin: 30px auto 0px;
  text-decoration: none;
  transition: 0.3s;
  display: block;
}

.full-story__share-social:hover {
  opacity: 0.8;
}

/*stories styles */

.stories__container {
  margin-top: 160px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 40px;
  row-gap: 70px;
}

@media screen and (max-width: 1280px) {
  .stories__container {
    margin-top: 150px;
    column-gap: 40px;
    row-gap: 60px;
  }
}

@media screen and (max-width: 1024px) {
  .stories__container {
    margin-top: 120px;
    column-gap: 30px;
    row-gap: 46px;
  }
}
@media screen and (max-width: 768px) {
  .stories__container {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 40px;
  }
}
@media screen and (max-width: 600px) {
  .stories__container {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 320px) {
  .stories__container {
    grid-template-columns: 1fr;
    column-gap: 20px;
    row-gap: 30px;
  }
  .full-story__image {
    width: 290px;
    height: 290px;
    justify-self: center;
  }
}
.stories__title {
  margin: 0 0 70px 0;
  max-width: 413px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  color: #000000;
}
@media screen and (max-width: 1280px) {
  .stories__title {
    margin: 0 0 60px 0;
    font-size: 28px;
    line-height: 32px;
  }
}

@media screen and (max-width: 1024px) {
  .stories__title {
    margin: 0 0 46px 0;
    font-size: 24px;
    line-height: 28px;
    box-sizing: border-box;
  }
}
@media screen and (max-width: 768px) {
  .stories__title {
    margin: 0 auto 60px;
    text-align: center;
  }
}

@media screen and (max-width: 320px) {
  .stories__title {
    margin: 0 auto 40px;
    font-size: 18px;
    line-height: 21px;
  }
  .full-story__quote {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
  }
  .full-story__author {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
  }
  .full-story__text {
    font-size: 13px;
    line-height: 16px;
  }

  .full-story__text >>> p {
    font-size: 13px;
    line-height: 16px;
  }

  .full-story__text >>> blockquote {
    font-size: 13px;
    line-height: 16px;
    margin: 0;
    font-weight: 600;
  }
}
.stories__button-more {
  width: 100%;
  min-height: 82px;
  margin: 70px auto 0px;
  background-color: #fbfbfb;
  border: 0;
  outline: none;
  padding: 0;
}
@media screen and (max-width: 1280px) {
  .stories__button-more {
    margin: 60px auto 0px;
    min-height: 78px;
  }
}

@media screen and (max-width: 1024px) {
  .stories__button-more {
    margin: 46px auto 0px;
    min-height: 50px;
    font-size: 13px;
    line-height: 20px;
  }
}

.stories__button-more:hover {
  cursor: pointer;
}
</style>
