/**
 *  coolHelper is a simplified version of the old helper class
 *  that was used in the scrapper script built in 2021. 
 *  It's not good but make the code shorter. 
 *
**/

/**
 *
 * @class
**/
const CoolHelperClass = class{
    /**
     * @private
    **/
    #scrollDown(){
        window.scrollTo(0, document.body.scrollHeight);
    }
    /**
     * @private
    **/
    #scrollUp(){
        window.scrollTo(0, 0);
    }
    /**
     * @private
    **/
    #scrollDownUp(){
        setTimeout(this.#scrollDown, 100);
        setTimeout(this.#scrollUp, 200);
    }
    /**
     * @public
    **/
    scroll(){
        this.#scrollDownUp();
        setTimeout(this.#scrollDownUp, 1000);
    }
    /**
     * Multiple and special innerText case handler, helper, and shortener.
     *
     * @param {DOMElement}
     * @param {string}
     * @public
     * @return {string}
    **/
    iText(e_, select_){
        if (typeof e_.querySelector === 'undefined')
            return '';
        let d = e_.querySelector(select_);
        if(typeof d === 'undefined' || d === null){
            d = e_.getElementsByClassName(select_)[0];
        }
        if(typeof d === 'undefined' || d === null){
           return '';
        }
        return  d.innerText;
    }
    /**
     *
     * @param {DOMElement}
     * @param {string} // @param {str}
     * @public
     * @return {Object.<string. string>} // {map<str, str>}
    **/
    iTerm(e_, term_, detail_){
        const terms = e_.querySelectorAll(term_);
        const details = e_.querySelectorAll(detail_);
        let out = {};
        for (let i = 0; terms.length > i; i++)
            out[terms[i].innerText] = details[i].innerText;
        return out;
    }

    /**
     *
     * @param {DOMElement}
     * @param {string | Array.<string>} // @param {str | tuple<str, str>}
     * @public
     * @return {string | Object.<string, string>} // {str | map<str, str>}
    **/
    iSmart(e_, select_){
        if (Array.isArray(select_))
            return this.iTerm(e_, select_[0], select_[1]);
        return this.iText(e_, select_);
    }

    /**
     *
     * @param {DOMElement}
     * @param {Object.<string, string | Array.<string>>} // @param {map<str, str | tuple<str, str>>}
     * @public
     * @return {Object.<string, string | Object.<string, string>>} // {map<str, str | map<str, str>>}
    **/
    iTexts(e_, selects_){
        const out = {};
        for (const i in selects_)
            out[i] = this.iSmart(e_, selects_[i]);
        return out;
    }
    /**
     *
     * @param {Array.<DOMElement>}
     * @param {Object.<string, string | Array.<string>>} // @param {map<str, str | tuple<str, str>>}
     * @public
     * @return {Array.<Object.<string, string | Object.<string, string>>>} // {vector<map<str, str | map<str, str>>>}
    **/
    iTextss(e_, selects_){
        const out = [];
        for (const i in e_){
            const res = this.iTexts(e_[i], selects_);
            for (const v in res)
                // No point in sending an empty element.
                // So if all variables are empty
                // we do not attache it.
                if ( res[v] !== ''){
                    out.push(res);
                    break;
                }
        }
        return out;
    }

    /**
     * Smart click is clicking on the first child elements if they exist.
     * Click the main element if not.
     *
     * Works with a priority list.
     *
     * @param {DOMElement}
     * @param {string}
     * @public
     * @returns {boolean}
    **/
    clickSmart(e_, text_){
        const elements = ['a', 'button'];
        let serial = 0;
        for(const i of elements){
            const ne = e_.getElementsByTagName(i);
            if (
                (typeof ne != 'undefined') &&
                (typeof ne[0] != 'undefined')
             ){
                 if (typeof text_ !== 'undefined'){
                    // search for the inner text
                    for (const t of ne ){
                        if ( t.innerText.indexOf(text_) > -1){
                            t.click();
                            return true;
                        }
                    }
                 }else{
                    // click on the first element if no text_
                    // requirement
                    console.debug('CH: smart click to <'+i+'>')
                    ne[0].click();
                    return true;
                 }
             }
        }
        return false;
    }
};
