/*
 * Author: Khactung
 * Date: 01/05/2020
 * */

var express = require('express');
var router = express.Router();

router.post('/wait', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var body = req.body,
        timeout = body.timeout;

    setTimeout(function () {
        res.json({
            success: true,
            timeout: timeout,
        });
    }, parseFloat(timeout) * 1000);
});


router.post('/getMenu', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    var response_data = {
        menu: [
            {
                name: "Home",
                url: "/",
                sub: null
            },
            {
                name: "Blog",
                url: "/blog",
                sub: null
            },
            {
                name: "Service",
                url: "/service",
                sub: [
                    {
                        name: "Ship",
                        url: "/service/ship",
                        sub: null
                    },
                    {
                        name: "Repair",
                        url: "/service/repair",
                        sub: null
                    }
                ]
            },
            {
                name: "Contact",
                url: "/contact",
                sub: [
                    {
                        name: "About us",
                        url: "/about",
                        sub: null
                    },
                    {
                        name: "Job",
                        url: "/job",
                        sub: null
                    }
                ]
            },
            {
                name: "Agency",
                url: "/agency",
                sub: [
                    {
                        name: "Northland",
                        url: "/agency/northland",
                        sub: [
                            {
                                name: "166 - Tạ Quang Bửu - Hà Nội",
                                url: "/agency/northland/ta-quang-buu-ha-noi",
                                sub: null
                            },
                            {
                                name: "23 - Nghĩa Tân - Hà Nội",
                                url: "/agency/northland/nghia-tan-ha-noi",
                                sub: null
                            },
                            {
                                name: "02 - Bach Đằng - Bắc Ninh",
                                url: "/agency/northland/bachdang-bac-ninh",
                                sub: null
                            },
                        ]
                    },
                    {
                        name: "Midland",
                        url: "/agency/midland",
                        sub: [
                            {
                                name: "56 - Bạch Đằng - Đà Nẵng",
                                url: "/agency/midland/bach-dang-da-nang",
                                sub: null
                            },
                            {
                                name: "256 - Lăng Cô - Huế",
                                url: "/agency/midland/lang-co-hue",
                                sub: null
                            }
                        ]
                    },
                    {
                        name: "Southland",
                        url: "/agency/southland",
                        sub: [
                            {
                                name: "03 - Quận 3 - HCM",
                                url: "/agency/southland/quan-3-hcm",
                                sub: null
                            },
                            {
                                name: "120 - Quận 6 - HCM",
                                url: "/agency/southland/quan-06-hcm",
                                sub: null
                            },
                            {
                                name: "503 - Quận 10 - HCM",
                                url: "/agency/southland/quan-10-hcm",
                                sub: null
                            },
                        ]
                    },
                ]
            },
        ]
    };

    res.json(response_data);
});


router.get('/product', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var query = req.query,
        limit = (!isNaN(query.limit) && parseInt(query.limit)) ? parseInt(query.limit) : 10,
        page = (!isNaN(query.page) && parseInt(query.page)) ? parseInt(query.page) : 1,
        brand = query.brand;

    var brand_list = {
        canifa: 'Canifa',
        giditex: 'Giditex',
        vinatex: 'Vinatex',
        hanosimex: 'Hanosimex',
        viettien: 'Việt Tiến',
        songhong: 'Sông Hồng',
        may_10: 'May 10',
        det_10: 'Dệt 10/10',
        nhabe: 'Nhà Bè - NBC'
    };
    var color_list = ['Blue', 'While', 'Black', 'Green', 'Oảmge', 'Gray'];
    var size_list = ['xs', 's', 'm', 'sm', 'l', 'xl', 'xxl'];
    var result = [];

    for(let i=0; i<limit; i++) {
        var p_title = "Product 0" + (i + 1);

        var p_size = [size_list[getRamdomArr(Object.keys(size_list))]];
        var p_size2 = size_list[getRamdomArr(Object.keys(size_list))];
        if(p_size.indexOf(p_size2) != -1) {
            p_size.push(p_size2);
        }

        var p_price = getRamdomPrice();
        var p_price_offer = getRamdomPrice(p_price);

        result.push({
            title: p_title,
            type: "free style",
            text: "Memories define us. So what if you lost yours every time you went to sleep? Your name, your identity, your past, even the people you love -- all forgotten overnight. And the one person you trust may be telling you only half the story. Before I Go To Sleep is a disturbing psychological thriller in which an amnesiac desperately tries to uncover the truth about who she is and who she can trust.",
            regularPrice: p_price,
            offerPrice: p_price_offer,
            saveAmount: p_price - p_price_offer,
            currencySymbol: '$',
            link: "/products/product-0" + (i + 1),
            availability: Math.round(Math.random()),
            brand: (brand_list[brand] != void 0) ? brand_list[brand] : brand_list[getRamdomArr(Object.keys(brand_list))],//get random 0 - length
            color: getRamdomArr(color_list),//get random 0 - length
            sizes: p_size,//get random 0 - length
            images: [
                {
                    title: "Title of " + p_title,
                    url: "",
                },
                {
                    title: "Before I Go to Sleep cover",
                    url: "",
                }
            ]
        });
    }

    res.status(200).json({
        success: true,
        data: result,
        filter: {
            brand: brand,
        },
        pagination: {
            page: page,
            limit: limit
        }
    });
    // res.json({
    //     success: true,
    //     data: result
    // });
});


//get ramdom in array: from0 - length
function getRamdomArr(arr) {
    return arr[Math.round(Math.random()*arr.length)];
}
function getRamdomPrice(max) {
    //if not set: set default 1000
    max = (!isNaN(max)) ? parseFloat(max) : 1000;
    return (Math.random()*max).toFixed(2);
}

module.exports = router;
