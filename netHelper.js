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
     * @type {string} // @var {str}
    **/
    #url = '';
    /**
     *
     * @param {string} // @param {str}
     * @constructs
    **/
    constructor(url_) {
        this.#url = (url_).toString();
    } 
    /**
     *
     * @param {Object.<string, string|number>} // @param {map<str, str|int>}
     * // @async
     * @public
     * @returns {Promise<string> }// @return {str}
    **/
    get(query_){
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
     * @param {Object.<string, string|number>} // @param {map<str, str|int>}
     * @async
     * @public
     * @returns {boolean}// @return {bool}
    **/
    async check(query_){
        const result = await this.get(query_);
        if (result === "{}" || result === "[]" )
            return true;
        return false;
    };
    /**
     *
     * @param {Object.<string, any>} // @param {map<str, str|int>}
     * // @async
     * @public
     * @returns {Promise<string> }// @return {str}
    **/
    add(data_){
        const _url = this.#url.toString();
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
     * @param {Object.<string, string|number>} // @param {map<str, str|int>}
     * @param {Object.<string, any>} // @param {map<str, str|int>}
     * @async
     * @public
     * @returns {boolean}// @return {bool}
    **/
    async checkAndAdd(query_, data_){
       const result = await this.check(query_); 
       if ( result )
          await this.add(data_);
       return result;
    };
};
