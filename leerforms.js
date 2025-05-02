function leer(){
    var i, g;

    //Referencia por pseudoclase
    var nombre = document.forms["formulario"].elements[0].value; 

    //Referencia por id
    var clave = document.getElementById("pass").value;

    //Referencia por TagName
    var car = document.getElementsByTagName("select")[0].value;

    //Referencia por Name
    var gen = document.getElementsByName("genero");
    for(i = 0; i < gen.length; i++){
        if(gen[i].checked){
            g = gen[i].value;
        }
    }

    //Referencia por id
    var p = document.getElementById("privacidad").checked

    //alert(car);

    document.getElementById("datos").innerHTML = 
    "\<br> Nombre: " + nombre + "\<br> Password: " + clave + "\<br> Carrera: " + car + "\<br> Género: " + g + "\<br> Aceptó el acuerdo: " + p;
}