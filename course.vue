<template>
  <div id="app">
    <page-component />
  </div>
</template>

<script>
import PageComponent from './components/PageComponent.vue';

export default {
  components: {
    PageComponent,
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
