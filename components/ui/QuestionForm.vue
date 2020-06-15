<template>
  <div class="question-form">
    <div>
      <h3
        :class="[
          'question-form__title',
          { 'question-form__title_last-question': isLastForm == true },
        ]"
      >
        {{
          !isLastForm ? currentQuestion.title : 'Спасибо что приняли участие!'
        }}
      </h3>
      <p class="question-form__question">
        <span class="question-form__question">{{
          !isLastForm ? currentQuestion.question : ''
        }}</span>
        <span v-if="!isLastForm" class="question-form__question-detail">{{
          currentQuestion.subQuestion || ''
        }}</span>
      </p>
    </div>
    <InputTest
      v-if="!isLastForm"
      placeholder="Напишите тут"
      :bottomBordered="true"
      :class="'question-form__input'"
      v-model="answer"
    ></InputTest>
    <div class="question-form__buttons">
      <Button
        v-if="!isLastForm"
        :disabled="this.$store.state.quiz.currentQuestion === 0"
        buttonClass="question-form__button question-form__button_down"
        buttonType="button"
        @btnClick="prevQuestion"
      >
        {{ 'Назад' }}
      </Button>
      <Button
        v-if="!isLastForm"
        :disabled="answer === ''"
        buttonClass="question-form__button"
        buttonType="button"
        @btnClick="nextQuestion"
      >
        {{ isLastQuestion ? 'Далее' : 'Отправить' }}
      </Button>
      <Button
        v-if="isLastForm"
        buttonClass="question-form__button question-form__button_last-question"
        :buttonType="'button'"
        @btnClick="nextQuestionClose"
      >
        {{ 'Закрыть' }}
      </Button>
      <PolicyLink :class="[{ 'question-form_none': isLastQuestion == true }]" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/ui/Button';
import InputTest from '@/components/ui/InputTest';
import PolicyLink from '@/components/ui/PolicyLink';
export default {
  components: {
    Button,
    InputTest,
    PolicyLink,
  },
  data() {
    return {
      answer: '',
    };
  },
  /*props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    question: {
      type: String,
      required: true,
      default: '',
    },
  },*/
  computed: {
    currentQuestion() {
      const { quiz } = this.$store.state;
      const { currentQuestion, questions } = quiz;
      return questions[currentQuestion] || '';
    },
    initialAnswer() {
      const { quiz } = this.$store.state;
      const { currentQuestion, answers } = quiz;
      return answers[this.currentQuestion.key] || '';
    },
    isLastQuestion() {
      const { quiz } = this.$store.state;
      const { currentQuestion, questions } = quiz;
      const questionsLength = Object.keys(questions).length;
      if (questionsLength === currentQuestion) {
        return false;
      }
      return true;
    },
    isLastForm() {
      const { quiz } = this.$store.state;
      const { currentQuestion, questions } = quiz;
      const questionsLength = Object.keys(questions).length;
      if (currentQuestion > questionsLength) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async nextQuestion() {
      await this.$store.dispatch('quiz/next_question', {
        answer: this.answer,
      });
      this.answer = this.initialAnswer || '';
    },
    async prevQuestion() {
      await this.$store.dispatch('quiz/prev_question');
      this.answer = this.initialAnswer || '';
    },
    async nextQuestionClose() {
      this.$store.commit('popup/close');
      await this.$store.dispatch('quiz/send_question');
    },
  },
};
</script>

<style scoped>
.question-form__button_last-question {
  margin: 0 auto;
}
.question-form__title_last-question {
  text-align: center;
}
.question-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.question-form_none {
  display: none;
}
.question-form__title {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  color: #000;
  margin: 0;
  margin-bottom: 40px;
}
.question-form__question {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #000;
  margin: 0;
  min-height: 72px;
  padding-bottom: 76px;
}
.question-form__question-detail {
  color: #666;
}
.question-form__input {
  border: none;
  width: 100%;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #666;
  border-bottom: 1px solid #e7e7e7;
  padding: 10px 0;
  outline: none;
}
.question-form__buttons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 200px;
}
.question-form__button {
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
}
.question-form__button_down {
  background: none;
  color: #c0c0c0;
  width: auto;
  margin-right: 30px;
}
@media screen and (max-width: 1280px) {
  .question-form__button {
    width: 200px;
    height: 48px;
    font-size: 16px;
    line-height: 19px;
  }
  .question-form__input {
    font-size: 16px;
    line-height: 22px;
  }
  .question-form__title {
    font-size: 28px;
    line-height: 32px;
  }
  .question-form__question {
    font-size: 16px;
    line-height: 22px;
    padding-bottom: 19px;
  }
  .question-form__buttons {
    padding-top: 170px;
  }
  .question-form__button_down {
    background: none;
    color: #c0c0c0;
    width: auto;
  }
}
@media screen and (max-width: 1024px) {
  .question-form__button {
    width: 200px;
    height: 46px;
    font-size: 15px;
    line-height: 18px;
  }
  .question-form__input {
    font-size: 15px;
    line-height: 22px;
  }
  .question-form__title {
    font-size: 26px;
    line-height: 30px;
  }
  .question-form__question {
    font-size: 15px;
    line-height: 22px;
    padding-bottom: 35px;
  }
  .question-form__buttons {
    padding-top: 174px;
  }
  .question-form__button_down {
    background: none;
    color: #c0c0c0;
    width: auto;
  }
}
@media screen and (max-width: 768px) {
  .question-form__button {
    width: 200px;
    height: 46px;
    font-size: 15px;
    line-height: 18px;
  }
  .question-form__input {
    font-size: 15px;
    line-height: 19px;
  }
  .question-form__title {
    font-size: 26px;
    line-height: 30px;
  }
  .question-form__question {
    font-size: 15px;
    line-height: 19px;
    padding-bottom: 15px;
    min-height: 95px;
  }

  .question-form__buttons {
    padding-top: 174px;
  }
  .question-form__button_down {
    background: none;
    color: #c0c0c0;
    width: auto;
  }
}
@media screen and (max-width: 320px) {
  .question-form__button {
    width: 204px;
    height: 40px;
    font-size: 13px;
    line-height: 16px;
    padding: 0;
  }
  .question-form__button_down {
    margin-right: 15px;
    background: none;
    color: #c0c0c0;
    width: auto;
  }
  .question-form__buttons {
    flex-wrap: wrap;
  }
  .question-form__input {
    font-size: 13px;
    line-height: 16px;
  }
  .question-form__title {
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 30px;
  }
  .question-form__question {
    font-size: 13px;
    line-height: 16px;
    padding-bottom: 0;
  }
  .question-form__buttons {
    padding-top: 250px;
  }
}
</style>
