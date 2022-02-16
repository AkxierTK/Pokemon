$(document).ready(function(){
    $(".pokemon_Div col-4").click(function(){
        var posicion = $("#aaa").offset();
        $('html, body').animate({scrollTop:posicion.x}, 'slow');
   });

   

});