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
  console.info('Processing ' + shortUrl);
  if (shortUrl.includes('https://devdiv.visualstudio.com/')) {
    shortUrl = shortenUrl(shortUrl);
  } else if (shortUrl.includes('https://developercommunity.visualstudio.com/content/problem/')) {
      // New release pipeline
      var problemId = /problem\/(\d+)\//.exec(shortUrl);
      shortUrl = 'http://feedback.devdiv.io/' + problemId[1];
  }

  copy(shortUrl);

  chrome.tabs.executeScript(tab.id, {
      "code": "if (window.jQuery) { $('.workitem-dialog a.caption').attr('href'); } else { '' }"
    }, function (result) {
      href = result[0];
      if (href) {
        console.info('Copying ' + href);
        copy('http://work.devdiv.io/' + href.substring(href.indexOf('/_workitems/edit/') + 17));
      }
    });
}

function shortenUrl(shortUrl) {
  if (shortUrl.includes('/_wiki/wikis/DevDiv.wiki')) {
    var indexOfPagePath = shortUrl.indexOf('pagePath=') + 9;
    var indexOfEndPath = shortUrl.indexOf('&', indexOfPagePath);
    if (indexOfEndPath == -1)
      return 'http://wiki.devdiv.io/' + decodeURIComponent(shortUrl.substring(indexOfPagePath)).replace(/^\//, "");
    else 
      return 'http://wiki.devdiv.io/' + decodeURIComponent(shortUrl.substring(indexOfPagePath, indexOfEndPath)).replace(/^\//, "");
  }

  // if (shortUrl.includes('/_wiki/wikis/DevDiv.wiki/') && shortUrl.includes('pageId=')) {
  //   var pageId = /pageId=(\d+)/.exec(shortUrl);
  //   return 'http://wiki.devdiv.io/' + pageId;
  // }

  if (shortUrl.includes('/_workitems/edit/'))
    return 'http://work.devdiv.io/' + shortUrl.substring(shortUrl.indexOf('/_workitems/edit/') + 17);
    
  if (shortUrl.includes('/_build')) {
    var buildId = /buildId=(\d+)/.exec(shortUrl);
    var definitionId = /definitionId=(\d+)/.exec(shortUrl);

    if (buildId)
      return 'http://build.devdiv.io/' + buildId[1];
    else
      return 'http://build.devdiv.io/' + definitionId[1];
  }

  if (shortUrl.includes('edit-build-definition&id=')) {
    var buildId = /id=(\d+)/.exec(shortUrl);
    return 'http://build.devdiv.io/' + buildId[1];
  }

  if (shortUrl.includes('/_releaseDefinition?definitionId')) {
    // New release pipeline
    var definitionId = /definitionId=(\d+)/.exec(shortUrl);
    return 'http://release.devdiv.io/' + definitionId[1];
  }

  if (shortUrl.includes('/_releaseProgress?') && shortUrl.includes('releaseId=')) {
    // New release pipeline
    var releaseId = /releaseId=(\d+)/.exec(shortUrl);
    return 'http://release.devdiv.io/' + releaseId[1];
  }

  if (shortUrl.includes('/_release?') || shortUrl.includes('/_apps/hub/ms.vss-releaseManagement-web.hub-explorer')) {
    // Old releases views
    var releaseId = /releaseId=(\d+)/.exec(shortUrl);
    var definitionId = /definitionId=(\d+)/.exec(shortUrl);

    if (releaseId)
      return 'http://release.devdiv.io/' + releaseId[1];
    else
      return 'http://release.devdiv.io/' + definitionId[1];
  }

  if (shortUrl.includes('/pullrequest/')) {
    var match = /_git\/(.+)\/pullrequest\/(\d+)/.exec(shortUrl);
    if (match[1] == 'VS') 
      // Make the default project VS, to make it even shorter
      return 'http://pr.devdiv.io/' + match[2];
    else
      return 'http://pr.devdiv.io/' + match[1] + '/' + match[2];
  }

  return shortUrl;
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
      },
      {
        // That fires when a page's URL contains 'developercommunity.visualstudio.com' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'developercommunity.visualstudio.com/content/problem/' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});