loader.include('$')
loader.include('ajax')

if ( typeof(cms) == "undefined" )
{

var	cms = {}

cms =
{
	history: [],
	max_history: 2,
	
	load: function( id, item, key )
	{
		try
		{
			this.key = (typeof(key) == 'undefined') ? '' : key;
			
			dest = $el(id)
			element = dest.cloneNode(true);
			
			var re = new RegExp('{cms:key}','gi')
			
			element.innerHTML = '<input type="hidden"/>'+ajax.get( "/cms/"+item ).replace( re, this.key);

			//load the script elements//
			var scripts = element.getElementsByTagName("script");
			for( var script=0; script<scripts.length; script++ )
			{
				loader.injectScript( scripts[script].innerHTML, scripts[script].getAttribute("defer"), scripts[script].src );
			}
			loader.flushInject( function()
			{
				cms.bind_element( element );

				if ( dest.cms )
				{
					cms.history.push( {"id":dest.cms.id,"item":dest.cms.item} );
					if ( cms.history.length > cms.max_history ) 
					{
						cms.history.shift();
					}
				}
				dest.cms = {"id":id, "item":item};
				
				dest.innerHTML = element.innerHTML;
			});
				

		}
		catch(e)
		{
			alert(e)
		}
	
	},
	
	inject_html: function( id, name )
	{
		var element = $(id);
		element.innerHTML = cms.html(name)
	
		//load the script elements//
		var scripts = element.getElementsByTagName("script");
		for( var script=0; script<scripts.length; script++ )
		{
			loader.injectScript( scripts[script].innerHTML, scripts[script].getAttribute("defer"), scripts[script].src );
		}
		loader.flushInject( function(){})
	},
	
	repeater: function( arr, template )
	{
		var html = "";

		for( var idx=0; idx<arr.length; idx++ )
		{
			var obj = arr[idx];

			var pattern = template
			
			for( var field in obj )
			{
				var re = new RegExp('{'+field+'}','gi')
				pattern = pattern.replace( re, obj[field] );
			}
			
			html += pattern
		}
		return html;
	},
	
	replace: function( obj, template )
	{
		var pattern = template

		for( var field in obj )
		{
			var re = new RegExp('{'+field+'}','gi')
			pattern = pattern.replace( re, obj[field] );
		}
		
		return pattern;
	},
	
	bind_elements: function( parent, tag )
	{
		var elements = parent.getElementsByTagName( tag )
		for ( var idx=0; idx<elements.length; idx++ )
		{
			this.bind_element( elements[idx] );
		}		
	},
	
	bind_element: function( element )
	{
		
		var attr = element.getAttribute("cms-data");
		if (attr != null )
		{
			try
			{
				eval( "var data = " + attr );
				
			}
			catch(e)
			{
				element.innerHTML = "<span style='font-size:7.5pt'>@\""+attr+"-"+e+"\"</span>"
			}
			
			if ( data )
			{
				if ( data.constructor.toString().indexOf("Array") != -1 )
				{
					//data is an array so use a repeater to expand template//
					element.innerHTML = cms.repeater( data, element.innerHTML );
				}
				else
				{
					element.innerHTML = cms.replace( data, element.innerHTML );
				}
			}
		}   

		var elements = element.childNodes;

		for( var idx=0; idx<elements.length; idx++ )
		{
			var child = elements[idx];
			if ( child.tagName )
			{
				this.bind_element( child );
			}
		}
	},
	back: function()
	{
		if ( this.history.length )
		{
			var step = this.history.pop();
			this.load( step.id, step.item );
		}			
	},
	
	set_content: function( key, value)
	{
		try
		{
			return ajax.get( "/cms/set_content",
			{
				qs:{"key":key,"value":value},
				fm:Object.fromJSON
			});
		}
		catch(e)
		{
			alert(e.message)
		}
	},
	get_content: function( key )
	{
		try
		{
			return ajax.get( "/cms/get_content",
			{
				qs:{"key":key},
				fm:Object.fromJSON
			});
		}
		catch(e)
		{
			alert(e.message)
		}
		
	},
	html: function( name )
	{
		try
		{
			return ajax.get( "/cms/html/"+name,
			{
				qs:{}
			});
		}
		catch(e)
		{
			alert(e.message)
		}
		
	}
}

}
