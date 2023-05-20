<template>
  <header>
    <title-bar/>
  </header>
  <main>
    <side-bar/>
    <perfect-scrollbar class="window-box" id="window-box">
      <div class="add-btn" ref="addBtn">
        <i class="bi bi-plus"></i>
      </div>
      <div class="search-btn" ref="searchBtn">
        <i class="bi bi-search"></i>
      </div>
      <file-window/>
      <rules-window/>
    </perfect-scrollbar>
  </main>
</template>

<script>

import TitleBar from "@/components/TitleBar.vue";
import SideBar from "@/components/SideBar.vue";
import FileWindow from "@/components/FileWindow.vue";
import RulesWindow from "@/components/RulesWindow.vue";

export default {
  name: 'App',
  components: {
    RulesWindow,
    FileWindow,
    SideBar,
    TitleBar
  },
  mounted() {
    let filesBtn = document.getElementById("files");
    let rulesBtn = document.getElementById("rules");

    filesBtn.addEventListener("click", () => {
      this.showFileWindow();
    });

    rulesBtn.addEventListener("click", () => {
      this.showRulesWindow();
    })
  },
  methods: {
    showAddBtn() {
      this.$refs.searchBtn.style.marginLeft = "70px";
      this.$refs.addBtn.style.display = "block";
      setTimeout(() => {
        this.$refs.addBtn.style.opacity = "1";
      }, 150);
    },
    hideAddBtn() {
      this.$refs.addBtn.style.opacity = "0";
      setTimeout(() => {
        this.$refs.addBtn.style.display = "none";
        this.$refs.searchBtn.style.marginLeft = "10px";
      }, 50);
    },
    showFileWindow() {
      this.hideAddBtn();
      document.querySelector("#file-window").style.display = "inline-flex";
      document.querySelector("#rule-window").style.display = "none";
    },
    showRulesWindow() {
      this.showAddBtn();
      document.querySelector("#file-window").style.display = "none";
      document.querySelector("#rule-window").style.display = "inline-flex";
    }
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
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}

.window-box {
  width: calc(100% - 150px);
  min-height: calc(100% - 55px);
  max-height: calc(100% - 55px);
  margin-top: 45px;
  margin-left: 10px;
  overflow: hidden;
}

.add-btn, .search-btn {
  position: fixed;
  min-width: 45px;
  width: 45px;
  max-width: 45px;
  min-height: 45px;
  height: 45px;
  max-height: 45px;
  border-radius: 50%;
  color: white;
  display: inline-flex;
  overflow: hidden;
  cursor: pointer;
  margin-top: 5px;
  transition: margin 0.2s linear, opacity .1s linear;
  z-index: 999;
}

.add-btn {
  background-color: #FF9999;
  box-shadow: #FF9999 0 0 10px 1px;
  margin-left: 10px;
}

.search-btn {
  background-color: #666699;
  box-shadow: #666699 0 0 10px 1px;
  margin-left: 70px;
}

.add-btn i {
  margin-left: 2px;
  font-size: 40px;
}

.search-btn i {
  margin-top: 10px;
  margin-left: 11px;
  font-size: 25px;
}

.add-btn:hover, .search-btn:hover {
  opacity: 1;
}
</style>
