/*
 * Author: Khactung
 * Date: 01/05/2020
 * */

var express = require('express');
var router = express.Router();

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

module.exports = router;
