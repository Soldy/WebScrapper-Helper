/**
 * At some times we can realize the javascript class
 * is not always a comfortable object.
 * Because no friend, no protected, no neighbor.
 * That reason this class is a prototype.
 *
 * The miner class is necessary only
 * when both scrapping and mining are required.
 * The primary purpose of this class is to
 * initiate a loop function that enables
 * continuous mining with pagination.
 *
 *
 * @param {Array.<DOMElement>}
 * @param {Object.<string, string | Object<string, string>}
 * @param {string}
 * @param {string}
 * @param {?NextMeta}
 * @class
**/
const MinerHelperClass = function(element_, meta_, key_, url_, next_meta_, ){

    /**
     * Unnecessary public gate for the mine function.
     *
     * @public
    **/
    this.mining = async function(){
        return mining();
    };

    /**
     * Public gate function for the loop function.
     *
     * @public
    **/
    this.loop = function(){
        if (_next_meta['type'] === 'click')
            return paginatorLoop();
        return _scroll();
    };

    /**
     * Public gate function for the loop function.
     *
     * @public
     * @return {ScrapperHelperClass}
    **/
    this.sH = function(){
        return sH; 
    };

    const sH = new ScrapperHelperClass(url_);
    /** @type {DOMElement} **/
    const _element = element_;
    /** @type {DOMElement} **/
    const main_element = document.querySelectorAll(element_);
    /** @type {ScrapMeta} **/
    const meta_tag = meta_;
    /** @type {string} **/
    const search_tag = key_;
    /** @type {Object.<string, DOMElementi|string>} **/
    const _next_meta = next_meta_;

    /**
     *
     * @private
     * @return {number}// {uint16_t}
    **/
    const randWait = ()=>{
        return (
          10000 + Math.floor(Math.random() * 5000)
        );
    };

    /**
     *
     * @private
    **/
    const _click = function(){
        if ( sH.cH.clickSmart(
            _next_meta['element'],
            _next_meta['text']
          )
        ){
            setTimeout(paginatorLoop, randWait());
        };
    }

    /**
     *
     * @private
    **/
    const _scroll = async function(){
        await (new ScrollerHelperClass(
          _next_meta['element'],
          _element
        )).scroll();
        setTimeout(mining, randWait());
    };

    /**
     *
     * @private
    **/
    const _next = function(){
        if (_next_meta['type'] === 'click')
            return _click();
    }

    /**
     *
     * @private
    **/
    const mining = async function(){
        await sH.mineAndSave(main_element, meta_tag, search_tag);
    };

    /**
     *
     * @private
    **/
    const paginatorLoop = async function(){
        setTimeout(async function(){
            await mining();
            _next();
        }, randWait());
    };
};
