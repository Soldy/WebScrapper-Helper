/**
 * Serial number and serial manager.
 *
 *
 * @class
 **/
const SerialHelperClass = class{
   /** @type {StorageHelperClass} **/
   #sT = new  StorageHelperClass();
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
        return await this.#sT.get(this.#sn, 0);
    };

    /**
     *
     * @public
     * @return {number}// {uint16_t}
    **/
    async step(){
        const val = await this.get();
        await this.#sT.set(this.#sn, (val+1));
        return val;  
    };
};
