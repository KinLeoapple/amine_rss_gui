<template>
    <div ref="nav" class="nav">
        <img class="icon" draggable="false" src="@/assets/img/logo.jpg" alt=""/>
        <item-btn id="files" ref="files" @click="openFiles()" class-val="bi bi-folder2"/>
        <item-btn id="downloads" ref="downloads" @click="openDownloads()" class-val="bi bi-cloud-arrow-down"/>
        <item-btn id="downloads" ref="downloads" @click="openAppends()" class-val="bi bi-plus-circle"/>
        <item-btn id="search" ref="search" @click="openSearch()" class-val="bi bi-search"/>
        <item-btn id="setting" ref="setting" @click="openSetting()" class-val="bi bi-gear"/>
    </div>
</template>

<script>
import ItemBtn from "@/components/ItemBtn.vue";

const ipcRenderer = window.require('electron').ipcRenderer;

export default {
    name: "SideBar",
    components: {ItemBtn},
    mounted() {
        this.$nextTick(() => {
            document.getElementById('files').click();
        });
    },
    methods: {
        openFiles() {
            ipcRenderer.send('open-files');
        },
        openDownloads() {
            ipcRenderer.send('open-downloads');
        },
        openAppends() {
            ipcRenderer.send('open-appends');
        },
        openSearch() {
            ipcRenderer.send('open-search');
        },
        openSetting() {
            ipcRenderer.send('open-setting');
        }
    }
}
</script>

<style scoped>
.nav {
    position: relative;
    min-width: 120px;
    max-width: 120px;
    min-height: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    margin-left: 10px;
    background: white;
    /*border: 1px solid rgb(11, 10, 10);*/
    z-index: 999;
    border-radius: 10px;
    box-shadow: rgba(11, 10, 10, 0.7) 0 0 10px 1px;
}

.icon {
    width: 70px;
    height: 70px;
    line-height: 30px;
    border-radius: 50%;
    margin-top: 10px;
    object-fit: cover;
    /*box-shadow: rgba(11, 10, 10, 0.7) 0 0 5px 1px;*/
    -webkit-app-region: drag;
}

#setting {
    margin-top: auto;
    margin-bottom: 10px;
}
</style>