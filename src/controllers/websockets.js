export default class WS {
    wsInstance
    constructor(route, {onopen, onmessage, onclose} = {}) {
        this.wsInstance = new WebSocket(`ws://${window.location.host}${route}`);

        this.wsInstance.onopen = onopen;
        this.wsInstance.onmessage = onmessage;
        this.wsInstance.onclose = onclose;
    }

    send(message) {
        this.wsInstance.send(typeof message === "string" ? message : JSON.stringify(message));
    }
}
