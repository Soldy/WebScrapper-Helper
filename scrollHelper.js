/**
 * Scroll helper is a solution that tries to scroll down 
 * the DOMElement again and again until the last record.
 *
 *
**/


/**
 * @param {DOMElement}
 * @param {string} //{str}
**/
const ScrollerHelperClass = function(holder_, list_element_){
    /** @type {DOMElement} **/
    const _e = holder_;
    /** @type {string}//{str} **/
    const _list_element = list_element_;
    /** @type {number} //{uint16_t} **/
    let _length = document.querySelectorAll(_list_element).length;

    let _resolve = (it)=>{console.log(it)};
    /** @type {number} //{uint16_t} **/
    let _sVal = 0;
    const cH = new CoolHelperClass();
    /**
     *  Easy to detect a scrapperbot 
     *  if you searching for periodic events.
     *  A random number generator made it difficult. 
     *
     * @private
     * @return {number}// {uint16_t}
    **/
    const randWait = ()=>{
        return (
          2000 + Math.floor(Math.random() * 2000)
        );
    };
    /**
     *
     * @private
     **/
    const _again = function (){
        setTimeout(_do, randWait());
    };
    /**
     *
     * @private
     **/
    const _check = function(){
        _e.scroll(0,0);
        setTimeout(function(){
            const length = document.querySelectorAll(_list_element).length;
            console.debug(
              'scroll helper check. Size : '+
              length.toString()+' '+
              _length.toString()
            );
            if ( length === _length ){
                console.debug(
                  'scroll helper done'
                );
                return _resolve(true);
            }
            _length = length;
            setTimeout(_again, randWait());
        },randWait());
    }
    /**
     *
     * @private
     **/
    const _do = async function(){
        await cH.scroll();
        _sVal += (
          10000 + Math.round(
            Math.random() * 20000
          )
        );
        _e.scroll(0,_sVal);
        setTimeout(_check, randWait());
    }
    /**
     *
     * @public
     **/
    this.scroll = function(){
        console.debug(
          'scroll helper start. Size : '+
          _length.toString()
        );
        const scr = this; 
        return new Promise(function (resolve, reject) {
            _resolve = resolve;
            setTimeout(_do, randWait());
        });
    }
}
