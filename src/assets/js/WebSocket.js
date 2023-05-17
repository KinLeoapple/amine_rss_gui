import JSON5 from 'json5';
import {interval, Subject} from 'rxjs';

export class WebsocketService {

    constructor() {
        this.url = undefined
        this.webSocket = undefined
        this.connectSuccess = false;
        this.reConnectFlag = false;
        this.messageSubject = new Subject();
        this.serverTimeoutSubscription = undefined;
        this.reconnectSubscription = undefined;
        this.startHeartBeat();
    }

    send(message) {
        this.webSocket.send(message);
    }

    connect(url) {
        this.url = url;
        this.createWebSocket();
    }

    reconnect() {
        // if already connected, then return
        if (this.connectSuccess) {
            return;
        }
        // if it is reconnecting, then return
        if (this.reConnectFlag) {
            return;
        }
        this.reConnectFlag = true;
        this.reconnectSubscription = interval(5 * 1000).subscribe(async (val) => {
            if (val < 3) {
                setTimeout(() => {
                    // if less than 3 times, then continue
                    const url = this.url;
                    this.connect(url);
                }, 1000);
            } else {
                // if more than 3 times, then stop this auto reconnect
                this.stopReconnect();
                this.stopHeartBeat();
                this.webSocket.close();
            }
        });
    }

    close() {
        this.webSocket.close();
    }

    stopReconnect() {
        this.reConnectFlag = false;
        if (
            typeof this.reconnectSubscription !== 'undefined' &&
            this.reconnectSubscription != null
        ) {
            this.reconnectSubscription.unsubscribe();
        }
    }

    createWebSocket() {
        this.webSocket = new WebSocket(this.url);
        this.webSocket.onopen = () => this.onOpen();
        this.webSocket.onmessage = (event) => this.onMessage(event);
        this.webSocket.onclose = () => this.onClose();
        this.webSocket.onerror = () => this.onError();
    }

    onOpen() {
        this.connectSuccess = true;
        if (this.reConnectFlag) {
            this.stopReconnect();
            this.startHeartBeat();
        }
    }

    onMessage(event) {
        const message = JSON5.parse(event.data);
        if (this.messageSubject != null) {
            this.messageSubject.next(message);
        }
    }

    onClose() {
        this.connectSuccess = false;
        this.webSocket.close();
        this.reconnect();
    }

    onError() {
        // if error occurred
        // websocket goes to onclose event
        // do reconnect in onClose once
        this.connectSuccess = false;
    }

    startHeartBeat() {
        this.serverTimeoutSubscription = interval(60 * 1000).subscribe(() => {
            if (!(this.webSocket != null && this.webSocket.readyState === 1)) {
                this.stopHeartBeat();
                this.reconnect();
            }
        });
    }

    stopHeartBeat() {
        if (
            typeof this.serverTimeoutSubscription !== 'undefined' &&
            this.serverTimeoutSubscription != null
        ) {
            this.serverTimeoutSubscription.unsubscribe();
        }
    }
}