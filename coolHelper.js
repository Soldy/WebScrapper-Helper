/**
 *  coolHelper is a simplified version of the old helper class
 *  that was used in the scrapper script built in 2021.
 *  It's not good but make the code shorter.
 *
**/

/**
 * Data Scrapper meta type
 * // {str | tuple<str, str> | map <str, str>}
 *
 *  @typedef {string | Array.<string> | Object.<string, string>} ScrapMetaPiece
 *
 **/

/**
 * Data Scrapper meta type
 * // {map <str, ScrapMetaPiece>}
 *
 *  @typedef {Object.<string, ScrapMetaPiece>} ScrapMeta
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
     * trim function
     *
     * @param {string}
     * @public
     * @return
    **/
    trim(input_) {
        return input_.replace(/^\s+|\s+$/g, '');
    }

    /**
     * @public
    **/
    scroll(){
        this.#scrollDownUp();
        setTimeout(this.#scrollDownUp, 1000);
    }

    /**
     *
     * @param {DOMElement|string}
     * @public
     * @return {DOMElement}
    **/
    elementCheck(e_){
        if (typeof e_ !== 'string')
            return e_;
        return document.querySelector(e_);
    }

    /**
     *
     * @param {DOMElement}
     * @public
     * @return {Array.<string>}
    **/
    smartList(e_){
        if (e_.tagName.toLowerCase() !== 'ul')
            return [e_.innerText.toString()];
        const out = [];
        const points = e_.getElementsByTagName('li');
        for (const point of points)
            out.push(point.innerText);
        return out;
    }

    /**
     * iDom mostly a query selector short hand and
     * is the expectation the empty string rule if the element does not exist, it will return null.
     *
     * @param {DOMElement|string}
     * @param {?string}
     * @param {?number}
     * @public
     * @return {DOMElement|null}
    **/
    iDom(e_, select_, idx_){
        if (typeof select_ === 'undefined'){
            select_ = e_.toString();
            e_ = document;
        }
        if (typeof e_.querySelector === 'undefined')
            return '';
        let d = e_.querySelector(select_);
        if (typeof d === 'undefined' || d === null){
            return e_.getElementsByClassName(select_)[0];
        }
        if (typeof idx_ !== 'undefined'){
            if (e_.querySelectorAll(select_).length > idx_){
                return e_.querySelectorAll(select_)[idx_];
            }
        }
        return d;
    };

    /**
     * Multiple and special innerText case handler, helper, and shortener.
     *
     * @param {DOMElement|string}
     * @param {?string}
     * @param {?number}
     * @public
     * @return {string}
    **/
    iText(e_, select_, idx_){
        const d = this.iDom(e_, select_, idx_);
        if (typeof d === 'undefined' || d === null){
            return '';
        }
        return this.trim(d.innerText);
    };

    /**
     * Multiple and special innerHTML case handler, helper, and shortener.
     *
     * @param {DOMElement|string}
     * @param {?string}
     * @param {?number}
     * @public
     * @return {string}
    **/
    iHtml(e_, select_, idx_){
        const d = this.iDom(e_, select_, idx_);
        if (typeof d === 'undefined' || d === null){
            return '';
        }
        return this.trim(d.innerHTML);
    };

    /**
     * Get value helper, and shortener.
     *
     * @param {DOMElement|string}
     * @param {?string}
     * @param {?number}
     * @public
     * @return {string}
    **/
    iVal(e_, select_, idx_){
        const d = this.iDom(e_, select_, idx_);
        if (typeof d === 'undefined' || d === null){
            return '';
        }
        return this.trim(d.value);
    };

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
        for (let i = 0; terms.length > i; i++){
            out[terms[i].innerText] = details[i].innerText;
        }
        return out;
    };

    /**
     *
     * @todo cleanup and separate
     *
     * @param {DOMElement}
     * @param {string} // @param {str}
     * @param {number} // @param {uint16_t}
     * @public
     * @return {Object.<string. string|Array.<string|Array.<string>>>} // {map<str, str|vector<str|vector<str>>>}
    **/
    iSection(e_, title_, i_){
        const parent_e = e_[i_].parentElement;
        const childs = parent_e.childNodes;
        const titles = parent_e.querySelectorAll(title_);
        let title_pos = 0;
        let first = -1;
        let last = -1;
        let title = e_[i_].innerText.toString();
        let sections = [];
        for (const i in childs){
            if (e_[i_] === childs[i])
                first = parseInt(i)+1;
        }
        for (const i in titles){
            if (titles[i] === e_)
                title_pos = parseInt(i);
        }
        if (titles.count === title_pos+1){
            last = childs.length;
        } else {
            const next_title = titles[title_pos+1];
            for (let i = first ; i < childs.length ; i++){
                if (childs[i] === next_title)
                    last = parseInt(i);
            }
        }
        for (let i = first ; i < last ; i++){
            if (childs[i].innerText === '')
                continue;
            sections.push(this.smartList(childs[i]));
        }
        return {title,sections};
    };

    /**
     * get attribute simplifier
     * @todo cleanup
     *
     * @param {DOMElement}
     * @param {Object.<string, string>|string}//{map<str,str>|str}
     * @public
     * @return {string}
    **/
    iAttr(e_, select_){
        if (typeof e_ === 'undefined')
            return ;
        if (typeof select_ === 'string')
            return e_.getAttribute(select_);
        if ( typeof select_['e'] === 'undefined' )
             if ( typeof select_['element'] === 'string' ) {
                 select_['e'] = select_['element'];
             } else {
                 return '';
             }
        if ( typeof select_['a'] === 'undefined' )
             if ( typeof select_['attr'] === 'string' ) {
                 select_['a'] = select_['attr'];
             } else if ( typeof select_['attribute'] === 'string' ) {
                 select_['a'] = select_['attribute'];
             } else {
                 return '';
             }
        if ( typeof e_.querySelector === 'undefined' )
            return '';
        let d = e_.querySelector(select_.e);
        if ( typeof d === 'undefined' || d === null ){
            d = e_.getElementsByClassName(select_.e)[0];
        }
        if ( typeof d === 'undefined' || d === null ){
           return '';
        }
        const out = d.getAttribute(select_.a);
        if ( out === null )
            return '';
        return this.trim(out);
    };

    /**
     *
     * @param {DOMElement}
     * @param {ScrapMetaPiece}
     * @public
     * @return {string | Object.<string, string>} // {str | map<str, str>}
    **/
    iSmart(e_, select_){
        if ( Array.isArray(select_) ){
            return this.iTerm(e_, select_[0], select_[1]);
        } else if ( typeof select_ === 'object' ) {
            for (const i in select_){
                if ( ( i === 'attribute' ) || ( i === 'attr' ) || ( i === 'a' ) ){
                    return this.iAttr(e_, select_);
                }
            }
            if (
              (( select_.indexOf('index') > -1 ) || ( select_.indexOf('idx') > -1  ) || ( select_.indexOf('i') > -1  )) &&
              (( select_.indexOf('queryselector') > -1 ) || ( select_.indexOf('query') > -1  ) || ( select_.indexOf('q') > -1  ))
            ){
                if ( select_.indexOf('index') > -1 ){
                    select_['i'] = select_['index'];
                }
                if ( select_.indexOf('idx') > -1  ){
                    select_['i'] = select_['idx'];
                }
                if ( select_.indexOf('queryselector') > -1 ){
                    select_['q'] = select_['queryselector'];
                }
                if ( select_.indexOf('query') > -1  ){
                    select_['q'] = select_['query'];
                }
                return (e_, select_['q'], select_['i']);
            }
        }
        return this.iText(e_, select_);
    };

    /**
     *
     * @param {DOMElement}
     * @param {ScrapMeta}
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
     * @param {Array.<DOMElement> | string} // {str|vector<DOMElement>}
     * @param {ScrapMeta}
     * @public
     * @return {Array.<Object.<string, string | Object.<string, string>>>} // {vector<map<str, str | map<str, str>>>}
    **/
    iTextss(e_, selects_){
        const out = [];
        // make it work with DOMElement and string
        if (typeof e_ === 'string')
            e_ = document.querySelectorAll(e_);
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
    };

    /**
     * Click the an element
     *
     * @param {DOMElement}
     * @param {boolean}
     * @public
     * @returns {boolean}
    **/
    click(e_, new_tab_){
       // do not chage it!!
       // if you think this 'if' is a mistake you are wrong!!!
       if (
           (typeof new_tab_ != 'undefined') &&
           (new_tab_)
       ) e_.setAttribute("target","_blank");
       e_.click();
       return true;
    };

    /**
     * Smart click is clicking on the first child elements if they exist.
     * Click the main element if not.
     *
     * Works with a priority list.
     * @todo Clean up! That has to be less ugly
     *
     * @param {DOMElement|string}
     * @param {string}
     * @param {bool}
     * @public
     * @returns {boolean}
    **/
    clickSmart(e_, text_, new_tab_){
        const elements = ['a', 'button'];
        let serial = 0;
        e_ = this.elementCheck(e_);
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
                            return this.click(t, new_tab_);
                        } else {
                            const aria = t.getAttribute('aria-label');
                            if (
                              (aria != null ) &&
                              (aria.indexOf(text_) > -1)
                            ) return this.click(t, new_tab_);
                        }
                    }
                 }else{
                    // click on the first element if no text_
                    // requirement
                    console.debug('CH: smart click to <'+i+'>')
                    return this.click(ne[0], new_tab_);
                 }
             }
        }
        try{
            this.click(e_, new_tab_);
        }catch(e){
            console.debug(e);
        }
        return false;
    };
};
