
const MinerHelperClass = function(element_, meta_, key_, url_, click_, text_){
    this.mining = async function(){
        return mining(); 
    }
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
    const mining = async function(){
        await sH.mineAndSave(main_element, meta_tag, search_tag)
    };
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
