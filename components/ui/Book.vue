<template>
  <div :class="bookClass">
    <div class="book__img">
      <img
        :class="bookImageClass"
        :src="bookImageSrc"
        :alt="bookImageAlt"
        @click="$emit('bookClick')"
      />
      <button :class="['book__like', bookLike ? 'book__button-like' : 'book__button-notlike']" @click="$emit('bookLike')"></button>
      <p :class="bookRatingClass">{{ bookRating }}</p>
    </div>
    <p :class="bookTitleClass">{{ bookTitle }}</p>
    <p :class="bookAuthorClass">Автор {{ bookAuthor }}</p>
    <p :class="bookSubtitle">Год выпуска {{ bookDate }}</p>
    <p :class="bookSubtitle">Издательство {{ bookPublish }}</p>
  </div>
</template>
<script>
export default {
  props: [
    'bookImageSrc',
    'bookImageAlt',
    'bookTitle',
    'bookLike',
    'bookRating',
    'bookDate',
    'bookAuthor',
    'bookPublish',
    'bookSubtitle',
    'bookClass',
    'bookRatingClass',
    'bookClassButton',
    'bookImageClass',
    'bookAuthorClass',
    'bookTitleClass',
  ],
  methods: {
    click(){
      console.log('1');
      const { books } = this.$store.state;
      console.log(books.books);
    },
  },
};
</script>

<style scoped>
.book__like{
    position: absolute;
    top: 0;
    right: 0;
    width: 35px;
    height: 35px;
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
  font-size: 16px;
}
.book__like:hover::before{
  font-size: 20px;
  color: red;
  transition: all .3s ease;
}

.book__rating{
    position: absolute;
    top: 0;
    left: 0;
}

.book__button-like{
  border-radius: 8px;
  color: #f07c29;

}
.book__button-notlike{
  border-radius: 8px;
  color: rgb(99, 97, 96);
}

.book__image:hover {
  cursor: pointer;
  transform: scale(1.04);
}
.book__image {
  /*width: 100%;
  position: relative;
  padding-bottom: 100%;*/
  margin-bottom: 20px;
}
.book {
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.book_detail {
  flex-direction: row;
}
.book__image {
  /*width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 20px;*/
  /*position: absolute;
  top: 0;
  left: 0;*/
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 10px;
}

@media screen and (max-width: 1024px) {
  .book__image {
    margin-bottom: 14px;
  }
}

.book__image:hover {
  cursor: pointer;
}
.book__author {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
  margin: 15px 0 0;
}

@media screen and (max-width: 1024px) {
  .book__author {
    font-size: 18px;
    line-height: 22px;
  }
}

.book__title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  color: #181717;
  margin: 0;
}
.book__img{
  position: relative;

}
.book__subtitle {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #181717;
  margin: 10px 0 0;
}
</style>
