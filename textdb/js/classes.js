function open_map( map, source )
{
	DialogBox,create(450,310);
	
	var start  = {x:$pos(source).x- $sb().left,y:$pos(source).y-$sb().top};
	var finish = {x:$vp().width/2 - dialog.width/2, y:$vp().height/2 - dialog.height/2};
	
	DialogBox.expand( start, finish, .25, function()
	{
		
	});
	
}


function close_dialog()
{
	dialog.close()	
}





