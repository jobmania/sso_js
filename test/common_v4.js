
var SSAM = (function () {
    'SSAM SSO Module';

    var _utils = {};
    const host = 'http://dev.itnj.co.kr:14642';

    _utils.receiverToken = function(token){
        return receiverToken(token);
    }
    _utils.listener = function(callback){
        return listener(callback);
    }
    return init();

    function init() {
        console.info('SSAM SSO Module initialized.');
        alert("init");
        return _utils;
    }
    function receiverToken(token){
        alert("receiverToken",token);
        sendServer(token);
    }
    function sendServer(token) {
        alert("sendServer",token);
        $.ajax({
            type: 'GET',
            url: host + '/system/test/'+token,
            contentType: 'application/json',
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-AppKey", 'ahsl2do2q_ma');
            },
            success: function (data) {
                 alert("메시지 응답완료 ")
                if (data != null && data['code'] == 200) {
                    const event = new CustomEvent('receiverToken', { detail: data['data']});
                    document.dispatchEvent(event);
                }
            }
        });
    }
    function listener(callback) {
        document.addEventListener('receiverToken', function (event) {
            alert("Input listener");
            const result = event.detail;
            callback(result);
        });
    }
})();
