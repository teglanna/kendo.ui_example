$(document).ready(function() {
	
	function preprocessData(data) {
		//ez egy hack lesz
//		if (! Array.isArray(data)) {
//			return data;
//		}
//		return data.map(function(item) {
//		  return changeIconInItem(item);
//		});

		for (var i=0; i<data.length; i++){
			changeIconInItem(data[i]);
		}
		return data;		

	}
	
	/* Change Icon string to image */
	function changeIconInItem(documentItem) {

    	if (documentItem.Icon === "excel") {
    		documentItem.Icon = "images/excel.png";
    	}
    	else if (documentItem.Icon === "word") {
    		documentItem.Icon = "images/word.png";
    	}
    	else if (documentItem.Icon === "powerpoint") {
    		documentItem.Icon = "images/pp.png";
    	}
    	else if (documentItem.Icon === "Folder") {
    		documentItem.Icon = "images/folder.png";
    	}
    	else {
    		documentItem.Icon = "images/pic.png";
    	}
    	return documentItem;
	}

	/* Kendo Grid */
    $("#grid").kendoGrid({
        dataSource: {
            data: documents,
            schema: {
            	parse: function(data){
		             return preprocessData(data);
		           },
                model: {
                    fields: {
                        Id: { type: "number" },
                        DisplayName: { type: "string", editable: true },
                        Path: { type: "string" },
                        ModificationDate: { type: "date"},
                        IsFolder: { type: "boolean" },
                        Icon: { type: "string" },
                        ModifiedBy: { type: "string" }
                    }
                }
            },
            pageSize: 15
        },
//        height: 550,
        scrollable: false,
        sortable: true,
        selectable: "row",
        change: onChange,
        //filterable: true,
        pageable: {
            input: true, //tudod állítani
            numeric: false //kiirja, hogy page 1 stb.
        },
		
//writeable editable: true,
        editable: "popup",                     
		columns: [	
        { field: "DisplayName", title: "TITLE", template: '<div class="pipe"></div>\
        <div class="icons"><img src=" #= Icon # "></div>\
        <div class="menu"> #= DisplayName # </div>', 
        attributes: {
        	"class": "title_a"
        },
         editable:true, width: "400px" },
        { field: "ModificationDate", title: "LAST MODIFIED", template: "#= kendo.toString(ModificationDate, \"MM/dd/yyyy\") #", width: "130px" },
        { field: "ModifiedBy", title: "MODIFIED BY", width: "130px" },                            
		{ command: "edit", title: "&nbsp;", width: 200 },
		{ command: { name: "destroy", text: ""}, title: "&nbsp;", width: "200px", field: "" } //, footerTemplate: '<div class="row_data"></div>'
    	]
    });

	/*Context Menu*/
	var initMenu = function () {
        menu = $("#context-menu").kendoContextMenu({
            target: ".menu",
            animation: {
                open: { effects: "fadeIn" },
                duration: 500
            },
            select: function(e) {
                // do something
            }
        });
	};

	initMenu();

	/* Selected Row */
	function onChange() {
		var grid = $("#grid").data("kendoGrid");
		var row = grid.dataItem(grid.select());
//		$("tfoot.k-grid-footer").html('<div class="k-widget row_data">'+"Id: " +row.Id+ "</br> Name: "+row.DisplayName+ "</br> Modification Date: " + row.ModificationDate +"</br> Admin: "+ row.ModifiedBy+'</div>');
		$('.row_data').html("Id: " +row.Id+ "</br> Name: "+row.DisplayName+ "</br> Modification Date: " + row.ModificationDate +"</br> Admin: "+ row.ModifiedBy);

		$("tr").click(function (e) {
			$(".k-state-selected").find(".pipe").addClass("tick");
			$(this).siblings().find(".pipe").removeClass("tick");
		});
	}

//			$('#grid').data('kendoGrid').dataSource.read();
//			$('#grid').data('kendoGrid').refresh();

});	
