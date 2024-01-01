import paytmchecksum from "../paytm/PaytmChecksum.js";
import {paytmParams, paytmMerchentkey} from "../server.js" ;
import formidable from "formidable";
import https from "https";

export const addPaymentGateway = async(request, response) => {
    try {
        let paytmChecksum = await paytmchecksum.generateSignature(paytmParams, paytmMerchentkey);
        
        let params = {
            ...paytmParams, 'CHECKSUMHASH': paytmChecksum
        }

        response.status(200).json(params);
    } catch (error) {
        response.status(500).json({erro: error.message});
    }
} 

export const paytmResponse = (request, response) => {
    const form = new    formidable.IncomingForm();
    let paytmChecksum = request.body.CHECKSUMHASH;
    delete resquest.body.CHECKSUMHASH;

    let isVerifySignature = paytmchecksum.verifySignature(request.body, paytmMerchentkey, paytmChecksum);
    if(isVerifySignature){
            let paytmParams = {};
            paytmParams['MID'] = request.body.MID;
            paytmParams['ORDERID'] = request.body.ORDERID;

            paytmchecksum.generateSignature(paytmParams, paytmMerchentkey).then(function(checksum){
                payrmParams['CHECKSUMHASH'] = checksum;

                let post_data = JSON.stringify(paytmParams);

                let option = {
                    hostname : 'securegw-stage.paytm.in',
                    port : 443,
                    path: '/order/status',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Content-Length' : post_data.length
                    }
                }

                let res ="";
                let post_req = https.resquest(option, function(posr_res){
                    post_res.on('data', function(chunk){
                        res += chunk;
                    })

                    post_res.on('end',function(){
                        let result = JSON.parse(res);
                        response.redirect('')
                    })
                });
                post_req.write(post_data);
                post_req.end();
            })
    }else{
        console.log('checksum mismatch')
    }
}