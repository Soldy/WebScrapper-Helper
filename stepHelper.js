
const stepHelperClass = class{
    /**
     * @private
     * @type {number}
    **/
    #start = 0;

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
     * @type {StorageHelperClass}
    **/
    #sT = '';

    /**
     * @private
     * @type {MinerToolClass}
    **/
    #mT = '';

    /**
     * @private
    **/
    async #step(new_id_){
        const _url = this.#url;
        const _new_id = new_id_;
        await this.#sT.set(
          this.#name,
          _new_id
        );
        this.#mT.setRandOut(function(){
             window.location = (
               _url.replace('{id}', _new_id)
             );
        });
    };

    /**
     *
     * @param {string} //
     * @param {?string} //
     * @param {?number} // {?int}
     * @constructs
    **/
    constructor(url_, name_, start_) {
        this.#sT = new StorageHelperClass();
        this.#mT = new MinerToolClass('miner', 4000, 1000);
        if (typeof name_ !== 'undefined')
            this.#name = name_.toString();
        if (typeof start_ !== 'undefined')
            this.#start = start_;
        this.#url = url_;
    };

    /**
     *
     * @public
     * @async
     * @return {number} // {int}
    **/
    async get(){
        const org = parseInt(await this.#sT.get(this.#name));
        if(isNaN(org))
             return this.#start;
        return org;
    };

    /**
     *
     * @public
     * @async
    **/
    async step(){
        const _org_id = await this.get();
        this.#step((_org_id - 1).toString());
    };

    /**
     *
     * @param {sting|number}
     * @public
     * @async
    **/
    async safeStep(current_id_){
        const _org_id = await this.get();
        if(current_id_ == _org_id)
            return this.#step((_org_id - 1).toString());
        this.#step(_org_id.toString());
    };
};
