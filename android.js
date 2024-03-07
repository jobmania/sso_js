addPage() {
    PageInfo pageInfo = PageInfo(title: '새 창');
    selectPageInfo.add(pageInfo);
    selectPage.add(InAppWebView(
      initialUrlRequest: URLRequest(
          url: WebUri(
              MyApp.initUri.isEmpty ? initPageUrl.value : MyApp.initUri)),
      initialSettings: InAppWebViewSettings(isInspectable: kDebugMode),
      initialOptions: InAppWebViewGroupOptions(
          crossPlatform:
              InAppWebViewOptions(incognito: true, useOnDownloadStart: true)),
      onWebViewCreated: (controller) {
        pageInfo.controller = controller;
      },
      onConsoleMessage: (controller, consoleMessage) {
        print(consoleMessage);
      },
      onScrollChanged: (controller, x, y) {
        isDownload(false);
      },
      onTitleChanged: (controller, title) {
        pageInfo.title = title ?? '';
      },
      onDownloadStartRequest: (controller, downloadStartRequest) {
        download(downloadStartRequest);
      },
      shouldOverrideUrlLoading: (controller, navigationAction) async {
        WebUri url = navigationAction.request.url!;
        return checkUrl(url.toString());
      },
      onProgressChanged: (controller, progress) {
        pageProgress(progress / 100);
      },
      onLoadStart: (controller, url) {
        isDownload(false);
        urlEdit.text = url!.toString();
        isLoading(true);
      },
      ///TODO: 허용된 url이면, 자바스크립트에 token값 넘기기
      onLoadStop: (controller, url) {
        isLoading(false);
        sendEvent();
        for(String urls in testUrl){
          if(url != null && url.toString().contains(urls)){
            controller.evaluateJavascript(source:'''SSAM.receiverToken('$androidId')''');
            break;
          }
        }

        controller.getFavicons().then((value) {
          for (Favicon item in value) {
            if (item.url.rawValue.isNotEmpty) {
              pageInfo.faviconUrl = item.url.rawValue;
              selectPageInfo.refresh();
              break;
            }
          }
        });
      },
    ));

    selectPageIndex(selectPage.length - 1);
  }