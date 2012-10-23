
(function () 
{

var included = {}
var queue = [];

loader = 
{
	include: function( src )
	{ 
		if ( !included[src] )
		{
			included[src]=true;
			document.write( '<script type="text/javascript" src="/js/'+src+'.js"></script>\n' );
		}
	},

	insert: function( src, js, onload )
	{
		if ( this.injectingScript )
		{
			queue.unshift( {"insert":src} );
		}
		else
		{
			eval("var old = document.getElementById('insert_script')");

			if (old != null) 
			{
				old.parentNode.removeChild(old);
				delete old;
			}

			var e = document.createElement("script");
			
			e.id = 'insert_script'
			
			if ( src != null ) e.src = "/js/"+src+".js";
			
			if ( js != null )
			{
				e.innerHTML = js; //warning! blows up in ie//
			}

			
			e.type="text/javascript";
			
			e.onreadystatechange = function ()
			{ 
				if ( this.readyState == 'loaded' )
				{ 
					onload(); 
				} 
			};
				
			e.onload = onload;

			document.getElementsByTagName("head")[0].appendChild(e); 
		}			
		
	},
	
	
	injectScript: function( script, defer, src )
	{
		queue.push( {"script":script, "defer":defer, "src":src} );
	},
	
	flushInject: function( post_callback )
	{
		if ( post_callback ) queue.push( {"ondone":post_callback} );
		this.__next();	
	},
	
	__next: function()
	{
		while( queue.length > 0 )
		{
			var item = queue.shift();
			
			if (item.script )
			{
				if ( /^.*loader\.js/.test( item.src ) ) 
				{
					this.injectingScript = true;

					eval( item.script );

					this.injectingScript = false;
				}
				
				//insert only works in ie if defer is specified. unfortunately defer is an ie feature//
				if ( item.defer==null || !$ie() ) this.insert( null, item.script, function(){loader.__next();} );
			}
			else if (item.insert )
			{
				this.insert( item.insert, null, function(){loader.__next();} );
				break;
			
			}
			else if (item.ondone)
			{
				item.ondone();
			}
		}
		return queue.length;
	}
	
};

})();

// using Resig's "degrading script" pattern.
// last script tag on the page with src=loader.js wins.
(function() {
  var scripts = document.getElementsByTagName("script");

  for (var i = scripts.length-1; i >= 0; i--) {
    var src = scripts[i].getAttribute("src");
    if (/^.*loader\.js/.test(src) ) 
    {
      // is the content of this script node non-empty? is so then eval the contents
      var script = scripts[i].innerHTML;
      if (/\S/.test(script)) {
        eval(script);
      }
      break;
    }
  }
})();

