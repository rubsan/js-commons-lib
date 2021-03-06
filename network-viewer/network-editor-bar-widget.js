function NetworkEditorBarWidget(networkWidget){
	this.networkWidget = networkWidget;
//	console.log(this.networkWidget );
	
	
};

NetworkEditorBarWidget.prototype.changeEdgeShape = function(value){
	var classe = "DirectedLineEdgeNetworkFormatter";
	if (value == "DirectedLineEdgeNetworkFormatter"){
		classe = "DirectedLineEdgeNetworkFormatter";
	}
	if (value == "undirected"){
		classe = "LineEdgeNetworkFormatter";
	}
	if (value == "inhibited"){
		classe = "CutDirectedLineEdgeNetworkFormatter";
	}
	if (value == "dot"){
		classe = "DotDirectedLineEdgeNetworkFormatter";
	}

	if (value == "odot"){
		classe = "OdotDirectedLineEdgeNetworkFormatter";
	}
	if (value == "odirected"){
		classe = "OdirectedLineEdgeNetworkFormatter";
	}
	for ( var i = 0; i < this.networkWidget.getSelectedEdges().length; i++) {
		this.networkWidget.getFormatter().changeEdgeType(this.networkWidget.getSelectedEdges()[i], classe);
	}
};
	
NetworkEditorBarWidget.prototype.changeShape = function(value){
	var classe = "CircleNetworkNodeFormatter";
	switch (value){
			case "square": classe = "SquareVertexNetworkFormatter"; break;
			case "circle": classe = "CircleVertexNetworkFormatter";  break;
			case "ellipse": classe = "EllipseVertexNetworkFormatter";  break;
			case "rectangle": classe = "RectangleVertexNetworkFormatter";  break;
			case "rounded": classe = "RoundedVertexNetworkFormatter";  break;
//			case "octagon": classe = "OctagonVertexNetworkFormatter";  break;
			default: classe = "CircleNetworkNodeFormatter";
	}
	for ( var i = 0; i < this.networkWidget.getSelectedVertices().length; i++) {
			this.networkWidget.getFormatter().changeNodeType(this.networkWidget.getSelectedVertices()[i], classe);
	}
};


NetworkEditorBarWidget.prototype.changeOpacity = function(opacityString){
	var opacity = 1;
	if (opacityString == "none"){
		opacity = 1;
	}
	if (opacityString == "low"){
		opacity = 0.8;
	}
	if (opacityString == "medium"){
		opacity = 0.5;
	}
	if (opacityString == "high"){
		opacity = 0.2;
	}
	if (opacityString == "invisible"){
		opacity = 0;
	}
	
	for ( var i = 0; i < this.networkWidget.getSelectedVertices().length; i++) {
		this.networkWidget.setVertexOpacity(this.networkWidget.getSelectedVertices()[i], opacity);
	}
	
	for ( var i = 0; i < this.networkWidget.getSelectedEdges().length; i++) {
		this.networkWidget.setEdgeStrokeOpacity(this.networkWidget.getSelectedEdges()[i], opacity);
	}
};

NetworkEditorBarWidget.prototype.setNetworkWidget = function(networkWidget){
	var _this = this;
	this.networkWidget = networkWidget;
	
	this.networkWidget.onVertexSelect.addEventListener(function (sender, id){
		_this.onSelect();
	});
	
	this.networkWidget.onEdgeSelect.addEventListener(function (sender, id){
		_this.onSelect();
	});
	
	this.networkWidget.onCanvasClicked.addEventListener(function (sender, id){
		_this.deselect();
	});
	
	this.deselect();
	
};

NetworkEditorBarWidget.prototype.changeSize = function(size){
	for ( var i = 0; i < this.networkWidget.getSelectedVertices().length; i++) {
		this.networkWidget.getFormatter().getVertexById(this.networkWidget.getSelectedVertices()[i]).getDefault().setSize(size);
		this.networkWidget.getFormatter().getVertexById(this.networkWidget.getSelectedVertices()[i]).getSelected().setSize(size);
		this.networkWidget.getFormatter().getVertexById(this.networkWidget.getSelectedVertices()[i]).getOver().setSize(size);
		this.networkWidget.getFormatter().getVertexById(this.networkWidget.getSelectedVertices()[i]).getDragging().setSize(size);
	}
	
	for ( var i = 0; i < this.networkWidget.getSelectedEdges().length; i++) {
		this.networkWidget.getFormatter().getEdgeById( this.networkWidget.getSelectedEdges()[i]).getDefault().setStrokeWidth(size);
		this.networkWidget.getFormatter().getEdgeById( this.networkWidget.getSelectedEdges()[i]).getSelected().setStrokeWidth(size);
		this.networkWidget.getFormatter().getEdgeById( this.networkWidget.getSelectedEdges()[i]).getOver().setStrokeWidth(size);
		this.networkWidget.getFormatter().getEdgeById( this.networkWidget.getSelectedEdges()[i]).getDragging().setStrokeWidth(size);
	}
};

NetworkEditorBarWidget.prototype.deselect = function(){
	this.textBoxName.disable(true);
	this.strokeColorPickerButton.disable(true);
	this.colorPickerButton.disable(true);
	this.comboBoxOpacity.disable(true);
	this.comboSize.disable(true);
	this.comboBoxEdge.disable(true);
};

NetworkEditorBarWidget.prototype.onSelect = function(){
		var nodesSelectedCount = this.networkWidget.getSelectedVertices().length;
		var edgesSelectedCount =  this.networkWidget.getSelectedEdges().length;

		if ((nodesSelectedCount > 0)){
//			this.comboBoxEdge.setV([{name:"directed"},{name:"odirected"},{name:"undirected"},{name:"inhibited"},{name:"dot"},{name:"odot"}]);
			this.textBoxName.enable(true);
			if (edgesSelectedCount >0){
				this.strokeColorPickerButton.disable(false);
//				this.comboEdgeType.disable(false);
			}
		}
		
		/** Solo un nodo seleccionado **/
		if ((nodesSelectedCount == 1)&&(edgesSelectedCount == 0)){
			this.textBoxName.enable(true);
			this.strokeColorPickerButton.enable(true);
			this.colorPickerButton.enable(true);
			this.comboBoxNode.enable(true);
			this.comboBoxOpacity.enable(true);
			this.comboBoxEdge.disable(true);
			this.comboSize.enable(true);
			this.textBoxName.setValue(this.networkWidget.getDataset().getVertexById(this.networkWidget.getSelectedVertices()[0]).getName());
			this.comboSize.setValue(this.networkWidget.getFormatter().getVertexById(this.networkWidget.getSelectedVertices()[0]).getDefault().getSize()+"");
		}
		/** Solo una arista seleccionado **/
		if ((nodesSelectedCount == 0)&&(edgesSelectedCount >= 1)){
//			this.textBoxName.enable(true);
			
		//	this.strokeColorPickerButton.disable(false);
			this.colorPickerButton.enable(true);
			this.comboBoxOpacity.enable(true);
			this.comboBoxEdge.enable(true);
			this.comboSize.enable(true);
			this.comboBoxNode.disable(true);
		//	this.comboEdgeType.enable(true);
		//	this.textBoxName.disable(false);
		}
};

NetworkEditorBarWidget.prototype.changeStroke = function(color){
	for ( var i = 0; i < this.networkWidget.getSelectedVertices().length; i++) {
		this.networkWidget.setVertexStroke(this.networkWidget.getSelectedVertices()[i], color);
	}
};

NetworkEditorBarWidget.prototype.changeStrokeWidth = function(value){
//	debugger
	for ( var i = 0; i < this.networkWidget.getSelectedVertices().length; i++) {
		this.networkWidget.getFormatter().getVertexById( this.networkWidget.getSelectedVertices()[i]).getDefault().setStrokeWidth(value);
	}
	
	for ( var i = 0; i < this.networkWidget.getSelectedEdges().length; i++) {
//		this.networkWidget.getSelectedEdges()[i].getDefault().setStrokeWidth(value);
		
		this.networkWidget.getFormatter().getEdgeById(this.networkWidget.getSelectedEdges()[i]).getDefault().setStrokeWidth(value);
	}
	
//	for ( var i = 0; i < this.networkWidget.getSelectedVertices().length; i++) {
//		this.networkWidget.setVertexFill(this.networkWidget.getSelectedVertices()[i], color);
//	}
//	
//	for ( var i = 0; i < this.networkWidget.getSelectedEdges().length; i++) {
//		this.networkWidget.setEdgeStroke(this.networkWidget.getSelectedEdges()[i], color);
//	}
};

NetworkEditorBarWidget.prototype.changeColor = function(color){
	
	for ( var i = 0; i < this.networkWidget.getSelectedVertices().length; i++) {
		this.networkWidget.setVertexFill(this.networkWidget.getSelectedVertices()[i], color);
	}
	
	for ( var i = 0; i < this.networkWidget.getSelectedEdges().length; i++) {
		this.networkWidget.setEdgeStroke(this.networkWidget.getSelectedEdges()[i], color);
	}
};

NetworkEditorBarWidget.prototype.changeName = function(name){
	for ( var i = 0; i < this.networkWidget.getSelectedVertices().length; i++) {
		this.networkWidget.getDataset().getVertexById(this.networkWidget.getSelectedVertices()[i]).setName(name);
	}
};

NetworkEditorBarWidget.prototype.getBar = function(){
		var _this = this;

		this.textBoxName = Ext.create('Ext.form.field.Text',{
			emptyText: 'Enter node name',
			width:200,
			enableKeyEvents:true,
				listeners:{
					scope:this,
					keyup:function() {
						this.changeName(this.textBoxName.getValue());
	       			}
				}
	    });
	   
	    var innerColorPicker = Ext.create('Ext.picker.Color', {
		    value: '993300',
		    listeners: {
		    	scope:this,
		        select: function(picker, selColor) {
	    			this.changeColor("#" + selColor);
		        }
		    }
		});
	    this.colorPickerButton = Ext.create('Ext.button.Button',{
			    text : 'Color',
			    menu: new Ext.menu.Menu({
						items: innerColorPicker
			          })
		});
		
		var strokeColorPickerButton = Ext.create('Ext.picker.Color', {
		    value: '993300',  // initial selected color
		    listeners: {
		    	scope:this,
		        select: function(picker, selColor) {
					this.changeStroke("#" + selColor);
		        }
		    }
		});
		this.strokeColorPickerButton = Ext.create('Ext.button.Button',{
			    text : 'Stroke color',
			    menu: new Ext.menu.Menu({
						items: strokeColorPickerButton
			          })
		});
		
	    var storeSizes = Ext.create('Ext.data.Store', {
	    	fields: ['name'],
	    	data : [{name:"1"},{name:"2"},{name:"3"},{name:"4"},{name:"5"},{name:"6"},{name:"7"},{name:"8"},
	    			{name:"10"},{name:"12"},{name:"14"},{name:"16"},{name:"18"},{name:"22"},{name:"28"},{name:"36"},{name:"72"}]
		});
	    this.comboSize = Ext.create('Ext.form.ComboBox', {
		    emptyText: 'number',
		    width:75,
		    store: storeSizes,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'name',
		    listeners:{
					scope:this,
					select:function(sender, value) {
	    					this.changeSize(this.comboSize.getValue());
	       			}
			}
		});
		
		var storeOpacitys = Ext.create('Ext.data.Store', {
	    	fields: ['name'],
	    	data : [{name:"none"},{name:"low"},{name:"medium"},{name:"high"},{name:"invisible"}]
		});
		this.comboBoxOpacity = Ext.create('Ext.form.ComboBox', {
		    emptyText: 'level',
		    width:100,
		    store: storeOpacitys,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'name',
		    listeners:{
					scope:this,
					select:function() {
						this.changeOpacity(this.comboBoxOpacity.getValue());
	       			}
			}
		});
		

		    var storeStrokeSizes = Ext.create('Ext.data.Store', {
		    	fields: ['name'],
		    	data : [{name:"1"},{name:"2"},{name:"3"},{name:"4"},{name:"5"},{name:"6"},{name:"7"},{name:"8"},
		    			{name:"10"},{name:"12"},{name:"14"},{name:"16"},{name:"18"},{name:"22"},{name:"28"},{name:"36"},{name:"72"}]
			});
		  this.comboStrokeWidth = Ext.create('Ext.form.ComboBox', {
			    emptyText: 'number',
			    width:75,
			    store: storeStrokeSizes,
			    queryMode: 'local',
			    displayField: 'name',
			    valueField: 'name',
			    listeners:{
						scope:this,
						select:function(sender, value) {
		    					this.changeStrokeWidth(this.comboStrokeWidth.getValue());
		       			}
				}
			});
		  
		var storeEdges = Ext.create('Ext.data.Store', {
	    	fields: ['name'],
	    	data : [{name:"directed"},{name:"odirected"},{name:"undirected"},{name:"inhibited"},{name:"dot"},{name:"odot"}]
		});
		this.comboBoxEdge = Ext.create('Ext.form.ComboBox', {
		    emptyText: 'style',
		    width:100,
		    store: storeEdges,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'name',
		    listeners:{
					scope:this,
					select:function() {
						this.changeEdgeShape(this.comboBoxEdge.getValue());
	       			}
			}
		});
		
		var storeNodes = Ext.create('Ext.data.Store', {
	    	fields: ['name'],
	    	data : [{name:"circle"},{name:"square"},{name:"ellipse"},{name:"rectangle"},{name:"rounded"}]
		});
		
		this.comboBoxNode = Ext.create('Ext.form.ComboBox', {
		    emptyText: 'figure',
		    width:100,
		    store: storeNodes,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'name',
		    listeners:{
					scope:this,
					select:function() {
						this.changeShape(this.comboBoxNode.getValue());
	       			}
			}
		});
		
		var nameLabel = Ext.create('Ext.toolbar.TextItem', {html:'Name:'});
		var sizeLabel = Ext.create('Ext.toolbar.TextItem', {html:'Size:'});
		var strokeWidthLabel = Ext.create('Ext.toolbar.TextItem', {html:'Stroke Width:'});
		var opacityLabel = Ext.create('Ext.toolbar.TextItem', {html:'Opacity:'});
		var edgeLabel = Ext.create('Ext.toolbar.TextItem', {html:'Edge:'});
		var nodeLabel = Ext.create('Ext.toolbar.TextItem', {html:'Node:'});
		
		var editionBar = Ext.create('Ext.toolbar.Toolbar', {
			cls : "bio-toolbar-bot",
			height : 35,
			border : 0,
			items : [nameLabel,this.textBoxName,sizeLabel,this.comboSize,
			         this.colorPickerButton,
			         "-",
			         strokeWidthLabel,
			         this.comboStrokeWidth,
			         this.strokeColorPickerButton,
			         "-",
			         opacityLabel,
			         this.comboBoxOpacity,
			         edgeLabel,
			         this.comboBoxEdge,
			         nodeLabel,
			         this.comboBoxNode]
		});
		return editionBar;
};