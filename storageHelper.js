/**
 * This class solution for the problem when the code runs in different environments.
 * If it is running in the browser use the localStorage when the Grease monkey is there using GM.setValue/GM.getValue,
 * if runs on nodes and the temprc is there it falls back to that.
 * The last option if no other uses a dummy solution.
 * @todo temprc support
 *
 * @param {?number} //{?uint8_t}
 * @class
**/
const storageHelperClass = class{
    /**
     * 0 = dummy storage
     * 1 = localStorage
     * 2 = Grease monkey value
     *
     * @type {number}// {uint8_t}
    **/
    #type = 0;
    /** @type {Object.<string, any>}// {map<str, any>} **/
    #values = {};

    /**
     *
     * @param {string}
     * @param {any}
     * @private
    **/
    #set(name_, val_){
        this.#values[name_] = val_;
    }

    /**
     *
     * @param {string}
     * @private
     * @return {any}
    **/
    #get(name_, val_){
        if (typeof this.#values[name_] !== 'undefined')
            return this.#values[name_];
        if (typeof val_ !== 'undefined')
            return val_;
        return null;
    }

    /**
     *
     * @param {?number} //{?uint8_t}
     * @constructs
    **/
    constructor(type_) {
        if (
          (typeof type_ === 'number') &&
          (type_ < 3) &&
          (type_ > -1)
        ) {
            this.#type = parseInt(type_);
            return ;
        }
        if (
          (typeof localStorage === 'undefined') &&
          (typeof GM === 'undefined')
        ) return;
        if (
          (typeof GM !== 'undefined') &&
          (typeof GM.setValue === 'function') &&
          (typeof GM.getValue === 'function')
        ) this.#type = 2;
        if (
          (typeof localStorage !== 'undefined') &&
          (typeof localStorage.setItem === 'function') &&
          (typeof localStorage.getItem === 'function')
        ) this.#type = 1;
    };

    /**
     *
     * @param {string}
     * @param {any}
     * @async
     * @public
    **/
    async set(name_, val_){
        if (this.#type === 1)
            return await localStorage.setItem(name_, val_);
        if (this.#type === 2)
            return await GM.setValue(name_, val_);
        //dummy solution
        return await this.#set(name_, val_);
    };

    /**
     *
     * @param {string}
     * @async
     * @public
     * @return {any}
    **/
    async get(name_, val_){
        if (this.#type === 1){
            if (typeof val_ === 'undefined')
                return await localStorage.getItem(name_);
            return await localStorage.getItem(name_, val_);
        }
        if (this.#type === 2){
            if (typeof val_ === 'undefined')
                return await GM.getValue(name_);
            return await GM.getValue(name_, val_);
        }
        //dummy solution
        if (typeof val_ === 'undefined')
            return await this.#get(name_);
        return await this.#get(name_, val_);
    };
};
