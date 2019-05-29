var audio;

//Hide Pause Initially
 $('#pause').hide();
 
 //initializer - play first song 
 initAudio($('#playlist li:first-child'));
 
 	function initAudio(element){
		var song=element.attr('song');
		var title=element.text();
		var cover=element.attr('cover');
		var artist=element.attr('artist');
		
		//create a New Audio Object
		audio=new Audio('media/' + song);
		
		if(!audio.currentTime){
			$('#duration').html('0.00');
		}
		
		$('#audio-player .title').text(title);
		$('#audio-player .artist').text(artist);
		
		//insert cover image
		$('img.cover').attr('src','images/covers/' + cover);
		
		$('#playlist li').removeClass('active');
		element.addClass('active');
	}
	
	
	// play button
	$('#play').click(function (){
		audio.play();
		$('#play').hide();
		$('#pause').show();
		$('#duration').fadeIn(400);
		showDuration();
	});
		
		// puase button
		$('#pause').click(function (){
			audio.pause ();
			$('#pause').hide();
			$('#play').show();
		});
		
		// stop button
		$('#stop').click(function (){
			audio.pause ();
			audio.currentTime=0;
			$('#pause').hide();
			$('#play').show();
			$('#duration').fadeOut(400);
		});
		
		// playlist song click
		$('#playlist li').click(function (){
			audio.pause ();
			initAudio($(this));
			$('#play').hide();
			$('#pause').show();
			$('#duration').fadeIn(400);
			audio.play();
			showDuration();
		});
		
		// volume control
		$('#volume').change(function (){
			audio.volume=parseFloat (this.value/10);
		});
		
		// time duration
		function showDuration(){
		$(audio).bind('timeupdate',function(){
			//get hours and minutes 
			var s=parseInt(audio.currentTime%60);
			var m=parseInt((audio.currentTime/60)%60);
			//add 0 if seconds less than 10 
			if (s<10){
				s='0' + s;
			}
			$('#duration').html(m+'.' + s);
			var value=0;
			if (audio.currentTime>0){
				value=Math.floor((100/audio.duration)* audio.currentTime);
			}
			$('#progress').css('width',value+'%');
		});
		}