import axios from 'axios';
import book from '../books.json'
export const state = () => ({
  stories: [],
  books: book,
  currentLesson: {},
  currentStory: {},
});

export const mutations = {
  setState(state, { name, value }) {
    return (state[name] = value);
  },
};

export const actions = {
  fetchStories(state) {
    return axios.get(`${process.env.BASE_URL}/stories`).then(response => {
      return state.commit('setState', {
        name: 'stories',
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

export const getters = {
  getStories(state) {
    return state.stories;
  },
  getBooks(state){
    return state.books;
  },
  getCurrentStory(state) {
    return state.currentStory;
  },
};
