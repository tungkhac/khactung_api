/*
 * Author: Khactung
 * Date: 22/05/2024
 * */

var express = require('express');
var common = require('../../../module/common');
var router = express.Router();
const path = require('path');
const axios = require('axios');
const config = require('config');

const _balanceDivision = 1000000000;
/*
Input:
{
    address_list: [
        'add1',
        'add2',
    ]
}
* */
router.get('/balance/ocean', async function (req, res, next) {
    console.log('- Blockvision get balance start');
    let data = {};
    try {
        var query = req.query,
            addressList = query.address;
        if(addressList) {
            addressList = addressList.split(',');
            addressList = addressList.map(e => e.trim());
            
            console.log('--- Address count:', addressList.length);
            if(!addressList.length) {
                result.message = 'Not found address list';
                return res.status(400).send(result);
            }
            data = await getOceanBalance(addressList);
            console.log('result:', data);
        }
    } catch (e) {
        console.log('Get balance ocean error:', e);
    }
    res.render('ocean_balance',  {
        title: 'OCEAN balance',
        label: 'OCEAN balance data',
        data: data
    });
});

/*
Input:
{
    address_list: [
        'add1',
        'add2',
    ]
}
Output:
{
    success: true,
    data: {
        address_total: 0,
        ocean_total: 0,
        usd_value: 0,
        balance: [
            {
                address: '0x..',
                ocean: 5.5,
            },
            ...
        ]
    }
}
* */
router.post('/balance/ocean', async function (req, res, next) {
    console.log('- Blockvision get balance start');
    let result = {
        success: true,
        data: {},
    };
    
    try {
        var body = req.body,
            addressList = body.address_list;

        console.log('--- Address count:', addressList.length);
        if(!addressList.length) {
            result.message = 'Not found address list';
            return res.status(400).send(result);
        }
        result.data = await getOceanBalance(addressList);
        console.log('result:', result);
    } catch (e) {
        console.log('Get balance ocean error:', e);
    }
    return res.status(200).send(result);
});

/*Output
{
    address_total: 0,
    ocean_total: 0,
    usd_value: 0,
    balance: [
        {
            address: '0x..',
            ocean: 5.5,
        },
        ...
    ]
}
* */
async function getOceanBalance(address_list) {
    let result = {
        address_total: 0,
        ocean_total: 0,
        usd_value: 0,
        balance: [],
    };
    for await (const address of address_list) {
        result.address_total++;
        
        /*curl blockvision
        curl --request GET \
         --url 'https://api.blockvision.org/v2/sui/account/coins?account=0xe335d84c489084474aac4322fb9ac5173369d27487c404558e99c7c5ec608075' \
         --header 'accept: application/json' \
         --header 'x-api-key: 2gifzY9fADQ2B2i5usYN0Z6fK9x'
        * */
        await axios
            .get(config.get('blockvision_api') + 'sui/account/coins?account=' + address, {
                headers: {
                    'accept': 'application/json',
                    'x-api-key': config.get('blockvision_api_key'),
                }
            })
            .then(response => {
                let itemData = response.data;
                console.log('--- get address:', address, ' status:', itemData.code);
                /*Response example
                {
                  "code": 200,
                  "message": "OK",
                  "result": {
                    "coins": [
                      {
                        "coinType": "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
                        "name": "Sui",
                        "symbol": "SUI",
                        "decimals": 9,
                        "balance": "56649578445",
                        "verified": true,
                        "logo": "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/sui.svg/public",
                        "usdValue": "63.72377845",
                        "price": "1.1248764809947782",
                        "priceChangePercentage24H": "-1.88476511",
                        "objects": 3
                      },
                      ...
                    ],
                    "usdValue": "78.21255368989998"
                  }
                * */

                if(itemData.code == 200 && itemData.result && itemData.result.coins) {
                    result.usd_value += parseFloat(itemData.result.usdValue);
                    //loop coin
                    for (let i=0; i<itemData.result.coins.length; i++) {
                        let itemCoin = itemData.result.coins[i];
                        // console.log(itemCoin);
                        if(itemCoin.symbol == 'OCEAN') {
                            result.ocean_total += parseFloat(itemCoin.balance);
                            result.balance.push({
                                address: address,
                                ocean: parseFloat(itemCoin.balance) / _balanceDivision,
                            })
                        }
                    }
                }
            })
            .catch(error => {
                console.log('error', error);
            });
    }
    result.ocean_total = result.ocean_total > 0 ? result.ocean_total/_balanceDivision : result.ocean_total;
    result.balance = common.sort(result.balance, 'desc', 'ocean');
    return result;
}

module.exports = router;
