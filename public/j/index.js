/**
 * Created by Liming on 2016/9/27.
 */
"use strict";
(() => {
    let config = {
        pin: true,
        user: null,
        last: 0,
        lastH: -1,
        lastM: -1,
        connection: null
    };

    const MESSAGE_TYPE = {
        RECENT_MESSAGE: {
            code: 0,
            message: 'recent messages'
        },
        CLIENT_EXIT: {
            code: 1,
            message: 'client exit'
        },
        MESSAGE: {
            code: 2,
            message: 'message'
        },
        CLIENT_ENTER: {
            code: 3,
            message: 'client enter'
        },
        CLIENT_COUNT: {
            code: 4,
            message: 'client count'
        }
    };

    let divPinBottom = document.getElementById("pinBottom");
    let divMessages = document.getElementById("messages");
    let input = document.querySelector("textarea");
    let buttonSend = document.querySelector("button[type=submit]");
    let buttonLog = document.querySelector("button[type=button]");
    let clientCount = document.getElementById("count");

    //Scroll Pin
    divPinBottom.style.display = "none";
    let mouseScrollEvent = (e) => {
        let y = (e.deltaY || e.detail) > 0 ? 1 : -1;
        config.pin = divMessages.scrollTop + divMessages.clientHeight + y * 126 >= divMessages.scrollHeight;
        divPinBottom.style.display = config.pin ? "none" : "block";
    };
    divMessages.addEventListener("mousewheel", mouseScrollEvent);  //Chrome
    divMessages.addEventListener("DOMMouseScroll", mouseScrollEvent);  //Firefox
    divMessages.addEventListener("scroll", () => {
        config.pin = divMessages.scrollTop + divMessages.clientHeight >= divMessages.scrollHeight;
        divPinBottom.style.display = config.pin ? "none" : "block";
    });
    divPinBottom.addEventListener("click", () => {
        divMessages.scrollTop = divMessages.scrollHeight - divMessages.clientHeight;
        config.pin = true;
        divPinBottom.style.display = "none";
    });

    //WebSocket Event
    let onclose = () => {
        config.connection.close();
        config.connection = null;
        config.user = null;
        buttonSend.disabled = "disabled";
        input.disabled = "disabled";
        buttonLog.innerHTML = "LogIn";
        buttonLog.dataset.e = "in";
        addMessage(null, 'Connection closed!');
        clientCount.innerHTML = 0;
    };
    let onerror = (e) => {
        console.error(e);
    };
    let onmessage = (e) => {
        let data = JSON.parse(e.data);
        switch(data.type) {
            case MESSAGE_TYPE.RECENT_MESSAGE.code:
                config.user = data.user;
                for(let i = 0; i < data.data.length; i++) {
                    addMessage(data.data[i].sender, data.data[i].content, data.data[i]._t);
                }
                break;
            case MESSAGE_TYPE.CLIENT_EXIT.code:
                addMessage(null, data.data.name + " exited!");
                break;
            case MESSAGE_TYPE.MESSAGE.code:
                addMessage(data.data.sender, data.data.content, data.data._t);
                break;
            case MESSAGE_TYPE.CLIENT_ENTER.code:
                addMessage(null, data.data.name + " joined!");
                break;
            case MESSAGE_TYPE.CLIENT_COUNT.code:
                clientCount.innerHTML = data.data;
                break;
        }
    };

    //Login
    buttonLog.addEventListener("click", () => {
        if(config.user == null) {
            if(config.connection) {
                config.connection.close();
            }
            let loginDiv = document.createElement("div");
            loginDiv.id = "loginLayer";
            let from = document.createElement("div");
            let txtUsername = document.createElement("input");
            txtUsername.type = "text";
            txtUsername.placeholder = "Username";
            let txtPassword = document.createElement("input");
            txtPassword.type = "password";
            txtPassword.placeholder = "Password";
            let button = document.createElement("button");
            button.type = "submit";
            button.innerHTML = "Login";
            let register = document.createElement("button");
            register.type = "submit";
            register.innerHTML = "Reg";
            from.appendChild(txtUsername);
            from.appendChild(document.createElement("br"));
            from.appendChild(txtPassword);
            from.appendChild(document.createElement("br"));
            from.appendChild(button);
            from.appendChild(register);
            loginDiv.appendChild(from);

            button.addEventListener("click", () => {
                if(txtUsername.value == "") {
                    alert("Place input username!");
                    txtUsername.focus();
                } else if(txtPassword.value == "") {
                    alert("Place input password!");
                    txtPassword.focus();
                } else {
                    config.connection = new WebSocket("ws://" + location.hostname + ":" + location.port + "/?username=" + txtUsername.value + "&password=" + txtPassword.value);
                    config.connection.onclose = onclose;
                    config.connection.onerror = () => {
                        alert("Connect Failed!\n1. Place check your username and password!\n2. Place check your network!");
                        config.connection = null;
                    };
                    config.connection.onmessage = onmessage;
                    config.connection.onopen = () => {
                        config.connection.onerror = onerror;
                        document.body.removeChild(loginDiv);
                        buttonSend.removeAttribute("disabled");
                        input.removeAttribute("disabled");
                        buttonLog.innerHTML = "LogOut";
                        buttonLog.dataset.e = "out";
                    };
                }
            });
            register.addEventListener("click", () => {
                window.open("/register.html");
            });

            let submitEvent = (e) => {
                if(e.keyCode == 13) {
                    button.click();
                }
            };
            txtUsername.addEventListener("keydown", submitEvent);
            txtPassword.addEventListener("keydown", submitEvent);

            document.body.appendChild(loginDiv);
            txtUsername.focus();
        } else if(config.connection) {
            config.connection.close();
            config.connection = null;
            config.user = null;
            buttonSend.disabled = "disabled";
            input.disabled = "disabled";
            buttonLog.innerHTML = "LogIn";
            buttonLog.dataset.e = "in";
            clientCount.innerHTML = 0;
        }
    });

    /**
     * Add message to view
     * @param {object|null} sender
     * @param {string} message
     * @param {number} [time]
     */
    let addMessage = (sender, message, time) => {
        let msg = document.createElement("div");
        if(sender == null) {
            msg.classList.add("tip");
            let div = document.createElement("div");
            div.innerHTML = message;
            msg.appendChild(div);
        } else if(time > config.last) {
            config.last = time;
            let t = new Date(time);
            let _time = {
                year: t.getFullYear().toString(),
                month: ("0" + (t.getMonth() + 1)).substr(-2),
                date: ("0" + t.getDate()).substr(-2),
                hour: ("0" + t.getHours()).substr(-2),
                minute: ("0" + t.getMinutes()).substr(-2),
                second: ("0" + t.getSeconds()).substr(-2),
                millisecond: ("00" + t.getMilliseconds()).substr(-3)
            };
            if(t.getHours() != config.lastH || t.getMinutes() != config.lastM) {
                config.lastH = t.getHours();
                config.lastM = t.getMinutes();
                let _t = document.createElement("div");
                _t.classList.add("time");
                let timeDiv = document.createElement("div");
                timeDiv.innerHTML = _time.hour + ":" + _time.minute;
                _t.appendChild(timeDiv);
                divMessages.appendChild(_t);
            }
            msg.title = _time.year + "-" + _time.month + "-" + _time.date + " "
                + _time.hour + ":" + _time.minute + ":" + _time.second + "." + _time.millisecond;
            msg.classList.add("message");
            msg.classList.add(sender.username == config.user.username ? "sent" : "saved");
            let image = new Image();
            image.src = sender.head;
            let triangle = document.createElement("div");
            triangle.classList.add("triangle");
            let content = document.createElement("div");
            content.classList.add("content");
            content.innerHTML = message;
            msg.appendChild(image);
            msg.appendChild(triangle);
            msg.appendChild(content);
        }
        divMessages.appendChild(msg);
        if(config.pin) {
            divMessages.scrollTop = divMessages.scrollHeight;
        }
    };

    //Send message
    buttonSend.addEventListener("click", () => {
        if(input.value != "") {
            config.connection.send(input.value);
        }
        input.value = "";
    });

    //Submit event
    input.addEventListener("keydown", (e) => {
        if(e.keyCode == 13) {
            if(e.ctrlKey || e.shiftKey) {
                let s = input.selectionStart;
                input.value = input.value.substr(0, s) + "\n" + input.value.substr(s);
            } else {
                e.preventDefault();
                buttonSend.click();
            }
        }
    });
})();
