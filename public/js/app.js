console.log('This is from app.js - Client side');

//Calling puzzle api
/* fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});
 */

//Calling weather api
/* fetch("http://localhost:2000/realweather?address=india").then((response) => {   //errro if '?address=12w12'
    response.json().then((data) => {
        if (data.error) {
            console.log('You must provide the correct address')
            //or
            console.log(data.error)
        }
        else {
            console.log(data);
        }
    });
});
 */
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector("#message-2");



/* weatherForm.addEventListener('submit', () => {
    console.log('Blinking Testing submit!'); //It will prints/blinks when clicking search bcz browser refreshes the page on submission
}) */

// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault(); //This will make it will prints permanently until we refresh externally
//     console.log('Permanent Testing Submit!');
// });

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchLocation = search.value;
    console.log(searchLocation);

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch("/realweather?address=" + searchLocation + '').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = '' + data.error;
            }
            else {
                console.log(data);
                messageOne.textContent = data.address;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});

