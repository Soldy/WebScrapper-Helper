


const minerToolClass = function(mod_, from_, plus_){
    /**
      value check 
    **/
    if (typeof from_ === 'undefined')
        from_ = 5000;
    if (typeof plus_ === 'undefined')
        plus_ = 5000;
    /** @type {string} **/
    const _mod  = mod_.toString();
    /** @type {number}// {uint16_t} **/
    const _from = parseInt(from_);
    /** @type {number}// {uint16_t} **/
    const _plus   = parseInt(plus_);
  
    /**
     *
     * @param {?number}// {?uint16_t}
     * @param {?number}// {?uint16_t}
     * @private
     * @return {number}// {uint16_t}
    **/
    const _randWait = function(from_, plus_){
        if (typeof from_ === 'undefined')
            from_ = _from;
        if (typeof plus_ === 'undefined')
            plus_ = _plus; 
        return (
          from_ + Math.floor(Math.random() * plus_)
        );
    };
  
    /**
     *  Easy to detect a scrapperbot 
     *  if you searching for periodic events.
     *  A random number generator made it difficult. 
     *
     * @param {function}
     * @param {?number}// {?uint16_t}
     * @param {?number}// {?uint16_t}
     * @private
    **/
    const _setRandOut = function(func_, from_, plus_){
        setTimeout(
          func_,
          _randWait(from_, plus_)
        );
    };
  
    /**
     *
     * @param {function}
     * @param {?number}// {?uint16_t}
     * @param {?number}// {?uint16_t}
     * @public
    **/
    this.setRandOut = function(func_, from_, plus_){
        return _setRandOut(func_, from_, plus_);  
    };
  
    /**
     *
     * @param {string}
     * @param {string}
     * @public
    **/
    this.log = function(proc_, msg_){
        console.debug(
          _mod+
          ' '+
          proc_+
          ' : '+
          msg_
        );
    }

};
