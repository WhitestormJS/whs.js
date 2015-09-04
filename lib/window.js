var WINDOW = {
	ms_Width: 0,
	ms_Height: 0,
	ms_Callbacks: {
		70: "WINDOW.ToggleFullScreen()",		// Toggle fullscreen
	},

	Initialize: function()
	{
		this.UpdateSize();

		// Create callbacks from keyboard
		$(document).keydown( function( inEvent ) { WINDOW.CallAction( inEvent.keyCode ); } ) ;
		$(window).resize( function( inEvent ) {
			WINDOW.UpdateSize();
			WINDOW.ResizeCallback( WINDOW.ms_Width, WINDOW.ms_Height );
		} );
	},
	UpdateSize: function()
	{
		this.ms_Width = $(window).width();
		this.ms_Height = $(window).height() - 4;
	},
	CallAction: function( inId )
	{
		if( inId in this.ms_Callbacks )
		{
			eval( this.ms_Callbacks[inId] );
			return false ;
		}
	},
	ToggleFullScreen: function()
	{
		if( !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement )
		{
			if( document.documentElement.requestFullscreen )
				document.documentElement.requestFullscreen();
			else if( document.documentElement.mozRequestFullScreen )
				document.documentElement.mozRequestFullScreen();
			else if( document.documentElement.webkitRequestFullscreen )
				document.documentElement.webkitRequestFullscreen( Element.ALLOW_KEYBOARD_INPUT );
		}
		else
		{
			if( document.cancelFullScreen )
				document.cancelFullScreen();
			else if( document.mozCancelFullScreen )
				document.mozCancelFullScreen();
			else if ( document.webkitCancelFullScreen )
				document.webkitCancelFullScreen();
		}
	},
	ResizeCallback: function( inWidth, inHeight ) {},
};
