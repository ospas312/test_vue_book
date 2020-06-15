<template>
  <div class="policy">
    <h1 class="policy__title">
      Политика проекта в отношении обработки персональных данных.
    </h1>
    <ol class="policy__list">
      <li
        v-for="policyItem in policy"
        :key="policyItem.id"
        class="policy__paragraph-item"
      >
        <p class="policy__paragraph-title">
          {{ policyItem.id + '. ' + policyItem.title }}
        </p>
        <p v-if="policyItem.subtitle !== ''" class="policy__paragraph-subtitle">
          {{ policyItem.subtitle }}
        </p>
        <ol class="policy__paragraph-text-list">
          <li
            v-for="paragraph in policyItem.paragraphs"
            :key="paragraph.id"
            class="policy__paragraph-list-item"
          >
            {{ paragraph.text }}
          </li>
        </ol>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  computed: {
    policy() {
      return this.$store.getters['policy/getPolicy'];
    },
  },
};
</script>

<style scoped>
.policy {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 780px;
  margin-bottom: 230px;
  margin-left: auto;
  margin-right: auto;
}
.policy__list {
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.policy__title {
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 48px;
  text-align: center;
  margin-bottom: 130px;
  margin-top: 130px;
}

.policy__paragraph-item {
  padding: 0;
  margin-bottom: 90px;
}

.policy__paragraph-title {
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
  margin-top: 0;
  margin-bottom: 40px;
}
.policy__paragraph-item-text {
  margin-bottom: 30px;
}
.policy__paragraph-subtitle {
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 30px;
  margin-top: 0;
}
.policy__paragraph-text-list {
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  margin-top: 30px;
  list-style-position: inside;
  padding: 0;
}

.policy__paragraph-text {
  margin-bottom: 30px;
  margin-top: 0;
}

.policy__paragraph-list-item {
  padding: 0;
  margin-bottom: 30px;
}
.policy__paragraph-list-item:last-of-type {
  margin-bottom: 0;
}

@media screen and (max-width: 1280px) {
  .policy {
    max-width: 700px;
  }

  .policy__title {
    font-size: 34px;
    line-height: 44px;
    margin-bottom: 120px;
    margin-top: 120px;
    position: relative;
  }
  .policy__title::before {
    content: '';
    background-color: #efefef;
    min-height: 1px;
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
  }

  .policy__title::after {
    content: '';
    background-color: #efefef;
    min-height: 1px;
    position: absolute;
    left: 0;
    top: calc(100% + 30px);
    width: 100%;
  }

  .policy__subtitle {
    font-size: 20px;
    line-height: 28px;
  }

  .policy__paragraph-item {
    font-size: 20px;
    line-height: 28px;
  }
  .policy__paragraph-text-list {
    font-size: 20px;
    line-height: 28px;
  }

  @media screen and (max-width: 1024px) {
    .policy {
      max-width: 640px;
    }
    .policy__title {
      font-weight: 500;
      font-size: 30px;
      line-height: 38px;
      margin-top: 120px;
      margin-bottom: 120px;
    }
    .policy__paragraph-item {
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
    }

    .policy__paragraph-subtitle {
      font-size: 18px;
      line-height: 27px;
    }
    .policy__paragraph-text-list {
      font-size: 18px;
      line-height: 27px;
    }
  }
  @media screen and (max-width: 650px) {
    .policy {
      max-width: 290px;
    }
    .policy__paragraph-subtitle {
      font-size: 13px;
      line-height: 16px;
    }

    .policy__title {
      font-size: 18px;
      line-height: 21px;
      margin-top: 70px;
      margin-bottom: 60px;
    }

    .policy__title::before {
      top: -20px;
    }

    .policy__title::after {
      top: calc(100% + 20px);
    }

    .policy__paragraph-title {
      font-weight: 600;
      font-size: 13px;
      line-height: 16px;
      margin-bottom: 20px;
    }
    .policy__paragraph-text-list {
      font-size: 13px;
      line-height: 16px;
    }
    .policy__paragraph-item {
      margin-bottom: 40px;
    }
  }
}
</style>
