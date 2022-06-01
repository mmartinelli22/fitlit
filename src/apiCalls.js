import {errorMessage} from './scripts.js'

function fetchApiData(url) {
    return fetch(url)
        .then(promise => promise.json())
        .catch(error => {
            console.log('oh no!', error)
            return errorMessage.innerText = error.message;
        });
};

export {fetchApiData};