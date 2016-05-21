var restify = require('restify');

var partnerISV = new Array(5);

// for ( var i = 1; i < 5; i++) 
//     {
//         partnerISV[i] = new Array(2);
//         console.log(i);
//     };

 

partnerISV.forEach(function(item) {
    partnerISV[item] = new Array(2);
});
partnerISV[0]= new Array(2);
partnerISV[0][0] = 'Snapchat Inc';
partnerISV[0][1] = 'James Cadd <jacadd@microsoft.com>';
partnerISV[1]= new Array(2);
partnerISV[1][0] = 'Twitter Inc';
partnerISV[1][1] = 'Chris Barker <cbarker@microsoft.com>';
partnerISV[2]= new Array(2);
partnerISV[2][0] = 'Yahoo!';
partnerISV[2][1] = 'Maarten van de Bospoort <maartenb@microsoft.com>';
partnerISV[3]= new Array(2);
partnerISV[3][0] = 'baidu';
partnerISV[3][1] = 'Yansong Li <yansongl@microsoft.com>';
// partnerISV[1].account(['Twitter Inc'],
// partnerISV[1].TE['Chris Barker <cbarker@microsoft.com>']);
// partnerISV[2].account(['Yahoo!'],
// partnerISV[2].TE['Maarten van de Bospoort <maartenb@microsoft.com>']);
// partnerISV[3].account(['baidu'],
// partnerISV[3].TE['Yansong Li <yansongl@microsoft.com>']);

var arrayIsvTE = [];
var cacheDataAvailable = false;

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
        arrayIsvTE.push("First Item on the mapping array");
        // executeStatement();
        console.log("Mapping Array length = " + arrayIsvTE.length);
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
            arrayIsvTE.push(result);
            result ="";
            console.log(arrayIsvTE[0]);
            console.log(arrayIsvTE.length);
        });

        request.on('done', function(rowCount, more) {
        console.log(rowCount + ' rows returned');
        });
        connection.execSql(request);
        cacheDataAvailable = true;
        console.log("Cache data available " + cacheDataAvailable);
        console.log("Line 59 " + arrayIsvTE.length);
    };



// Setup Restify Server
var server = restify.createServer();
var pos = 0;

partnerISV.forEach(function (item) {
    arrayData = item;
    arrayData.forEach(function(item) {
        nestedArrayData = item;
        console.log(nestedArrayData);
        if (nestedArrayData == 'Yahoo!') {
            console.log("Hit");
        };
    });
    });
 var x = 0;
 var account = 'Yahoo!'
console.log("Looking for account");
while ( x < partnerISV.length) {
    console.log(x);
    if (partnerISV[x][0] == account) {
        console.log(partnerISV[x][0] +" " + partnerISV[x][1]);
        x = partnerISV.length;
    };
    x++;
    };

 
    // pos = item.search('Yahoo!');
    // console.log(pos);




server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
    console.log(arrayIsvTE.length); 

    


});