window.npmi = function(packageName, version) {
  var unpkgUrl = 'https://unpkg.com/' + packageName + (version ? '@' + version : '')

  var scriptElement = document.createElement('script')
  scriptElement.src = unpkgUrl
  scriptElement.onload = function () {
    console.log('[npmi extension]: install ' + packageName + (version ? version : '') + 'successfully')
  }
  document.appendChild(scriptElement)
}