var SSAM = (function () {
    'SSAM SSO Module';

    var _utils = {};
    const host = 'http://192.168.123.42:8888'; ///  테스트용 host url임..

    _utils.receiverToken = function(token){
        return receiverToken(token);
    }
    _utils.listener = function(callback){
        return listener(callback);
    }
    return init();

    function init() {
        console.info('SSAM SSO Module initialized.');
        return _utils;
    }
    function receiverToken(token){
        sendServer(token);
    }
    function sendServer(token) {
        $.ajax({
            type: 'GET',
            url: host + '/ssam/student?code='+token,
            contentType: 'application/json',
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-AppKey", 'ahsl2do2q_ma');
            },
            success: function (data) {
                console.log("데이터!",data)
                if (data != null && data['code'] == 200) {
                    const event = new CustomEvent('receiverToken', { detail: data['data']});
                    document.dispatchEvent(event);
                    responseData = data
                    // 데이터를 h2 엘리먼트에 표시
                    $('h2').text(JSON.stringify(data['data']));
                }
            }
        });
    }

    function listener(callback) {
        document.addEventListener('receiverToken', function (event) {
            const result = event.detail;
            callback(result);
        });
    }
})();