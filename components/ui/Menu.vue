<template>
  <nav class="menu">
    <ul v-if="mobileMenu == false" class="menu__ul">
      <li class="menu__li">
        <nuxt-link class="menu__link" to="/">Главная</nuxt-link>
      </li>
      <li class="menu__li">
        <nuxt-link class="menu__link" to="/books">Книги</nuxt-link>
      </li>
      <li class="menu__li">
        <nuxt-link class="menu__link" to="/likes">Избранное</nuxt-link>
      </li>
    </ul>
    <nxt-button
      :buttonType="button"
      :buttonClass="'menu__mobile-btn'"
      @btnClick="toggleMenu"
      v-if="mobileMenu == true"
    />
  </nav>
</template>

<script>
import Button from '@/components/ui/Button.vue';
export default {
  components: {
    'nxt-button': Button,
  },
  data() {
    return {
      mobileMenu: false,
    };
  },
  methods: {
    open() {
      return this.$store.commit('popup/open');
    },
    toggleMenu() {
      console.log('menu togled');
      return this.$store.commit('menu/toggleMenu');
    },
  },
};
</script>

<style scoped>
.menu {
}

.mobile__menu {
  display: flex;
  align-self: center;
  border-bottom: 1px solid #efefef;
  min-height: 60px;
  align-items: center;
}
.header__menu {
  display: flex;
  align-self: center;
}
.menu__ul {
  list-style: none;
  display: grid;
  column-gap: 40px;
  grid-template-columns: auto auto auto;
  justify-content: end;
}

@media screen and (max-width: 1024px) {
  .menu__ul {
    column-gap: 30px;
  }
}

@media screen and (max-width: 768px) {
  .menu__ul {
    row-gap: 9px;
    margin: 0;
    padding: 0;
  }
}

@media screen and (max-width: 768px) {
  .menu__li {
  }
}
.menu__link {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
  color: #000000;
}

@media screen and (max-width: 768px) {
  .menu__link {
    font-size: 16px;
  }
}

.nuxt-link-exact-active {
  text-decoration-line: underline;
}

.menu__button {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
  color: #000000;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 20px;

}
@media screen and (max-width: 768px) {
  .menu__button {
  }
}
.menu__button:hover {
  cursor: pointer;
}
.menu__mobile-btn {
  width: 32px;
  height: 27px;
  border: none;
  background-color: transparent;
  background-image: url('/header__mobile-button.png');
  outline: none;
  padding: 0;
}
.menu__mobile-btn {
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .menu__ul {
    display: flex;
    /*flex-direction: column;*/
  }
  .menu__li {
    margin-right: 30px;
    /*padding-bottom: 10px;*/
    line-height: 16px;
  }
  .menu__link {
    font-size: 13px;
  }
  .menu__button {
    font-size: 13px;
    padding: 0;
    /*line-height: 16px;*/
    /*padding-bottom: 8px;*/
  }
}
@media screen and (max-width: 320px) {
  .menu__ul {
    flex-direction: column;
  }
  .menu__li {
    padding-bottom: 10px;
  }
  .menu__button {
    line-height: 16px;
    padding-bottom: 8px;
  }
}
</style>
