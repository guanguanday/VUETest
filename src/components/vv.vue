<template>
    <div>
        <h1>{{data.name}}</h1>
        <a @click="e=>{this.CFC()}">Change from children</a>
    </div>
</template>

<script>
    export default {
        name: "VV",
        props:["data","cb"],
        methods:{
            CFC:function () {
                this.cb({name:"abcd"})
            }
        }
    }
</script>

<style scoped>

</style>