/**
 * Signal is the simplified version of my HTML element discovery tool. 
 *
 *
**/


const SignalHelperClass = class{
      /**
       * Serialize all the elements.
       * The full version uses a unique serial hash combo. 
       * But no reason to do that in the frontend. 
       * @public
       * @return {int}
      **/
      addSignal(){
         let list_num = 0 ;
         for ( const b of document.getElementsByTagName('body'))
         for ( const i of b.querySelectorAll('*')) {
               list_num ++ ;
               i.setAttribute('signal_listNum', list_num);
         };
         return parseInt(list_num+1);
      }
      /**
       * yeaah we let hem recognize we were here.
       * Obviously not.
       * @public
      **/
      removeSignal(){
          for ( const i of document.querySelectorAll('*')) {
              i.removeAttribute('signal_listNum');
          }
      };
      getElement(signal){
          return document.
            querySelectorAll(
              '[signal_listNum="'+signal.toString()+'"]'
            )[0]; 
      };
      getChildSignals(signal){
          let out = [];
          const e = this.getElement(signal);
          for ( const i of e.querySelectorAll('*')) {
              out.push(i.getAttribute('signal_listNum'));
          }
          return out;
      };
      getAttributes(signal){
          let out = {}
          const e  = this.getElement(signal)
          for ( const a of e.attributes){
              out[a.nodeName] = a.nodeValue;
          }
          return out;
      };
      getElementDetails(signal){
          const e = this.getElement(signal);
          return {
              'nodeName'   : e.nodeName,
              'text'       : e.innerText,
              'attributes' : this.getAttributes(signal),
              'childs'     : this.getChildSignals(signal)
          };
      };
      getAllElementsDetails(end){
          let out = [];
          for (let i = 1; end > i ; i++){
              out.push(this.getElementDetails(i)); 
          }
          return out;
      };
 };
