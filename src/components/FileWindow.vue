<template>
  <div class="file-window" id="file-window">
  </div>
</template>

<script>
import {WebsocketService} from "@/assets/js/WebSocket";
import axios from "axios";

let webSocketService = new WebsocketService()
let files = []

export default {
  name: "FileWindow",
  mounted() {
    webSocketService.connect("ws://localhost:5000/files");

    webSocketService.messageSubject.subscribe(data => {
      if (data.OK === "OK") {
        webSocketService.send("G:\\Amine\\");
      } else if (data.files !== undefined) {
        files = data.files;
        this.renderFiles();
      }
    });
  },
  methods: {
    renderFiles() {
      let fileWindow = document.getElementById("file-window");
      files.forEach(file => {
        let arr = file.root.toString().split("/")
        let folder = arr[arr.length - 2]
        let folderDom = fileWindow.querySelector("[dir='" + folder + "']");
        if (folderDom === null) {
          fileWindow.innerHTML +=
              `<div class="file-dir" root-path="${file.root}" dir="${folder}">\n` +
              "<div class=\"file-title\">\n" +
              `${folder}` +
              "</div>\n" +
              "<div class=\"files\">" +
              "</div>";
          folderDom = fileWindow.querySelector("[dir='" + folder + "']");
        }
        let filesDom = folderDom.querySelector(".files");
        filesDom.innerHTML +=
            `<div class="file" file-name="${file.name}" title="${file.name}">\n` +
            "<div class=\"file-bg\">\n" +
            "<div class=\"play-btn\">\n" +
            "<i class=\"bi bi-play-fill\" draggable=\"false\"></i>\n" +
            "</div>\n" +
            "</div>\n" +
            `<div class="file-name">${file.name}</div>\n` +
            "</div>";
        this.getFileCover(file.root, file.name);

      });
    },
    async getFileCover(root, name) {
      axios({
        method: "post",
        baseURL: "http://localhost:5000/file_cover/",
        data: {
          path: root + name
        }
      }).then(resp => {
        let data = resp.data;
        let fileDom = document.querySelector(`[file-name="${name}"]`);
        fileDom.querySelector(".file-bg").style.backgroundImage = `url("data:image/jpeg;base64,${data}")`;
      });
    },
    playVideo() {

    }
  }
}
</script>

<style scoped>
.file-window {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  margin-top: 50px;
}
</style>

<style>
.file-dir {
  width: 100%;
  text-align: left;
}

.file-title {
  font-family: Arial, sans-serif;
  width: auto;
  font-size: 20px;
  font-weight: 520;
  text-align: center;
  color: #2c3e50;
  padding: 5px;
  margin: 5px 5px 5px 10px;
  text-space: 1px;
  letter-spacing: 2px;
  border-bottom: 1px #2c3e50 solid;
  display: inline-block;
}

.files {
  width: 100%;
  min-height: 100%;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.file {
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 23%;
  width: 150px;
  height: 250px;
  margin-top: 10px;
  margin-left: 10px;
  transition: all .15s linear;
}

.file-bg {
  position: relative;
  width: 150px;
  height: 200px;
  border-radius: 10px;
  box-shadow: rgba(11, 10, 10, 0.7) 0 0 10px 1px;
  background-image: url("@/assets/img/logo.jpg");
  background-position: center center;
  background-size: cover;
  transition: all .15s linear;
}

.play-btn {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(51, 71, 91, 0.9);
  opacity: 0;
  color: white;
  display: inline-flex;
  text-align: center;
  right: 0;
  bottom: 0;
  margin: auto 10px 10px auto;
  transition: all .2s linear;
}

.play-btn i {
  margin-top: -2px;
  margin-left: 2px;
  font-size: 50px;
}

.file-name {
  width: 150px;
  margin: 5px 10px 10px;
  font-weight: 640;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all .2s linear;
}

.file:hover .play-btn {
  opacity: 1;
}

.blank-file {
  cursor: default;
}

.blank-file .file-bg {
  box-shadow: none;
  background-image: none;
}

.blank-file:hover .play-btn {
  opacity: 0;
}
</style>