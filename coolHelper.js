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
     *
     * @param {DOMElement}
     * @parram {strng}
     * @public
     * @return {string}
    **/
    iText(e, select_){
        let d = e.querySelector(select_);
        if(typeof d === 'undefined' || d === null){
            d = e.getElementsByClassName(select_)[0];
        }
        if(typeof d === 'undefined' || d === null){
           return '';
        }
        return  d.innerText;
    }
};
