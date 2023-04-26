<template>
    <header>
        <title-bar/>
    </header>
    <main>
        <side-bar/>
    </main>
</template>

<script>

import TitleBar from "@/components/TitleBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
    name: 'App',
    components: {
        SideBar,
        TitleBar
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

html, body {
    width: 100%;
    height: 100%;
}

#app {
    width: 100%;
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: inline-flex;
}

header {
    min-height: 35px;
    max-height: 35px;
    width: 100%;
    position: absolute;
    top: 0;
    margin: auto;
}

main {
    width: 100%;
    height: 100%;
    /*margin-top: 90px;*/
}
</style>
