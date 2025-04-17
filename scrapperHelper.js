

/**
 * @class
**/
const ScrapperHelperClass = class{

    /**
     * @type minerToolClass
     * @private
    **/ 
    #mT = new MinerToolClass('scrapper', 4, 20);

    /**
     * @param {string}
     * @param {string}
     * @private
    **/
    #log = this.#mT.log;

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
        console.log(e_);
        const mined = this.cH.iTextss(
          e_, meta_
        );
        this.#log('mineAndSave', 'mine done');
        this.#log('mineAndSave',
          (
            'size : '+
            mined.length.toString() 
          )
        );
        for (const i of mined){
            await this.nH.checkAndAdd(
              this.searchObject(id_, i),
              i
            );
        }
        this.#log('mineAndSave','save done');
    }
};
