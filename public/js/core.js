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