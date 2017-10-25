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
  if (shortUrl.includes('_wiki?pagePath='))
    shortUrl = 'http://wiki.devdiv.io/' + decodeURIComponent(shortUrl.substring(shortUrl.indexOf('_wiki?pagePath=') + 15));
  if (shortUrl.includes('https://devdiv.visualstudio.com/DevDiv/_workitems/edit'))
    shortUrl = 'http://work.devdiv.io/' + shortUrl.replace("https://devdiv.visualstudio.com/DevDiv/_workitems/edit/", "");

  copy(shortUrl);

  chrome.tabs.executeScript(tab.id, {
      "code": "$('.workitem-dialog a.caption').attr('href');"
    }, function (result) {
      href = result[0];
      console.log(href);
      if (href)
          copy('http://work.devdiv.io/' + href.replace("/DevDiv/_workitems/edit/", ""));
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