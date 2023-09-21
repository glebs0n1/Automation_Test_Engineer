window.requests = {
    get: function(server = servers.rows.current, slug = false) {
        return new Promise((resolve, reject) => {
            if (!slug || !server) {
                console.error('[server, slug] required');
                reject('Invalid parameters');
                return;
            }

            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", `./data/${server}/${slug}`, true);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        var allText = rawFile.responseText;
                        try {
                            var result = JSON.parse(allText);
                            resolve(result);
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        reject(`Failed to load: ${rawFile.status}`);
                    }
                }
            }

            rawFile.send();
        });
    },
    post: function() {
        return false;
    },
    delete: function() {
        return false;
    }
}