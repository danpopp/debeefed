function onRequest(request, sender, sendResponse) {
  var deBeEFerNotificationID = "id" + Math.random(); 
  page = request.page;
  host = "*://"+request.host+":*/*";
  jsStatus = chrome.contentSettings.javascript.get({
	primaryUrl: page.href},
	function(callback) {show(callback.setting);}
	);
  function show(jsStatus) {

	if (jsStatus == "block") {
		msg = "You've already neutralized this threat...";
		msgoptions = [{ title: "Allow this threat. (NOT recommended)", 
					  iconUrl: "48.png"},
					  { title: "Kill and Report it! (recommended)", 
					  iconUrl: "48.png"}];
    }
    else if (jsStatus == "allow") {
		msg = "WARNING: Your computer could be attacked!";
		msgoptions = [{ title: "Kill it! (by disabling JavaScript)", 
					  iconUrl: "48.png"},
					  { title: "Kill and Report it! (recommended)", 
					  iconUrl: "48.png"}];
	}

	chrome.notifications.create(
	deBeEFerNotificationID,{   
      type: "basic", 
      iconUrl: "128.png", 
      title: "Don't get pwned!", 
      message: page.href +" is serving XSS tools! " + msg,
      buttons: msgoptions,
      priority: 0},
	function() { //alert("XSS Detected");
			   } 
	); 
	chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
		if (notifId === deBeEFerNotificationID) {
			if (btnIdx === 0) {
				chrome.contentSettings.javascript.get({
					primaryUrl: page.href
					}, function (details) {
						chrome.contentSettings.javascript.set({
							primaryPattern: host,
							setting: details.setting == 'allow' ? 'block' : 'allow'
						});
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
							chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
						});
						chrome.notifications.clear(deBeEFerNotificationID);						
					});
			}
			else if (btnIdx === 1) {
				chrome.contentSettings.javascript.get({
					primaryUrl: page.href
				}, function (details) {
						chrome.contentSettings.javascript.set({
							primaryPattern: host,
							setting: details.setting == 'allow' ? 'block' : 'allow'
						});
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
							chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
						});
						window.open("https://www.google.com/safebrowsing/report_badware/?url="+page.href);
						chrome.notifications.clear(deBeEFerNotificationID);	
					});
			}
		}
	});
		
	chrome.notifications.onClosed.addListener(function() {
		saySorry();
	});

	function saySorry() {
		console.log("This page is likely serving XSS. You've been warned!");
	}

  }
  sendResponse({});
};

chrome.extension.onRequest.addListener(onRequest);
