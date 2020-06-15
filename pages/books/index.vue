<template>
  <container>
    <div class="stories-index-container">
      <h2 class="stories__title" @click="click">Библиотека</h2>
      <div class="stories__search-container">
        <InputTest class="stories__search-input" type="text" v-model="search" />
        <nxt-button
          buttonClass="stories__search-button"
          buttonType="button"
          @btnClick="filteredList"
          >Поиск</nxt-button
        >
      </div>
      <h2
        class="stories__message stories__message-title"
        v-if="this.initiallyFilteredStories.length === 0"
      >
        Ничего не найдено
      </h2>
      <p
        class="stories__message stories__message-subtitle"
        v-if="this.initiallyFilteredStories.length === 0"
      >
        Попробуйте еще раз
      </p>
      <div class="stories__container">
        <!--    <Book
          v-for ="book in booksToRender"
          :key="book.index"
          :bookImageSrc="`${baseUrl}${book.pic}`"
          :storyImageAlt="book.name"
          :storyTitle="book.name"
          :bookLike="book.likes"
          :bookRating="book.rating"
          :bookDate="book.date"
          :bookAuthor="book.author"
          :bookPublish="book.publisher"

          :bookClass="'book'"
          :bookImageClass="'book__image'"
          :bookAuthorClass="'book__author'"
          :bookTitleClass="'book__title'"
          @bookClick="storyClickHandler(book.index)"
        />
          -->
        <story
          v-for="story in storiesToRender"
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
      <stories-nav
        v-if="this.initiallyFilteredStories.length != 0"
        :totalStories="this.initiallyFilteredStories.length"
        :limitPerPage="storiesOnPage"
        @onPageChange="changeStartIndex"
      >
      </stories-nav>
    </div>
  </container>
</template>

<script>
import Book from '@/components/ui/Book.vue';
import Story from '@/components/ui/Story.vue';
import Button from '@/components/ui/Button.vue';
import StoriesNav from '@/components/ui/StoriesNav.vue';
import Container from '@/components/ui/Container';
import InputTest from '@/components/ui/InputTest';
export default {
  components: {
    Book: Book,
    story: Story,
    'nxt-button': Button,
    'stories-nav': StoriesNav,
    container: Container,
    InputTest: InputTest,
  },
  data() {
    return {
      appliedStoriesName: '',
      search: '',
      storiesOnPage: 8,
      startIndex: 0,
      storiesOnPageDesktop: 16,
      storiesOnPageTabled: 12,
      storiesOnPageMobile: 9,
      baseUrl: process.env.BASE_URL,
    };
  },
  beforeMount() {
    this.$store.dispatch('stories/fetchStories');
  },
  computed: {
    stories: function() {
      return this.$store.getters['stories/getStories'];
    },
    currentStory() {
      return this.stories.filter(item => item['id'] === this.$route.params.id);
    },
    totalStories() {
      return this.stories.length;
      //return this.initiallyFilteredStories.length;
    },
    pagesAmount() {
      return Math.ceil(this.totalStories / this.storiesOnPage);
    },
    /*storiesToRender() {
      return this.stories.filter(
        (item, index) =>
          index >= this.startIndex &&
          index <= this.startIndex + this.storiesOnPage - 1
      );
    },*/
    initiallyFilteredStories() {
      const { stories } = this.$store.state;
      if (!this.appliedStoriesName || this.appliedStoriesName === '') {
        return stories.stories;
      }
      return stories.stories.filter(
        (item, index) =>
          item.author.toLowerCase().indexOf(this.appliedStoriesName) > -1
      );
    },
    storiesToRender() {
      const { stories } = this.$store.state;
      return this.initiallyFilteredStories.filter(
        (item, index) =>
          index >= this.startIndex &&
          index <= this.startIndex + this.storiesOnPage - 1
      );
    },
  },
  methods: {
    changeStartIndex(index) {
      this.startIndex = (index - 1) * this.storiesOnPage;
    },
    storyClickHandler(id) {
      this.$router.push(`/stories/${id}`);
    },
    filteredList() {
      this.appliedStoriesName = this.search.toLowerCase();
    },
    click(){
      console.log('1');
      const { stories } = this.$store.state;
      console.log(stories.books);
    },
  },
  mounted: function() {
    /*Adding listeners on resizing page */
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
    /* Setting initiate value on page load */
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
.stories__message {
  text-align: center;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 58px;
}
.stories__message-subtitle {
  font-size: 16px;
  line-height: 20px;
}
.stories-index-container {
  margin: 100px 0 0;
  font-family: 'Inter', monospace;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.stories__search-container {
  margin: 60px 0 70px;
  display: grid;
  grid-template-columns: 1fr 226px;
  grid-template-rows: 52px;
  column-gap: 20px;
}
@media screen and (max-width: 1280px) {
  .stories__search-container {
    margin: 50px 0 60px;
    grid-template-rows: 48px;
  }
}
@media screen and (max-width: 1024px) {
  .stories__search-container {
    margin: 40px 0 46px;
    grid-template-columns: 1fr 208px;
    grid-template-rows: 46px;
  }
}
@media screen and (max-width: 768px) {
  .stories__search-container {
    margin: 50px 0 60px;
  }
}
@media screen and (max-width: 600px) {
  .stories__search-container {
    grid-template-columns: 1fr 48px;
    column-gap: 6px;
  }
}
.stories__search-input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
  padding: 0 15px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
  outline: none;
}
.stories__search-button {
  width: 100%;
  background-color: #613a93;
  color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  border: none;
  cursor: pointer;
}
@media screen and (max-width: 600px) {
  .stories__search-button {
    width: 100%;
    color: transparent;
    background-image: url('/search.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
  }
}
.stories__search-button:hover {
  opacity: 0.9;
  transition: opacity 0.3s ease;
}
.stories__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 40px;
  row-gap: 70px;
  margin-top: 60px;
}
@media screen and (max-width: 1280px) {
  .stories__container {
    column-gap: 40px;
    row-gap: 60px;
  }
}
@media screen and (max-width: 1024px) {
  .stories__container {
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
    column-gap: 20px;
    row-gap: 40px;
  }
}
@media screen and (max-width: 320px) {
  .stories__container {
    grid-template-columns: 1fr;
    column-gap: 20px;
    row-gap: 30px;
  }
}
@media screen and (max-width: 600px) {
  .stories__search-button {
    width: 48px;
    color: transparent;
    background-image: url('/search.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
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
}
</style>
