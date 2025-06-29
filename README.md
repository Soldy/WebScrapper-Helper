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


## Personal Note

I built the WebScrapper Helper, and along with Anyserver, it the fourth most powerful web scraper I've developed on my own.
(I've created three other scrapers that are more powerful, and I also collaborated with a team on even better projects.
It's no surprise that I'm not the smartest person in the room, but I still believe this is a solid tool.)
I haven't come across any open-source tools of a similar caliber, which is why I decided to publish it. Since I have limited time, any assistance would be greatly appreciated.

