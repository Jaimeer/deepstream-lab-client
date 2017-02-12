<template>
  <div>
    <template v-if="chat">
      {{ chat.name }}
      <button @click="removeChat">X</button>
      <button @click="removeChatRpc">XR</button>
      <button @click="loadChat">Load</button>
    </template>
    <template v-else>{{ chatId }}</template>
  </div>
</template>
<script>
  import {
    client
  } from '../deepStream/conn.js'

  export default {
    name: 'chat-list-item',
    props: ['chatId'],
    data() {
      return {
        chat: null,
        chatConn: null
      }
    },
    created() {
      console.log('chat-list-item', this.chatId)
      this.chatConn = client.record.getRecord('chat/' + this.chatId)
      this.chatConn.whenReady(() => {
        this.chat = this.chatConn.get()
      })
    },
    methods: {
      removeChat() {
        this.chatConn.delete()
        this.$emit('removeChat', this.chatId)
      },
      removeChatRpc() {
        client.rpc.make('removeChat', this.chatId, (error, result) => {
          console.log('removeChat', 'error', error, 'result', result)
        });
        this.$emit('removeChat', this.chatId)
      },
      loadChat() {
        this.$emit('loadChat', this.chatId)
      }
    }
  }

</script>
<style>


</style>
