# DragToInvoke #
simple jQuery plugin to create draggable switches.

## How it works ##

The plug-in requires a single element to get started. This element should have relative positioning, a width set and no padding. This defines the draggable area.
The jQuery plugin should be called on this element like so:

		$("#my-el").dragToInvoke({ ... });

The plugin adds a child element which becomes the handle. This has a class of handle and no styles added by the javascript so it can be styled in your css; it just needs absolute positioning and a width set to be functional.

Mouse and touch event handlers are set up on the handle to detect clicks and drags. If the mouse button is held down / a touch happens for less than 150ms, the plugin treats this as a directive to change state – if it's on it will switch to off and vice versa.

If the mouse/touch action lasts more than 150ms, the plugin treats this input as a drag and will move the handle base on the mouse or touch position. When the drag is finished, the handles position is compared to a balance point – an optional bias – and moves to the nearest state – on or off, where a callback is fired.

Please note that this "autoswitch" feature can be disabled by setting the `enableAutoSwitch` option to false

## Available Options ##

    {
      onFunc : function ($handle, $dragArea) { ... },
      offFunc : function ($handle, $dragArea) { ... },
      returnTime : 100,
      balancePoint : 0.9,
      runOnce : false,
      handleText : "",
      onTest : function() { return true; },
      enableAutoSwitch :true
    }

* `onFunc` and `offFunc`

These are callback functions to be executed when the switch is move to on/off states respectively. They are passed the drag elements for convenience (you don't have to put this in your callback signature if you don't want to use it)

* `returnTime`

This is the amount of time in milliseconds that the handle animation should take to return to its nearest state.

* `balancePoint`

A value from 0–1 to define the position at which the handle should switch to on/off. Closer to 1 means that the handle has to be dropped further to the right before it will stick to the on position. In the demo this is set to 0.9.

* `runOnce`

If this is set to true, once the handle is set to the on position, all event listeners will be detached and it will no longer be interactive. If you want to add some sort of disabled class to the element to indicate this to the user, do it in the onFunc callback.

* `handleText`

If you like, you add text to your handle element with this option.

* `onTest`

A function to be executed when the handle is moved to the on position. This function should return a boolean value. If it returns true, the handle will remain in the on position and proceed to execute the onFunc callback. If the return value is false, the handle will return to the off state and the offFunc callback will be executed.

* `enableAutoSwitch` (default = `true`)

If enabled (set to `true`) a touch / click event lasting less than 150ms will automatically toggle the switch. If set to `false`, one can only trigger the switch by dragging it. In some cases this helps avoiding accidental toggle of switch.

## Usage ##
Feel free to use the plugin on any project – no attribution required, just leave a comment here if you do.
