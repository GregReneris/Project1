

var zomatoApiKey = "a8b1c7f2b94bb788e758da420a09e59b"
var latVar;
var lonVar;

function getLocation() {
  console.log("Getting Location")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.text = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var x = $("#coord");
  
  x.text("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude);
  latVar = position.coords.latitude;
  lonVar = position.coords.longitude;
}


function documentZomato (){
  getLocation(showPosition);
  
  //I am inserting the variables related to our needed calls below.
  // var categoryOfFood =    ; 
  // var locationInput =     ;
  
  
  //Zomato
  // https://developers.zomato.com/api/v2.1/categories?apikey=a8b1c7f2b94bb788e758da420a09e59b
  
  var zomatoQueryURL = "https://developers.zomato.com/api/v2.1/categories?"+zomatoApiKey
  
  //var zomatoCuisine = $('buttonInput').click(val);
  // var DineIn = dineInButton
  



  

  
  // https://developers.zomato.com/api/v2.1/search?entity_type=city&q=asian&count=4&lat=47.60357&lon=-122.32945 This one has lon and lat as examples. 
  
  // this is a search for a cuisine test
  // $.ajax({
  //   "url": "https://developers.zomato.com/api/v2.1/cuisines?city_id=279&"+zomatoApiKey
  // }).then(function(response) {
    
  //   console.log("cusinetest");
  //   console.log(response);
    
  // });
  // // this is a test of asian cuisine count 9.
  // $.ajax({
  //   "url": "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=asian&count=9&"+zomatoApiKey
  // }).then(function(response) {
    
  //   console.log("* asian cusine");
  //   console.log(response)
    
  // });
  
  
  
  // this is the geolocation function. Currently have it running on a click button.

  x.text("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude);
  AGmap(lonVar,latVar)
}

function zomatoSearch(){
  console.log("made it to the code");

  query = "";
  $(".foodSelection").each(function(){
    if($(this).is(":checked")) {
      query = query + $(this).val()+" ";
    }
  })
  query= query.trim();
  console.log(query);



   $.ajax({
     "url": "https://developers.zomato.com/api/v2.1/search"+
              "?entity_type=city"+
              "&q="+encodeURIComponent(query)+
              "&count=5"+
              "&lat="+latVar+
              "&lon="+lonVar+
              "&apikey="+zomatoApiKey 
   }).then(function(response) {
      restaurants = []
      response.restaurants.forEach(element => {
        restaurants.push(element.restaurant);    
      });
    
    createCards(restaurants);
      
     console.log("*");
     console.log(response);
   });
  
  
}

function createCards(restaurants){
  cards = $("#cards");
  cards.empty();

  restaurants.forEach(r => {
    html = $( "<div>" );
    html.append( $('<div class="one">') ).append( $('<img>').attr("src", r.thumb)) ;
    // html.append( $('<div class="one">').text(r.name)  );
    html.append( $('<div class="one">') ).append( $('<a>').attr("href", r.url).text(r.name)) ;
    html.append( $('<div class="one">').text(r.name)  );
    html.append( $('<div class="one">').text(r.phone_numbers)  );
    html.append( $('<div class="one">').text(r.location.address)  );
    html.append( $('<div class="one">').text(r.location.city)  );
    r.establishment.forEach (e =>{
      html.append( $('<div class="one">').text(e)  );
    })
    // r.highlights.forEach(h => {
    //   html.append( $('<div class="one">').text(h)  );
    // })
    html.append( $('<div class="one">').text(r.highlights.join(", ")));  
    cards.append(html);
    console.log(r.name);
  });
};



function AGmap(){
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([ lonVar, latVar]),
      zoom: 10
    })
    
  });

}