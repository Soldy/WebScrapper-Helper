
const CoolHelpClass = class{
    #scrollDown(){
        window.scrollTo(0, document.body.scrollHeight);
    }
    #scrollUp(){
        window.scrollTo(0, document.body.scrollHeight);
    }
    #scrollDownUp(){
        setTimeout(this.#scrollDown, 100);
        setTimeout(this.#scrollUp, 200);
    }
    scroll(){
        this.#scrollDownUp();
        setTimeout(this.#scrollDownUp, 1000);
    }
    iText(e, select_){
        return  e.querySelector(select_).innerText;
    }
};
