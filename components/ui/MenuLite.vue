<template>
  <nav class="menu">
    <ul class="menu__list">
      <li class="menu__list-item">
        <nuxt-link class="menu__link" to="/">Главная</nuxt-link>
      </li>
      <li class="menu__list-item">
        <nuxt-link class="menu__link" to="/stories">Книги</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.menu__list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.menu__link {
  text-decoration: none;
  color: #000;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
}
.menu__list-item:first-child {
  padding-right: 40px;
}
@media screen and (max-width: 1280px) {
  .menu__link {
    font-size: 16px;
    line-height: 24px;
  }
  .menu__list-item:first-child {
    padding-right: 40px;
  }
}
@media screen and (max-width: 1024px) {
  .menu__list-item:first-child {
    padding-right: 30px;
  }
}
@media screen and (max-width: 768px) {
  .menu__list-item {
    padding-bottom: 14px;
  }
  .menu {
    max-width: 70px;
  }
}
@media screen and (max-width: 320px) {
  .menu__link {
    font-size: 13px;
    line-height: 15px;
  }
  .menu__list-item {
    padding-bottom: 18px;
  }
}
</style>
