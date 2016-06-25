# DonaldIpsum API Client #
The DonaldIpsum API Client provides a (very) simple wrapper for [the DonaldIpsum API][api].

[api]: https://github.com/monooso/api.donaldipsum.net

## Quickstart ##
The following code will get you up and running:

```javascript
var ApiClient = require('donaldipsum-api-client');
var client = new ApiClient();

// Request all the best paragraphs.
client.getParagraphs(5).then(function (result) {
   console.log(result.status);    // 200
   console.log(result.content);   // Array of 5 paragraphs
});

// Request all the best sentences.
client.getSentences(5).then(function (result) {
   console.log(result.status);    // 200
   console.log(result.content);   // Array of 5 sentences
});

// Request all the best words.
client.getWords(5).then(function (result) {
   console.log(result.status);    // 200
   console.log(result.content);   // Array containing a single string
});

// Handle errors.
client.getWords(5).catch(function (err) {
   console.log(err.status);    // HTTP response code
   console.log(err.content);   // Array containing one or more error strings
});
```
