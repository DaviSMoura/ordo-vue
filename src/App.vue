<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter()
const route = useRoute();

const current = computed({
  get: () => [route.name],
  set: (selectedItems) => {
    const name = selectedItems[0] // always will be first since its not a multiple select
    router.push({ name })
  },
});

const menuItems = computed(() => {
  const allRoutes = router.getRoutes();
  const routes = allRoutes.filter((route) => route.meta?.menu);
  return routes.map((route) => ({
    key: route.name,
    title: route.meta.title,
    label: route.meta.title,
  }));
})
</script>

<template lang="pug">
a-layout.layout
  a-layout-header(:style="{ position: 'fixed', zIndex: 1, width: '100%' }")
    .logo
    a-menu(v-model:selected-keys="current" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" :items="menuItems")
  a-layout-content(style="padding: 0 50px; margin-top: 64px")
    a-breadcrumb(style="margin: 16px 0")
      a-breadcrumb-item Início
    div(:style="{ background: '#fff', padding: '24px', minHeight: '280px' }")
      router-view
  a-layout-footer(style="text-align: center")
    | Plataforma Ordo &copy;2023 Criado por Davi Moura
</template>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

[data-theme="dark"] .site-layout-content {
  background: #141414;
}
</style>