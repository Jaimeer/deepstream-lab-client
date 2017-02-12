<template>
  <div>
    <h2>Share Text</h2>
    <div>Shared Text: <input v-model="shareText"></div>
  </div>
</template>
<script>
  import {client} from '../deepStream/conn.js'

  let shareTextData = client.record.getRecord('shared-text');

  export default {
    name: 'share-text',
    data() {
      return {
        shareText: ''
      }
    },
    watch: {
      shareText(val) {
        shareTextData.set('value', val)
      }
    },
    created() {
      shareTextData.subscribe('value', (value) => {
        console.log('shareTextData:value', value)
        this.shareText = value
      })
    }
  }
</script>

<style>
</style>
