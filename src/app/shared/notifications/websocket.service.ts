import { Injectable } from "@angular/core";
import SockJS from "sockjs-client/dist/sockjs.js";
import * as Stomp from 'stompjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    public subscribeToSocket(topic: string, subscriberUsername: string, callback: () => void): any {

        const socket = new SockJS("http://localhost:8080/socket");
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe(topic, ( response: any ) => {
                if (response.body === subscriberUsername)
                    callback();
            });
        });

        return socket;
    }

}
