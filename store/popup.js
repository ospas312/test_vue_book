export const state = () => ({
  opened: false,
  openFormSocial: false,
  openFormQuestion: false,
  contactsOpened: false,
});

export const mutations = {
  open(state) {
    state.opened = true;
    state.openFormSocial = false;
    state.openFormQuestion = true;
    state.contactsOpened = false;
  },
  close(state) {
    state.opened = false;
    state.contactsOpened = false;
  },
  openSocial(state) {
    state.opened = true;
    state.openFormSocial = true;
    state.openFormQuestion = false;
    state.contactsOpened = false;
  },
  openContacts(state) {
    state.opened = true;
    state.contactsOpened = true;
    state.openFormQuestion = false;
    state.openFormSocial = false;
  },
};

/*export const getters = {
  getPopUpOpened(state) {
    return state.contactsOpened;
  },
};*/
