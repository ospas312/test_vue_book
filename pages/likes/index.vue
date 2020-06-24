<template>
  <container>
    <div class="books__container">
      <h2 class="books__title" @click="click">Библиотека</h2>
      <div class="books__search">
        <InputTest class="books__search-input" type="text" v-model="search" @keyup.enter="filteredList" @keypress.enter="click" />
        <nxt-button
          buttonClass="books__search-button"
          buttonType="button"
          @btnClick="filteredList"
          >Поиск</nxt-button
        >
      </div>
      <div>
        <nxt-button
          buttonClass="books__filter-button books__filter-btn"
          buttonType="button"
          @btnClick="showSort = !showSort"
          >Сортировка
        </nxt-button>
          <transition name="fade">
            <div v-if="showSort" class="books__sorts">
              <button type="button" class="books__filter-button" @click="currentSort='nameUp'">по алфавиту &uarr;</button>
              <button type="button" class="books__filter-button" @click="currentSort='nameDown'">по алфавиту 	&darr;</button>
              <button type="button" class="books__filter-button" @click="currentSort='dateUp'">по дате &uarr;</button>
              <button type="button" class="books__filter-button" @click="currentSort='dateDown'">по дате 	&darr;</button>
              <button type="button" class="books__filter-button" @click="currentSort='rateUp'">по рейтингу &uarr;</button>
              <button type="button" class="books__filter-button" @click="currentSort='rateDown'">по рейтингу 	&darr;</button>
            </div>
          </transition>

        <nxt-button
          buttonClass="books__filter-button books__filter-btn"
          buttonType="button"
          @btnClick="show"
          >Фильтр
        </nxt-button>
          <transition name="fade">
            <div v-if="showFilter" class="books__sorts">
              <nxt-button
              buttonClass="books__filter-button"
              buttonType="button"
              @btnClick="showDate = !showDate"
              >Год
              </nxt-button>
              <nxt-button
              buttonClass="books__filter-button"
              buttonType="button"
              @btnClick="showPublisher = !showPublisher"
              >Издатель
              </nxt-button>
              <nxt-button
              buttonClass="books__filter-button"
              buttonType="button"
              @btnClick="showAuthor = !showAuthor"
              >Автор
              </nxt-button>
            </div>
          </transition>
            <div v-if="showDate" class="books__sorts">
              <p  v-for ="date in datesToRender"
                :key="date.id"
                class="books__sort"
                @click="filtered({name:'date', value: date})">
                {{ date }}
              </p>
            </div>
            <div v-if="showPublisher" class="books__sorts">
              <p v-for ="publisher in publisherToRender"
                :key="publisher.id"
                class="books__sort"
                @click="filtered({name:'publisher', value: publisher})"
                > {{ publisher }}
              </p>
            </div>
            <div v-if="showAuthor" class="books__sorts">
                <p v-for ="author in authorToRender"
                  :key="author.id"
                  class="books__sort"
                  @click="filtered({name:'author', value: author})"
                  > {{ author }}
                </p>
            </div>
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
import Button from '@/components/ui/Button.vue';
import StoriesNav from '@/components/ui/StoriesNav.vue';
import Container from '@/components/ui/Container';
import InputTest from '@/components/ui/InputTest';
export default {
  components: {
    Book: Book,
    'nxt-button': Button,
    'stories-nav': StoriesNav,
    container: Container,
    InputTest: InputTest,
  },
  data() {
    return {
      filterDate: '',
      filterAuthor: '',
      filterPublisher: '',
      showAuthor:false,
      showPublisher: false,
      showDate: false,
      currentSort: 'nameUp',
      showFilter: false,
      showSort: false,
      appliedBooksName: '',
      search: '',
      booksOnPage: 8,
      startIndex: 0,
      booksOnPageDesktop: 12,
      booksOnPageTabled: 8,
      booksOnPageMobile: 6,
    };
  },
  computed: {
    books() {
      return this.$store.getters['books/getBooks'].filter(item => item.likes == true);
    },
    currentBook() {
      return this.books.filter(item => item.index === this.$route.params.id);
    },
    totalBooks() {
      return this.books.length;
    },
    pagesAmount() {
      return Math.ceil(this.totalBooks / this.booksOnPage);
    },
    initiallyFilteredBooks() {
      if (!this.appliedBooksName || this.appliedBooksName === '') {
        return this.filtersBooks;
      }
      return this.filtersBooks.filter((item, index) => item.name.toLowerCase().indexOf(this.appliedBooksName) > -1);
    },
    booksToRender() {
      return this.sortedBooks.filter(
        (item, index) =>
          index >= this.startIndex &&
          index <= this.startIndex + this.booksOnPage - 1
      );
    },
    sortedBooks() {
      if (this.currentSort=='nameUp'){
        return [...this.initiallyFilteredBooks].sort((a, b) => a.name.localeCompare(b.name));
      }
      if (this.currentSort=='nameDown'){
        return [...this.initiallyFilteredBooks].sort((a, b) => b.name.localeCompare(a.name));
      }
      if (this.currentSort=='dateUp'){
        return [...this.initiallyFilteredBooks].sort((a, b) => a.date.localeCompare(b.date));
      }
      if (this.currentSort=='dateDown'){
        return [...this.initiallyFilteredBooks].sort((a, b) => b.date.localeCompare(a.date));
      }
      if (this.currentSort=='rateUp'){
        return [...this.initiallyFilteredBooks].sort((a, b) => a.rating > b.rating ? 1 : -1);
      }
      if (this.currentSort=='rateDown'){
        return [...this.initiallyFilteredBooks].sort((a, b) => b.rating > a.rating ? 1 : -1);
      }
    },
    datesToRender(){
      return Array.from(new Set(Array.from(this.initiallyFilteredBooks, ({date}) => date)));
    },
    publisherToRender(){
      return Array.from(new Set(Array.from(this.initiallyFilteredBooks, ({publisher}) => publisher)));
    },
    authorToRender(){
      return Array.from(new Set(Array.from(this.initiallyFilteredBooks, ({author}) => author)));
    },
    filtersBooks(){
      let booksContainer = this.books;
      if (this.filterDate != ''){
        booksContainer = booksContainer.filter((item, index) => item.date.indexOf(this.filterDate.value) > -1);
      }
      if (this.filterAuthor != ''){
        booksContainer = booksContainer.filter((item, index) => item.author.indexOf(this.filterAuthor.value) > -1);
      }
      if (this.filterPublisher != ''){
        booksContainer = booksContainer.filter((item, index) => item.publisher.indexOf(this.filterPublisher.value) > -1);
      }
      return booksContainer
    }
  },
  methods: {
    click(){
      console.log(this.books);
    },
    changeStartIndex(index) {
      this.startIndex = (index - 1) * this.booksOnPage;
    },
    bookClickHandler(index) {
      this.$router.push(`/books/${index}`);
    },
    async bookClickLike(index) {
      await this.$store.dispatch('books/send_likes', { index } );
    },
    filteredList() {
      this.appliedBooksName = this.search.toLowerCase();
    },
    filtered(item){
      if (item.name == 'date'){
        if (this.filterDate != ''){
        return this.filterDate = '';
        }
      return this.filterDate = item;
      }
      if (item.name == 'author'){
        if (this.filterAuthor != ''){
        return this.filterAuthor = '';
        }
      return this.filterAuthor = item;
      }
      if (item.name == 'publisher'){
        if (this.filterPublisher != ''){
        return this.filterPublisher = '';
        }
      return this.filterPublisher = item;
      }

    },
    show(){
      this.showFilter = !this.showFilter;
      if (this.showFilter == false){
        this.showAuthor = false,
        this.showPublisher = false,
        this.showDate = false,
        this.filterDate = '',
        this.filterAuthor = '',
        this.filterPublisher = ''
      }
    },
    bookQuick(index){
      this.$store.commit('books/quickView', { index });
      this.$store.commit('popup/open');
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
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
