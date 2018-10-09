var prompt = require('prompt');

console.log('StarUML license generator\n');
console.log('Waiting for answers before starting license generation...\n');

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
            message: 'License type [Personal, Commercial, Educational, Classroom]',
            required: false,
            default: 'Commercial'
        },
        quantity: {
            message: 'Users',
            required: false,
            default: 1,
        }
    }
};

prompt.start();
prompt.get(schema, function (err, licenseInfo) {
    try {
        switch (licenseInfo.licenseType.toLowerCase()) {
            case 'commercial':
                licenseInfo.licenseType = 'CO';
                break;
            case 'personal':
                licenseInfo.licenseType = 'PS';
                break;
            case 'educational':
                licenseInfo.licenseType = 'ED';
            case 'classroom':
                licenseInfo.licenseType = 'CR';
                break;
        }
        licenseInfo['timestamp'] = (new Date).getTime();
        const SK = 'DF9B72CC966FBE3A46F99858C5AEE';
        let base = SK + licenseInfo.name + SK + licenseInfo.product + '-' + licenseInfo.licenseType + SK + licenseInfo.quantity + SK + licenseInfo.timestamp + SK;
        let crypto = require('crypto');
        licenseInfo['licenseKey'] = crypto.createHash('sha1').update(base).digest('hex').toUpperCase();
        let fs = require('fs');
        fs.writeFile(process.env.APPDATA + "\\" + licenseInfo.product + "\\license.key", JSON.stringify(licenseInfo), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("\n" + JSON.stringify(licenseInfo) + "\n");
            console.log("Done! Make sure to block internet access to 'staruml.io' !");
        });
        
    }catch(error) {
        console.error(error.message);
    }
});