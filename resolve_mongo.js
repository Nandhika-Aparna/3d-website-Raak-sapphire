require('dotenv').config();
const dns = require('dns');
const fs = require('fs');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const srvRecord = '_mongodb._tcp.website.7co3eux.mongodb.net';

dns.resolveSrv(srvRecord, (err, addresses) => {
    if (err) return console.error(err);
    dns.resolveTxt('website.7co3eux.mongodb.net', (errTxt, txtRecords) => {
        const hosts = addresses.map(a => `${a.name}:${a.port}`).join(',');
        const uriMatch = process.env.MONGODB_URI.match(/mongodb\+srv:\/\/(.*?)@/);
        const credentials = uriMatch[1];
        
        let authSourceAndReplica = '?ssl=true&authSource=admin&retryWrites=true&w=majority';
        if (txtRecords && txtRecords.length > 0) {
           authSourceAndReplica = '?' + txtRecords[0].join('');
        }
        
        const fallbackConnectionString = `mongodb://${credentials}@${hosts}/${authSourceAndReplica}`;
        
        fs.writeFileSync('resolved_db.json', JSON.stringify({ uri: fallbackConnectionString }, null, 2), 'utf8');
        console.log("Wrote to resolved_db.json");
    });
});
