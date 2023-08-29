<script setup>
import { SmileTwoTone } from '@ant-design/icons-vue'
</script>

<template lang="pug">
a-row(align="center")
  a-col
    a-result(title="Bem vindo a Plataforma Ordo!" sub-title="Esta plataforma foi construida sob medida para resolver demandas pessoais do Davi Moura.")
      template(#icon)
        smile-two-tone
</template>

<route lang="yaml">
meta:
  title: 'Início'
  menu: true
</route>