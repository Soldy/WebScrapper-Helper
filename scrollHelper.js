
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
     *
     * @private
     **/
    const _again = function (){
        setTimeout(_do, 3000);
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
        if( length === _length ){
            console.debug(
              'scroll helper done'
            );
            return _resolve(true);
        }
        _length = length;
        setTimeout(_again, 3000);
        },3000);
    }
    /**
     *
     * @private
     **/
    const _do = async function(){
        await cH.scroll();
        _sVal += 10000;
        _e.scroll(0,_sVal);
        setTimeout(_check, 3000);
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
            setTimeout(_do, 3000);
        });
    }
}
