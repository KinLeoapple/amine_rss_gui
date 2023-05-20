<template>
  <header>
    <title-bar/>
  </header>
  <main>
    <side-bar/>
    <perfect-scrollbar @ps-scroll-y="fadeBtn" class="window-box" id="window-box">
      <div class="add-btn" ref="addBtn" @mousemove="mouseOverBtnEffect($event.currentTarget)"
           @mouseenter="mouseOverBtnEffect($event.currentTarget)"
           @mouseleave="mouseLeaveBtnEffect($event.currentTarget)">
        <i class="bi bi-plus"></i>
      </div>
      <div class="search-btn" ref="searchBtn" @mousemove="mouseOverBtnEffect($event.currentTarget)"
           @mouseenter="mouseOverBtnEffect($event.currentTarget)"
           @mouseleave="mouseLeaveBtnEffect($event.currentTarget)">
        <i class="bi bi-search"></i>
        <div class="search-bar">
          <input type="text" maxlength="30"/>
        </div>
      </div>
      <files-window/>
      <rules-window/>
      <downloads-window/>
      <search-window/>
    </perfect-scrollbar>
  </main>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import SideBar from "@/components/SideBar.vue";
import FilesWindow from "@/components/FilesWindow.vue";
import RulesWindow from "@/components/RulesWindow.vue";
import DownloadsWindow from "@/components/DownloadsWindow.vue";
import SearchWindow from "@/components/SearchWindow.vue";

const fadeLevel = "0.6";
let isAddHidden = false, isSearchHidden = false, isBtnFade = false;

export default {
  name: 'App',
  components: {
    SearchWindow,
    DownloadsWindow,
    RulesWindow,
    FilesWindow,
    SideBar,
    TitleBar
  },
  mounted() {
    this.$nextTick(() => {
      this.clickSearchBtn();
      let filesBtn = document.getElementById("files");
      let rulesBtn = document.getElementById("rules");

      filesBtn.addEventListener("click", () => {
        this.showFileWindow();
      });

      rulesBtn.addEventListener("click", () => {
        this.showRulesWindow();
      });

      filesBtn.click();
    });
  },
  methods: {
    clickSearchBtn() {
      document.addEventListener("click", (e) => {
        let el = document.querySelector(".search-btn");
        if (e.path.includes(el)) {
          el.classList.add("search-btn-active");
          el.querySelector(".search-bar input").focus();
        } else {
          el.classList.remove("search-btn-active");
          el.querySelector(".search-bar input").blur();
        }
      });
    },
    mouseOverBtnEffect(el) {
      el.style.opacity = "1";
    },
    mouseLeaveBtnEffect(el) {
      if (isBtnFade) {
        el.style.opacity = fadeLevel;
      } else {
        el.style.opacity = "1";
      }
    },
    fadeBtn() {
      let scrollTop = document.getElementById("window-box").scrollTop;
      // console.log(scrollTop)
      if (scrollTop > 50) {
        this.$refs.addBtn.style.opacity = fadeLevel;
        this.$refs.searchBtn.style.opacity = fadeLevel;
        isBtnFade = true;
      } else {
        if (isAddHidden) {
          this.$refs.addBtn.style.opacity = "0";
        } else {
          this.$refs.addBtn.style.opacity = "1";
        }
        if (isSearchHidden) {
          this.$refs.searchBtn.style.opacity = "0";
        } else {
          this.$refs.searchBtn.style.opacity = "1";
        }
        isBtnFade = false;
      }
    },
    scrollWinToTop() {
      document.getElementById("window-box").scrollTop = 0;
    },
    showAddBtn() {
      this.$refs.searchBtn.style.marginLeft = "70px";
      this.$refs.addBtn.style.display = "block";
      setTimeout(() => {
        this.$refs.addBtn.style.opacity = "1";
      }, 150);
      isAddHidden = false;
    },
    hideAddBtn() {
      this.$refs.addBtn.style.opacity = "0";
      setTimeout(() => {
        this.$refs.addBtn.style.display = "none";
        this.$refs.searchBtn.style.marginLeft = "10px";
      }, 50);
      isAddHidden = true;
    },
    showFileWindow() {
      this.hideAddBtn();
      this.scrollWinToTop();
      document.querySelector("#file-window").style.display = "inline-flex";
      document.querySelector("#rule-window").style.display = "none";
    },
    showRulesWindow() {
      this.showAddBtn();
      this.scrollWinToTop();
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

/*
Buttons basic setting
 */

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
  transition: margin 0.2s linear, opacity .2s linear;
  z-index: 999;
}

.add-btn {
  align-items: center;
  justify-content: center;
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
  margin-top: 1px;
  margin-left: 1px;
  font-size: 40px;
}

.search-btn i {
  margin-top: 10px;
  margin-left: 11px;
  font-size: 25px;
}

.search-btn .search-bar {
  opacity: 0;
}

/*
While search button been clicked
 */

.search-btn:active {
  min-width: 250px;
  width: 250px;
  max-height: 200px;
  border-radius: 30px;
  transition: width .2s linear;
}

.search-btn-active {
  overflow: visible;
  min-width: 250px;
  width: 250px;
  max-height: 200px;
  border-radius: 30px;
  cursor: default;
  transition: width .2s linear;
}

.search-btn-active .search-bar {
  opacity: 1;
}

.search-bar {
  width: 180px;
  height: 26px;
  line-height: 26px;
  margin-top: 6.5px;
  margin-bottom: 6.5px;
  margin-left: 20px;
  padding: 3px;
  border-radius: 30px;
  background: white;
  overflow: hidden;
  transition: opacity .2s linear;
}

.search-bar input {
  width: 180px;
  height: 26px;
  border: 0;
  outline: 0;
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
}
</style>
