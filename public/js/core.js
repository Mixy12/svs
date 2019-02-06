/*------- Page Loader -------*/

 if ((".loader").length) {
      // show Preloader until the website ist loaded
      $(window).on('load', function () {
        $(".loader").fadeOut("slow");
      });
    }
 /*-------- Отслежка ------*/

    function trackfuncSuccess (data){
        //document.getElementById('result').innerHTML = data;
       var arr = JSON.parse(data);
        document.getElementById('result').innerHTML ="";

        arr.forEach(function(item, i, arr) {
            var a = item.num;
            $("#result").append("<tr>   <td>"+item.Date+"</td>   <td>"+item.Status+"</td>   <td>"+item.Comment+"</td> </tr>");
        });
       // $("#result").append("</table>");
    };

function trackfuncbefore (){document.getElementById('result').innerHTML ="Ожидание ...";}

function trackfuncerror (){alert( "Ошибка :(");}

$("#trackbutton").bind('click',function() {
//alert("click");
    let num = $('#trackInput').val();
    $.ajax({
        url: "/ajax/tracknum",
        type: "POST",
        data: ({num:  num}),
        dataType: "html",
        beforeSend: trackfuncbefore,
        error: trackfuncerror,
        success: trackfuncSuccess
    })


});
function calcfuncSuccess (data){
    $('#result').text('');
    var arr = JSON.parse(data);
    arr.forEach(function(item, i, arr) {
        $("#result").append("<br><p>По направлению "+$('#sendCity').val()+" - "+$('#recdCity').val()+" предлагаем следущие тарифы:</p>" +
            " <ul><li>Физический вес: "+$('#weight').val()+"</li><li>Объемный вес: "+$('#length').val() * $('#height').val() * $('#width').val() /5000+"</li><li>Стоимость доставки: "+item.price+"</li><li>Срок доставки(раб. дней): "+item.time+"</li></ul>");
    });
    }

function calcfuncbefore (){document.getElementById('result').innerHTML ="Ожидание ...";}

function calcfuncerror (){alert( "Ошибка :(");}

$("#calcbutton").bind('click',function() {
    let sendCity = $('#sendCity').val();
    let recdCity = $('#recdCity').val();
    let weight = $('#weight').val();
    let volume = $('#length').val() * $('#height').val() * $('#width').val() /5000;

    $.ajax({
        url: "/ajax/calculate",
        type: "POST",
        data: ({
            sendCity:  sendCity,
            recdCity: recdCity,
            weight: weight,
            volume: volume
                }),
        dataType: "html",
        beforeSend: calcfuncbefore,
        error: calcfuncerror,
        success: calcfuncSuccess
    })


});
var q = 0;
var list = ["0"];


function settotal() {
    document.getElementById("totalq").value = list.length;
    var tm = 0;
    var tv = 0;

    list.forEach(function(item, index, array) {

        tm = tm + (document.getElementById('m'+item).value * 1);
        tv = tv + (document.getElementById('v'+item).value * 200);
    });
    document.getElementById("totalm").value = tm.toFixed(2);
    document.getElementById("totalv").value = tv.toFixed(2);
};

function setv(name) {

    var l = document.getElementById('l'+name).value;
    var w = document.getElementById('w'+name).value;
    var h = document.getElementById('h'+name).value;

    var v = 'v'+name;
    var value = l*w*h*0.000001;
    document.getElementById(v).value = value.toFixed(4);
    settotal();
};

function addcargo() {

    var n = q + 1;
    $( "#cargo" ).append( '<div class="form-group row" id="div'+n+'"><div class="col-sm-1">Вес (кг):</div><div class="col-sm-2"><input name = "'+n+'" id="m'+n+'" type="number" class="form-control" value = "0.2" onchange="settotal()" placeholder="Вес (кг)"></div><div class="col-sm-1">Размер (см):</div><div class="col-sm-4"><div class="row"><div class="col-sm-3"><input name = "'+n+'" id="l'+n+'" type="number" class="form-control" value = "10" onchange="setv(this.name)"></div><div class="col-sm-1">Х</div><div class="col-sm-3"><input name = "'+n+'" id="w'+n+'" type="number" class="form-control" value = "20" onchange="setv(this.name)"></div><div class="col-sm-1">Х</div><div class="col-sm-3"><input name = "'+n+'" id="h'+n+'" type="number" class="form-control" value = "5" onchange="setv(this.name)"></div></div></div><div class="col-sm-1">Объем (м.куб.):</div><div class="col-sm-2"><input readonly name = "'+n+'" id="v'+n+'" type="number" value = "0.001" class="form-control" placeholder=""></div><div class="col-sm-1"><button name = "'+n+'" type="button" class="btn btn-default" onclick="removecargo(this.name)">Удал.</button></div></div>')
    q = n;
    list.push(n);
    settotal();
};

function removecargo(name) {

    var pos = list.indexOf(name);
    list.splice(pos, 1);
    document.getElementById('div'+name).remove();

    settotal();

};

//-----------------------------------------------------
function deliverySuccess (data){

    var arr = JSON.parse(data);

    arr.forEach(function(item, i, arr) {
        $("#directory").append("<tr><td id = \"thnamebut"+i+"\">"+item.name+"</td><td id=\"thcitybut\">"+item.city+"</td><td id=\"thaddressbut"+i+"\">"+item.address+"</td></tr>"
        );
    });
}

function deliveryfuncbefore (){}

function deliveryfuncerror (){alert( "Ошибка :(");}



$('#asprav').bind('click',function () {

    $.ajax({
        url: "/ajax/reqdel",
        type: "POST",
        data: ({}),
        dataType: "html",
        beforeSend: deliveryfuncbefore,
        error: deliveryfuncerror,
        success: deliverySuccess
    });
});

//-----------------------------------------------------------
function finddispSuccess (data){
    var arr = JSON.parse(data);
    $("#disptable").append(" <table class=\"table table-bordered table-hover\" >\n" +
        "        <thead class=\"thead-light\">\n" +
        "        <tr>\n" +
        "            <th>Номер</th>\n" +
        "            <th>Дата</th>\n" +
        "            <th>Город отправителя</th>\n" +
        "            <th>Город получателя</th>\n" +
        "            <th>Получатель</th>\n" +
        "            <th>Мест</th>\n" +
        "            <th>Вес</th>\n" +
        "            <th>Тип доставки</th>\n" +
        "            <th>Статус</th>\n" +
        "            <th>Дата доставки</th>\n" +
        "            <th>Получил</th>\n" +
        "        </tr>\n" +
        "        </thead>\n" +
        "        <tbody id=\"result\">\n" +
        "        </tbody>\n" +
        "    </table>");
    arr.forEach(function(item, i, arr) {
        $("#result").append("<tr id=\"disp\"   name=\""+item.num+"\"><td>"+item.num+"</td><td>"+item.startdate+"</td><td>"+item.sendcity+"</td><td>"+item.reccity+"</td><td>"+item.reccom+"</td><td>"+item.quan+"</td><td>"+item.weight+"</td><td>"+item.type+"</td><td>"+item.status+"</td><td>"+item.date+"</td><td>"+item.rec+"</td></tr>"
        );
    });

}

function finddispfuncbefore (){}

function finddispfuncerror (){alert( "Ошибка :(");}



$('#findDisp').bind('click',function () {
    let from = new Date($("#from").val());
    let day = addZero(from.getDate());
    let mon = addZero(from.getMonth()+1);
    let year = from.getFullYear();
    from = day+'-'+mon+'-'+year;
    let to = new Date($("#to").val());
     day = addZero(to.getDate());
     mon = addZero(to.getMonth()+1);
     year = to.getFullYear();
    to = day+'-'+mon+'-'+year;
    $.ajax({
        url: "/ajax/finddisp",
        type: "POST",
        data: ({
            from:from,
            to:to
        }),
        dataType: "html",
        beforeSend: finddispfuncbefore,
        error: finddispfuncerror,
        success: finddispSuccess
    });
});


$(document).on('dblclick', '#disp', function() {

    alert($(this).attr('name'));
    window.open('/disp/'+$(this).attr('name'));
});



function addZero(i) {
    return (i < 10)? "0" + i: i;
}