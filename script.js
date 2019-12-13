




function documentZomato (){
  getLocation(showPosition);
  
  //I am inserting the variables related to our needed calls below.
  // var categoryOfFood =    ; 
  // var locationInput =     ;
  
  
  //Zomato
  // https://developers.zomato.com/api/v2.1/categories?apikey=a8b1c7f2b94bb788e758da420a09e59b
  
  var zomatoQueryURL = "https://developers.zomato.com/api/v2.1/categories?"+zomatoApiKey
  var zomatoApiKey = "apikey=a8b1c7f2b94bb788e758da420a09e59b"
  var zomatoCuisine = "BBQ" //clickedButton
  var latVar;
  var lonVar;
  // var DineIn = dineInButton
  
  function getLocation() {
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

  zomatoSearch();
  function zomatoSearch(){

    
    $.ajax({
      "url": "https://developers.zomato.com/api/v2.1/categories?&lat="+latVar+"&lon="+lonVar+"&"+zomatoCuisine+"&count=5&"+zomatoApiKey 
    }).then(function(response) {
      
      console.log("*");
      console.log(response);
      
    });
    
    
  }
  
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

}