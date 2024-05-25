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
const _sui_rpc_request = {
    coin_type_list: {
        sui: '0x2::sui::SUI',
        ocean: '0xa8816d3a6e3136e86bc2873b1f94a15cadc8af2703c075f2d546c2ae367f4df9::ocean::OCEAN'
    },
    /*Input address:
    [
        'address'
    ] 
    * */
    getAllBalances: (address_list) => {
        return {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "suix_getAllBalances",
            "params": address_list
        }
    },
};
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
        sui_total: 0,
        ocean_total: 0,
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
    sui_total: 0,
    ocean_total: 0,
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
        sui_total: 0,
        ocean_total: 0,
        balance: [],
    };
    for await (const address of address_list) {
        result.address_total++;
        await axios
            .post(config.get('sui_rpc_mainnet'), _sui_rpc_request.getAllBalances([address]))
            .then(response => {
                console.log('--- get address:', address, ' status:', response.status);
                /*Response example "result"
                [
                    {
                        "coinType": "0x2::sui::SUI",
                        "coinObjectCount": 1,
                        "totalBalance": "310918952",
                        "lockedBalance": {}
                    },
                    {
                        "coinType": "0xa8816d3a6e3136e86bc2873b1f94a15cadc8af2703c075f2d546c2ae367f4df9::ocean::OCEAN",
                        "coinObjectCount": 12,
                        "totalBalance": "34000000000",
                        "lockedBalance": {}
                    }
                ],
                * */

                if(response.status === 200 && response.data && response.data.result.length) {
                    let itemResult = response.data.result;
                    //loop coin
                    for (let i=0; i<itemResult.length; i++) {
                        let itemCoin = itemResult[i];
                        let itemBalance = parseFloat(itemCoin.totalBalance);
                        let itemData = {
                            address: address,
                        };
                        // console.log(itemCoin);
                        if(itemCoin.coinType == _sui_rpc_request.coin_type_list.ocean) {
                            result.ocean_total += itemBalance;
                            itemData.ocean = itemBalance / _balanceDivision;
                        }
                        if(itemCoin.coinType == _sui_rpc_request.coin_type_list.sui) {
                            result.sui_total += itemBalance;
                            itemData.sui = itemBalance / _balanceDivision;
                        }
                        result.balance.push(itemData);
                    }
                }
            })
            .catch(error => {
                console.log('error', error);
            });
    }
    result.sui_total = result.sui_total > 0 ? result.sui_total/_balanceDivision : result.sui_total;
    result.ocean_total = result.ocean_total > 0 ? result.ocean_total/_balanceDivision : result.ocean_total;
    result.balance = common.sort(result.balance, 'desc', 'ocean');
    return result;
}

module.exports = router;
