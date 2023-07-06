/*
 * Author: Khactung
 * Date: 04/07/2023
 * */

var express = require('express');
var common = require('../module/common');
var router = express.Router();
const path = require('path');
const axios = require('axios');

/*
Note: 
- có thể lấy showID bằng cách vào event page. Bấm F12 > Console. Gọi biến "pageViewEventDetail"
* */
router.get('/ticketStatus', async function (req, res, next) {
    var query = req.query,
        event = query.event,
        show = query.show;

    let url = `https://ticketbox.vn/api/event/${event}/ticket-booking/${show}/event-info/false`;

    console.log('- ticketbox: URL', url);
    let data = {};


    /* demo data*/
   /* data = {
        title: '[MÂY LANG THANG] LIVESHOW ĐAN TRƯỜNG - TRUNG QUANG',
        ticketData: [
            {
                id: 323858,
                title: 'STANDARD 2 / NHỞN NHƠ',
                maxOrder: 10,
                soldOut: false,
                available: true,
                closed: false,
                hidden: false
            },
            {
                id: 323859,
                title: 'STANDARD 1 / MƠ MÀNG',
                maxOrder: 10,
                soldOut: false,
                available: true,
                closed: false,
                hidden: false
            },
            {
                id: 323860,
                title: 'VIP / BỀNH BỒNG',
                maxOrder: 10,
                soldOut: false,
                available: true,
                closed: false,
                hidden: false
            },
            {
                id: 323861,
                title: 'PREMIUM / THẢNH THƠI',
                soldOut: true,
                available: false,
                closed: false,
                hidden: false
            }
        ]
    };*/    
    
   await axios
    .get(url)
    .then(response => {
        // console.log('response1', response.data);
        if(typeof response.data == 'object') {
            let resData = response.data;
            data.title = resData.title;
            data.ticketData = [];
            //get ticket data
            if(resData.currentShowing && resData.currentShowing.ticketTypes) {
                for(let i=0; i<resData.currentShowing.ticketTypes.length; i++) {
                    let ticketItem = resData.currentShowing.ticketTypes[i];
                    data.ticketData.push({
                        id: ticketItem.id,
                        displayOrder: ticketItem.displayOrder,
                        applyingPrice: ticketItem.applyingPrice,
                        title: ticketItem.title,
                        maxOrder: ticketItem.maxTixPerOrder,
                        soldOut: ticketItem.isSoldOut,
                        available: ticketItem.isAvailable,
                        closed: ticketItem.isClosed,
                        hidden: ticketItem.isHiddenFromListing,
                    })
                }
            }
            
        } else {
            data.error = `URL ${url} \n Error`;
        }
    })
    .catch(error => {
        console.log('error', error);
    });
   
    console.log('data:', data);
    
    res.render('ticketStatus',  { 
        title: 'Khac Tung API', 
        label: 'Ticketbox status',
        data: data
    });
});

module.exports = router;
