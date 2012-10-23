
loader.include('json')

//---------------------------------------------------//
// function ajax(url)                                //
// > ajax class                              //
//---------------------------------------------------//

var ajax = {async_request:null}

ajax.get = function (url,opt)
{
	try
	{
		var query     = (opt && opt.qs) ? opt.qs : false;
		var async  	  = (opt && opt.as) ? opt.as : false;	
		var callback  = (opt && opt.cb) ? opt.cb : false;
		var format    = (opt && opt.fm) ? opt.fm : function(d){return d;} ;

		if ( callback )
		{
			if ( async )
			{   
				if ( ajax.async_request != null ){ ajax.async_request.abort(); }

				ajax.async_request = ajax.send( url, query, function(result)
				{
					try
					{ 
						ajax.async_request = null;
						if ( result != "" ) //not aborted//
						{
							callback( format(result) );
						}
					}
					catch(e)
					{
						alert( "ajax.send:" + e.message );
					}
				});
			} 
			else
			{
				callback( format( ajax.send(url,query ) ) );
			}
		}
		else
		{
			return format( ajax.send( url,query ) );
		}
	}
	catch( e )
	{
		throw e
	}
}

ajax.send = function ( url,queryString,callback, async )
{
	try
	{
		var request = ajax.xmlhttp()
    
	    var async = callback ? true : false;
    
    
		if ( async ) request.onreadystatechange = function()
		{ 
			if (request.readyState == 4) callback( request.responseText ); 
		};
    
		var params = ""
		if (queryString)
		{
			for(param in queryString)
			{
				if (params != "") params += "&";
				params += param + "=" + escape( queryString[param] )
			}
			if (params != "") params = "?" + params
		}

		url = url + params

		request.open("GET", url, async)

		request.send(null);

		if (async) 
		{
			return request;
		}
		else
		{
			return request.responseText;
		}
    
	}
	catch(e)
	{
		throw {error:true, source:"ajax.send", message: e.message + ": " + url}
	}
}

ajax.xmlhttp = function () 
{
    var obj;
    var xml = new Array();
        xml[0] = "MSXML2.XMLHTTP.5.0";
        xml[1] = "MSXML2.XMLHTTP.4.0";
        xml[2] = "MSXML2.XMLHTTP.3.0";
        xml[3] = "MSXML2.XMLHTTP";
        xml[4] = "Microsoft.XMLHTTP";
        xml[5] = "WinHttp.WinHttpRequest.5";
        xml[6] = "WinHttp.WinHttpRequest.5.1";
		
		if (window.ActiveXObject) {
        for (var i=0; i<xml.length; i++) {
            try {
                obj = new ActiveXObject(xml[i]);
                break;
            } catch(e) {
               obj = null;}
	    }
	    } else if(window.XMLHttpRequest) {
        try {
            obj = new XMLHttpRequest();
        } catch(e) {
            obj = null;
        }
    }
    return obj; 
}
