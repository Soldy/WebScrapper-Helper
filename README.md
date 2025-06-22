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
    'Before' : {
        'type'    : 'click',
        'element' : DOMElement Before Button|Link|Event,
        'text'    : 'ButtonText'
    },
    'next' : {
        'type'    : 'click',
        'element' : DOMElementToNextButton,
        'text'    : 'ButtonText'
    }
  }
)).loop();


```
Or simply detect the data with the [signal](https://github.com/Soldy/WebScrapper-Helper/blob/main/signal.js).This needs more documentation later.

WebScrapper works well with modern websites, even those without server rendering.
Compatible with [Greasemonkey](https://www.greasespot.net/) and [simple_scrapper](https://github.com/Soldy/simple_scrapper). Or you can use them together.
<!-- It's undetectable for F5, Impreva, Cloudflare, DataDome, Reblaze, and Radware.
However, if you do a volume scrapping they can catch you anyway.  -->

The simple scrapper, WebScrapper Helper, and Anyserver together already the 4th most powerful web scrapper that I built alone.
(Yes,  I built 3 others that were more powerful,  plus I worked with a team that built better things. But still, this is a good stuff.)
I haven't see any open-source tools at a similar level, which is why I decided to publish it.
I have limited time, so any assistance would be appreciated.



