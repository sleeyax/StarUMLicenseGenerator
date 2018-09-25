var prompt = require('prompt');

function printHeader() {
    console.log('StarUML license generator\n');
    console.log('Waiting for answers before starting license generation...\n');
}
printHeader();

var schema = {
    properties: {
        name: {
            message: 'Holder',
            required: false,
            default: 'cracked'
        },
        product: {
            message: 'Product name',
            required: false,
            default: 'StarUML'
        },
        licenseType: {
            message: 'Type',
            required: false,
            default: 'Commercial'
        },
        quantity: {
            message: 'Users',
            required: false,
            default: 1,
            type: 'integer'
        },
    }
};

prompt.start();
prompt.get(schema, function (err, licenseInfo) {
    try {
        licenseInfo['timestamp'] = (new Date).getTime();
        const SK = 'DF9B72CC966FBE3A46F99858C5AEE';
        let base = SK + licenseInfo.name + SK + licenseInfo.product + '-' + licenseInfo.licenseType + SK + licenseInfo.quantity + SK + licenseInfo.timestamp + SK;
        let crypto = require('crypto');
        let key = crypto.createHash('sha1').update(base).digest('hex').toUpperCase();
        licenseInfo['licenseKey'] = key;
        let fs = require('fs');
        fs.writeFile(process.env.APPDATA + "\\" + licenseInfo.product + "\\license.key", JSON.stringify(licenseInfo), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("\n" + JSON.stringify(licenseInfo) + "\n");
            console.log("Done! Make sure to block internet access to 'staruml.io' !");
        });
        
    }catch(err) {
        console.error(err.message);
    }
});