<template>
  <div>
    <template v-if="chatText">
      {{ chatText.text }}
    </template>
    <template v-else>{{ textId }}</template>
  </div>
</template>
<script>
  import {
    client
  } from '../deepStream/conn.js'

  export default {
    name: 'chat-screen-text',
    props: ['textId'],
    data() {
      return {
        chatText: null,
        chatTextConn: null
      }
    },
    created() {
      console.log('text-item', this.textId)
      this.chatTextConn = client.record.getRecord('chat-item-text-item/' + this.textId)
      this.chatTextConn.whenReady(() => {
        this.chatText = this.chatTextConn.get()
      })
    },
    methods: {
      /*
      removeChat() {
        this.chatTextConn.delete()
        this.$emit('removeChat', this.chatId)
      },
      removeChatRpc() {
        client.rpc.make('removeChat', this.chatId, (error, result) => {
          console.log('removeChat', 'error', error, 'result', result)
          if (!error)
            this.$emit('removeChat', this.chatId)
        });
      },
      loadChat() {
        this.$emit('loadChat', this.chatId)
      }
      */
    }
  }

</script>
<style>


</style>
