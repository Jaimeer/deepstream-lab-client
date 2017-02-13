<template>
  <div>
    <h1>DeepStream DashBoard</h1>
    <share-text></share-text>
    <hr>
    <chat-list></chat-list>
    <hr>
    <user-connected></user-connected>
    <hr>
    <no-exist-rpc></no-exist-rpc>
    <hr>
    <emit-subscribe></emit-subscribe>
  </div>
</template>
<script>
  import NoExistRpc from './NoExistRpc'
  import UserConnected from './UserConnected'
  import ChatList from './ChatList'
  import shareText from './shareText'
  import EmitSubscribe from './EmitSubscribe'

  export default {
    name: 'deepstream-dashboard',
    components: {
      NoExistRpc,
      UserConnected,
      ChatList,
      shareText,
      EmitSubscribe
    }
  }
</script>

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }

</style>
