var RC = {};

RC.make = function(userOptions) {
	return new RC.ResponsiveClass(userOptions);
};

RC.ResponsiveClass = function(userOptions){

	this.options = {
		'registerSelector': '.rc',
		'attributeNamePrefix': 'class-',
		'onResizeTimeOut' : 100,
		'showLog' : false,
		'withDefaultFormats' : true,
		'autoStart' : true,
	};

	this.formats = {};
	this.registeredElements=[];
	
	this.lastTime=0;
	this.timerResize = undefined;

	//CONSTRUCTOR
	this.construct(userOptions);
};


RC.ResponsiveClass.prototype.construct = function(userOptions){
	this.mergeObject(this.options, userOptions);
	
	if (this.options.withDefaultFormats) {
		this.setClassFormat("small", '(max-width: 600px)');
		this.setClassFormat("medium", '(min-width: 601px) and (max-width: 1100px)');
		this.setClassFormat("large", '(min-width: 1101px)');
	}

	this.log("Construction done.");

	if (this.options.autoStart) {
		this.log("autoStart is on.");
		this.updateOnResize();
	}
	
};

RC.ResponsiveClass.prototype.mergeObject = function(objectA, objectB){

	if (! objectA || ! objectB) {
		return;
	}

	for(var key in objectB) {
		objectA[key] = objectB[key];
	}

};


RC.ResponsiveClass.prototype.log = function(message, object){
	if (! this.options.showLog) {
		return;
	}

	console.log("RC - " + message );
	if (object) console.log(object);
}

RC.ResponsiveClass.prototype.setClassFormat = function(name, query){
	this.formats[name] = {"query": query, "match": 0};
}

RC.ResponsiveClass.prototype.clearClassFormats = function(){
	this.formats.clear();
}

RC.ResponsiveClass.prototype.refreshRegisteredElements = function(){
	this.registeredElements = document.querySelectorAll(this.options.registerSelector);
	this.log("Init with " + this.registeredElements.length + " element(s)");
};

RC.ResponsiveClass.prototype.updateOnResize = function(){
	this.log("Initializing resize events...");

	var self = this;
	self.update();

	window.addEventListener("resize", function(event){
		clearTimeout(self.timerResize);
		self.timerResize = setTimeout(function(){
			self.update();
		}, self.options.onResizeTimeOut);
	});

	this.log("...Done.");
}

RC.ResponsiveClass.prototype.update = function (){
	this.log("Process update...");

	this.refreshRegisteredElements();
	this.checkMatches();
	
	for (var i = 0; i < this.registeredElements.length; i++) {
		
		var element = this.registeredElements[i];
		this.processElement(element);
	};

	this.log("...Done.");
  
};

RC.ResponsiveClass.prototype.pushArray = function (array, arrayToPush){
	for (var i = 0; i < arrayToPush.length; i++) {
		array.push(arrayToPush[i]);
	};
}

RC.ResponsiveClass.prototype.checkMatches = function (){
	var formatKeys = Object.keys(this.formats);

	for (var i = 0; i < formatKeys.length; i++) {

		var formatName = formatKeys[i];
		var formatQuery = this.formats[formatName].query;

		if (window.matchMedia(formatQuery).matches) {
			this.formats[formatName].match = true;
		} else {
			this.formats[formatName].match = false;
		}
	}

}

RC.ResponsiveClass.prototype.processElement = function (element){
	this.log("Processing element...");

	var classesToAdd = [];
	var classesToRemove = [];

	var formatKeys = Object.keys(this.formats);

	for (var i = 0; i < formatKeys.length; i++) {

		var formatName = formatKeys[i];
		var formatQuery = this.formats[formatName].query;

		var attributeName = this.options.attributeNamePrefix + formatName;

		this.log("Checking attribute : [" + attributeName + "]");

		if (! element.hasAttribute(attributeName)) {
			this.log("not found.");
			continue;
		}

		this.log("found.");
	
		var attributeValue = element.getAttribute(attributeName);

		if (! attributeValue) {
			continue;
		}

		var classes = attributeValue.split(" ");

		if (this.formats[formatName].match) {
			this.pushArray(classesToAdd, classes);
		} else {
			this.pushArray(classesToRemove, classes);
		}

	};


	for (i in classesToRemove) {
		this.log("removing class : " + classesToRemove[i]);
		element.classList.remove(classesToRemove[i]);
	};

	for (i in classesToAdd) {
		this.log("adding class : " + classesToAdd[i]);
		element.classList.add(classesToAdd[i]);
	};

	this.log("...Done.");
}

    