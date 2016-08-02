# ResponsiveClass

## Quick start


1. Add special class-* attributes to any of your HTML element. 
2. Associate your formats to a custom media-query or use the built-in formats.
3. On start and on each window's resize, ResponsiveClass will apply the class of the matched formats.
4. Enjoy.

In your HTML :
>  &lt;article class="rc" class-small="firstVariant" class-medium="secondVariant" class-large="thirdVariant"&gt; ... &lt;/article&gt;

In your javascript :
> var rc = RC.make();



## More infos 

* You must add the trigger "rc" class to let the lib know that you want to use it on this element.
* You can redefine all/some/none of the built-in formats (small, medium, large) (see below)
* Your media queries can overlap. The classes are stacked.
* You can define multiple classes in the class-* attributes.

## Config

You can configure lots of things by passing an object to the "make" method: 

* **registerSelector** is the trigger selector for each element. Default is '.rc'
* **attributeNamePrefix** is the prefix used for special attribute. Default is 'class-'
* **onResizeTimeOut** is the time (in ms) wait before refreshing the classes after each resize. Default is 100
* **showLog** control the output in console. Default is false
* **withDefaultFormats** initiate the instance with default formats and media-queries (see below). Default is true
* **autoStart** delay or not the first start. Useful when you want to redifine formats before starting the lib. Default is true. 

## Redifining formats and media-queries

You can define as many formats as you want by using the setClassFormat method. By default, we define these 3 formats for you : 

> var rc = RC.make();

> rc.setClassFormat("small", '(max-width: 600px)');

> rc.setClassFormat("medium", '(min-width: 601px) and (max-width: 1100px)');

> rc.setClassFormat("large", '(min-width: 1101px)');

You can define or redifine whatever formats you want.

