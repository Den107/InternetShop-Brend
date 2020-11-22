'use strict';

function makeGETRequest(url, callback) {
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);


        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}


makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json', r => console.log(r))


// это с помощью промисов
fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json').then(function (res) {
    res.json().then(function (data) {
        console.log(data)
    })
})