var restify = require('restify');

// var PartnerISV = [
//     ['Snapchat Inc'],['James Cadd <jacadd@microsoft.com>'],
//     ['Twitter Inc'],['Chris Barker <cbarker@microsoft.com>'],
//     ['Yahoo!'],['Maarten van de Bospoort <maartenb@microsoft.com>'],
//     ['baidu'],['Yansong Li <yansongl@microsoft.com>'],    
// ];

var arrTEIsv = [];

var Connection = require('tedious').Connection;
    var config = {
        userName: 'marckupadmin@marckupvsoreporting',
        password: '!password1',
        server: 'marckupvsoreporting.database.windows.net',
        // When you connect to Azure SQL Database, you need these next options.
        options: {encrypt: true, database: 'TEDConsumer'}
    };
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        // If no error, then good to proceed.
        console.log("Connected");
        executeStatement();
        var time = event.timeStamp;
        console.log(time);
        console.log(arrTEIsv, arrTEIsv[5]);
        // console.log("Output from function " + PartnerISV);

    });

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        // request = new Request("SELECT c.CustomerID, c.CompanyName,COUNT(soh.SalesOrderID) AS OrderCount FROM SalesLT.Customer AS c LEFT OUTER JOIN SalesLT.SalesOrderHeader AS soh ON c.CustomerID = soh.CustomerID GROUP BY c.CustomerID, c.CompanyName ORDER BY OrderCount DESC;", function(err) {
        
        request = new Request("SELECT Title, AssignedTE FROM dbo.PartnerIsvs", function(err) {
        if (err) {
            console.log(err);}
        });
        var result = "";
        request.on('row', function(columns) {
            columns.forEach(function(column) {
              if (column.value === null) {
                console.log('NULL');
              } else {
                result+= column.value + " ";
              }
            });
            console.log(result);
            arrTEIsv.push(result);
            result ="";
        });

        request.on('done', function(rowCount, more) {
        console.log(rowCount + ' rows returned');
        });
        connection.execSql(request);
    };



// Setup Restify Server
var server = restify.createServer();

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
     
});