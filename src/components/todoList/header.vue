<template>
  <thead>
    <tr>
      <th>操作</th>
      <th v-for="col in cols" :key="col">{{col}}</th>
    </tr>
  </thead>
</template>

<script>
    export default {
        name: "Head",
        props:['cols']
    }
</script>

<style scoped>

</style>
