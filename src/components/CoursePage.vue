<template>
  <div>
    <UpperBar/>
    <div id="app">
      <page-component />
    </div>
  </div>

</template>

<script>
import PageComponent from './PageComponents.vue';
import UpperBar from "@/components/UpperBar";

export default {
  components: {
    UpperBar,
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
