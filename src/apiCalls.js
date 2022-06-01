function fetchApiData(url) {
    return fetch(url)
        .then(promise => promise.json())
        .catch(error => console.log(error))
};

export {fetchApiData};