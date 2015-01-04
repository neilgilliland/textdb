loader.include( 'ajax' )

var blog =
{
	entries: function()
	{
		try
		{
			return ajax.get( "/blog/entries",
			{
				fm:Object.fromJSON
			});
		}
		catch(e)
		{
			alert(e.message)
		}
	},
	
	users: function()
	{
		try
		{
			return ajax.get( "/blog/users",
			{
				fm:Object.fromJSON
			});
		}
		catch(e)
		{
			alert(e.message)
		}
	},

	add_entry: function( user, title, text )
	{
		return ajax.get( "/blog/add_entry",
		{
			qs:{"user":user, "title":title,"text":text},
			fm:Object.fromJSON
		});
	},
	
	edit_entry: function( id, title, text )
	{
		return ajax.get( "/blog/edit_entry",
		{
			qs:{"id":id, "title":title,"text":text},
			fm:Object.fromJSON
		});
	},

	add_user: function( email,name )
	{
		return ajax.get( "/blog/add_user",
		{
			qs:{"email":email,"name":name},
			fm:Object.fromJSON
		});
	},
	
	get_entry: function( id )
	{
		return ajax.get( "/blog/get_entry",
		{
			qs:{"id":id},
			fm:Object.fromJSON
		});
	}
}