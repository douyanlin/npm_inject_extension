chrome.runtime.onInstalled.addListener(function () {
  console.log('chrome.runtime.onInstalled')
})

chrome.permissions.contains(
  {
    permissions: ["activeTab", "background"],
    origins: ["http://*/*", "https://*/*"],
  },
  function (result) {
    console.log("permissions", result)
    if (result) {
      // The extension has the permissions.
    } else {
      // The extension doesn't have the permissions.
      chrome.permissions.request({
        permissions: ["activeTab", "background"],
        origins: ["http://*/*", "https://*/*"]
      }, function(granted) {
        // The callback argument will be true if the user granted the permissions.
        console.log("permissions granted", granted)

        if (granted) {
          // doSomething();
        } else {
          // doSomethingElse();
        }
      });
    }
  }
)

const script = `window.npmi = function(packageName, version) {
  var unpkgUrl = "https://unpkg.com/" + packageName + (version ? "@" + version : "");

  var scriptElement = document.createElement("script");
  scriptElement.src = unpkgUrl;
  scriptElement.onload = function () {
    console.log("[npmi extension]: install " + packageName + (version ? version : "") + "successfully")
  };
  document.body.appendChild(scriptElement);
};console.log("extension log");`

const code = `var scriptElement = document.createElement('script');scriptElement.innerHTML = \`${script}\`;document.body.appendChild(scriptElement)`

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
  const { status } = changeInfo || {}

  if(status === 'complete' && tab.url && tab.url.includes("http")) {
    chrome.extension
      .getBackgroundPage()
      .console.log("executeScript", status, tabId, code)
    chrome.tabs.executeScript(tabId, {
      code,
    })
  }

  chrome.extension
    .getBackgroundPage()
    .console.log("xxxx", tabId, changeInfo, tab)
})
