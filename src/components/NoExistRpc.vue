<template>
  <div>
    <h2>NoExistRpc</h2>
    <button @click="noExistRpc">Call noExistRpc</button>
  </div>
</template>
<script>
  import {client} from '../deepStream/conn.js'

  export default {
    name: 'no-exist-rpc',
    methods: {
      noExistRpc() {
        client.rpc.make('noExistRpc', {}, (error, result) => {
          console.log('noExistRpc', 'error', error, 'result', result)
        });
      }
    }
  }

</script>
<style>


</style>
