function urlChecker(url) {
    const regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gi;
    if (regexp.test(url)) {
        return true;
    }else {
        alert('Invalid URL!')
        return false;
    }
}

export { urlChecker }