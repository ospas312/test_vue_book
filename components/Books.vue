<template>
  <container>
    <div class="books__container">
      <div class="books__container-card">
        <Book
          v-for ="book in books"
          :key="book.id"
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
          @bookquick="bookQuick(book.index)"
        />
      </div>
    </div>
  </container>
</template>

<script>
import Book from '@/components/ui/Book.vue';
import Container from '@/components/ui/Container';

export default {
  components: {
    Book: Book,
    container: Container,
  },
  data() {
    return {
    };
  },
  computed: {
    books() {
      return this.$store.getters['books/getBooks'];
    },
  },
  methods: {
    bookQuick(index){
      this.$store.commit('books/quickView', { index });
      this.$store.commit('popup/open');
    },
    bookClickHandler(index) {
      this.$router.push(`/books/${index}`);
    },
    async bookClickLike(index) {
      await this.$store.dispatch('books/send_likes', { index } );
    },
  },
  mounted() {
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
.books__filter-button {
  background-color: #613a93;
  color: white;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 15px 15px;
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
.books__filter-button:hover {
  background-color: #50307a;
}
.books__filter-button:focus {
  background-color: #50307a;
  color: rgb(177, 173, 173);
}
.books__filter-btn{
  width: 120px;
  margin-top: 5px;
}
.books__sorts{
  display: flex;
  color:#e8e8e8;
  background-color: #613a93;
  margin-top: 5px;
  margin-bottom: 5px;
  flex-wrap: wrap;
}
.books__sort {
  padding: 15px;
  cursor: pointer;
  margin: 0;
}
.books__sort:hover {
  background-color: #50307a;
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
.books__title {
  /*margin: 0 0 70px 0;*/
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
  .books__search {
    margin: 50px 0 60px;
    grid-template-rows: 48px;
  }
  .books__container-card {
    column-gap: 20px;
    row-gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }

}
@media screen and (max-width: 1024px) {
  .books__search {
    margin: 40px 0 46px;
    grid-template-columns: 1fr 208px;
    grid-template-rows: 46px;
  }
  .books__title {
    margin: 0 0 46px 0;
    font-size: 24px;
    line-height: 28px;
  }
  .books__container-card {
    column-gap: 20px;
    row-gap: 20px;
  }

}
@media screen and (max-width: 768px) {
  .books__search {
    margin: 50px 0 60px;
  }
  .books__title {
    margin: 0 auto 60px;
    text-align: center;
  }
  .books__container-card {
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
  }

}
@media screen and (max-width: 600px) {
  .books__search {
    grid-template-columns: 1fr 48px;
    column-gap: 6px;
  }
  .books__search-button {
    width: 48px;
    color: transparent;
    background-image: url('/search.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
  }
  .books__container-card {
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 40px;
  }
  .books__search-button {
    width: 100%;
    color: transparent;
    background-image: url('/search.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
  }

}
@media screen and (max-width: 320px) {
  .books__title {
    margin: 0 auto 40px;
    font-size: 18px;
    line-height: 21px;
  }
  .books__container-card {
    grid-template-columns: 1fr;
    column-gap: 20px;
    row-gap: 30px;
  }
}
</style>
