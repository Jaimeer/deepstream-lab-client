<template>
  <div>
    <h2>Emit Subscribe</h2>
    <div v-if="emitList.length > 0">
      <div v-for="datum in emitList">
        {{ datum }}
      </div>
    </div>
    <div v-else>No Data</div>
    <button @click="emitData">Local Emit</button>
    <button @click="emitDataRPC">RPC Emit</button>
  </div>
</template>
<script>
  import {
    client
  } from '../deepStream/conn.js'

  export default {
    name: 'emit-subscribe',
    data() {
      return {
        emitList: []
      }
    },
    created() {
      client.event.subscribe('chat-msg', msgText => {
        console.log('chat-msg', msgText);
        this.emitList.push(msgText)
      });
    },
    methods: {
      emitData() {
        client.event.emit("chat-msg", 'Local Emit');
      },
      emitDataRPC() {
        client.rpc.make('removeEmit', {}, (error, result) => {
          console.log('removeEmit', 'error', error, 'result', result)
        })
      }
    }
  }

</script>
<style>


</style>
