//---------------------------------------------------//
// JSON stuff                                        //
//---------------------------------------------------//

Number.prototype.toJSON =  function() 
{
    return isFinite(this) ? this.toString() : 'null';
}

Date.prototype.toJSON = function() 
{
  return '"' + this.getFullYear() + '-' +
    (this.getMonth() + 1).toPaddedString(2) + '-' +
    this.getDate().toPaddedString(2) + 'T' +
    this.getHours().toPaddedString(2) + ':' +
    this.getMinutes().toPaddedString(2) + ':' +
    this.getSeconds().toPaddedString(2) + '"';
}

String.prototype.toJSON = function() 
{
    return '"' + this + '"';
}
  
Object.toJSON =  function(object,dont_expand_children) 
{
  var type = typeof object;
  
  switch(type) 
  {
    case 'undefined':
    case 'function':
    case 'unknown': return;
    case 'boolean': return object.toString();
  }
  if (object === null) return 'null';
  if (object.toJSON) return object.toJSON();
  
  var results = [];
  if (dont_expand_children)
  {
    results.push( '[object]' )
  }
  else
  {
    if (object.ownerDocument === document) dont_expand_children=true;
    
    for (var property in object) 
    {
      var value = Object.toJSON(object[property],dont_expand_children);
      if (value == undefined)
      results.push(property.toJSON() + ':undefined');
      else
      results.push(property.toJSON() + ':' + value);
    }
  }
  return '{' + results.join(',') + '}';
}

Object.fromJSON = function(r) 
{
  try
  {
	var obj = eval( '(' + r + ')' )
    
    return obj
  }
  catch(e)
  {
	throw {error:true, source: 'Object.fromJSON', message:e.message+':\n'+r}
  }
}
