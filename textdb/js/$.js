function $(el){ return document.getElementById(el); }
function $$(el){ return document.createElement(el); }
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

function $cookie(name,field,validate)
{
    var cookies = document.cookie.split('; ')
    for (var i=0; i < cookies.length; i++)
    {
        var crumb = cookies[i].split('=', 1);

        if ( name == crumb[0] )
        {
            var value='';
            if ( field )
            {
                var fields = cookies[i].substr(name.length+1).split('&');

                  for ( var f=0; f<fields.length; f+=1 )
                  {
                      crumb = fields[f].split('=');
                      if ( field == unescape(crumb[0]) )
                      {
                          value = crumb[1];
                          break;
                      }
                  }
            }
            else
            {
                value = crumb[1];
            }
            if (validate && value == '' ) alert("urecognised cookie: " + name + "," + field );

            return unescape(value);
        }
    }
}

function $qs(ji)
{
	hu = window.location.search.substring(1);
	gy = hu.split("&");
	for (i=0;i<gy.length;i++) 
	{
		ft = gy[i].split("=");
		if (ft[0] == ji) 
		{
			return ft[1];
		}
	}
}

	
function $ie()
{
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
	{
		return true;
	}
	else
	{
		return false;
	}
}


function $css( el, name, def )
{
	if ( window.getComputedStyle )
	{
		return window.getComputedStyle(el,null ).getPropertyValue(name).replace(/px/,"")
	}
	else if ( el.currentStyle )
	{
		if ( el.currentStyle[name] )
			return el.currentStyle[name].replace(/px/,"")
		else
			return def
		
	}
}	

//get width of text element
function $width(span){

	if (document.layers){
	  w=document.layers[span].clip.width;
	} else if (document.all && !document.getElementById){
	  w=document.all[span].offsetWidth;
	} else if(document.getElementById){
	  w=document.getElementById(span).offsetWidth;
	}
return w;
}

//get height of text element
function $height(span){

	if (document.layers){
	  h=document.layers[span].clip.height;
	} else if (document.all && !document.getElementById){
	  h=document.all[span].offsetHeight;
	} else if(document.getElementById){
	  h=document.getElementById(span).offsetHeight;
	}
return h;
}


function $vp() {
var h = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
var w = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
return { width : w , height : h }
}

function $pos(el) 
{
	var obj = $(el)
	var curleft = curtop = 0;
	if (obj.offsetParent) 
	{
		do 
		{
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
 	return {x:curleft,y:curtop};
}


function $sb()
{
    var st = document.documentElement.scrollTop;
    var sl = document.documentElement.scrollLeft;
  
	if ( st==0 ) st = document.body.scrollTop;
	if ( sl==0 ) sb = document.body.scrollLeft;

	return {left: sl, top: st };
}


  function $update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }

  function $merge(array, args) {
    array = slice.call(array, 0);
    return update(array, args);
  }

  function $argumentNames() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }

  function $bind(context) {
    if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
    var __method = this, args = slice.call(arguments, 1);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(context, a);
    }
  }
  
  