export const state = () => ({
  answers: {},
});

export const mutations = {
  saveAnswer(state, { name, email, phone, main }) {
    state.answers.name = name;
    state.answers.email = email;
    state.answers.phone = phone;
    state.answers.main = main;
  },
  resetAnswers(state) {
    state.answers = {};
  },
};

export const actions = {
  async send_question({ commit, state }, { name, email, phone, main }) {
    await commit('saveAnswer', { name, email, phone, main });
    console.log('contacts', state.answers);
    await commit('resetAnswers');
  },
};
