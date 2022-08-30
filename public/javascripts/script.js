//FORMULARIO POP-UP

var abrirpopup = document.getElementById('btn-warning'); //Acceso a boton "mas info"
var mostrar = document.getElementById('mostrar'); //acceso al fondo del formulario
var popup = document.getElementById('mostrar'); //acceso al formulario
var cerrarpopup = document.getElementById('boton-cerrar-popup'); //acceso boton de cierre de formulario

abrirpopup.addEventListener('click', function () { mostrar.classList.add(active); });

cerrarpopup.addEventListener('click', function () { mostrar.classList.remove(active); });



