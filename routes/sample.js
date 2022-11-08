/*
 * Author: Khactung
 * Date: 01/05/2020
 * */

var express = require('express');
var common = require('../module/common');
var router = express.Router();
const path = require('path');

const _brand_list = {
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

router.get('/brand', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.status(200).json({
        success: true,
        data: _brand_list,
    });
});

router.get('/product', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var query = req.query,
        timeout = (!isNaN(query.timeout)) ? parseInt(query.timeout) : 2,
        limit = (!isNaN(query.limit) && parseInt(query.limit)) ? parseInt(query.limit) : 10,
        page = (!isNaN(query.page) && parseInt(query.page)) ? parseInt(query.page) : 1,
        brand = query.brand;

    var color_list = ['Blue', 'While', 'Black', 'Green', 'Orange', 'Gray'];
    var size_list = ['xs', 's', 'm', 'sm', 'l', 'xl', 'xxl'];
    var type_list = ['Vintage', 'Sophisticated', 'Bohemian', 'Chic', 'Artsy', 'Sexy', 'Casual', 'Tomboy', 'Rocker'];
    var result = [];

    for(let i=0; i<limit; i++) {
        var p_title = "Product 0" + (i + 1);

        var p_size = [size_list[getRamdomArr(Object.keys(size_list))]];
        var p_size2 = size_list[getRamdomArr(Object.keys(size_list))];
        if(p_size.indexOf(p_size2) <= -1) {
            p_size.push(p_size2);
        }

        var p_price = getRamdomPrice();
        var p_price_offer = getRamdomPrice(p_price);

        result.push({
            title: p_title,
            type: type_list[getRamdomArr(Object.keys(type_list))],
            text: "Memories define us. So what if you lost yours every time you went to sleep? Your name, your identity, your past, even the people you love -- all forgotten overnight. And the one person you trust may be telling you only half the story. Before I Go To Sleep is a disturbing psychological thriller in which an amnesiac desperately tries to uncover the truth about who she is and who she can trust.",
            regularPrice: p_price,
            offerPrice: p_price_offer,
            saveAmount: (p_price - p_price_offer).toFixed(2),
            currencySymbol: '$',
            link: "/products/product-0" + (i + 1),
            availability: Math.round(Math.random()),
            brand: (_brand_list[brand] != void 0) ? _brand_list[brand] : _brand_list[getRamdomArr(Object.keys(_brand_list))],//get random 0 - length
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

    setTimeout(function() {
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
    }, timeout * 1000);
});

router.get('/page', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var query = req.query,
        content = query.content;

    var template = {
        blog: {
            title: 'Blog',
            content: "<p>This is an example page. It's different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:</p>"+
                '<blockquote>'+
                    "<p>Hi there! I'm a bike messenger by day, aspiring actor by night, and this is my blog. I live in Los Angeles, have a great dog named Jack, and I like piña coladas. (And gettin' caught in the rain.)</p>" +
                '</blockquote>'+
                '<p>...or something like this:</p>'+
                '<blockquote>'+
                    '<p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</p>'+
                '</blockquote>'+
                '<p>As a new WordPress user, you should go to <a href="http://khactung.com/wp-admin/">your dashboard</a> to delete this page and create new pages for your content. Have fun!</p>',
        },
        service: {
            title: 'Us services',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        contact: {
            title: 'Contact',
            content: '<h1>&lt;h1&gt; to &lt;h6&gt; - Headline Colour and Size Are All The Same</h1>' +
                '<img class="imgr borderedbox inspace-5" src="https://emlahoa.com/images/demo/imgr.gif" alt="">' +
                '<p>Aliquatjusto quisque nam consequat doloreet vest orna partur scetur portortis nam. Metadipiscing eget facilis elit sagittis felisi eger id justo maurisus convallicitur.</p>' +
                '<p>Dapiensociis <a href="#">temper donec auctortortis cumsan</a> et curabitur condis lorem loborttis leo. Ipsumcommodo libero nunc at in velis tincidunt pellentum tincidunt vel lorem.</p>' +
                '<img class="imgl borderedbox inspace-5" src="https://emlahoa.com/images/demo/imgl.gif" alt="">' +
                '<p>You can use and modify the template for both personal and commercial use. You must keep all copyright information and credit links in the template and associated files. For more website templates visit our <a href="http://www.os-templates.com/">free website templates</a> section.</p>' +
                '<p>Portortornec condimenterdum eget consectetuer condis consequam pretium pellus sed mauris enim. Puruselit mauris nulla hendimentesque elit semper nam a sapien urna sempus.</p>'
        },
    };

    res.status(200).json({
        success: true,
        data: (template[content] != void 0) ? template[content] : null,
        filter: {
            content: content,
        },
    });
});

router.post('/upload', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var body = req.body;
    console.log('Body: ', body);
    
    var result = {
        status: 'NG',
    };
    
    try {
        // console.log(req.files);
        if(!req.files || !req.files.file_upload) {
            result.message = 'No file uploaded (field name: file_upload)';
            res.status(200).send(result);
            
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let file_input = req.files.file_upload;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            file_input.mv('./public/uploads/' + file_input.name);

            //send response
            result.message = 'File is uploaded';
            result.data = {
                name: file_input.name,
                mimetype: file_input.mimetype,
                size: (file_input.size/1024/1024).toFixed(2) + 'Mb'
            };
            res.status(200).send(result);
        }
    } catch (err) {
        console.log('Upload error: ', err);
        res.status(500).send(err);
    }
});

/*Demo download file
* Url access: 
*   /sample/text1/download
*   /sample/text2/download
* */
router.get('/:code/download', async function(req, res){
    try {
        const file_code = req.params.code;
        const file_name = file_code + '.txt';
        const file_path = `./public/download/${file_name}`;
        
        console.log('- Request download ' + file_path);
        if (file_code && await common.isFileExist(file_path)) {
            console.log('-> Downloading');
            return res.download(file_path, file_name); // Set disposition and send it.
        } else {
            console.log('-> Download false');
        }
        return res.status(200).send(`File <b>${file_name}</b> is not exist!`);
    } catch(e) {
        return res.status(200).send(`No such file or directory`);
    }
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
