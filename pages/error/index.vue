<template>
  <div class="error">
    <div class="error__content">
      <h1 class="error__title">404</h1>
      <p class="error__subtitle">
        Страница не найдена
        <nuxt-link class="error__home-link" to="/"
          >Перейти на главную</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.error__title {
  font-size: 144px;
  line-height: 174px;
  font-weight: normal;
  color: black;
  margin: 0;
  text-align: center;
}

.error__subtitle {
  margin-top: 10px;
  font-size: 16px;
  line-height: 24px;
  color: black;
  text-align: center;
}

.error__home-link {
  display: block;
  color: black;
}

@media screen and (max-width: 320px) {
  .error__title {
    font-size: 74px;
    line-height: 87px;
  }
  .error__subtitle {
    font-size: 13px;
    line-height: 16px;
  }
}
</style>
