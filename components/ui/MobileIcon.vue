<template>
  <div
    :class="['mobile-button', { 'mobile-button_type_close': isMenuOpened }]"
    @click="toggleMenu"
  ></div>
</template>

<script>
import Button from '@/components/ui/Button.vue';
export default {
  components: {
    'nxt-button': Button,
  },
  computed: {
    isMenuOpened() {
      return this.$store.getters['menu/getMobileMenuState'];
    },
  },
  methods: {
    toggleMenu() {
      console.log('at mobile icon vue click');
      this.$store.commit('menu/toggleMenu');
    },
  },
};
</script>

<style scoped>
.mobile-button {
  width: 32px;
  height: 27px;
  background-image: url('/header__mobile-button.png');
  align-self: center;
}
@media screen and (min-width: 769px) {
  .mobile-button {
    display: none;
  }
}
.mobile-button:hover {
  cursor: pointer;
}
.mobile-button.mobile-button_type_close {
  width: 26px;
  height: 25px;
  background-image: url('/header__mobile-button_close.png');
}
</style>
