async function mnMakeRequest(data, url, method) {
    var added = false;
    await fetch(url, {
        method: method,
        body: JSON.stringify(data)
    }).then(function (response) {
        if (response.status == 200) {
            added = true;
        }
    }).catch(function (error) {
        console.log('error fetch: ' + error);
        return false;
    });

    return added;
}

function mnGenerateModal(modalEl, option) {
    var mnModalInstance = new bootstrap.Modal(modalEl, option);
    return mnModalInstance;
}

function mnGetModalInstance(modalEl) {
    var modal = bootstrap.Modal.getInstance(modalEl)
    return modal
}
