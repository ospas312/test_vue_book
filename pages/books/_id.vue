<template>
  <section class="full-book">
    <container>
      <div class="full-book__container">
        <img
          class="full-book__image"
          :src="currentBook.pic"
          :alt="currentBook.name"
        />
        <div>
          <p class="full-book__name">{{ currentBook.name }}</p>
          <p class="full-book__author">Автор: {{ currentBook.author}}</p>
          <p class="full-book__publisher">Издательство: {{ currentBook.publisher}}</p>
          <div class="full-book__rating">
            <p class="full-book__rating-text">Рейтинг книги</p>
            <Button type="button"
            class="full-book__rating-btn"
            :disabled="this.currentBook.rating=== 0"
            @click="bookRatingDown(currentBook.index)"
            >-</Button>
            <p class="full-book__rating-text">{{ currentBook.rating}}</p>
            <Button type="button"
            class="full-book__rating-btn"
            :disabled="this.currentBook.rating=== 10"
            @click="bookRatingUp(currentBook.index)"
            >+</Button>
          </div>
          <h3>О книге</h3>
          <p class="full-book__quote">{{ currentBook.about}}</p>
          <div class="full-book__inner-container">
            <button :class="['book__like', currentBook.likes ? 'book__button-like' : 'book__button-notlike']" @click="bookClickLike(currentBook.index)"></button>
            <p class="full-book__date">Год выпуска {{ currentBook.date }}</p>
            <a href="#" class="full-book__share">Поделитесь &UpperRightArrow;</a>
          </div>
        </div>
      </div>
      <div class="books__container">
        <Book
          v-for ="book in books.slice(0, booksOnPage)"
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
        />
      </div>
      <nxt-button
        @btnClick="$router.push('/books')"
        :buttonType="'button'"
        :buttonClass="'books__button-more'"
        :buttonText="buttonMoreData"
      />
    </container>
  </section>
</template>

<script>
import Book from '@/components/ui/Book.vue';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button.vue';
export default {
  components: {
    Book: Book,
    container: Container,
    'nxt-button': Button,
  },
  data() {
    return {
      buttonMoreData: 'Больше книг',
      booksOnPage: 4,
      booksOnPageDesktop: 4,
      booksOnPageTabled: 3,
      booksOnPageMobile: 2,
    };
  },
  computed: {
    books() {
      return this.$store.getters['books/getBooks'];
    },
    currentBook() {
      return this.books.find(item => item.index == this.$route.params.id);
    },
  },
  methods: {
    bookClickHandler(index) {
      this.$router.push(`/books/${index}`);
    },
    async bookClickLike(index) {
      await this.$store.dispatch('books/send_likes', { index } );
    },
    async bookRatingUp(index) {
      await this.$store.dispatch('books/send_uprating', { index } );
    },
    async bookRatingDown(index) {
      await this.$store.dispatch('books/send_downrating', { index } );
    },
    click(){
      console.log(this.currentBook)
    }
  },
  mounted() {
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
.full-book {
  padding: 100px 0;
}

@media screen and (max-width: 768px) {
  .full-book {
    padding: 80px 0;
  }
}

.full-book__container {
  display: grid;
  grid-template-areas:
    'image title  '
    'image container ';
  grid-template-columns: 580px 1fr;

  column-gap: 60px;
}

@media screen and (max-width: 1280px) {
  .full-book__container {
    grid-template-columns: 518px 1fr;
  }
}

@media screen and (max-width: 1024px) {
  .full-book__container {
    grid-template-columns: 407px 1fr;
  }
}

@media screen and (max-width: 768px) {
  .full-book__container {
    grid-template-areas:
      'title'
      'image'
      'container';
    grid-template-columns: 1fr;
    row-gap: 60px;
    margin: 0 auto;
  }
}
.full-book__image {
  width: 580px;
  height: 580px;
  grid-area: image;
  /*object-fit: cover;*/
  object-fit: contain;
}
@media screen and (max-width: 768px) {
  .full-book__image {
    width: 420px;
    height: 420px;
    justify-self: center;
  }
}

.full-book__name {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 24px;
  color: #000000;
  padding: 30px 0 0;
  margin: 0;
  grid-area: title;
  border-top: 1px solid #efefef;
}

@media screen and (max-width: 1280px) {
  .full-book__image {
    width: 518px;
    height: 518px;
  }
}
@media screen and (max-width: 1024px) {
  .full-book__image {
    width: 407px;
    height: 407px;
  }

}

@media screen and (max-width: 768px) {
  .full-book__name {
    padding: 20px 24px 0;
  }
}

.full-book__author{
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
}
.full-book__publisher{
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
}
.full-book__quote {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  padding: 0;
  margin: 30px 20px;
}
.full-book__rating{
  display: flex;
  font-size: 18px;
  line-height: 24px;
  align-items: baseline;
}
.full-book__rating-text{
  width: 43px;
  height: 43px;
  margin: 0;
  text-align: center;
}
.full-book__rating-text:first-child{
  margin-right: 15px;
  width: auto;
}
.full-book__rating-btn{
  width: 43px;
  height: 43px;
  background-color: #613a93;
  border: none;
  color: white;
  font-size: 23px;
  cursor: pointer;
}
.full-book__rating-btn:disabled{
  opacity: 0.5;
}
.full-book__rating-btn:hover{
  background-color: #50307a;
}
@media screen and (max-width: 1024px) {
  .full-book__quote {
    font-size: 30px;
    line-height: 38px;

  }
}
.full-book__inner-container {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  grid-area: container;
  align-self: flex-end;
  box-sizing: border-box;
}

.full-book__share {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #121212;
  text-decoration: none;
  transition: 0.3s;
  padding: 0;
  align-self: center;
}

.full-book__share:hover {
  opacity: 0.8;
}
.full-book__date {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  text-align: right;
  color: #121212;
  padding: 0;
  grid-area: date;
}
.full-book__text {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  color: #000000;
  padding: 130px 270px 70px;
  margin: 0;
}
.full-book__text >>> p {
  font-size: 22px;
  line-height: 30px;
}

.full-book__text >>> blockquote {
  font-size: 22px;
  line-height: 30px;
  margin: 0;
  font-weight: 600;
}
@media screen and (max-width: 1280px) {
  .full-book__text {
    padding: 120px 230px 60px;
    font-size: 20px;
    line-height: 28px;
  }
}

@media screen and (max-width: 1024px) {
  .full-book__text {
    padding: 90px 142px 46px;
    font-size: 18px;
    line-height: 27px;
  }
}
@media screen and (max-width: 768px) {
  .full-book__text {
    padding: 100px 24px 80px;
  }
}

.books__container {
  margin-top: 160px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 40px;
  row-gap: 70px;
}

@media screen and (max-width: 1280px) {
  .books__container {
    margin-top: 150px;
    column-gap: 40px;
    row-gap: 60px;
  }
}

@media screen and (max-width: 1024px) {
  .books__container {
    margin-top: 120px;
    column-gap: 30px;
    row-gap: 46px;
  }
}
@media screen and (max-width: 768px) {
  .books__container {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 40px;
  }
}
@media screen and (max-width: 600px) {
  .books__container {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 320px) {
  .books__container {
    grid-template-columns: 1fr;
    column-gap: 20px;
    row-gap: 30px;
  }
  .full-book__image {
    width: 290px;
    height: 290px;
    justify-self: center;
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
    box-sizing: border-box;
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
  .full-book__quote {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
  }
  .full-book__author {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
  }
  .full-book__text {
    font-size: 13px;
    line-height: 16px;
  }

  .full-book__text >>> p {
    font-size: 13px;
    line-height: 16px;
  }

  .full-book__text >>> blockquote {
    font-size: 13px;
    line-height: 16px;
    margin: 0;
    font-weight: 600;
  }
}
.books__button-more {
  width: 100%;
  font-size: 16px;
  min-height: 82px;
  margin: 70px auto 0px;
  background-color: #fbfbfb;
  border: 0;
  outline: none;
  padding: 0;
}
@media screen and (max-width: 1280px) {
  .books__button-more {
    margin: 60px auto 0px;
    min-height: 78px;
  }
}

@media screen and (max-width: 1024px) {
  .books__button-more {
    margin: 46px auto 0px;
    min-height: 50px;
    font-size: 13px;
    line-height: 20px;
  }
}

.books__button-more:hover {
  cursor: pointer;
}
.book__like{
    /*position: absolute;*/
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    margin: 10px;
    border: none;
    opacity: 0.9;
    background: #fff;
    cursor: pointer;
    transition: all .3s ease;
}
/*.book__like:hover{
  color: aqua;
  transition: all .3s ease;
  transform: scale(1.04);
}*/
.book__like::before{
  content: "\f08a";
  font-family: FontAwesome;
  font-size: 24px;
}
.book__like:hover::before{
  /*font-size: 20px;*/
  color: red;
  /*transition: all .3s ease;*/
  animation: heartbeat 1s infinite;
}
.book__button-like{
  border-radius: 8px;
  color: #f07c29;
  outline: none;
}
.book__button-notlike{
  border-radius: 8px;
  color: rgb(99, 97, 96);
  outline: none;
}

@keyframes heartbeat {
  0% {
    font-size: 22px;
  }
  20% {
    font-size: 26px
  }
  40% {
    font-size: 32px
  }
}
</style>

