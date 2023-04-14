var extract = require('ipa-extract-info');
var input = document.querySelector('input');

console.log('input', input);
input.addEventListener('change', function(){
  extract(input.files[0], function(err, info, raw){
    if (err) throw err;
    console.log('info', info); // the parsed plist
    console.log('raw', raw);   // the unparsed plist
  });
});