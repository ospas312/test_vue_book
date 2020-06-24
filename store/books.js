import axios from 'axios';
import book from '../books.json'

export const state = () => ({
  books: book,
  currentBook: {},
  viewBook: {},
});

export const mutations = {
  setState(state, { name, value }) {
    return (state[name] = value);
  },
  quickView(state, { index }) {
    state.viewBook = state.books[index];
  },
  saveLike(state, { index }) {
    state.books[index].likes = !state.books[index].likes;
  },
  upRating(state, { index }) {
    state.books[index].rating = state.books[index].rating + 1;
  },
  downRating(state, { index }) {
    state.books[index].rating = state.books[index].rating - 1;
  },
  currentB(state, { id }) {
    state.currentBook = state.books[id];

  },
};
export const actions = {
  async send_likes({ commit }, { index }) {
    await commit('saveLike', { index });
  },
  async send_uprating({ commit }, { index }) {
    await commit('upRating', { index });
  },
  async send_downrating({ commit }, { index }) {
    await commit('downRating', { index });
  },
  async BookWithId({ state, commit }, { id }) {
    await commit('currentB', { id });
  },
};
export const getters = {
  getBooks(state){
    return state.books;
  },
  getCurrentBook(state) {
    return state.currentBook;
  },
  getViewBook(state) {
    return state.viewBook;
  },
};
