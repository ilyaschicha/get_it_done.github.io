/**
 * function will check if the browser support the localStorage API,
 * if yes will save the key and the value in the localStorage, 
 * if no it will alert the user that the browser not support the localStorage API.
 */
function saveData(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        alert('Browser does not support the localStorage API');
    }
}

/**
 * function will check if the browser support the localStorage API,
 * if yes it will check 'key' exist then will get the value , 
 * if no it will alert the user that the browser not support the localStorage API.
 */
function loadData(key) {
    if (localStorage) {
        if (key in localStorage) {
            return localStorage.getItem(key);
        }
    } else {
        alert('Browser does not support the localStorage API');
    }
}
