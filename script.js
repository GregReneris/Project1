

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
    var zomatoQueryURL = "https://developers.zomato.com/api/v2.1/categories?"+zomatoApiKey

  x.text("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude);
  // AGmap(lonVar,latVar)
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
      restaurants.sort(function (b, a){
        diff = ( Number(a.user_rating.aggregate_rating) - Number(b.user_rating.aggregate_rating) );
        return diff;
      });
    
    createCards(restaurants);
    updateMap(restaurants);
      
     console.log("*");
     console.log(response);
   });
  
  
}
function updateMap(restaurants){
  restaurants.forEach (r=> {
      gpsCoords =[Number(r.location.longitude), Number(r.location.latitude)];
      //mapCoords = ol.proj.fromLonLat(gpsCoords);

  })

};

function createCards(restaurants){
  cards = $("#cards");
  cards.empty();

  restaurants.forEach(r => {
    html = $( "<div>" );
    html.append( $('<div class="one">') ).append( $('<img>').attr("src", r.thumb)) ;
    // html.append( $('<div class="one">').text(r.name)  );
    html.append( $('<div class="one">') ).append( $('<a>').attr("href", r.url).text(r.name)) ;
    html.append( $('<div class="one">').text(r.name)  );
    html.append( $('<div class="one">').text(r.user_rating.aggregate_rating)  );
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
      center: ol.proj.fromLonLat([ -122.335167, 47.608013]),
      zoom: 10
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

    search: function(queryString) {
      alert("search for" + queryString)
    }

  }
})

new Vue({
  el: '#example-4',
  methods: {
    say: function (message) {
      alert("yooo2")
    }
  }
})

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
