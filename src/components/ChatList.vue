<template>
  <div>
    <h2>Chats</h2>
    <div>
      <div>Chat Name: <input v-model="chatName"></div>
      <div>
        <button @click="addChat">Add Chat By Data-async</button>
        <button @click="addChatRPC">Add Chat By RPC</button>
      </div>
      <div v-if="chatList.length > 0">
        <div v-for="chatId in chatList">
          <chat-list-item :chatId="chatId" 
            @removeChat="removeChat" 
            @loadChat="loadChat">
          </chat-list-item>
        </div>
      </div>
      <div v-else>No Chats</div>
    </div>
    <chat-screen :chatId="chatToLoad"></chat-screen>
  </div>
</template>
<script>
  import ChatListItem from './ChatListItem'
  import ChatScreen from './ChatScreen'
  import {client} from '../deepStream/conn.js'
  
  let chatListData = client.record.getList('chats');

  export default {
    name: 'chat-list',
    components: {
      ChatListItem,
      ChatScreen
    },
    data() {
      return {
        chatName: '',
        chatList: [],
        chatToLoad: null
      }
    },
    created() {
      chatListData.subscribe(values => {
        console.log('chatListData', values)
        this.chatList = values
      })

    },
    methods: {
      addChat() {
        if (this.chatName) {
          const newChat = {
            id: client.getUid(),
            name: this.chatName
          }
          const chatRecord = client.record.getRecord('chat/' + newChat.id)
          chatRecord.whenReady(() => {
            chatRecord.set(newChat)
            chatListData.addEntry(newChat.id)
            this.chatName = ''
          })
        }
      },
      addChatRPC() {
        if (this.chatName) {
          const newChat = {
            name: this.chatName
          }
          client.rpc.make('addChat', newChat, (error, result) => {
            console.log('addChat', 'error', error, 'result', result)
            if (!error) {
              this.chatName = ''
            }
          });
        }
      },
      removeChat(id) {
        console.log('RemoveChat', id)
        chatListData.removeEntry(id)
      },
      loadChat(id) {
        console.log('loadChat', id)
        this.chatToLoad = id
      }
    }
  }

</script>
<style>


</style>
