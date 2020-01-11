$(function () {
    
    //definimos las opciones
    var temp = [1,2,3,4,5,6,7,8,9]
    
    var l0 = $(".l0>span>input")
    var l1 = $(".l1>span>input")
    var l2 = $(".l2>span>input")
    var l3 = $(".l3>span>input")
    var l4 = $(".l4>span>input")
    var l5 = $(".l5>span>input")
    var l6 = $(".l6>span>input")
    var l7 = $(".l7>span>input")
    var l8 = $(".l8>span>input")

    var checkArr = []; 
    var score = 0;
    //opcion de tiempo record
    var record = Number(localStorage.getItem('record'));
    if(record){
        $('#record').text(n2time(record))
    }
    //generamos todas las posibilidades para el rompecabezas
    function generateAll() {
        var res = [[], [], [], [], [], [], [], [], []]

        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                var originR = r;

                if (r == 1) {
                    r = 3
                } else if (r == 2) {
                    r = 6
                } else if (r == 3) {
                    r = 1
                } else if (r == 5) {
                    r = 7
                } else if (r == 6) {
                    r = 2
                } else if (r == 7) {
                    r = 5
                }

                var i = r + c;
                while (i > temp.length - 1) {
                    i = i - 9
                }

                res[originR][c] = temp[i]
                r = originR
            }
        }
        return res;
    }

    //trastornos de la funcion. Combinaciones de numeros y su orden. (solucionar error "emilytimer")
    function disorder() {
        
        var res
        var r1 = [0, 1, 2]
        r1.sort( function (){
            return Math.random() - 0.5;
        });
        var r2 = [3, 4, 5]
        r2.sort( function() {
            return Math.random() - 0.5;
        });
        var r3 = [6, 7, 8]
        r3.sort( function() {
            return Math.random() - 0.5;
        });
        var all = [r1, r2, r3]
        all.sort( function() {
            return Math.random() - 0.5
        })
        res = [...all[0], ...all[1], ...all[2]];
        return res;
    }

    //la funcion bandera vacia, es para especificar el nivel.
    function emptyFlag(level) {
        var chance;
        switch (level) {
            case 'easy':
                chance = 0.7;
                break;
            case 'middle':
                chance = 0.5;
                break;
            case 'hard':
                chance = 0.3;
        }
        return Math.random() > chance
    }
    
    //Config de el tiempo.
    function reset(){
        $(':input').val('');
        $("#clock").text('00:00');
        checkArr = [];
        score = 0;
    }
    
    //config del nivel facil.
    function draw(level = 'easy'){
        reset();
        var arr = generateAll();

        var order1 = disorder(); 
        var order2 = disorder(); 

        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                var inputBox = eval('l' + r)[c]
                var v = arr[order2[r]][order1[c]]
                checkArr.push(v)

                if(emptyFlag(level)){
                    $(inputBox).css('color','black')
                    $(inputBox).attr('readonly',false)
                    continue;
                }else{
                    $(inputBox).css('color','blue')
                    inputBox.value = v
                }

            }
        }
    }

    //intervalo del reloj
    var clockInterval;
    $('#btnBox button').click(function(){
        $('.l span').removeClass('error')
        clearInterval(clockInterval);
        var level = $(this).attr('id');
        draw(level);

        clockInterval = setInterval(function(){
            score++;
            var time = n2time(score);
            $("#clock").text(time);
        }, 1000);
    })
    
    //Confg del reloj
    function n2time(n){
        if(typeof n !='number'){return false}
        var res = '';
        var minutes = Math.floor(n / 60);
        var seconds = n % 60;
        if(seconds<10){
            seconds = '0'+seconds;
        }
        if(minutes > 0){
            res = minutes+':'+seconds
        }else{
            res = '00:'+seconds
        }
        return res;
    }
    $(':input').on('input',function(){
        var v = $(this).val()
        if(isNaN(v)){
            $(this).val('')
            return false;
        }
        
        if(v.toString().length>0){
            v = v.toString().slice(-1)
        }
        $(this).val(v)

    })
    $(':input').on('keyup',function(e){
        var key = e.which;
        var dom = $(this);
        if(key == 38){ 
            var index = $('.l input').index(this)
            var upper = index - 9
            if(upper<0){
                return false;
            }
            dom = number2dom(upper)
        }
        if(key == 40){ 
            var index = $('.l input').index(this)
            var lower = index + 9
            if(lower<0){
                return false;
            }
            dom = number2dom(lower)
        }
        if(key == 37){ 
            dom = $(this).parent().prev().children()
        }
        if(key == 39){ 
            dom = $(this).parent().next().children()
        }
        if(dom){
            dom.focus();
        }
    })
    
    //mensaje de alerta para el boton check. Detiene el tiempo mientras dure la alerta en pantalla
    $('#check').click(function(){
        $('.l span').removeClass('error')

        var allInput = $(':input').map(function(idx,elem){
            return $(elem).val();
        }).get();
        var filterArr = allInput.filter(item =>{
            return item !== '';
        })
        if(filterArr.length<81){
            alert('Mientras esta alerta este en pantalla, el juego se mantendra en pausa :)')
            return false;
        }

        //muestra el tiempo record del jugador y los puntos acumulados(nota: preparar seccion puntos)
        var errorArr = checkFn(filterArr)
        if(errorArr.length == 0){
            clearInterval(clockInterval);
            var msg = 'Felicitaciones!';
            if(score < record){
                var newRecord = n2time(score);
                msg+='Tu recor es de:'+newRecord;
               $('#record').text(newRecord);
            }
            localStorage.setItem('record',score);
            alert(msg);
        }else{
            showErrorBlock(errorArr);
        }
    })

    //fin del check
    function checkFn(userInputArr){
        var res = [];
        for(var i = 0;i<userInputArr.length;i++){
            if(userInputArr[i]!=checkArr[i]){
                res.push(i);
            }
        }
        return res;   
    }
    function showErrorBlock(arr){
        for(var i = 0, x = arr[i];i<arr.length;i++){
            var errorBlock = number2dom(arr[i]);
            $(errorBlock).parent().addClass('error')
        }
    }
    function number2dom(n){
        if(n < 0 || n > 80){
            return false;
        }
        var row = Math.floor(n / 9);
        var colomn = n % 9;
        return eval('l' + row)[colomn];
    }
    
})


