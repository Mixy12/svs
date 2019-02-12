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
            $(".table-content").html('');
            $(".table-content").append("<table class='table table-bordered'><thead><tr><th>Дата</th><th>Статус</th><th>Комментарий</th></tr> </thead><tbody id='result'></tbody></table>");

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
    let volume = $('#length').val() * $('#height').val() * $('#width').val() /1000000;

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

//-----------------------------------------------------------
function finddispSuccess (data){
    var arr = JSON.parse(data);
    $("#disptable").html("");
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

    window.open('/disp/'+$(this).attr('name'));
});



function addZero(i) {
    return (i < 10)? "0" + i: i;
}

$(document).ready(function() {
    let availableTags = citys;

    $('.complite').autocomplete({
        source: availableTags
    })
});

$(document).on('dblclick', '.tblSpravIn', function() {

    let city = $(this).find('[name = city]').text();
    let address = $(this).find('[name = address]').text();
    let phone = $(this).find('[name = phone]').text();
    let person = $(this).find('[name = person]').text();
    let company = $(this).find('[name = company]').text();
    let addinfo = $(this).find('[name = addinfo]').text();
    $('#SendCity').val(city);
    $('#SendAdress').val(address);
    $('#SendPhone').val(phone);
    $('#SendPerson').val(person);
    $('#SendCompany').val(company);
    $('#SendAddInfo').val(addinfo);
    $('#asprav').click();
});

$(document).on('dblclick', '.tblSpravTo', function() {

    let city = $(this).find('[name = city]').text();
    let address = $(this).find('[name = address]').text();
    let phone = $(this).find('[name = phone]').text();
    let person = $(this).find('[name = person]').text();
    let company = $(this).find('[name = company]').text();
    let addinfo = $(this).find('[name = addinfo]').text();
    $('#RecCity').val(city);
    $('#RecAdress').val(address);
    $('#RecPhone').val(phone);
    $('#RecPerson').val(person);
    $('#RecCompany').val(company);
    $('#RecAddInfo').val(addinfo);
    $('#butsprav').click();
});


function newcalcfuncSuccess (data){
    $('#result').text('');
    var arr = JSON.parse(data);
    alert(arr);
    arr.forEach(function(item, i, arr) {
        $("#result").append("<br><p>По направлению "+$('#SendCity').val()+" - "+$('#RecCity').val()+" предлагаем следущие тарифы:</p>" +
            " <ul><li>Физический вес: "+$('#totalm').val()+"</li><li>Объемный вес: "+$('#totalv').val()+"</li><li>Стоимость доставки: "+item.price+"</li><li>Срок доставки(раб. дней): "+item.time+"</li></ul>");
    });
}

function newcalcfuncbefore (){document.getElementById('result').innerHTML ="Ожидание ...";}

function newcalcfuncerror (){alert( "Ошибка :(");}

$("#calcbtn").bind('click',function() {
    let sendCity = $('#SendCity').val();
    let recdCity = $('#RecCity').val();
    let weight = $('#totalm').val();
    let volume = $('#totalv').val()/200;
    alert(sendCity);
    alert(weight);
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
        beforeSend: newcalcfuncbefore,
        error: newcalcfuncerror,
        success: newcalcfuncSuccess
    })


});
//-----------------Отправка накладной---------------------------------

function newdispfuncSuccess (data){alert(data)}

function newdispfuncbefore (){}

function newdispfuncerror (){alert( "Ошибка :(");}
$(document).ready(function () {
    $("#newDispSend").bind('click',function() {
        let SendCity = $('#SendCity').val();
        let SendAdress = $('#SendAdress').val();
        let SendPhone = $('#SendPhone').val();
        let SendPerson = $('#SendPerson').val();
        let SendCompany = $('#SendCompany').val();
        let SendAddInfo = $('#SendAddInfo').val();
        let RecCity = $('#RecCity').val();
        let RecAdress = $('#RecAdress').val();
        let RecPhone = $('#RecPhone').val();
        let RecPerson = $('#RecPerson').val();
        let RecCompany = $('#RecCompany').val();
        let RecAddInfo = $('#RecAddInfo').val();
        let DelType = $('#DelType').val();
        let PayType = $('#PayType').val();
        let InsurValue = $('#InsurValue').val();
        let COD = $('#COD').val();

        let curDate = $('#curDate').val();
        let curTime = $('#curTime').val();
        let Uved = $('#Uved').is(':checked');
        let Scan = $('#Scan').is(':checked');
        let Opasn = $('#Opasn').is(':checked');
        let Podp = $('#Podp').is(':checked');

        var carg = [];
        $('div[id^="div"]').each(function () {
            let m = $(this).find('[id^="m"]').val();
            let l = $(this).find('[id^="l"]').val();
            let w = $(this).find('[id^="w"]').val();
            let h = $(this).find('[id^="h"]').val();
            carg.push([m,l,w,h]);
        });
        carg = JSON.stringify(carg);
        $.ajax({
            url: "/requestdelivery",
            type: "POST",
            data: ({
                SendCity:SendCity,
                SendAdress:SendAdress,
                SendPhone:SendPhone,
                SendPerson:SendPerson,
                SendCompany:SendCompany,
                SendAddInfo:SendAddInfo,
                RecCity:RecCity,
                RecAdress:RecAdress,
                RecPhone:RecPhone,
                RecPerson:RecPerson,
                RecCompany:RecCompany,
                RecAddInfo:RecAddInfo,
                DelType:DelType,
                PayType:PayType,
                InsurValue:InsurValue,
                COD:COD,
                carg:carg,
                curDate:curDate,
                curTime:curTime,
                Uved:Uved,
                Scan:Scan,
                Opasn:Opasn,
                Podp:Podp
            }),
            dataType: "html",
            beforeSend: newdispfuncbefore,
            error: newdispfuncerror,
            success: newdispfuncSuccess
        })


    });
});

//----------------------Обратная связь-----------
function refuncSuccess (data){$("#sended").text("Отправлено")}

function refuncbefore (){}

function refuncerror (){alert( "Ошибка :(");}

$("#reSend").bind('click',function() {
    let reName = $("#reName").val();
    let reEmail = $("#reEmail").val();
    let rePhone = $("#rePhone").val();
    let reCompany = $("#reCompany").val();
    let reQuest = $("#reQuest").val();
    $.ajax({
        url: "/resend",
        type: "POST",
        data: ({
            reName:reName,
            reEmail:reEmail,
            rePhone:rePhone,
            reCompany:reCompany,
            reQuest:reQuest
        }),
        dataType: "html",
        beforeSend: refuncbefore,
        error: refuncerror,
        success: refuncSuccess
    })


});
//-------------------Добавлени шаблона------------------
function templatefuncSuccess (){location.reload();
}

function templatefuncbefore (){}

function templatefuncerror (){alert( "Ошибка :(");}

$("#tempAdd").bind('click',function() {
    let tempName = $("#tempName").val();
    let tempCity = $("#tempCity").val();
    let tempAdress = $("#tempAdress").val();
    let tempPhone = $("#tempPhone").val();
    let tempPerson = $("#tempPerson").val();
    let tempCompany = $("#tempCompany").val();
    let tempAddInfo = $("#tempAddInfo").val();
    $.ajax({
        url: "/ajax/addTemp",
        type: "POST",
        data: ({
            tempName:tempName,
            tempCity:tempCity,
            tempAdress:tempAdress,
            tempPhone:tempPhone,
            tempPerson:tempPerson,
            tempCompany:tempCompany,
            tempAddInfo:tempAddInfo

        }),
        dataType: "html",
        beforeSend: templatefuncbefore,
        error: templatefuncerror,
        success: templatefuncSuccess
    })


});
//-----------------------Удаление шаблона------------
function deltemplatefuncSuccess (){location.reload();
}

function deltemplatefuncbefore (){}

function deltemplatefuncerror (){alert( "Ошибка :(");}

$(".delete").bind('click',function() {
    let name = $(this).parent().parent().find('[name="ref"]').text();
    $.ajax({
        url: "/ajax/delTemp",
        type: "POST",
        data: ({
            name:name
        }),
        dataType: "html",
        beforeSend: deltemplatefuncbefore,
        error: deltemplatefuncerror,
        success: deltemplatefuncSuccess
    })


});
//---------------------Заказать курьера---------------
function deliveryfuncSuccess (data){alert(data)}

function deliveryfuncbefore (){}

function deliveryfuncerror (){alert( "Ошибка :(");}
$(document).ready(function () {
    $("#newDispSend").bind('click',function() {
        let SendCity = $('#SendCity').val();
        let SendAdress = $('#SendAdress').val();
        let SendPhone = $('#SendPhone').val();
        let SendPerson = $('#SendPerson').val();
        let SendCompany = $('#SendCompany').val();
        let SendAddInfo = $('#SendAddInfo').val();
        let RecCity = $('#RecCity').val();
        let RecAdress = $('#RecAdress').val();
        let RecPhone = $('#RecPhone').val();
        let RecPerson = $('#RecPerson').val();
        let RecCompany = $('#RecCompany').val();
        let RecAddInfo = $('#RecAddInfo').val();
        let DelType = $('#DelType').val();
        let PayType = $('#PayType').val();
        let InsurValue = $('#InsurValue').val();
        let COD = $('#COD').val();

        let curDate = $('#curDate').val();
        let curTime = $('#curTime').val();
        let Uved = $('#Uved').is(':checked');
        let Scan = $('#Scan').is(':checked');
        let Opasn = $('#Opasn').is(':checked');
        let Podp = $('#Podp').is(':checked');

        var carg = [];
        $('div[id^="div"]').each(function () {
            let m = $(this).find('[id^="m"]').val();
            let l = $(this).find('[id^="l"]').val();
            let w = $(this).find('[id^="w"]').val();
            let h = $(this).find('[id^="h"]').val();
            carg.push([m,l,w,h]);
        });
        carg = JSON.stringify(carg);
        $.ajax({
            url: "/delivery",
            type: "POST",
            data: ({
                SendCity:SendCity,
                SendAdress:SendAdress,
                SendPhone:SendPhone,
                SendPerson:SendPerson,
                SendCompany:SendCompany,
                SendAddInfo:SendAddInfo,
                RecCity:RecCity,
                RecAdress:RecAdress,
                RecPhone:RecPhone,
                RecPerson:RecPerson,
                RecCompany:RecCompany,
                RecAddInfo:RecAddInfo,
                DelType:DelType,
                PayType:PayType,
                InsurValue:InsurValue,
                COD:COD,
                carg:carg,
                curDate:curDate,
                curTime:curTime,
                Uved:Uved,
                Scan:Scan,
                Opasn:Opasn,
                Podp:Podp
            }),
            dataType: "html",
            beforeSend: deliveryfuncbefore,
            error: deliveryfuncerror,
            success: deliveryfuncSuccess
        })


    });
});