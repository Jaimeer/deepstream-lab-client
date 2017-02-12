<template>
  <div>
    <h2>User Connected</h2>
    <div>Connected: {{userConnected}}</div>
  </div>
</template>
<script>
  import {
    client
  } from '../deepStream/conn.js'

  let userConnectedData = client.record.getRecord('user-connections');

  export default {
    name: 'user-connected',
    data() {
      return {
        userConnected: 0
      }
    },
    created() {
      userConnectedData.subscribe('value', (value) => {
        console.log('userConnectedData:value', value)
        this.userConnected = value
      })
    }
  }

</script>
<style>


</style>
