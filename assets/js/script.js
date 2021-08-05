// web socket

var conn = new WebSocket('ws://localhost:8080');
conn.onopen = function(e) {
    console.log("Connection established!");
};

conn.onmessage = function(e) {
   //console.log(e.data);
   showMessage('other', e.data);
};

// conn.send('hello world');
//------------------------------------------------------------

let form1 = document.getElementById('form1');
let inputMessage = document.getElementById('message');
let inputNmae = document.getElementById('name');
let btn_env = document.getElementById('btn1');
let content = document.getElementById('content');

btn_env.addEventListener('click', function(){
    if(inputMessage.value != '') {
        var msg = {
            'name':inputNmae.value, 
            'msg':inputMessage.value
        };
        msg = JSON.stringify(msg);

        conn.send(msg);
        showMessage('me', msg);
        // console.log(msg);

        inputMessage.value = '';

    }
});

function showMessage(how, data) {
    data = JSON.parse(data);
    //console.log(data);

    if(how == 'me'){
        var imgSrc = "assets/imgs/Icon awesome-rocketchat.png";
    }else if (how == 'other') {
        var imgSrc = "assets/imgs/Icon awesome-rocketchat-1.png";
    }

    var div = document.createElement('div');
    div.setAttribute('class', how);

    var div1 = document.createElement('img');
    div1.setAttribute('src', imgSrc);

    var div_txt = document.createElement('div');
    div_txt.setAttribute('class', 'text');

    var h5 = document.createElement('h5');
    h5.textContent = data.name;

    var p = document.createElement('p');
    p.textContent = data.msg;

    div_txt.appendChild(h5);
    div_txt.appendChild(p);

    div.appendChild(div1);
    div.appendChild(div_txt);

    content.appendChild(div);

}