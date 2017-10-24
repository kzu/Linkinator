function onClicked(tab) {
  var shortUrl = tab.url.toString();
  if (shortUrl.includes('_wiki?pagePath='))
      shortUrl = 'http://wiki.devdiv.io/' + decodeURIComponent(shortUrl.substring(shortUrl.indexOf('_wiki?pagePath=') + 15));
  if (shortUrl.includes('https://devdiv.visualstudio.com/DevDiv/_workitems/edit'))
      shortUrl = 'http://work.devdiv.io/' + shortUrl.replace("https://devdiv.visualstudio.com/DevDiv/_workitems/edit/", "");

  if (window.clipboardData)
  {
      // Might work but doesn't
      window.clipboardData.setData("shortUrl", shortUrl);
      alert("Copied!");
  }

  // Should work but doesn't
  // navigator.clipboard.writeText("Howdy, partner!").then(function() { alert(shortUrl); });

  var copyFrom = document.createElement('textarea');
  copyFrom.textContent = shortUrl;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  // Should work but doesn't
  var successful = document.execCommand('copy');
  var msg = successful ? 'successfully' : 'unsuccessfully'
  alert(msg);
  body.removeChild(copyFrom);
}

browser.pageAction.onClicked.addListener(onClicked);
browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.url.match(/devdiv.visualstudio.com/)) {
    browser.pageAction.show(tabId);
  } else {
    browser.pageAction.hide(tabId);
  }
});