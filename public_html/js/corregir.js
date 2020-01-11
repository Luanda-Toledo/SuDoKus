function corregir(){
    var p1 , p2 , p3 , p4 , p5 , p6 , p7 , p8 , nota, notaFinal;
    var aciertos = 0;
    var fallos = 0;
    var blancos = 0;
    var porcentaje = 0;
    
    if (document.getElementById('p1').checked===true) {
        p1 = 1;
        aciertos++;
    }else if (document.getElementById('p2').checked===true){
        p1 = 0;
        fallos++;
    }else{
        p1= -0.5;
        blancos++;
    }
      
      
    if (document.getElementById('p3').checked===true) {
        p2 = 0;
        fallos++;
    }else if (document.getElementById('p4').checked===true){
        p2 = 0;
        fallos++;
    }else if (document.getElementById('p5').checked===true){
        p2 = 0;
        fallos++;
    }else if (document.getElementById('p6').checked===true){
        p2 = 1;
        aciertos++;
    }else{
        p2= -0.5;
        blancos++;
    }
      
      
    if (document.getElementById('p7').checked===true) {
        p3 = 0;
        fallos++;
    }else if (document.getElementById('p8').checked===true){
        p3 = 1;
        aciertos++;
    }else if (document.getElementById('p9').checked===true){
        p3 = 0;
        fallos++;
    }else if (document.getElementById('p10').checked===true){
        p3 = 0;
        fallos++;
    }else{
        p3= -0.5;
        blancos++;
    }
    

    if (document.getElementById('p11').checked===true) {
        p4 = 0;
        fallos++;
    }else if (document.getElementById('p12').checked===true){
        p4 = 1;
        aciertos++;
    }else{
        p4= -0.5;
        blancos++;
    }
    

    if (document.getElementById('p13').checked===true) {
        p5 = 0;
        fallos++;
    }else if (document.getElementById('p14').checked===true){
        p5 = 1;
        aciertos++;
    }else{
        p5= -0.5;
        blancos++;
    }
    

    if (document.getElementById('p15').checked===true) {
        p6 = 0;
        fallos++;
    }else if (document.getElementById('p16').checked===true){
        p6 = 1;
        aciertos++;
    }else{
        p6= -0.5;
        blancos++;
    }
    

    if (document.getElementById('p17').checked===true) {
        p7 = 1;
        aciertos++;
    }else if (document.getElementById('p18').checked===true){
        p7 = 0;
        fallos++;
    }else{
        p7= -0.5;
        blancos++;
    }
    

    if (document.getElementById('p19').checked===true) {
        p8 = 1;
        aciertos++;
    }else if (document.getElementById('p20').checked===true){
        p8 = 0;
        fallos++;
    }else{
        p8= -0.5;
        blancos++;
    }
    
      
    nota = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
    if( nota < 0 ){
        puntuacion = 0;
    }else{
        puntuacion = nota;
    }
    
    notaFinal = nota;
    if( notaFinal < 0 ){
        suma = 0;
        porcentaje = 0;
    } else {
        suma = (nota * 100);
        porcentaje = Math.round(suma / 8);
    }    
    
    
    document.getElementById('aciertos').value = aciertos;
    document.getElementById('fallos').value = fallos;
    document.getElementById('blancos').value = blancos;
    document.getElementById('porcentaje').value = porcentaje;
}

