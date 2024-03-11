// let responseData;  // 응답값 저장용
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
                // alert("receiver확인")
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
                        if (data != null && data['code'] == 200) {
                            let responseData = data['data'];
                            const event = new CustomEvent('receiverTest', { detail: responseData});
                            document.dispatchEvent(event);
                        }
                    }
                });
            }

            function listener(callback) {
                document.addEventListener('receiverTest', function (event) {
                    const result = event.detail;
                    callback(result);
                });
            }
        })();




