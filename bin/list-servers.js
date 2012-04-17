var fs = require('fs');
var rackspace = require('cloudservers');

var config = JSON.parse(fs.readFileSync(__dirname + '/../config.json'));
var cloudServerConfig = {
    auth : config
};

var client = rackspace.createClient(cloudServerConfig);
client.getServers(true, function (err, servers) {
    servers.forEach(function (server) {
        console.log(server.name + ": " + server.addresses.public);
    });
});

