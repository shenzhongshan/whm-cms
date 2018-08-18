$(function () {
	
	
	$('.subnavbar').find ('li').each (function (i,item) {
	
		var mod = i % 3; 
		if (mod === 2) {
			$(this).addClass ('subnavbar-open-right');
		}
		
	});
	
	
	
});
