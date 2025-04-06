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
 * @param {?DOMELEMENT}
 * @param {?string}
 * @class
**/
const MinerHelperClass = function(element_, meta_, key_, url_, click_, text_){
    /**
     * Unnecessary public gate for the mine function.
     *
     * @public
    **/
    this.mining = async function(){
        return mining(); 
    }
    /**
     * Public gate function for the loop function.
     *
     * @public
    **/
    this.loop = function(){
        return paginatorLoop(); 
    }
    const sH = new ScrapperHelperClass(url_);
    const main_element = element_;
    const meta_tag = meta_;
    const search_tag = key_;
    const paginator_click = click_;
    const paginator_text = text_;
    const randWait = ()=>{
        return (
          10000 + Math.floor(Math.random() * 5000)
        );
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
            if ( sH.cH.clickSmart(
                paginator_click,
                paginator_text
              )
            ){
                setTimeout(paginatorLoop, randWait());
            };
        }, randWait());
    };
};
