<template>
  <nav class="stories-nav">
    <nxt-button
      @btnClick="goFirst()"
      buttonType="'button'"
      :buttonClass="'stories-nav__first'"
      :disabled="this.active === 1"
      >Первая</nxt-button
    >
    <nxt-button
      @btnClick="goBack(active)"
      buttonType="'button'"
      :buttonClass="'stories-nav__back'"
      :disabled="this.active === 1"
    ></nxt-button>
    <ul class="stories-nav__ul">
      <li v-for="index in pagesAmount" :key="index" class="stories-nav__li">
        <nxt-button
          @btnClick="setActive(index)"
          :buttonClass="[
            'stories-nav__button',
            { 'stories-nav__button_active': index === active },
          ]"
          buttonType="'button'"
          >{{ index }}</nxt-button
        >
      </li>
    </ul>
    <nxt-button
      @btnClick="goForward(active)"
      buttonType="'button'"
      :buttonClass="'stories-nav__forward'"
      :disabled="this.active === pagesAmount"
    ></nxt-button>
    <nxt-button
      @btnClick="goLast(active)"
      buttonType="'button'"
      :buttonClass="'stories-nav__last'"
      :disabled="this.active === pagesAmount"
      >Последняя</nxt-button
    >
  </nav>
</template>

<script>
import Button from '@/components/ui/Button.vue';
export default {
  components: {
    'nxt-button': Button,
  },
  props: {
    totalStories: { type: Number, default: 0 },
    limitPerPage: { type: Number, default: 0 },
  },
  data() {
    return {
      active: 1,
    };
  },
  computed: {
    pagesAmount() {
      return Math.ceil(this.totalStories / this.limitPerPage);
    },
  },
  methods: {
    setActive(index) {
      this.active = index;
      this.$emit('onPageChange', index);
    },
    goForward(active) {
      this.active += 1; //active page +1
      this.$emit('onPageChange', this.active); // emit event to parrent component
    },
    goBack(active) {
      this.active -= 1; //активаная страница +1
      this.$emit('onPageChange', this.active);
    },
    goFirst(active) {
      this.active = 1;
      this.$emit('onPageChange', this.active);
    },
    goLast(active) {
      this.active = this.pagesAmount;
      this.$emit('onPageChange', this.active);
    },
  },
};
</script>

<style scoped>
.stories-nav {
  margin: 140px auto 100px;
  max-width: 800px;
  /*max-height: 58px;*/
  display: flex;
  align-items: center;
  justify-content: center;
}

.stories-nav__first {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  align-items: center;
  color: #181818;
  margin-right: 30px;
  border: none;
  outline: none;
  background-color: transparent;
}
.stories-nav__first:hover {
  cursor: pointer;
}
.stories-nav__first_inactive {
  color: #a2a2a2;
}

.stories-nav__back {
  box-sizing: border-box;
  margin-right: 30px;
  border: none;
  outline: none;
  width: 13px;
  height: 22px;
  background-image: url('/story-nav_button-backward.svg');
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: center;
}
.stories-nav__back:hover {
  cursor: pointer;
}
.stories-nav__forward {
  box-sizing: border-box;
  margin: 0 30px;
  border: none;
  outline: none;
  width: 13px;
  height: 22px;
  background-image: url('/story-nav_button-forward.svg');
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: center;
}
.stories-nav__forward:hover {
  cursor: pointer;
}
.stories-nav__last {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  align-items: center;
  color: #181818;
  background-color: transparent;
  border: none;
  outline: none;
}

.stories-nav__last:hover {
  cursor: pointer;
}
.stories-nav__last_inactive {
  color: #a2a2a2;
}
.stories-nav__ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, 58px);
  grid-template-rows: repeat(auto-fit, 58px);
  column-gap: 10px;
  row-gap: 10px;
  padding: 0;
  margin: 0;
  max-width: 330px; /* 58px*5+40px  */
}
.stories-nav__li {
}
.stories-nav__button {
  width: 58px;
  height: 58px;
  text-decoration: none;
  position: absolute;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  border: 0;
  outline: none;
  background-color: #fbfbfb;
}

@media screen and (max-width: 1280px) {
  .stories-nav__button {
    width: 56px;
    height: 56px;
  }
}
@media screen and (max-width: 1024px) {
  .stories-nav__button {
    width: 50px;
    height: 50px;
    font-size: 15px;
    line-height: 18px;
  }
}

.stories-nav__button_active {
  background-color: #f4f4f4;
}
.stories-nav__button:hover {
  cursor: pointer;
}
@media screen and (max-width: 320px) {
  .stories-nav {
    flex-wrap: wrap;
    margin: 50px 23px;
    /*min-height: 200px;*/
  }
  .stories-nav__button {
    position: relative;
  }
  .stories-nav__ul {
    grid-template-columns: repeat(auto-fit, 50px);
    grid-template-rows: repeat(auto-fit, 50px);
  }
  .stories-nav__ul {
    max-width: 190px;
    margin-bottom: 34px;
  }
  .stories-nav__first {
    order: 3;
  }
  .stories-nav__last {
    order: 4;
  }
  .stories-nav__forward {
    margin-right: 0;
    margin-left: 23px;
  }
  .stories-nav__back {
    margin-right: 23px;
  }
}
</style>
