function useData(respType, value, id) {

    let promise = new Promise(function (resolve, reject) {
        let pageSize = '?pageSize=100';
        let itemId;
        if (!id) {
            itemId = '';
        } else {
            itemId = '/'+id;
        }

        let xhr = new XMLHttpRequest();
        let type = respType;
        let url = 'https://api.backendless.com/v1/data/Score' + itemId + pageSize;

        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(this.response).data);
            } else {
                let error = new Error('Sorry, try again :(');
                error.code = this.status;
                reject(error);
            }
        };
        xhr.open(type, url, true);

        xhr.setRequestHeader('application-id', '15806DE0-F818-2F9B-FF8F-E485444F6C00');
        xhr.setRequestHeader('secret-key', 'BE675023-B742-E6D4-FFEF-FEF78A2E2500');
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        if (value) {
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.send(JSON.stringify(value));
        } else {
            xhr.send(null);
        }
    });

    return promise;
};

exports.backendless = {
    useData: useData,
};
