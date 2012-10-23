loader.include( 'ajax' )

var quote =
{
	get: function(  )
	{
		return ajax.get( "/quote/get",
		{
			fm:Object.fromJSON
		});
	}
}