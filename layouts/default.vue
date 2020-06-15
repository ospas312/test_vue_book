<template>
  <div>
    <Header />
    <PopUp v-if="popUpOpened">
      <QuestionForm v-if="openFormQuestion" />
      <ShareLink v-if="openFormSocial" />
      <ContactsForm v-if="contactsOpened" />
    </PopUp>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PopUp from '@/components/ui/PopUp';
import QuestionForm from '@/components/ui/QuestionForm';
import ShareLink from '@/components/ui/ShareLink';
import ContactsForm from '@/components/ui/ContactsForm';
export default {
  components: {
    Header,
    Footer,
    PopUp,
    QuestionForm,
    ShareLink,
    ContactsForm,
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    popUpOpened() {
      const { popup } = this.$store.state;
      return popup.opened;
    },

    openFormQuestion() {
      const { popup } = this.$store.state;
      return popup.openFormQuestion;
    },
    openFormSocial() {
      const { popup } = this.$store.state;
      return popup.openFormSocial;
    },
    contactsOpened() {
      const { popup } = this.$store.state;
      return popup.contactsOpened;
    },
    async middleware({ store }) {
      await store.dispatch('video/fetchVideos');
      await store.dispatch('blocks/fetchBlocks');
      await store.dispatch('statisticsData/fetchStatistic');
    },
  },
};
</script>

<style>
html {
  font-family: 'Inter', monospace;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
