/**
 * This is a really simple solution for checking and saving data.
 * This class should exist in 4 ways. 
 *   1 use a fetch to save data,
 *   2 use Gm.xmlhttpRequest to save data,
 *   3 use WebSocket, and 4 use the web scrapper API. 
 *   4 use indexedB
 * I think using local storage is not ideal. Because of the size of the data.
 * Unfortunately at the moment, the greasemonkey has no options for IndexedDb
 *
 * @todo add fetch support
 * @todo add simple scapper api support support
 * @todo add indexedb support
 *
 * @class
 *
**/
const NetHelperClass = class{
    /**
     *
     * @private
     * @type {string}// @var {str}
    **/
    #url = '';

    /**
     * @private
     * @type {boolean}// @var {bool}
    **/
    #debug_status = false
  
    /**
     *
     * @param {string}  url_ // @param {str}
     * @param {boolean} [debug_=false]// @param {?bool=false}
     * @constructs
    **/
    constructor(url_ , debug_ = false) {
        this.#url = (url_).toString();
        this.#debug_status = !!debug_;
    }

    /**
     *
     * @param {any}
     * @private
     *
    **/
     #debug(any_,){
         if(!this.#debug_status)
            return;
         console.table(any_);
         console.log(any_);
     }

    /**
     *
     * @param {Object.<string, string|number>}// @param {map<str, str|int>}
     * // @async
     * @public
     * @returns {Promise<string> }// @return {str}
    **/
    get(query_){
        /* @type {string}// @const {str} */
        const _url = (
          this.#url+
          "?"+
          (new URLSearchParams(query_)).toString()
        );
        return new Promise(function (resolve, reject) {
            GM.xmlHttpRequest({
                method: "GET",
                url: (_url),
                headers: {
                    "Content-Type": "application/json"
                },
                onload: function(response) {
                    resolve(response.responseText);
                }
            });
        });
    };

    /**
     *
     * @param {Object.<string, string|number>}// {map<str, str|int>}
     * @async
     * @public
     * @returns {boolean}// {bool}
    **/
    async check(query_){
       /* @type {string}// @const {str} */
        const result = await this.get(query_);
        if (result === "{}" || result === "[]" )
            return true;
        return false;
    };

    /**
     *
     * @param {Object.<string, any>} // {map<str, str|int>}
     * // @async
     * @public
     * @returns {Promise<string> }// {str}
    **/
    add(data_){
        /* @type {string}// @const {str} */
        const _url = this.#url.toString();
        /* @type {Object.<string, string|number>}// @var {map<str, int|str>} */
        const _data = JSON.stringify(data_);
        return new Promise(function (resolve, reject) {
             GM.xmlHttpRequest({
                 method: "POST",
                 url: _url,
                 data: (_data),
                 headers: {
                    "Content-Type": "application/json"
                 },
                 onload: function(response) {
                     resolve(response.responseText);
                 }
            }); 
        });
    };

    /**
     *
     * @param {Object.<string, string|number>}// {map<str, str|int>}
     * @param {?Object.<string, string|number>}// {?map<str, str|int>}
     * @async
     * @public
     * @returns {boolean}// {bool}
    **/
    async checkAndAdd(query_, data_){
       this.#debug(data_);
       if ( typeof data_ === 'undefined' )
           data_ = query_;
       const result = await this.check(query_); 
       if ( result )
          await this.add(data_);
       return result;
    };
};
