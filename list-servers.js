var fs = require('fs');
var rackspace = require('cloudservers');

var configStats = fs.statSync('./config.json');
if (!configStats.isFile()) {
    console.log("Config file not found");
    process.exit(1);
}

var config = JSON.parse(fs.readFileSync('./config.json'));
var cloudServerConfig = {
    auth : config
};

var client = rackspace.createClient(cloudServerConfig);
client.setAuth(function (err) {
    if (err) {
        console.log("Failed authenticating at RackSpace. Error:", err.toString());
        process.exit(1);
    }
    client.getServers(true, function (err, servers) {
        servers.forEach(function (server) {
            console.log(server.name + ": " + server.addresses.public);
        });
    });
});

