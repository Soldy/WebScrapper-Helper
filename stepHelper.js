
const stepHelperClass = class{
    /**
     * @private
     * @type {number}
    **/
    #name = 'id';

    /**
     * @private
     * @type {string}
    **/
    #url = 'none';

    /**
     * @private
     * @type {number}
    **/
    #step = 0;

    /**
     * @private
     * @type {StorageHelperClass}
    **/
    #sT = '';

    /**
     * @private
     * @type {MinerToolClass}
    **/
    #mT = '';

    /**
     *
     * @param {string} //
     * @param {?string} //
     * @constructs
    **/
    constructor(url_, name_) {
        this.#sT = new StorageHelperClass();
        this.#mT = new MinerToolClass('miner', 4000, 2000);
        if (typeof name_ === 'undefined')
            this.#name = name_.toString();
    };

    /**
     *
     * @public
     * @async
    **/
    async step(){
        const _org = parseInt(await this.#sT.get(this.#name));
        await this.#sT.set(
          this.#name,
          (_org-1).toString()
        );
        const _url = this.#url;
        this.#mT.setRandOut(function(){
            window.location = (
               _url.replace('{id}', _org.toString())
            );
        });
    };
};
