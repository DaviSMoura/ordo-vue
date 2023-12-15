<script setup>
import { computed, ref, h } from 'vue';
import axios from '../api/index.js'
import shortlinkModal from '../components/shortlinkModal.vue';
import { DeleteOutlined, EditOutlined, EyeOutlined, CopyOutlined, LinkOutlined, PlusOutlined } from '@ant-design/icons-vue';

const loading = ref(false)
const modal = ref(false)
const currentShortLink = ref({})
const data = computed(() => {
  return results.value.map((item) => {
    return {
      id: item.id,
      name: item.name,
      url: item.url,
      hits: item.acesses,
      item
    }
  })
})
const results = ref([])
const columns = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Acessos',
    dataIndex: 'hits',
    key: 'hits',
  },
  {
    title: 'Ações',
    key: 'action',
  },
])
const deleting = ref([])
const prefix = computed(() => {
  return import.meta.env.VITE_SHORTLINKS_PREFIX
})

function copyLink(shortlink) {
  const link = `${prefix.value}${shortlink.name}`
  navigator.clipboard.writeText(link)
}

async function loadData() {
  modal.value = false
  loading.value = true
  const response = await axios.get('/shortlinks')
  results.value = response.data
  loading.value = false
}

function createNew() {
  currentShortLink.value = {}
  modal.value = true
}

async function deleteItem(name) {
  deleting.value.push(name)
  try {
    await axios.delete(`/shortlinks/${name}`)
    await loadData()
  } finally {
    deleting.value = deleting.value.filter((item) => item !== name)
  }
}

function edit(shortlink) {
  currentShortLink.value = shortlink
  modal.value = true
}

loadData()
</script>

<template lang="pug">
shortlink-modal(v-model:open="modal" @ok="loadData" :shortlink="currentShortLink")
a-card
  template(#title) Links curtos
  template(#extra)
    a-button(type="primary" :icon="h(PlusOutlined)" @click.stop="createNew") Novo
  a-table(:dataSource="data" :columns="columns" :loading="loading" rowKey="id")
    template(#bodyCell="{ column, text }")
      template(v-if="column.key === 'action'")
        a-button-group
          a-tooltip
            template(#title) Ver acessos
            a-button(type="primary" :icon="h(EyeOutlined)")
          a-tooltip
            template(#title) Copiar Link
            a-button(:icon="h(CopyOutlined)" @click.stop="copyLink(text.item)")
          a-tooltip
            template(#title) Editar
            a-button(:icon="h(EditOutlined)" @click.stop="edit(text.item)")
          a-tooltip
            template(#title) Excluir
            a-button(danger :icon="h(DeleteOutlined)" :loading="deleting.includes(text.name)" @click.stop="deleteItem(text.name)")
</template>

<route lang="yaml">
meta:
  title: 'Links curtos'
  menu: true
</route>