## The WebScrapper Helper
is an easy-to-use web scrapper collection. The goal is to scrap a site with minimal lines of code.
```javascript

(new MinerHelperClass(
  DOMElement,
  {
    tittle     : QuerySelectorString,
    url        : {QuerySelectorString, a:'href'},
  },
  'url', //data existance check element
  'http://anyserver/urls',
  {
    'type'    : 'click',
    'element' : DOMElementToNextButton,
    'text'    : 'ButtonText'
  }
)).loop();


```
Or simply detect the data with the [signal](https://github.com/Soldy/WebScrapper-Helper/blob/main/signal.js).This needs more documentation later.

WebScrapper works well with modern websites, even those without server rendering.
Compatible with [Greasemonkey](https://www.greasespot.net/) and [simple_scrapper](https://github.com/Soldy/simple_scrapper). Or you can use them together.
<!-- It's undetectable for F5, Impreva, Cloudflare, DataDome, Reblaze, and Radware. 
However, if you do a volume scrapping they can catch you anyway.  -->

