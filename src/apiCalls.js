function fetchApiData(url) {
    return fetch(url)
        .then(promise => promise.json())
};
function postApiData(url, data) {
    fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(data => data.json()).then(data => {
        console.log('It works', data)
        fetch(url)
            .then(data => data.json())
            .then(data => console.log('work pls', data))
    })
        .catch(error => console.log(error));
}
const data = { userID: 1, date: '2022/04/20', numOunces: 420 }
export { fetchApiData, postApiData };