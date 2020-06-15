export const state = () => ({
  menuOpened: false,
});

export const mutations = {
  toggleMenu(state) {
    state.menuOpened = !state.menuOpened;
  },
};
export const getters = {
  getMobileMenuState(state) {
    return state.menuOpened;
  },
};
