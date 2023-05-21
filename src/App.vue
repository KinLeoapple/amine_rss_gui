<template>
  <header>
    <title-bar/>
  </header>
  <main>
    <side-bar/>
    <perfect-scrollbar @ps-scroll-y="fadeBtn" class="window-box" id="window-box">
      <div class="add-btn add-btn-active" ref="addBtn" @mousemove="mouseOverBtnEffect($event.currentTarget)"
           @mouseenter="mouseOverBtnEffect($event.currentTarget)"
           @mouseleave="mouseLeaveBtnEffect($event.currentTarget)">
        <i class="bi bi-plus"></i>
        <div class="append-rules" ref="appendRules">
          <div class="append-rules-name">
            <i class="bi bi-tag"></i>
            NAME<br/>
            <input type="text" maxlength="100" placeholder="PLACE A NAME HERE" spellcheck="false" onclick="
            placeholder='PLACE A NAME HERE';"/>
          </div>
          <div class="append-rules-interval">
            <i class="bi bi-stopwatch"></i>
            INTERVAL <em>(Hour)</em><br/>
            <input type="text" min="1" max="10" placeholder="1 HOUR (Default)" spellcheck="false" oninput="
            if(value>10)value=10;
            value=value.replace(/[^\d.]/g,'');
            placeholder='1 HOUR (Default)';"/>
          </div>
          <div class="append-rules-link">
            <i class="bi bi-link-45deg"></i>
            LINK<br/>
            <input type="text" placeholder="PLACE A LINK HERE" spellcheck="false" onclick="
            placeholder='PLACE A LINK HERE';"/>
          </div>
          <div class="append-rules-submit">
            <div class="append-rules-submit-btn" @click="submitRule">SUBMIT</div>
          </div>
        </div>
      </div>
      <div class="search-btn" ref="searchBtn" @mousemove="mouseOverBtnEffect($event.currentTarget)"
           @mouseenter="mouseOverBtnEffect($event.currentTarget)"
           @mouseleave="mouseLeaveBtnEffect($event.currentTarget)">
        <i class="bi bi-search"></i>
        <div class="search-bar">
          <input type="text" maxlength="30" spellcheck="false"/>
        </div>
      </div>
      <files-window ref="filesWin"/>
      <rules-window ref="rulesWin"/>
      <!--      <downloads-window/>-->
      <!--      <search-window/>-->
    </perfect-scrollbar>
  </main>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import SideBar from "@/components/SideBar.vue";
import FilesWindow from "@/components/FilesWindow.vue";
import RulesWindow from "@/components/RulesWindow.vue";
import {AxiosRequest} from "@/assets/js/AxiosRequest";
// import DownloadsWindow from "@/components/DownloadsWindow.vue";
// import SearchWindow from "@/components/SearchWindow.vue";

const fadeLevel = "0.6";
let isAddHidden = false,
    isSearchHidden = false,
    isBtnFade = false,
    isAddOpen = false,
    isSearchOpen = false;

export default {
  name: 'App',
  components: {
    // SearchWindow,
    // DownloadsWindow,
    RulesWindow,
    FilesWindow,
    SideBar,
    TitleBar
  },
  mounted() {
    this.$nextTick(() => {
      this.clickAddBtn();
      this.clickSearchBtn();
      this.appendRuleOnInputs();

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
          isSearchOpen = true;
          el.style.opacity = "1";
        } else {
          el.classList.remove("search-btn-active");
          el.querySelector(".search-bar input").blur();
          el.querySelector(".search-bar input").value = "";
          isSearchOpen = false;
          if (isBtnFade) {
            el.style.opacity = fadeLevel;
          }
        }
      });
    },
    clickAddBtn() {
      document.addEventListener("click", (e) => {
        let el = document.querySelector(".add-btn");
        if (e.path.includes(el)) {
          el.classList.add("add-btn-active");
          isAddOpen = true;
          el.style.opacity = "1";
        } else {
          el.classList.remove("add-btn-active");
          el.querySelectorAll(".add-btn input").forEach(input => {
            input.blur();
            input.value = "";
          });
          isAddOpen = false;
          if (isBtnFade) {
            el.style.opacity = fadeLevel;
          }
        }
      });
    },
    appendRuleOnInputs() {
      document.querySelectorAll(".add-btn input").forEach(input => {
        input.addEventListener("input", () => {
          input.style.border = "1px solid transparent";
        });
      });
    },
    submitRule() {
      let appendRules = this.$refs.appendRules;
      let name = appendRules.querySelector(".append-rules-name input").value;
      let interval = appendRules.querySelector(".append-rules-interval input").value;
      let link = appendRules.querySelector(".append-rules-link input").value;

      let namePromise = new Promise(resolve => {
        if (name.length === 0) {
          resolve({res: false});
        } else {
          resolve({res: true});
        }
      });

      let intervalPromise = new Promise(resolve => {
        if (interval.length === 0) {
          interval = 1;
        } else if (interval === 0) {
          interval = 1;
        }
        resolve({res: true});
      });

      let linkPromise = new Promise(resolve => {
        if (link.length !== 0) {
          new AxiosRequest().get(link, {}).then(resp => {
            let status = resp.status;
            if (status === 200) {
              resolve({res: true});
            } else {
              resolve({res: false, msg: "INVALID LINK"});
            }
          });
        } else {
          resolve({res: false});
        }
      });

      Promise.all([namePromise, intervalPromise, linkPromise]).then(resArr => {
        let nameRes = resArr[0];
        let intervalRes = resArr[1];
        let linkRes = resArr[2];

        let el = document.querySelector(".add-btn");

        if (nameRes.res && intervalRes.res && linkRes.res) {
          el.classList.remove("add-btn-active");
          el.querySelectorAll(".add-btn input").forEach(input => {
            input.blur();
            input.value = "";
          });
          this.$refs.rulesWin.submitRule(name, interval, link);
        }
        if (!nameRes.res) {
          appendRules.querySelector(".append-rules-name input").style.border = "1px solid #2c3e50";
          appendRules.querySelector(".append-rules-name input").placeholder = "CAN NOT BE NULL";
        }
        if (!intervalRes.res) {
          appendRules.querySelector(".append-rules-interval input").style.border = "1px solid #2c3e50";
          appendRules.querySelector(".append-rules-interval input").placeholder = "CAN NOT BE NULL";
        }
        if (!linkRes.res) {
          appendRules.querySelector(".append-rules-link input").style.border = "1px solid #2c3e50";
          if (linkRes.msg !== undefined) {
            appendRules.querySelector(".append-rules-link input").placeholder = linkRes.msg;
          } else {
            appendRules.querySelector(".append-rules-link input").placeholder = "CAN NOT BE NULL";
          }
        }
      });
    },
    mouseOverBtnEffect(el) {
      el.style.opacity = "1";
    },
    mouseLeaveBtnEffect(el) {
      if (isBtnFade) {
        if (isAddOpen) {
          el.style.opacity = "1";
        } else if (isSearchOpen) {
          el.style.opacity = "1";
        } else {
          el.style.opacity = fadeLevel;
        }
      } else {
        el.style.opacity = "1";
      }
    },
    fadeBtn() {
      let scrollTop = document.getElementById("window-box").scrollTop;
      // console.log(scrollTop)
      if (scrollTop > 50) {
        if (isAddOpen) {
          this.$refs.addBtn.style.opacity = "1";
          this.$refs.searchBtn.style.opacity = "1";
        } else if (isSearchOpen) {
          this.$refs.addBtn.style.opacity = "1";
          this.$refs.searchBtn.style.opacity = "1";
        } else {
          this.$refs.addBtn.style.opacity = fadeLevel;
          this.$refs.searchBtn.style.opacity = fadeLevel;
        }
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

.append-rules {
  opacity: 0;
}

/*
While add button been clicked
 */

.add-btn:active, .add-btn-active {
  opacity: 1;
  cursor: default;
}

.add-btn:active .append-rules, .add-btn-active .append-rules {
  position: fixed;
  opacity: 1;
}

.append-rules {
  width: 320px;
  height: 256px;
  border-radius: 10px;
  background-color: #FF9999;
  margin-top: 10px;
  margin-left: 5px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  box-shadow: #FF9999 0 0 10px 1px;
  transition: opacity .2s linear;
}

.append-rules i {
  font-size: 16px;
}

.append-rules-name, .append-rules-interval, .append-rules-link {
  margin-top: 10px;
  margin-left: 5px;
  line-height: 20px;
  user-select: none;
}

.append-rules-interval em {
  font-size: 14px;
  font-weight: normal;
}

.append-rules input {
  width: 250px;
  height: 26px;
  margin-left: 20px;
  margin-top: 3px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 1px solid transparent;
  outline: 0;
  padding-left: 10px;
  padding-right: 10px;
}

.append-rules-submit {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.append-rules-submit-btn {
  width: 100px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: #2c3e50;
  text-align: center;
  margin-right: 10px;
  color: white;
  cursor: pointer;
  user-select: none;
  box-shadow: #2c3e50 0 0 10px 1px;
  transition: all .15s linear;
}

.append-rules-submit-btn:active {
  transform: scale(0.95);
}

/*
While search button been clicked
 */

.search-btn:active, .search-btn-active {
  opacity: 1;
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
