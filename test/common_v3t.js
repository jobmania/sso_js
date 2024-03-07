let responseData;  // 응답값 저장용
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
                alert("응앙앵");
                return _utils;
            }
            function receiverToken(token){
                console.log("receiverToken",token)
                sendServer(token);
            }
            function sendServer(token) {
                alert("sendServer",token);
                $.ajax({
                    type: 'GET',
                    url: host + '/ssam/student?code='+token,
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
                            responseData = data
                            // 데이터를 h2 엘리먼트에 표시
                            $('h2').text(JSON.stringify(data['data']));
                            console.log(JSON.stringify(data['data']))
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




        // 페이지 로딩 시 토큰 확인
        $(document).ready(function() {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (token) {
                console.log('Token found in URL:', token);
                // 모듈에 토큰 전달
                SSAM.receiverToken(token);
            }
         });
