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
              pageUrl: { urlContains: 'devdiv.visualstudio.com/DevDiv' },
            })
          ],
          // And shows the extension's page action.
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }
      ]);
    });
  });

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
    var shortUrl = tab.url.toString();
    if (shortUrl.includes('_wiki?pagePath='))
        shortUrl = 'http://wiki.devdiv.io' + decodeURIComponent(shortUrl.substring(shortUrl.indexOf('_wiki?pagePath=') + 15));
    if (shortUrl.includes('https://devdiv.visualstudio.com/DevDiv/_workitems/edit'))
        shortUrl = 'http://work.devdiv.io/' + shortUrl.replace("https://devdiv.visualstudio.com/DevDiv/_workitems/edit/", "");
    
    var copyFrom = document.createElement('textarea');
    copyFrom.textContent = shortUrl;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    body.removeChild(copyFrom);
  });