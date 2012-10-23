loader.include( 'ajax' )

var contact =
{
	add: function( email,name,relates_to,enquiry )
  {
    return ajax.get( "/contact/add",
    {
      qs: {"Name":name,"Email":email,"RelatesTo":relates_to,"Enquiry":enquiry},
      fm:Object.fromJSON
    });
  }
}