/**
 *	dragToEnvoke is a jQuery plugin UI element.
 *	It is a draggable switch between two states,
 *	with callbacks available at each end.
 */
(function($,undefined){

    $.dragToEnvoke = function(el, parent, options){
    	
	    var base      =    this,	     // Named reference to 'this'
					state			= 	 false;			 // Set starting state
					
      base.$el      =    $(el);      // jQuery and..
      base.el       =    el;	       // ..DOM versions of element
      base.$parent  =    $(parent);  // jQuery and..
      base.parent   =    parent; 		 // ..DOM versions of parent

      // Add Reverse reference to the DOM object
      base.$el.data("dragToEnvoke", base);
			
			
			// Initialisation function
      base.init = function(){
      
        base.options = $.extend({},$.dragToEnvoke.defaultOptions, options);
				
				base.$el.html(base.options.handleText);
        
        // Permanently stop mousedowns from ever being able to select this object
        base.$parent.bind("mousedown", function(e) { e.preventDefault(); });
        
        // Bind mousedown to element
        base.$el.bind("mousedown.dragToEnvoke touchstart.dragToEnvoke", base.startDrag);
        
        // Bind reset events
        base.$parent.bind("reset.dragToEnvoke", function() {
        	base.off();
        	base.$el.bind("mousedown.dragToEnvoke touchstart.dragToEnvoke", base.startDrag);
        });
          
          
      };
      
      /*
       *	Handles a mousedown / touchstart event
       *	logs time to differ between click or drag
       */
      base.startDrag = function (e) {
					
				e.preventDefault();
				
				base.clickStartTime = new Date();
				
				$(document).bind("mousemove.dragToEnvoke touchmove.dragToEnvoke", base.updateDrag);
				$(document).bind("mouseup.dragToEnvoke touchend.dragToEnvoke", base.endDrag);
			
			};

			/*
			 *	Watches a drag and moves
			 *	the element accordingly
			 */
			base.updateDrag = function (e) {
			
				e.preventDefault();
		
				var event = e.originalEvent,
						dragTo = undefined;
				
				if (event.targetTouches !== undefined) {
					
					dragTo = event.targetTouches[0].pageX;
				
				} else {
					dragTo = e.clientX
				}
				
					base.$el.stop().css({
						left : Math.min(
											Math.max(
													0,dragTo - base.$parent.offset().left - base.$el.width()/2),
														base.$parent.width() - base.$el.width())
					});
			
			};
			
			/*
			 *	Handles a mouseup / touchend event
			 *	decides what to do based on time between
			 *	start / end, and final position of element
			 */
			base.endDrag = function (e) {
			
				e.preventDefault();
				
				$(document).unbind("mousemove.dragToEnvoke touchmove.dragToEnvoke mouseup.dragToEnvoke touchend.dragToEnvoke");
				
				if (base.options.enableAutoSwitch && (new Date() - base.clickStartTime < 150) ) {
					base.autoSwitch();
					
				} else {
				
					if ((base.$parent.width() - (base.$el.width())) * base.options.balancePoint < base.$el.position().left) {
						base.on();
					} else {
						base.off();
					}

				}
			
			};
			
			/*
			 *	If the switch is on, switch it off and vice versa.
			 */
			base.autoSwitch = function (e) {
				
				base.state ? base.off() : base.on();
				
			}
			
			/*
			 *	Switches the switch on, if supplied predicate returns true.
			 */
			base.on = function () {
				
				if (base.options.onTest(base.$el, base.$parent)) {
				
					base.options.onFunc(base.$el, base.$parent);
					
					base.$el.animate({
						left : base.$parent.width() - base.$el.width()
					}, 100);
	
					if (base.options.runOnce) {
						base.$el.addClass("disabled");
						base.$el.unbind("mousedown.dragToEnvoke touchstart.dragToEnvoke");
						base.$parent.unbind("click.dragToEnvoke");
					}
					
				} else {
					
					base.off(base.$el);
					
				}
				
			}
			
			/*
			 *	Switches the switch off
			 */
			base.off = function() {
				
				base.$el.removeClass("disabled");
				base.$el.animate({
					left : 0
				}, base.options.returnTime);
				
				base.options.offFunc(base.$el, base.$parent);
				
			}

      // Run initializer
      base.init();
      
    };

    $.dragToEnvoke.defaultOptions = {
        onFunc : function() { },
        offFunc : function() { },
        returnTime : 100,
        balancePoint : 0.9,
        runOnce : false,
        handleText : "",
        onTest : function() { return true; },
        enableAutoSwitch : true
    };

    $.fn.dragToEnvoke = function(options){
      return this.each(function(){
      	
      	// Add a handle
      	var handle = $("<div/>", {
      		"class" : "handle"
      	}).appendTo(this);
      	
      	// Add the functionality
        (new $.dragToEnvoke(handle, this, options));
        
        });
    };

})(jQuery);