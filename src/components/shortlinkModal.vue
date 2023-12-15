<script setup>
import { computed, ref, watch } from "vue";
import axios from "../api/index.js";

const props = defineProps({
  shortlink: Object,
})
const emit = defineEmits(['ok'])

const formRef = ref()
const open = ref(false)
const confirmLoading = ref(false)
const modalTitle = computed(() => {
  return props.shortlink?.id ? 'Editar link curto' : 'Novo link curto'
})
const prefix = computed(() => {
  return import.meta.env.VITE_SHORTLINKS_PREFIX
})

async function handleOk() {
  try {
    const formData = await formRef.value.validate()
    confirmLoading.value = true

    if (props.shortlink?.id) {
      await axios.patch(`/shortlinks/${props.shortlink.name}`, formData)
    } else {
      await axios.post('/shortlinks', formData)
    }

    emit('ok')
    resetAndClose()
  } catch (error) {
    console.error('Error handling ok in modal', error)
  }
}

const form = ref({
  name: '',
  url: ''
})

watch(() => props.shortlink, (value) => {
  if (value) {
    form.value = {
      name: value.name,
      url: value.url,
    }
  }
})

function resetAndClose() {
  confirmLoading.value = false
  open.value = false
  form.value = {
    name: '',
    url: '',
  }
}

const linkPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i')
</script>

<template lang="pug">
a-modal(
  v-model:open="open"
  :title="modalTitle"
  :confirm-loading="confirmLoading"
  @ok="handleOk"
  @cancel="resetAndClose"
  ok-text="Salvar"
  cancel-text="Cancelar"
)
  a-form(layout="vertical" ref="formRef" :model="form")
    a-form-item(label="Nome" name="name" :rules="[{ required: true, message: 'Campo obrigatório!' }]")
      a-input(v-model:value="form.name")
        template(#prefix) {{ prefix }}
    a-form-item(label="URL" name="url" :rules="[{ required: true, message: 'Precisa ser um link válido.', pattern: linkPattern }]")
      a-input(v-model:value="form.url")
</template>