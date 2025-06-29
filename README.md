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

# lets start

The WebScrapper Helper focuses on data mining before storing information, enhancing both visuals and learning experiences.
While saving a web page and processing it later is more efficient, it doesn’t provide as rich a visual experience.

## CoolHelperClass
The core is the CoolHelperClass. It is not designed as an S.O.L.I.D. object just a couple of tool functions.
Each function can return text, HTML code, attribution, or a combination list (map<string, string> or .Object<string, string> if that says something).

The primary goal is to build a list of query selectors and return their corresponding values if they exist. If a particular value does not exist, the function should return an empty string. Simple, right? 

I really like the query selector feature, but it has some limitations and can be quite complex.
One of the main issues is that it returns null if an element does not exist. While that is acceptable, it can lead to errors when attempting to interact with that element.
This issue means you end up writing extra lines of code to handle it. If you need five additional lines just to retrieve the content, that doesn’t feel efficient. 
It’s not a major problem, but it can complicate things unnecessarily.


### iDom

iDom mostly a short hand.
iDom is the expectation the empty string rule if the element does not exist, it will return null.

```javascript

const cH = new CoolHelperClass();

cH.iDom('.class'); //return DOMElement equal with document.queryselector('.class')


```

If the core element is not the document element that needs to be included, then simply start with the query selector string if the root element is the document.

```javascript
const cH = new CoolHelperClass();
const iDom = cH.iDom;
iDom(iDom('.class'), 'ul'); //return DOMElement or null equal with document.queryselector('.class').queryselector('ul')
```

Let's combine the query selector with the core element. Ultimately, we want to work with a single DOM element, so we will use the last index of the array.

```javascript
const cH = new CoolHelperClass();
const iDom = cH.iDom;
iDom(iDom('.class'), 'li', 2); //return DOMElement or null equal with document.queryselector('.class').queryselectorAll('li')[2]
```

This function only serves the DRY principle.

### iText

This is where the little magic begins.
This function relies on the iDom function but returns the innerText.
If the element does not exist, it will return an empty string.
You can call it in the same way as the iDom.

```javascript
const cH = new CoolHelperClass();
iText('.class'); //return string almost equal with document.queryselector('.class').innerText

```



## Personal Note

I built the WebScrapper Helper, and along with Anyserver, it the fourth most powerful web scraper I've developed on my own.
(I've created three other scrapers that are more powerful, and I also collaborated with a team on even better projects.
It's no surprise that I'm not the smartest person in the room, but I still believe this is a solid tool.)
I haven't come across any open-source tools of a similar caliber, which is why I decided to publish it. Since I have limited time, any assistance would be greatly appreciated.

