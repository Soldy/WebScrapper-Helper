

/**
 * @class
**/
const ScrapperHelperClass = class{
    /**
     * @param {string} // @param {str}
     * @constructor
    **/
    constructor(url_) {
        this.cH = new CoolHelperClass();
        this.nH = new NetHelperClass(url_);
    }
    /**
     *
     * @param {string}
     * @param {Object.<string, string>} // @param {map<str,str>}
     * @public
     * @returns {Object.<string, string>} // @return {map<str,str>}
    **/
    searchObject(id_, data_){
        let search = {};
        search[id_] = data_[id_];
        return search;
    };
    /**
     *
     * @param {DOMElement}
     * @param {ScrapMeta}
     * @param {string} // @param {str}
     * @public
    **/
    async mineAndSave(e_, meta_, id_){
        const mined = this.cH.iTextss(
          e_, meta_
        );
        for (const i of mined){
            await this.nH.checkAndAdd(
              this.searchObject(id_, i),
              i
            );
        }
    }
};
