
const KeepAlive = function(){
    let loop_i = 0;
    setInterval(function(){
        console.debug('Keep a live : '+loop_i.toString());
        loop_i++;
      }, 10000);
};
