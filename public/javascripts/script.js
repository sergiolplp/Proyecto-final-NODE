//FORMULARIO POP-UP

var abrirpopup = document.getElementById('btn-warning'); //Acceso a boton "mas info"
var mostrar = document.getElementById('mostrar'); //acceso al fondo del formulario
var popup = document.getElementById('mostrar'); //acceso al formulario
var cerrarpopup = document.getElementById('boton-cerrar-popup'); //acceso boton de cierre de formulario

abrirpopup.addEventListener('click', function(){mostrar.classList.add(active);});

cerrarpopup.addEventListener('click', function(){mostrar.classList.remove(active);});

//CAMBIO DE CLASE PARA CARD EN FORMATO tablet/celular
//Falta terminar.

var ww = document.body.clientWidth;
if (ww < 600) document.getElementById().classLis.remove()
    else if (ww < 601) document.getElementById().classLis.remove()

