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
    /**
     * Smart click is clicking on the first child elements if they exist.
     * Click the main element if not.
     *
     * Works with a priority list. That list should be changed to loop in the future.
     *
     * @public
     * @param {DOMElement}
    **/
    clickSmart(e){
        if (
          (typeof e.getElementsByTagName('button') != 'undefined') &&
          (typeof e.getElementsByTagName('button')[0] != 'undefined')
        ){
             console.debug('CH: smart click to <button>')
             e.getElementsByTagName('button')[0] != 'undefined')[0].click();
             return ;
        }
        if (
          (typeof e.getElementsByTagName('a') != 'undefined') &&
          (typeof e.getElementsByTagName('a')[0] != 'undefined')
        ){
             console.debug('CH: smart click to <a>')
             e.getElementsByTagName('a')[0] != 'undefined')[0].click();
             return ;
        }
        console.debug('CH: smart click to main').click();
        e.click();
    }
};
