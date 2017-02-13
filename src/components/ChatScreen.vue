<template>
  <div>
    <template v-if="chatId">
      <h2>Chat Screen</h2>
      <div>{{chatId}}</div>
      <div>
        <div v-if="chatTexts.length > 0">
          <div v-for="chatText in chatTexts">
            <chat-screen-text :textId="chatText"></chat-screen-text>
          </div>
        </div>
        <div v-else>No Chats</div>
        <div>
          <input v-model="chatText">
          <button @click="sendText">Send</button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import {
    client,
    getUserId
  } from '../deepStream/conn.js'
  import ChatScreenText from './ChatScreenText.vue'

  let chatTextData = client.record.getAnonymousRecord()

  export default {
    name: 'chat-screen',
    props: ['chatId'],
    components: {
      ChatScreenText
    },
    data() {
      return {
        chatText: '',
        chatTexts: [],
      }
    },
    watch: {
      chatId(val) {
        console.log('Changed chatId', val)
        // chatTextData = client.record.getAnonymousRecord()
        // client.record.getList('chat-item-text-list/' + val);

        chatTextData.setName('chat-item-text-list/' + val)
        // this.chatTexts = []

        chatTextData.subscribe(values => {
          console.log('chatTextData', values)
          this.chatTexts = values
        })
      }
    },
    created() {},
    methods: {
      sendText() {
        console.log('sendText', this.chatText)
        if (this.chatText) {
          const newChatText = {
            id: client.getUid(),
            text: this.chatText,
            chatId: this.chatId,
            userId: getUserId()
          }
          const chatTextRecord = client.record.getRecord('chat-item-text-item/' + newChatText.id)
          chatTextRecord.whenReady(() => {
            chatTextRecord.set(newChatText)
            const chatTextDataList = client.record.getList('chat-item-text-list/' + val).whenReady(() => {
              chatTextDataList.addEntry(newChatText.id)
              this.chatText = ''
            })
          })
        }
      }
    }
  }

</script>
<style>


</style>
