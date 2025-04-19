/**
 * Serial number and serial manager.
 *
 *
 * @class
 **/
const serialHelperClass = class{
   /** @type {string} **/
   #name = '';
   /** @type {string} **/
   #sn = '';
   /**
     *
     * @param {string} // @param {str}
     * @constructs
    **/
    constructor(name_) {
        this.#name = (name_).toString();
        this.#sn = (
          'serializer_'+
          (name_).toString() 
        );
    };

    /**
     *
     * @public
     * @return {number}// {uint16_t}
    **/
    async get(){
        return await GM.getValue(this.#sn, 0);
    };

    /**
     *
     * @public
     * @return {number}// {uint16_t}
    **/
    async step(){
        const val = await this.get();
        await GM.setValue(this.#sn, (val+1));
        return val;  
    };
};

