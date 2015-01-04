loader.include("$")
loader.include("cms")

var DialogBox = 
{
  width:0,
  height:0,
  div:null,
  
  create:function( w, h, name )
  {
    this.width = w;
    this.height = h;
	
	if ( this.div != null ) this.close();	

    if ( this.div == null )
    {
      this.div = $$("div")
      this.div.innerHTML = cms.html( name )
      
      var new_node = this.div.childNodes[0]
      
      this.div.insertBefore = new_node
      this.div = new_node
      this.div.style.width = w+"px";
      this.div.style.height = h+"px";
      
      $("box").appendChild( this.div )
    }
  },
  
  show:function(l,t,w,h)
  {
    var div = this.div;
    div.style.left = $sb().left +l+ "px";
    div.style.top  = $sb().top  +t+ "px";
    div.style.width  = w +"px";
    div.style.height = h +"px";
  },
  
  expand:function( start, finish, time_in_secs, callback   )
  {
    var frame_rate = 1000/25;
    
    var dx = finish.x-start.x;
    var dy = finish.y-start.y;
    var distance = Math.sqrt( (dx*dx)+(dy*dy) );
    var steps = (time_in_secs*1000)/frame_rate;

    this.animation = 
    {
      start:start,
      finish:finish,
      current:start,
      frame_rate:frame_rate,
      delta:{x:dx/steps, y:dy/steps, w:this.width/steps ,h:this.height/steps },
      width:0,
      height:0,
      OnDone: callback
    };
    
    this.animation.current.w = 0; 
    this.animation.current.h = 0;
    
    this.show( start.x, start.y, 0, 0  );
    
    setTimeout( DialogBox.animate, this.animation.frame_rate );
  },

  close:function()
  {
    this.div.style.display="none"
    this.div.parentNode.removeChild(this.div)
    this.div = null
  },
  
  animate:function()
  {
    if ( DialogBox.animation.current.x >= DialogBox.animation.finish.x )
    {
      DialogBox.animation.current.x += DialogBox.animation.delta.x;
      DialogBox.animation.current.y += DialogBox.animation.delta.y;
      DialogBox.animation.current.w += DialogBox.animation.delta.w;
      DialogBox.animation.current.h += DialogBox.animation.delta.h;

      DialogBox.show( DialogBox.animation.current.x, DialogBox.animation.current.y, DialogBox.animation.current.w, DialogBox.animation.current.h );
      setTimeout( DialogBox.animate, DialogBox.animation.frame_rate )
    }
    else
    {
      DialogBox.animation.OnDone();
    }
  }
}
