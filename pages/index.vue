<template>
  <div class="container">
    <Books />
  </div>
</template>

<script>
import Books from '@/components/Books.vue';
export default {
  components: {
    Books,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.container {
  width: 100%;
  min-width: 320px;
  margin: 0 auto;
  font-family: 'Inter', monospace;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
