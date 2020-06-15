<template>
  <section class="intro" ref="intro">
    <div class="intro__wrapper">
      <h1 class="intro__title">&#35;РАКЛЕЧИТСЯ</h1>
      <button
        class="intro__jump"
        type="button"
        @click="introJumpDown"
        title="Далее"
      ></button>
    </div>
  </section>
</template>

<script>
import Container from '@/components/ui/Container.vue';
export default {
  methods: {
    introJumpDown() {
      const introElement = this.$refs.intro.nextElementSibling;
      introElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });
    },
  },
};
</script>

<style scoped>
.intro {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgba(97, 58, 147, 1);
  position: relative;
}

.intro__wrapper {
  max-width: 1440px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
}

.intro__title {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  margin: 290px 0;
  font-style: normal;
  font-weight: 800;
  font-size: 92px;
  line-height: 111px;
  text-align: center;
  color: #ffffff;
  transition: 0.3s;
}

.intro__jump {
  position: absolute;
  left: 50%;
  bottom: 30px;
  background-color: transparent;
  background-image: url('/arrow-down.svg');
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 54px;
  height: 31px;
  border: none;
  outline: none;
}

.intro__jump:hover {
  opacity: 0.5;
  transform: translateY(20%);
}
@media screen and (max-width: 320px) {
  .intro__jump {
    width: 36px;
    margin-left: -18px; /* 50% of width for correct centering  */
  }
}

@media screen and (max-width: 1280px) {
  .intro__title {
    font-size: 78px;
    line-height: 94px;
    margin: 263px 0;
  }
}

@media screen and (max-width: 1024px) {
  .intro__title {
    margin: 223px 0;
  }
}

@media screen and (max-width: 768px) {
  .intro__title {
    font-size: 8vw; /* здесь без относительного очень плохо между 480 и 768px */
    line-height: 77px;
    margin: 351px 0;
  }
}

@media screen and (max-width: 480px) {
  .intro__title {
    font-size: 36px;
    line-height: 44px;
    margin: 218px 0;
  }
  .intro__jump {
    margin-bottom: 30px;
  }
}
</style>
