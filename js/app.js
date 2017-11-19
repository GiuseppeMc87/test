function productList(fil=[]){ 
  var url = "products.json";
  
  $.getJSON( url, {
    format: "json"
  })
    .done(function( data ) {
      var out_put='';
      $.each( data, function( i, item ) {
      	var showOut='';
      	if(Object.keys(fil).length>0){
			for (var key in fil){
				var strFil=fil[key];
				var lowFilVal=strFil.toLowerCase();
				var keyLow=key.toLowerCase();
				var itemTe=item['specs'][keyLow];
     			
     			if(typeof itemTe !== 'number'){
     				var itemLow=itemTe.toLowerCase();
     			}else{
     				itemLow=itemTe;
     			}
     			if (lowFilVal.indexOf('--'+itemLow+'--') >= 0){
     				showOut=1;
     			}else{
     				showOut=null;
     				break;
     			}
			}
     	}else{
      		showOut=1;
      	}
      	
      	if(showOut){
      		out_put+='<li>'
					+'<a href="#'+item.id+'" class="product-photo">'
						+'<img src="'+item.image.small+'" height="130" alt="'+item.name+'">'
					+'</a>'
					+'<h2><a href="#">'+item.name+'</a></h2>'
					+'<ul class="product-description">'
						+'<li><span>Manufacturer: </span>'+item.specs.manufacturer+'</li>'
						+'<li><span>Storage: </span>'+item.specs.storage+'</li>'
						+'<li><span>OS: </span>'+item.specs.os+'</li>'
						+'<li><span>Camera: </span>'+item.specs.camera+'</li>'
						+'<li><span>Description: </span>'+item.description+'</li>'
					+'</ul>'
					+'<p class="product-price">'+item.price+'</p>'
				+'</li>';      		
      	}


      });
      if(out_put===''){
      	out_put='<li>There are no phones matching the filter</li>'
      }
       $('.products-list').html(out_put);
    })
    .fail(function() {
    	console.log( "error json" );
 	})
}

$( ".filter-criteria input[type=checkbox]" ).on( "change", function() {
	var out=[];
	$.each( $(".filter-criteria input[type=checkbox]"), function( i, filter ) {
		if($(this).is(':checked')){
			cl=$(this).attr('class');
			val=$(this).attr('value');
			if(!out[cl]){ out[cl]='';}
			out[cl]=out[cl]+'--'+val+'--';

	 	}
	});
	productList(out);
});

$( document ).ready(function() {
  productList();
});

$(".filter-clear").on('click',function(){
	$(".filter-criteria input[type=checkbox]").attr('checked', false);
	productList();
});
