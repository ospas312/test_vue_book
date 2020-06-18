import axios from 'axios';
import book from '../books.json'

export const state = () => ({
  books: book,
  currentLesson: {},
  currentBook: {},
});

export const mutations = {
  setState(state, { name, value }) {
    return (state[name] = value);
  },
  saveLike(state, { index }) {
    state.books[index].likes = !state.books[index].likes;
  },
};
/*
export const actions = {
  fetchStories(state) {
    return axios.get(`${process.env.BASE_URL}/stories`).then(response => {
      return state.commit('setState', {
        name: 'books',
        value: response.data,
      });
    });
  },
  fetchStoryWithId(state, payload) {
    return axios
      .get(`${process.env.BASE_URL}/stories/${payload.id}`)
      .then(response => {
        return state.commit('setState', {
          name: 'currentStory',
          value: response.data,
        });
      });
  },
};
*/

export const actions = {
  async send_likes({ commit }, { index }) {
    await commit('saveLike', { index });
  },
};
export const getters = {
  getBooks(state){
    return state.books;
  },
  getCurrentBook(state) {
    return state.currentBook;
  },
};
