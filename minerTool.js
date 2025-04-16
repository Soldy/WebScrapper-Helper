


const minerToolClass = function(mod_, from_, to_){
    const _mod  = mod_.toString();
    const _from = parseInt(from_);
    const _to   = parseInt(to_);
    this.setTimeout = function(func_){
        setTimeout(
          func_,
          _from + Math.floor(Math.random() * _to)
        );
    };
    this.log = function(proc_, msg_){
        console.debug(
          _mod,+
          ' '+
          proc_+
          ' : '+
          msg_
        );
    }

};
