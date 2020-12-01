'use strict';

// function makeGETRequest(url, callback) {
//     let xhr;

//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             callback(xhr.responseText);


//         }
//     }

//     xhr.open('GET', url, true);
//     xhr.send();
// }


// makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json', r => console.log(r))


//это с помощью промисов
function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                reject('Error');
            }
        }
        xhr.send();
    });
}

makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json').then((data) => {
    let productObject = JSON.parse(data);
    console.log(productObject);
}).catch((error) => {
    console.log(error);
})

