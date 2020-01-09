$(document).ready(function(){

//Array of pre-selected items [id]
var selected_icon_options= ["6","12","13","5"] ; 

//Json object of all available items {id:title}
var icon_options= {"1":"ALL WEATHER","2":"SPORT TOURING","3":"CAR\/CUV\/SUV","4":"3PMSF","5":"MUD AND SNOW","6":"ALL SEASON","7":"TOURING","8":"HIGHWAY TERRAIN","9":"4X4\/LIGHT TRUCK","10":"ALL TERRAIN","12":"SUV\/LIGHT TRUCK","13":"RENEGADE TERRAIN","14":"MUD TERRAIN","15":"URBAN","16":"TRAILER","17":"SUMMER","18":"SPORT","19":"RUN-FLAT","20":"SUV","21":"ECO TOURING","22":"CAR","23":"WINTER","24":"WINTER NORDIC","25":"STUDDED","26":"EXTENDED MOBILITY","27":"POR","28":"VAN","29":"CAR\/CUV","30":"RUGGED TERRAIN","31":"FREE ROLLING TYRE","32":"CLASSIC","33":"4X4"} ;
                    
  var icons_selector= $('select.icons-selector');
	if (icons_selector.length>0) {

		//Select2 init
		var selectEl = icons_selector.select2({
			placeholder: "Select Icons",
			closeOnSelect:false
		});
    	
    	//Sortable init
		selectEl.next().children().children().children().sortable({
			containment: 'parent', 
			create: function( event, ui ) {

				//Check if provided pre-selected items
				if (selected_icon_options!=='') {

					//Loop for already selected options in provided order.
					$.each(selected_icon_options, function(i, el){ 
						var title = icon_options[el];
							$('.result').append(title+', ');//HTML Check  
            			var newOption = new Option(title, el, true, true);
            				selectEl.append(newOption).trigger('change');
            				console.log(el+' '+title);//Console Check  
					});

				}
			},
			update: function (event, ui) {

				//Loop for all selected options after update.
				ui.item.parent().children('[title]').each(function () {
					var title = $(this).attr('title');
					var original = $( 'option:contains(' + title + ')', selectEl ).filter(function() {return $(this).text() === title; }).first();
					console.log(title+' '+original);//Console Check  
					original.detach();
					selectEl.append(original)
				});
				selectEl.trigger('change');

			}
		});

	}


  //Submit button click function
  $('.submit').on('click', function(e){
  	e.preventDefault();
  	$('.result').text($('.icons-selector').val());//HTML Check  
  });


});