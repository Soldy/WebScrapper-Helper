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
    const _mT = new MinerToolClass('scroll', 4000, 2000);
    const _setRandOut = _mT.setRandOut;
    const _log = _mT.log;
    const _cH = new CoolHelperClass();
    /**
     *
     * @private
     **/
    const _check = function(){
        _e.scroll(0,0);
        _setRandOut(function(){
            const length = document.querySelectorAll(_list_element).length;
            _log(
              'check', 
              (
                'Size : '+
                length.toString()+
                ' '+
                _length.toString()
              )
            );
            if ( length === _length ){
                _log(
                  'check','done'
                );
                return _resolve(true);
            }
            _length = length;
            _setRandOut(_again);
        });
    }
    /**
     *
     * @private
     **/
    const _do = async function(){
        await _cH.scroll();
        _sVal += (
          10000 + Math.round(
            Math.random() * 20000
          )
        );
        _e.scroll(0,_sVal);
        _setRandOut(_check);
    }
    /**
     *
     * @private
     **/
    const _again = function (){
        _setRandOut(_do);
    };
    /**
     *
     * @public
     **/
    this.scroll = function(){
        _log(
          'start',
          (
            'Size : '+
            _length.toString()
          )
        );
        const scr = this; 
        return new Promise(function (resolve, reject) {
            _resolve = resolve;
            _setRandOut(_do);
        });
    }
}
