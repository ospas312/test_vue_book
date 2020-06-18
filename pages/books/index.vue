<template>
  <container>
    <div class="books__container">
      <h2 class="books__title" @click="click">Библиотека</h2>
      <div class="books__search">
        <InputTest class="books__search-input" type="text" v-model="search" />
        <nxt-button
          buttonClass="books__search-button"
          buttonType="button"
          @btnClick="filteredList"
          >Поиск</nxt-button
        >
      </div>
      <h2
        class="books__message books__message-title"
        v-if="this.initiallyFilteredBooks.length === 0"
      >
        Ничего не найдено
      </h2>
      <p
        class="books__message books__message-subtitle"
        v-if="this.initiallyFilteredBooks.length === 0"
      >
        Попробуйте еще раз
      </p>
      <div class="books__container-card">
        <Book
          v-for ="book in booksToRender"
          :key="book.index"
          :bookImageSrc="`${book.pic}`"
          :bookImageAlt="book.name"
          :bookTitle="book.name"
          :bookLike="book.likes"
          :bookRating="book.rating"
          :bookDate="book.date"
          :bookAuthor="book.author"
          :bookPublish="book.publisher"
          :bookRatingClass="'book__rating'"
          :bookClass="'book'"
          :bookClassButton="'book__button'"
          :bookImageClass="'book__image'"
          :bookAuthorClass="'book__author'"
          :bookTitleClass="'book__title'"
          :bookSubtitle="'book__subtitle'"
          @bookClick="bookClickHandler(book.index)"
          @bookLike="bookClickLike(book.index)"
        />
      </div>
      <stories-nav
        v-if="this.initiallyFilteredBooks.length != 0"
        :totalStories="this.initiallyFilteredBooks.length"
        :limitPerPage="booksOnPage"
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
      appliedBooksName: '',
      search: '',
      booksOnPage: 8,
      startIndex: 0,
      booksOnPageDesktop: 12,
      booksOnPageTabled: 8,
      booksOnPageMobile: 6,
      /*baseUrl: process.env.BASE_URL,*/
    };
  },
  computed: {
    books: function() {
      return this.$store.getters['books/getBooks'];
    },
    currentBook() {
      return this.books.filter(item => item['index'] === this.$route.params.index);
    },
    totalBooks() {
      return this.books.length;
    },
    pagesAmount() {
      return Math.ceil(this.totalBooks / this.booksOnPage);
    },
    booksToRender() {
      const { books } = this.$store.state;
      return this.initiallyFilteredBooks.filter(
        (item, index) =>
          index >= this.startIndex &&
          index <= this.startIndex + this.booksOnPage - 1
      );
    },
    initiallyFilteredBooks() {
      const { books } = this.$store.state;
      if (!this.appliedBooksName || this.appliedBooksName === '') {
        return books.books;
      }
      return books.books.filter(
        (item, index) =>
          item.author.toLowerCase().indexOf(this.appliedBooksName) > -1
      );
    },
  },
  methods: {
    changeStartIndex(index) {
      this.startIndex = (index - 1) * this.booksOnPage;
    },
    bookClickHandler(id) {
      this.$router.push(`/books/${index}`);
    },
    async bookClickLike(index) {
      await this.$store.dispatch('books/send_likes', { index } );
    },

    filteredList() {
      this.appliedBooksName = this.search.toLowerCase();
    },
    click(){
      console.log('1');
      const { books } = this.$store.state;
      console.log(books.books);
    },
  },
  mounted: function() {
    /*Adding listeners on resizing page */
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.booksOnPage = this.booksOnPageDesktop;
      }
      if (window.innerWidth <= 768 && window.innerWidth > 320) {
        this.booksOnPage = this.booksOnPageTabled;
      }
      if (window.innerWidth <= 320) {
        this.booksOnPage = this.booksOnPageMobile;
      }
    });
    /* Setting initiate value on page load */
    if (window.innerWidth > 768) {
      this.booksOnPage = this.booksOnPageDesktop;
    }
    if (window.innerWidth <= 768 && window.innerWidth > 320) {
      this.booksOnPage = this.booksOnPageTabled;
    }
    if (window.innerWidth <= 320) {
      this.booksOnPage = this.booksOnPageMobile;
    }
  },
};
</script>

<style scoped>
.books__message {
  text-align: center;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 58px;
}
.books__message-subtitle {
  font-size: 16px;
  line-height: 20px;
}
.books-index-container {
  margin: 100px 0 0;
  font-family: 'Inter', monospace;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.books__search {
  margin: 60px 0 70px;
  display: grid;
  grid-template-columns: 1fr 226px;
  grid-template-rows: 52px;
  column-gap: 20px;
}
@media screen and (max-width: 1280px) {
  .books__search {
    margin: 50px 0 60px;
    grid-template-rows: 48px;
  }
}
@media screen and (max-width: 1024px) {
  .books__search {
    margin: 40px 0 46px;
    grid-template-columns: 1fr 208px;
    grid-template-rows: 46px;
  }
}
@media screen and (max-width: 768px) {
  .books__search {
    margin: 50px 0 60px;
  }
}
@media screen and (max-width: 600px) {
  .books__search {
    grid-template-columns: 1fr 48px;
    column-gap: 6px;
  }
}
.books__search-input {
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
.books__search-button {
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
  .books__search-button {
    width: 100%;
    color: transparent;
    background-image: url('/search.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
  }
}
.books__search-button:hover {
  opacity: 0.9;
  transition: opacity 0.3s ease;
}
.books__container-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  margin-top: 60px;
}
@media screen and (max-width: 1280px) {
  .books__container-card {
    column-gap: 20px;
    row-gap: 20px;
  }
}
@media screen and (max-width: 1024px) {
  .books__container-card {
    column-gap: 20px;
    row-gap: 20px;
  }
}
@media screen and (max-width: 768px) {
  .books__container-card {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
  }
}
@media screen and (max-width: 600px) {
  .books__container-card {
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 40px;
  }
}
@media screen and (max-width: 320px) {
  .books__container-card {
    grid-template-columns: 1fr;
    column-gap: 20px;
    row-gap: 30px;
  }
}
@media screen and (max-width: 600px) {
  .books__search-button {
    width: 48px;
    color: transparent;
    background-image: url('/search.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
  }
}
.books__title {
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
  .books__title {
    margin: 0 0 60px 0;
    font-size: 28px;
    line-height: 32px;
  }
}
@media screen and (max-width: 1024px) {
  .books__title {
    margin: 0 0 46px 0;
    font-size: 24px;
    line-height: 28px;
  }
}
@media screen and (max-width: 768px) {
  .books__title {
    margin: 0 auto 60px;
    text-align: center;
  }
}
@media screen and (max-width: 320px) {
  .books__title {
    margin: 0 auto 40px;
    font-size: 18px;
    line-height: 21px;
  }
}
</style>
