<template>
  <div class="popup__quickview">
    <div class="popup__image">
      <img
          class="popup__image-img"
          :src="viewBook.pic"
          :alt="viewBook.name"
        />
    </div>
    <div class="popup__info">
      <h3>{{viewBook.name}}</h3>
      <p>Автор:  {{viewBook.author}}</p>
      <p>Издательство:  {{viewBook.publisher}}</p>
      <p>Рейтинг книги:  "{{viewBook.rating}}"</p>
      <p>Год выпуска:  {{viewBook.date}}</p>
      <p>О книге:</p>
      <p>{{viewBook.about}}</p>
    </div>
  </div>
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
    };
  },
  computed: {
    books() {
      return this.$store.getters['books/getBooks'];
    },
    viewBook() {
      return this.$store.getters['books/getViewBook'];
    },
  },
}
</script>
<style scoped>
.popup__image{
  width: 45%;
}
.popup__info{
  width: 45%;
}
.popup__quickview{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.popup__image-img {
    width: 100%;
}
</style>
