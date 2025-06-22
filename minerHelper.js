
/**
 * CallMeta
 * {
 *    "before" : <BeforeMeta>,
 *    "next"   : <NextMeta>
 *  }
 *
 * @typedef {Object.<string, BeforeMeta|NextMeta>
**/

/**
 * BeforeMeta
 * {
 *    "type"    : "scroll|click",
 *    "element" : <DOMElement>,
 *    "text"    : <string>
 *  }
 *
 * @typedef {Object.<string, DOMElement|string>} ScrapMeta
**/


/**
 * NextMeta
 * {
 *    "type"    : "scroll|click",
 *    "element" : <DOMElement>,
 *    "text"    : <string>
 *  }
 *
 * @typedef {Object.<string, DOMElement|string>} ScrapMeta
**/

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
 * @param {string}
 * @param {?CallMeta}
 * @class
**/
const MinerHelperClass = function(element_, meta_, key_, url_, call_meta_){

    /**
     * Unnecessary public gate for the mine function.
     *
     * @public
    **/
    this.mining = async function(){
        _before();
        return _mining();
    };

    /**
     * Public gate function for the loop function.
     *
     * @public
    **/
    this.loop = function(){
        _before();
        if (typeof _next_meta === 'undefined')
            return _mining();
        if (_next_meta['type'] === 'click')
            return _paginatorLoop();
        return _scroll();
    };

    /**
     * Public gate function for the loop function.
     *
     * @public
     * @return {ScrapperHelperClass}
    **/
    this.sH = function(){
        return _sH; 
    };
    // pre constructor (backward comp)
    if (typeof call_meta_ === 'undefined'){
        call_meta_ = {}; 
    }else if(typeof call_meta_['type'] !== 'undefined')
        call_meta_ = {
            "next" : call_meta_ 
        };

    /** @type {ScrapperHelperClass} **/
    const _sH = new ScrapperHelperClass(url_);
    /** @type {MinerToolClass} **/
    const _mT = new MinerToolClass('miner', 4000, 2000);
    /** @type {MinerToolClass.setRandOut} **/
    const _setRandOut = _mT.setRandOut;
    /** @type {MinerToolClass.log} **/
    const _log = _mT.log;
    /** @type {DOMElement} **/
    const _element = element_;
    /** @type {DOMElement} **/
    const _main_element = element_;
    /** @type {ScrapMeta} **/
    const _meta_tag = meta_;
    /** @type {string} **/
    const _search_tag = key_;
    /** @type {BeforeMeta} **/
    const _before_meta = call_meta_['before'];
    /** @type {NextMeta} **/
    const _next_meta = call_meta_['next'];

    /**
     *
     * @private
    **/
    const _mining = async function(){
        _log('mining', 'start');
        await _sH.mineAndSave(
          _main_element,
          _meta_tag,
          _search_tag
        );
        _log('mining', 'done');
    };

    /**
     *
     * @private
    **/
    const _before_click = function(){
        if ( _before_meta['type'] === 'click')
            _sH.cH.clickSmart(
                _before_meta['element'],
                _before_meta['text']
            );
    };

    /**
     *
     * @private
    **/
    const _click = function(){
        if ( _sH.cH.clickSmart(
            _next_meta['element'],
            _next_meta['text']
          )
        ){
            _setRandOut(_paginatorLoop);
        };
    };

    /**
     *
     * @private
    **/
    const _click = function(){
        if ( _sH.cH.clickSmart(
            _next_meta['element'],
            _next_meta['text']
          )
        ){
            _setRandOut(_paginatorLoop);
        };
    };

    /**
     *
     * @private
    **/
    const _scroll = async function(){
        await (new ScrollerHelperClass(
          _next_meta['element'],
          _element
        )).scroll();
        _setRandOut(_mining);
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
    const _paginatorLoop = async function(){
        _setRandOut(async function(){
            await _mining();
            _setRandOut(_next);
        });
    };
};
