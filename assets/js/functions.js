$(document).ready(function() {
    showLocal(-1);
});

function closeIW() {
  iwlastOpen.close();
}

function showLocal(tipo) {
  $.ajax({
      url: "https://api.cangassingluten.com:8443/cangas-api/tipo/" + tipo + "/"
  }).then(function(data) {
     $.each(data, function (i, item) {
       var length = data.length;
       if (i % 3 == 0) {
         var newSection = $('<div class="section group" id="group'+i/3+'" ></div>');
         $('#locales').append(newSection);
       }
       var option = $('<div class="col span_1_of_3"><a href="./establecimiento.html?id='+item.id+'" class="image fit"><div ><span class="image fit"><img src="'+item.imagen+'" alt="'+item.nombre+'" /><div class="box"><center><p class="infoUpper">'+item.type+'</p><h3 class="info">'+item.nombre+'</h3></center><p class="info">'+item.direccion+'</p></div></span></div></a></div>');
       $('#group'+Math.floor(i/3)).append(option);
       var type = item.type;
       var iconImage;
       if (type=="Alojamiento") {
         iconImage= 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
       } else if (type=="Restaurante") {
         iconImage= 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
       } else if (type=="Tienda") {
         iconImage= 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
       } else {
         iconImage= 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png'
       }
       var marker = new google.maps.Marker({
          position: {lat: item.latitud, lng: item.longitud},
          title: item.nombre,
          icon: iconImage,
          map: map
        });
        markers.push(marker);
        var infowindow = new google.maps.InfoWindow({
          content: '<span><a href="establecimiento.html?id='+ item.id + '">' + item.nombre + '</a></span>'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
          closeIW();
          iwlastOpen = infowindow;
        });
     });
  });
  setMapOnAll(null);
  markers = [];
  $("#locales").html("");
  $(".button").removeClass("special");
  $("#bt" + tipo).addClass("special");
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
