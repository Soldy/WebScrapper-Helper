/**
 * This function is a way to use a Chrome bug as a feature.
 * No future comment about that. 
 *
**/
const KeepAlive = function(){
    let loop_i = 0;
    setInterval(function(){
        console.debug('Keep a live : '+loop_i.toString());
        loop_i++;
      }, 10000);
};
