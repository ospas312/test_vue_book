<template>
  <form class="contacts">
    <h2 class="contacts__title">
      Оставьте контакт для связи
    </h2>
    <p class="contacts__subtitle">
      Мы свяжемся с вами в течение недели, чтобы задать вопросы о вашей истории
      и разместить ее на сайте.
    </p>
    <fieldset class="contacts__field">
      <label class="contacts__label contacts__label_name"
        >Как вас зовут?

        <inputTest
          type="text"
          class="contacts__input"
          :bottom-border="true"
          placeholder="Напишите тут"
          v-model="name"
        />
      </label>
      <div class="contacts__container">
        <label class="contacts__label contacts__label_email"
          >Электронная почта
          <inputTest
            type="email"
            class="contacts__input"
            :bottom-border="true"
            placeholder="pochta@example.com"
            v-model="email"
          />
        </label>
        <label class="contacts__label contacts__label_phone"
          >Телефон
          <inputTest
            type="text"
            class="contacts__input"
            :bottom-border="true"
            placeholder="+7 000 000 00 00"
            v-model="phone"
          />
        </label>
      </div>
      <label class="contacts__label contacts__label_contact"
        >Напишите, если есть предпочтительный способ связи и удобное время
        <inputTest
          type="text"
          class="contacts__input"
          :bottom-border="true"
          placeholder="Телефон / почта и удобное время"
          v-model="main"
      /></label>
    </fieldset>
    <div class="contacts__submit-container">
      <Button
        :disabled="name === '' || email === '' || phone === '' || main === ''"
        buttonClass="contacts__submit-button"
        buttonType="button"
        @btnClick="sendClose"
      >
        Отправить
      </Button>
      <policyLink class="contacts__policy-link" />
    </div>
  </form>
</template>

<script>
import Button from '@/components/ui/Button';
import InputTest from '@/components/ui/InputTest';
import PolicyLink from '@/components/ui/PolicyLink';

export default {
  components: {
    Button,
    inputTest: InputTest,
    policyLink: PolicyLink,
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      main: '',
    };
  },
  methods: {
    async sendClose() {
      await this.$store.dispatch('contacts/send_question', {
        name: this.name,
        email: this.email,
        phone: this.phone,
        main: this.main,
      });
      this.$store.commit('popup/close');
    },
  },
};
</script>

<style scoped>
.contacts {
  height: 100%;
  /*overflow: scroll;*/
}
.contacts__title {
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  margin-top: 0;
  margin-bottom: 40px;
}
.contacts__subtitle {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 50px;
  margin-top: 0;
}

.contacts__field {
  border: none;
  padding: 0;
  margin-bottom: 50px;
}

.contacts__container {
  display: flex;
  margin-bottom: 40px;
  margin-top: 40px;
}

.contacts__label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  width: 100%;
}

.contacts__label_email {
  margin-right: 40px;
}
.contacts__input {
  margin-top: 40px;
  border: none;
  border-bottom: 1px solid #e7e7e7;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  padding-bottom: 10px;
  box-sizing: border-box;
  outline: none;
}

.contacts__submit-container {
  display: flex;
  align-items: center;
}
.contacts__form {
  padding: 0;
}
.contacts__submit-button {
  width: 226px;
  height: 52px;
  background-color: #613a93;
  cursor: pointer;
  border: none;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #fff;
  margin-right: 30px;
}

@media screen and (max-width: 1280px) {
  .contacts__title {
    font-size: 28px;
    line-height: 32px;
  }

  .contacts__subtitle {
    font-size: 16px;
    line-height: 22px;
  }
  .contacts__label {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }
  .contacts__input {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }
}

@media screen and (max-width: 768px) {
  .contacts__title {
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 50px;
  }

  .contacts__subtitle {
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
  }

  .contacts__label {
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
  }

  .contacts__submit-button {
    width: 200px;
    height: 46px;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
  }
  @media screen and (max-width: 600px) {
    .contacts__title {
      font-weight: 600;
      font-size: 18px;
      line-height: 21px;
      max-width: 185px;
      margin-bottom: 35px;
    }
    .contacts__field {
      margin-bottom: 5px;
    }

    .contacts__subtitle {
      font-size: 13px;
      line-height: 16px;
      max-width: 260px;
      margin-bottom: 30px;
    }
    .contacts__label {
      font-size: 13px;
      line-height: 16px;
      margin-bottom: 30px;
    }
    .contacts__container {
      flex-direction: column;
    }

    .contacts__submit-container {
      flex-direction: column;
    }
    .contacts__submit-button {
      margin-bottom: 10px;
    }
  }
}
</style>
