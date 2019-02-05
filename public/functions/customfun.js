
const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
var j;

function srlist (UserID,Hash,UserIP) {
   console.log("vivedet?");

    var params = {
        "UserIP": UserIP,
        "Hash": Hash,
        "UserId": UserID


    };
    var args = {LoginXDTO:params};
    //console.log(args);

    soap.createClient(url, function(err, client) {
        client.SiteSrdir(args, function(err, result) {
            var data = result.return;
            //console.log(data);
            j = JSON.parse(data);
            //console.log(p1);
            //console.log(obj);
            console.log("customfun return " + j);

        });
    });



    console.log('fun is run');


};

module.exports.srlist = srlist;

