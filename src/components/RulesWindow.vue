<template>
  <div class="rule-window" id="rule-window">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RulesWindow",
  mounted() {
    this.$nextTick(() => {
      this.getAllRules();
    });
  },
  methods: {
    getAllRules() {
      axios({
        method: "post",
        baseURL: "http://localhost:5000/get_all_rules"
      }).then(resp => {
        let data = resp.data
        // console.log(data)
        let ruleWindow = document.querySelector(".rule-window");
        data.forEach(rule => {
          let isPause = Number(data[4]) !== 0;
          let btnClass, iconClass;
          if (isPause) {
            btnClass = "pause-btn";
            iconClass = "bi-pause-fill";
          } else {
            btnClass = "resume-btn";
            iconClass = "bi-play-fill";
          }
          ruleWindow.innerHTML +=
              "<div class=\"rule\">\n" +
              "<div class=\"rule-btn-box\">\n" +
              `<div class="${btnClass}">\n` +
              `<i class="${iconClass}" draggable="false"></i>\n` +
              "</div>\n" +
              "</div>\n" +
              "<div class=\"rule-info\">\n" +
              "<div class=\"rule-bg-mask\"></div>\n" +
              "<div class=\"name\">" + rule[0] + "</div>\n" +
              "<div class=\"interval\">\n" +
              "<i class=\"bi bi-stopwatch\"></i>\n" +
              rule[3] +
              "</div>\n" +
              "<div class=\"link\">\n" +
              "<i class=\"bi bi-link-45deg\"></i>\n" +
              "<input type=\"text\" readonly spellcheck=\"false\" value=\"" + rule[1] + "\"/>\n" +
              "</div>\n" +
              "</div>\n" +
              "</div>";
        });
      });
    }
  }
}
</script>

<style scoped>
.rule-window {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
}
</style>

<style>
.rule {
  width: 90%;
  height: 100px;
  border-radius: 10px;
  box-shadow: rgba(11, 10, 10, 0.7) 0 0 10px 1px;
  margin: 10px;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;
}

.rule-btn-box {
  width: 100px;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-right: 1px #2c3e50 solid;
}

.pause-btn, .resume-btn {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  color: white;
  display: inline-flex;
  text-align: center;
  cursor: pointer;
  transition: all .2s linear;
  transform: scale(1.2);
}

.pause-btn {
  background-color: orange;
}

.resume-btn {
  background-color: #1d761d;
}

.pause-btn i {
  margin-top: 2px;
  margin-left: 2px;
  font-size: 26px;
}

.resume-btn i {
  margin-top: 2px;
  margin-left: 3px;
  font-size: 26px;
}

.pause-btn:hover {
  box-shadow: rgba(255, 165, 0, 0.6) 0 0 10px 1px;
}

.resume-btn:hover {
  box-shadow: rgba(29, 118, 29, 0.6) 0 0 10px 1px;
}

.pause-btn:active, .resume-btn:active {
  transform: scale(1.1);
}

.rule-info {
  width: calc(100% - 100px);
  height: 100px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-image: url(@/assets/img/logo.jpg);;
  background-size: cover;
  background-position: top right;
  position: relative;
}

.rule-bg-mask {
  position: absolute;
  width: 80%;
  height: 100%;
  background-image: linear-gradient(
      to right,
      rgb(255, 255, 255) 60%,
      transparent
  );
}

.rule-info .name {
  width: 200px;
  height: 26px;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 10px;
  line-height: 26px;
  text-align: left;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rule-info .interval {
  width: calc(100% - 10px);
  height: 26px;
  font-size: 16px;
  line-height: 26px;
  margin-left: 10px;
  text-align: left;
  z-index: 1;
}

.rule-info .interval i {
  font-size: 20px;
}

.rule-info .link {
  width: calc(100% - 10px);
  height: 26px;
  line-height: 26px;
  margin-left: 10px;
  text-align: left;
  margin-bottom: 10px;
  z-index: 1;
}

.rule-info .link i {
  font-size: 22px;
}

.rule-info .link input {
  margin-left: 5px;
  width: 200px;
  height: 26px;
  line-height: 26px;
  border: 0;
  outline: 0;
  font-size: 16px;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>