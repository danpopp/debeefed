function alertNotify() {
    var payload = {
      page: window.location,
      host: location.hostname
    };
    chrome.extension.sendRequest(payload, function(response) {});
} 


console.log('Initializing relay to probe for XSS frameworks...'); 

var s = document.createElement('script');

s.src = chrome.extension.getURL('relay.js');

(document.head||document.documentElement).appendChild(s);

s.onload = function() {
    s.parentNode.removeChild(s);
};

console.log('Starting De-BeEF-ed event listener...');

window.addEventListener('message', function(event) {

  var res=JSON.parse(event.data.text);

  console.log('Received response from page:', event);

  if (event.data.text !== "undefined") {
      console.log(event.data.text); 
      if (typeof res.version !== 'undefined') {
        console.log('Attacker is running BeEF version ' + res.version + '.');
        alertNotify();
      }
      else if (typeof res.xenotix !== 'undefined') {
        console.log('WARNING: Xenotix XSS framework detected!!!');
        alertNotify();
      }
  }
});

setTimeout(function () {

    console.log('Sending message to page...');

    window.postMessage({ type: 'content_script_type',text: '{"message": "Searching for BeEF object..."}'},'*');

}, 1000);
