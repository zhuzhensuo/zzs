let baseUrl = 'http://localhost:9528';
function request({jquery,url,type,data = {}}){
    return new Promise((resolve,reject) => {
        return jquery.ajax({
            type,
            url,
            data,
            timeout:6000,
            dataType:'json',
            success(result){
                resolve(result);
            },
            error(err){
                reject(err);
            }
        })
    });
}
