/**
 *  coolHelper is a simplified version of the old helper class
 *  that was used in the scrapper script built in 2021. 
 *  It's not good but make the code shorter. 
 *
**/

/**
 *
 *
**/
const CoolHelpClass = class{
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
    iText(e, select_){
        if (typeof e.querySelector === 'undefined')
            return '';
        let d = e.querySelector(select_);
        if(typeof d === 'undefined' || d === null){
            d = e.getElementsByClassName(select_)[0];
        }
        if(typeof d === 'undefined' || d === null){
           return '';
        }
        return  d.innerText;
    }
    /**
     * Multiple innerText Object helper.
     *
     * @param {DOMElement}
     * @param {Object.<string, string>} // {map<str, str>}
     * @public
     * @return {Object.<string. string>} // {map<str, str>}
    **/
    iTexts(e, selects_){
         const out = {};
         for (const i in selects_)
             out[i] = this.iText(e, selects_[i]);
        return out;
    }
    /**
     * Multiple innerText Object helper from an array type object.
     * The most common situation in web scraping is this.
     *
     * @param {Array[DOMElement]}
     * @param {Object.<string, string>} // {map<str, str>}
     * @public
     * @return {Object.<string. string>} // {map<str, str>}
    **/
    iTextss(e, selects_){
        const out = [];
        for (const i in e){
            const res = this.iTexts(e[i], selects_);
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
     * @public
     * @param {DOMElement}
    **/
    clickSmart(e){
        const elements = ['a', 'button'];
        for(const i of elements)
            if (
                (typeof e.getElementsByTagName(i) != 'undefined') &&
                (typeof e.getElementsByTagName(i)[0] != 'undefined')
             ){
                 console.debug('CH: smart click to <'+i+'>')
                 e.getElementsByTagName(i)[0].click();
                 return ;
             }
        console.debug('CH: smart click to main').click();
        e.click();
    }
};
