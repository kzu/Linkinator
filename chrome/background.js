function copy(text) {
  var copyFrom = document.createElement('textarea');
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
}

function onClicked(tab) {
  var shortUrl = tab.url.toString();
  if (shortUrl.includes('https://devdiv.visualstudio.com/')) {
    if (shortUrl.includes('_wiki?pagePath='))
      shortUrl = 'http://wiki.devdiv.io/' + decodeURIComponent(shortUrl.substring(shortUrl.indexOf('_wiki?pagePath=') + 15));
    if (shortUrl.includes('/_workitems/edit/'))
      shortUrl = 'http://work.devdiv.io/' + shortUrl.substring(shortUrl.indexOf('/_workitems/edit/') + 17);
    if (shortUrl.includes('/_build/')) {
      var buildId = /buildId=(\d+)/.exec(shortUrl);
      var definitionId = /definitionId=(\d+)/.exec(shortUrl);

      if (buildId)
        shortUrl = 'http://build.devdiv.io/' + buildId[1];
      else
        shortUrl = 'http://build.devdiv.io/' + definitionId[1];
    }
    if (shortUrl.includes('edit-build-definition&id=')) {
      var buildId = /id=(\d+)/.exec(shortUrl);
      shortUrl = 'http://build.devdiv.io/' + buildId[1];
    }
    if (shortUrl.includes('/_release?') || shortUrl.includes('/_apps/hub/ms.vss-releaseManagement-web.hub-explorer')) {
      var releaseId = /releaseId=(\d+)/.exec(shortUrl);
      var definitionId = /definitionId=(\d+)/.exec(shortUrl);

      if (releaseId)
        shortUrl = 'http://release.devdiv.io/' + releaseId[1];
      else
        shortUrl = 'http://release.devdiv.io/' + definitionId[1];
    }
  }

  copy(shortUrl);

  chrome.tabs.executeScript(tab.id, {
      "code": "$('.workitem-dialog a.caption').attr('href');"
    }, function (result) {
      href = result[0];
      console.log(href);
      if (href)
          copy('http://work.devdiv.io/' + href.substring(href.indexOf('/_workitems/edit/') + 17));
    });
}

chrome.pageAction.onClicked.addListener(onClicked);

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains 'devdiv.visualstudio.com' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'devdiv.visualstudio.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});