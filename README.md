##DeBeEFed for Chromium/Chrome##

#####Description#####

This is a tiny little Chromium/Chrome extension to scan for XSS framework tools commonly employed during pentests, phishing attacks, and script kiddy antics. This rough-cut version v1.0.0 only detects Xenontix and BeEF, however; in theory, it could be expanded to discover other nasties as well, such as the Angler exploit kit, etc.

####Under the Hood####

There are two main pieces to this extension, the background-script/content-script/manifest piece - and another component, called the relay which provides Javascript environment access to the target tab(s). 

#####Background Service#####

This triggers the actual chrome.notification which opens on top of the browser window and provides interaction with browser settings via user input (ie the user can choose to disable javascript and/or report the problem to Google SafeBrowsing.

#####Content Script#####

Provides listener for messages sent by the relay and proxies results to the background service if a notification needs to be triggered because XSS is detected

#####Manifest#####

Determines extensions required permisions, additional files, and options page. relay.js MUST be specificed in the manifest in order to be loaded into the target tab(s).

#####Relay.js#####

Sends and receives messages with the background service, scans the target tab(s) javascript environment and DOM for signs of the Browser Exploitation Framework Project (BeEF) or OSWAP Xenotix XSS Framework and relays the results.

####Options####

None yet, but some TODO items provides hints where they might be headed.

###TODO###

* Add option for history/logging
* Add option to toggle blocked sites/re-enable javascript

