function $el(el){ return document.getElementById(el); }

function $on(el, e, fn)
{
      if (typeof(el) == "string") 
      {
        el = $(el)
      }
      
      if (el.attachEvent)
      {
        el.attachEvent("on"+e,function(){return fn(event.srcElement,event)}); 
      }
      else
      {
        el.addEventListener(e, function(e){return fn(e.target,e)},false);   
      }
}