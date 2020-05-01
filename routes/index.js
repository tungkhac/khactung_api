/*
* Author: Khactung
* Date: 01/05/2020
* */

var express = require('express');
var router = express.Router();
var g_vietnam_locality = require('../data/vietnam_locality.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Khac Tung API' });
});

/*router.get('/demo/vnpost', function(req, res, next) {
    res.render('vnpost', {});
});
router.get('/demo/vnpost2', function(req, res, next) {
    res.render('vnpost2', {});
});*/

const g_scope_code = {
    insite: '001',
    outsite: '002'
};
const g_dimension_code = {
    weigh: '001',
    size: '002'
};
router.post('/vnpostFree', function(req, res, next) {
    var result = {
        type: '001',
        price1: '50.000 VNĐ (1.5 - 2 ngày)',
        price2: '110.000 VNĐ',
        price3: '35.200 VNĐ',
        price4: '0',
        price5: '0'
    };

  var body = req.body,
      // scope_code = body.scope_code,
      add_from = body.from,
      add_to = body.to,
      dimension = body.dimension;
      // long = body.long,
      // weight = body.weight,
      // height = body.height;
    console.log('---------VNpost Free---------');
    console.log('Body: ', body);

    if(add_from == add_to) {
        if(dimension == g_dimension_code.weigh) {
            result = {
                type: '001',
                price1: '23.000 VNĐ',
                price2: '50.000 VNĐ (Phát trong ngày)',
                price3: '81.400 VNĐ',
                price4: '0',
                price5: '0'
            };
        } else {
            result = {
                type: '001',
                price1: '43.000 VNĐ',
                price2: '90.000 VNĐ (Phát trong ngày)',
                price3: '81.400 VNĐ',
                price4: '0',
                price5: '0'
            };
        }
    } else {
        if(dimension == g_dimension_code.weigh) {
            result = {
                type: '002',
                price1: '14.000 VNĐ',
                price2: '33.000 VNĐ (1.5 - 2 ngày)',
                price3: '18.500 VNĐ',
                price4: '120.000 VNĐ',
                price5: '17.000 VNĐ'
            };

        } else {
            result = {
                type: '001',
                price1: '78.900 VNĐ (1.5 - 2 ngày)',
                price2: '120.000 VNĐ',
                price3: '36.200 VNĐ',
                price4: '0',
                price5: '0'
            };
        }
    }
  res.status(200).send(result);
});


router.get('/vnLocality', function(req, res, next) {
    var response_data = {
        type: "006",
        data: []
    };

    try {
        response_data.data = g_vietnam_locality;
        res.json(response_data);
    } catch(e) {
        response_data.error_message = 'No result!';
        res.json(response_data);
    }
});

router.post('/getType', function(req, res, next) {
    var result = {
        type: '001'
    };
    var body = req.body,
    // scope_code = body.scope_code,
        add_from = body.from,
        add_to = body.to,
        dimension = body.dimension;
    // long = body.long,
    // weight = body.weight,
    // height = body.height;
    console.log('---------getType Free---------');
    console.log('Body: ', body);

    if(add_from == add_to) {
        if(dimension == g_dimension_code.weigh) {
            result = {
                type: '001'
            };
        } else {
            result = {
                type: '001'
            };
        }
    } else {
        if(dimension == g_dimension_code.weigh) {
            result = {
                type: '002'
            };

        } else {
            result = {
                type: '001'
            };
        }
    }
    res.status(200).send(result);
});

module.exports = router;
