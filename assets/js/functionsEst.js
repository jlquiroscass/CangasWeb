var id = gup('id');
$.ajax({
    url: "https://api.cangassingluten.com:8443/cangas-api/"+id+"/"
}).then(function(data) {
   document.title=data.nombre;
   $('head').append('<meta property="og:url" content="https://cangassingluten.com/establecimiento.html?id=' + data.id + '" />');
   $('head').append('<meta property="og:title" content="' + data.nombre + '" />');
   $('head').append('<meta property="og:description" content="' + data.comentario + '" />');
});

$(document).ready(function() {
    var id = gup('id');
    $.ajax({
        url: "https://api.cangassingluten.com:8443/cangas-api/"+id+"/"
    }).then(function(data) {
       document.title=data.nombre;
       $('#imageLocal').append($('<img src="/big/'+data.imagen+'" />'));
       $('#locales').append($('<h4>' + data.type + '</h4>'));
       $('#locales').append($('<div class="box"><p>' + data.comentario + '</p></div></center>'));
       $('#locales').append($('<p class="info"><strong>Direccion: </strong>' + data.direccion + '</p>'));
       $('#locales').append($('<p class="info"><strong>Web: </strong><a href="' + data.web+ '">' + data.web + '</a></p>'));
       $('#locales').append($('<p class="info"><strong>Telefono: </strong>' + data.telefono + '</p>'));
       $('#menuName').append($('<a href="establecimiento.html?id='+data.id+'">'+data.nombre+'</a>'));
       $('#titleNombre').append(data.nombre);
       map = new google.maps.Map(document.getElementById('map'), {
           center: {lat: data.latitud, lng: data.longitud},
           zoom: 12
       });
       var marker = new google.maps.Marker({
          position: {lat: data.latitud, lng: data.longitud},
          map: map
        });
    });
});

function gup( name, url ) {
    url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
