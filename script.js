

var zomatoApiKey = "a8b1c7f2b94bb788e758da420a09e59b"
var latVar;
var lonVar;
var vectorLayer;
var map;
var vueResults = new Vue({
  el: "#resultCards",
  data: {
    restaurants: []
  }
});
// var coords;

getLocation()
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
  AGmap();
}



function documentZomato (){
  getLocation(showPosition);
  

  x.text("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude);
  // AGmap(lonVar,latVar)
}

function zomatoSearch(query){
  console.log("made it to the code");

  url = "https://developers.zomato.com/api/v2.1/search"+
          "?entity_type=city"+
          "&q="+encodeURIComponent(query.trim())+
          "&count=5"+
          "&lat="+latVar+
          "&lon="+lonVar+
          "&apikey="+zomatoApiKey;
    console.log(url);
   $.ajax({
    "url": url 
   }).then(function(response) {
      restaurants = []
      response.restaurants.forEach(element => {
        restaurants.push(element.restaurant);    
      });

      restaurants.sort(function (b, a){
        diff = ( Number(a.user_rating.aggregate_rating) - Number(b.user_rating.aggregate_rating) );
        return diff;
      });
    //this creates an array for the restaurant output, and by using vue to 
    //put it in an array let's the HTML function like a template.
      vueResults.restaurants.splice(0);
      restaurants.forEach( function(restaurant){
        restaurant.index = vueResults.restaurants.length;
        vueResults.restaurants.push(restaurant);
      });

      
    //createCards(restaurants);

    updateMap(restaurants);
      
     console.log("*");
     console.log(response);
   });
  
  
}



function updateMap(restaurants){

  // if (vectorLayer != undefined){
  //   map.removeLayer(vectorLayer);
  // }
  mapPoints = []
  mapFeatures = []
  restaurants.forEach (r=> {
      gpsCoords =[Number(r.location.longitude), Number(r.location.latitude)];
      mapCoords = ol.proj.fromLonLat(gpsCoords); //converts from GPS coordinates to Open Layer Map coordinates.
      feature = new ol.Feature({
        geometry: new ol.geom.Point(mapCoords),
        restaurant: r
      })
      mapFeatures.push(feature);
      mapPoints.push(mapCoords);
  });

    // this makes a new layer for the open layers map. 
    if (restaurants){
      vectorLayer = new ol.layer.Vector({
        source:new ol.source.Vector({
          features: mapFeatures,        // add these ol.Features to the lary
        }),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
          })
        })
      }); 
      // this was going to be an if statement that colored nightlife blue. Couldn't get it to work in time.
    // } if (restaurants.index.restaurant.highlighs.indexOf('Nightlife')) {
    //   vectorLayer = new ol.layer.Vector({
    //     source:new ol.source.Vector({
    //       features: mapFeatures,        // add these ol.Features to the lary
    //     }),
    //     style: new ol.style.Style({
    //       image: new ol.style.Icon({
    //         anchor: [0.5, 0.5],
    //         anchorXUnits: "fraction",
    //         anchorYUnits: "fraction",
    //         src: "https://commons.wikimedia.org/wiki/Dots#/media/File:Button_Icon_BlueSky.svg"
    //       })
    //     })
    //   });
    }
  map.addLayer(vectorLayer);
  // this is a copied function that does map zoom to pushpins.
  map.getView().fit(
    new ol.geom.Polygon([mapPoints]),
    {
      duration: 2500,
      maxZoom: 15,
      padding: [20,20,20,20]
    })
};



var indexTwo;
var nightlife;


function goHere(query){
  indexTwo = Number( $(query).attr("id"))
  nightlife = vueResults.nightlife[index];
  console.log(nightlife);
  
  function zomatoSearch(query){
    console.log("made it to the code go here");

  
    url = "https://developers.zomato.com/api/v2.1/search"+
            "?entity_type=city"+
            "&q="+encodeURIComponent(query.trim())+
            "&count=5"+
            "&lat="+latVar+
            "&lon="+lonVar+
            "&apikey="+zomatoApiKey;
      console.log(url);
     $.ajax({
      "url": url 
     }).then(function(response) {
        nightlife = []
        response.nightlife.forEach(element => {
          nightlife.push(element.restaurant);    
        });
  
        nightlife.sort(function (b, a){
          diff = ( Number(a.user_rating.aggregate_rating) - Number(b.user_rating.aggregate_rating) );
          return diff;
        });
      //this creates an array for the restaurant output, and by using vue to 
      //put it in an array let's the HTML function like a template.
        vueResults.nightlife.splice(0);
        nightlife.forEach( function(nightlife){
          restaurant.index = vueResults.nightlife.length;
          vueResults.nightlife.push(restaurant);
        });
  
        
      //createCards(nightlife);
  
      updateMap(nightlife);
        
       console.log("*");
       console.log(response);
       
     });
    
    
  }
}

// line up the html appends with the class of the materialize cards underneath the food buttons but above the map.  
// function createCards(restaurants){
//   cards = $("#results");
//   cards.empty();

//   restaurants.forEach(r => {
//     html = $( "<div>" );
//     html.append( $('<div class="one">') ).append( $('<img>').attr("src", r.thumb)) ;
//     // html.append( $('<div class="one">').text(r.name)  );
//     html.append( $('<div class="one">') ).append( $('<a>').attr("href", r.url).text(r.name)) ;
//     html.append( $('<div class="one">').text(r.name)  );
//     html.append( $('<div class="one">').text(r.user_rating.aggregate_rating)  );
//     html.append( $('<div class="one">').text(r.phone_numbers)  );
//     html.append( $('<div class="one">').text(r.location.address)  );
//     html.append( $('<div class="one">').text(r.location.city)  );
//     r.establishment.forEach (e =>{
//       html.append( $('<div class="one">').text(e)  );
//     })
//     // r.highlights.forEach(h => {
//     //   html.append( $('<div class="one">').text(h)  );
//     // })
//     html.append( $('<div class="one">').text(r.highlights.join(", ")));  
//     cards.append(html);
//     console.log(r.name);
//   });

 
// };



function AGmap(){
console.log([ lonVar, latVar])
  map = new ol.Map({  // this is not a global
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([ lonVar, latVar]),
      zoom: 12
    })
  });
}

var button = document.getElementById("toggle");
var target = document.getElementById("target");
var bool = true;

// showing the card beneath the american food card on button click
new Vue({
  el: '#start',

  methods: {
    say: function (message) {
      alert("yooo")
    },

    showFoods: function(whichGroup) {
      $( "#" + whichGroup + "Foods" ).show(500);

      myCardId = whichGroup + "Card";
      cards = $(".food-card");
      for(let index=0; index < cards.length; ++index) {
        id = $(cards[index]).attr('id');
        console.log(id);
        if ( id != myCardId ) {
          $("#"+id).hide(500);
          //document.getElementById(id).hidden = true;
        }
      }       
    },

    search: function(zomatoSearch) {
      console.log("search for" + zomatoSearch)
    }

  }
})

// new Vue({
//   el: '#example-4',
//   methods: {
//     say: function (message) {
//       alert("yooo2")
//     }
//   }
// })

// function displayToggle() {
//   if (bool) {
//       target.setAttribute("class", "hide")
//       bool = false;
//   } else {
//     target.setAttribute("class", "show")
//     bool = true;
//   }
// }

// button.addEventListener("click", displayToggle, false);
