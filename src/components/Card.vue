<template>
  <div class="card">
    <div class="d-flex">
      <img :src="image" :alt="image" width="56" />
      <div class="ml-4">
        <h3 class="font-size-18 font-weight-300">{{ title }}</h3>
        <p class="font-size-14 color-primary">{{ value ? value : 0 }}</p>
      </div>
    </div>
    <img class="img-bw" :src="imageBw" :alt="imageBw" width="50" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image?: string;
  title?: string;
  value?: number;
  imageBw?: string;
}>();
</script>
<style lang="scss" scoped>
.card {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
  width: 100%;
  height: 100px;
  padding: 20px;
  background-color: var(--woodsmkoke);
  border-radius: 10px;
  color: var(--sunglow);
  .img-bw {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
