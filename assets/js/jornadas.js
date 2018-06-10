$(document).ready(function() {
    showLocal(-1);
});

function showLocal(tipo) {
  $.ajax({
      url: "https://api.cangassingluten.com:8443/cangas-api/jornadas/"
  }).then(function(data) {
     $.each(data, function (i, item) {
       var length = data.length;
       var newSection = $('<div class="section group" id="group'+i+'" ></div>');
       $('#locales').append(newSection);
       var option = $('<div ><p><span class="image left"><a class="image fit"><img src="/'+item.imagen+'" alt="'+item.nombre+'" /></a></span><h3 class="info">'+item.nombre+'</h3><p>'+item.comentario+'</p><p class="info">'+item.direccion+'</p><p class="info">'+item.telefono+'</p></div></p></div>');
       $('#group'+i).append(option);
     });
  });
  $("#locales").html("");
}
