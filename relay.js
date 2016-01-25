var beef=window.beef;
var regex = /xook/gi;
bodyMatches = document.body.innerText.match(regex);
headMatches = document.head.innerText.match(regex);
if (beef) {
  window.addEventListener('message', function(event) {
    console.log('Received message from DeBeEFed extension:', event);
  });
  setTimeout(function() {
    console.log('WARNING: BeEF object detected!', beef);
    window.postMessage({ type: 'page_js_type',text: JSON.stringify(beef)},'*');
  }, 2000);
}
else if (bodyMatches || headMatches) {
  console.log("Attacker is running Xenotix XSS framework.");
  window.addEventListener('message', function(event) {
    console.log('Received message from DeBeEFed extension:', event);
  });
  setTimeout(function() {
    window.postMessage({ type: 'page_js_type',text: '{"xenotix": "OSWAP Xenotix XSS Framework"}'},'*');
  }, 2000);
}
else {
  window.addEventListener('message', function(event) {
    console.log('Received message from DeBeEFed extension:', event);
  });
  setTimeout(function() {
    console.log('Sending response to DeBeEFed extension:');
    window.postMessage({ type: 'page_js_type',text: '{"message": "BeEF object not detected."}'},'*');
  }, 2000);
}
