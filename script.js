


//I am inserting the variables related to Yelp below.
// var yelpURL = ;
var yelpAPIKey = "QvK7So9Lc_c8kU378kzQf6dIMUnsjRhellpZwV-CdIPnUpAuRLm3bUqvNLqf9wY74ioOzqWdFRtt-pWemMsqXI9OLxPLRNt5JuvRtEmjR72fQjydjIEMGAlfMqfyXXYx"
// var categoryOfFood =    ; 
// var locationInput =     ;



// var queryURL = "https://api.yelp.com/v3/";    
var queryURL = `https://api.yelp.com/v3/autocomplete?text=del&latitude=47.6205&longitude=122.3493`


function search(){

    
    // $.ajax({
    //     url: queryURL,
    //     method: "GET",
    //     headers: {
    //         "accept": "application/json",
    //         "Access-Control-Allow-Origin":"*",
    //         "Authorization": `Bearer ${yelpAPIKey}`
    //     }
    // }).then(function(res) {
    //     var results = res.data
    //     console.log(results);
    // });
    
};


//Zomato
// https://developers.zomato.com/api/v2.1/categories?apikey=a8b1c7f2b94bb788e758da420a09e59b

var zomatoQueryURL = "https://developers.zomato.com/api/v2.1/categories?"+zomatoApiKey
var zomatoApiKey = "apikey=a8b1c7f2b94bb788e758da420a09e59b"

function zomatoSearch(){
    
    $.ajax({
        "url": "https://developers.zomato.com/api/v2.1/categories?"+zomatoApiKey 
        }).then(function(response) {
      
         console.log("*");
         console.log(response);
      
      });
    

}

// https://developers.zomato.com/api/v2.1/search?entity_type=city&q=asian&count=4&lat=47.60357&lon=-122.32945 This one has lon and lat as examples. 

$.ajax({
    "url": "https://developers.zomato.com/api/v2.1/cuisines?city_id=279&"+zomatoApiKey
    }).then(function(response) {
  
     console.log("cusinetest");
     console.log(response);
  
  });

  $.ajax({
    "url": "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=asian&count=9&"+zomatoApiKey
    }).then(function(response) {
  
     console.log("* asian cusine");
     console.log(response)
  
  });


//find users geoLocation
// var x = document.getElementById("demo");

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else { 
//     console.log ("Geolocation is not supported by this browser.");
//   }
// }

// function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude + 
//   "<br>Longitude: " + position.coords.longitude;
// }



//

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
}





// function searchFood(){

    
//     // this is the yelp AJAX call.
//     $.ajax({
//         url: yelpURL,
//         method: "GET" https://api.yelp.com/v3/businesses/search;
//     }).then(function(response) {
        
        
        
//     });
// };