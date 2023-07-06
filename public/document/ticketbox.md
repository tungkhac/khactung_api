Document URL: https://github.com/tungkhac/khactung_api/blob/master/public/document/ticketbox.md

##### ACC 1:
```
Nguyễn Khắc Tùng
0984778052
tungnk.hn@gmail.com
```


##### ACC 2:
```
Nguyễn Khắc Tùng
0775163382
khactung9x@gmail.com
```


##### Note:
1. Ticketbox có thể lấy showID bằng cách vào event page. Bấm F12 > Console. Gọi biến "pageViewEventDetail"
ex: https://ticketbox.vn/event/ben-thanh-liveshow-87636?opm=tbox.searchlistcategory.list.7

2. Từ event detail page -> access sớm vào page booking https://ticketbox.vn/event/87636/ticket-booking/75305
    
    Hoặc run script:
    
    ```
    let tuBookingUrl = pageViewEventDetail.bookingUrl;
    console.log('https://ticketbox.vn' + tuBookingUrl);
    ```
   
##### API: 
Get: check info ticket follow format

1. https://ticketbox.vn/api/event/87636/ticket-booking/75305/event-info/false
2. https://api.khactung.com/ticketBox/ticketStatus?event=87636&show=75305
3. Hoặc run script:
	
    ```
    let tuBookingUrl = pageViewEventDetail.bookingUrl;
    tuShowDetail = tuBookingUrl.split('/');
    
    console.log('url 1: ', `https://ticketbox.vn/api/event/${tuShowDetail[2]}/ticket-booking/${tuShowDetail[4]}/event-info/false`);
    console.log('url 1: ', `https://api.khactung.com/ticketBox/ticketStatus?event=${tuShowDetail[2]}&show=${tuShowDetail[4]}`);
    ```



##### Ajax template

```
$.ajax({
  method: "POST",
  url: "http://localhost:8801/sample/wait",
    data: {}
})
  .done(function( msg ) {
    console.log(msg );
  });
```

##### POST to 
https://ticketbox.vn/api/event/87636/ticket-booking/75305/submit-ticket-info

```
{
    "orderDetails": [
        {
            "ticketTypeId": 330086,
            "quantity": 2,
            "sections": []
        }
    ],
    "isWidget": false,
    "MobileOS": null,
    "capcha": "03AAYGu2Qs8gQyhCn-I8kc58Vd5D7VT0ZJuUB06t9Q0Wy6u6yk5OgWRQIGr4SqKlWjRY444jLYEQSPQ83HVWGZES84Hencrmz7Mlpw9RPCNUHFKgG4HTmPU4M9PT14ASChko6jUB9KZQUHaO_AGXl8kWAjLDV_wlWef8mQvRwbJOB-Zfh9ssRlFgMOzcbGIDvty6VIex3DY2o86vn4iyncJ-f9ypG14wvThgc7jdcIhfCMYAgQ01WsLCeT9s8Qyqj24o0l0-Ln0Sm5CLP7Gy5tYUMgY7eV8fcFszrbYVIgzKRuzYsbR5DbF542JHc_Zo4hSK8rvQhsKvNO2QXh3nfjPHmnF_wtjieixN4i9hFQlf7mLI508Nz95qeRMBFFMozoXywKUH6zHn9_Q0Zgw8EpJ0is3AUv4VgYuu9OFoME3n3evOQc0avDLudWb61_SEu4ZBBMIbA8dvnHP_vZ9vZJmt1HkouTl0-aMEr7SdPHuteZLbAu6kxA7a-EgGjc70iNxm1Tr6fq6DNQC8QzMWlb_U9LDK4xhq82afycCfCRwHSDHfll314qrYc",
    "securityToken": "QXW1JC_C8P4Ol-l1hki1uo1-Qt8WeKREqVgXnpz_ysUyaf1CA1hNHSvnR54Q9AoHUuup26LSm3fOOuX6XbmdyiuNijdEX-orjUFSewDItbM1:Oe-ApJ04BaTDHlS5pdMlhq6O8B7yWV_VW1uTurbKJUPY3bfBz-qPRNCQk7Relvu9KcSdYg4rb4zvLWCrkPC9VxnABCb9E1gJcWV_gskPhIL0HXKGB2eArjB4Mx1drkd20",
    "secretKey": ""
}
```

##### POST
https://ticketbox.vn/api/event/87284/ticket-booking/74120/submit-order

```
{
    "buyerInfo": {
        "email": "khactung9x@gmail.com",
        "firstName": "khac tung",
        "lastName": "Nguyen",
        "phoneNumber": "0775163382"
    },
    "subcribeMail": true,
    "paymentInfo": {
        "paymentType": 16,
        "deliveryInfo": {
            "note": null,
            "fee": 0,
            "fullAddress": null,
            "address": null,
            "cityId": 0,
            "districtId": 0,
            "wardId": 0
        },
        "officePickupInfo": {
            "note": null,
            "deadline": "2023-07-06T18:30:00+07:00"
        },
        "internetBankingInfo": null,
        "payooInfo": {
            "billingCode": null,
            "expireDate": "2023-07-07T13:49:20.1031912+07:00"
        },
        "one23Info": {
            "counter": {
                "counterCode": null
            },
            "expireDate": "2023-07-05T13:49:20.1031912+07:00",
            "encryptedData": null,
            "refNo1": null,
            "refNo2": null
        },
        "omiseInfo": {
            "omiseToken": null,
            "chargeToken": null
        },
        "bankTransferInfo": {
            "billingCode": null,
            "expireDate": "2023-07-05T13:49:20.1031912+07:00"
        },
        "cybersourceInfo": {
            "statusPayment": null,
            "returnMessage": null,
            "returnCode": null,
            "card": {
                "brand": null,
                "cardType": "",
                "expirationMonth": null,
                "expirationYear": null,
                "securityCode": null,
                "number": null,
                "maskedValidatedNumber": ""
            },
            "billingInfo": {
                "phone": null,
                "email": null,
                "address": null,
                "city": null,
                "country": null,
                "state": null,
                "zipCode": null
            }
        },
        "smartlinkInfo": {
            "statusPayment": null,
            "isSuccess": false,
            "isCancelled": true
        },
        "twoC2PInfo": {
            "statusPayment": null,
            "statusDescription": null,
            "isSuccess": false
        },
        "unipayAlipayInfo": {
            "statusPayment": null,
            "statusDescription": null,
            "paymentChannel": null,
            "isSuccess": false
        },
        "moMoInfo": {
            "statusDescription": ""
        }
    },
    "officeId": 1,
    "receivingMethod": {
        "receivingMethod": 1,
        "noteDeliver": null
    },
    "secretKey": ""
}
```


##### Code auto

```
// ==UserScript==
// @name New Script
// @namespace Script Runner Pro
// @match *://*/*
// @grant none
// ==/UserScript==
console.log('000000000000000000000000000000');
window.onload = function () {
    const keyworld = "STANDARD 2";
    const email = "khactung9x@gmail.com";
    const pass = "";
    const phone = "0775163382";
    const firstName = "Tung";
    const lastName = "Nguyen";
    const email2 = "khactung9x@gmail.com";
    const phone2 = "0775163382";
    const firstName2 = "Tung";
    const lastName2 = "Nguyen";
  
  console.log('11111111111111111111111111111', keyworld);
  
    setTimeout(() => {
        console.log('-----setTimeout');
        if (
            window.location.href.includes("event") &&
            window.location.href.includes("ticket-booking")
        ) {

            if (window.location.href.includes("step-question-form")) {
                setTimeout(()=>{
                    window.location.reload();
                },5000);
                let nameUrl = window.location.pathname.split("/");
                const idEvent = nameUrl[2];
                const idMap = nameUrl[4];
                // https://ticketbox.vn/api/event/${idEvent}/ticket-booking/74772/submit-form-answers
                var request = $.ajax({
                    url: `https://ticketbox.vn/api/event/${idEvent}/ticket-booking/${idMap}/event-info/false`,
                    type: "get",
                });
                request.done(function (data) {
                    console.log(data);
                    var typeTicket = data.currentShowing.ticketTypes || [];
                    var ticketName = keyworld ? keyworld.toUpperCase() : "VIP";
                    var ticketSelect = typeTicket[0] || null;
                    if (typeTicket.length > 0) {
                        typeTicket.map((x) => {
                            if (
                                x.title.toUpperCase().includes(ticketName) &&
                                x.displayOrder != 0
                            ) {
                                ticketSelect = x;
                                return;
                            }
                        });
                    }
                    var question = data.form ? data.form.ticketFormQuestions : [];
                    var formAnswers = [];
                    var formAnswers2 = [];
                    function answerData (q) {
                        var upQuestion = q.toUpperCase();
                        if(upQuestion.includes('TÊN') && upQuestion.includes('HỌ')){
                            return lastName + ' ' + firstName;
                        }
                        if(upQuestion.includes('TÊN')){
                            return firstName;
                        }
                        if(upQuestion.includes('HỌ')){
                            return lastName;
                        }
                        if(upQuestion.includes('EMAIL')){
                            return email;
                        }
                        if(upQuestion.includes('SỐ')){
                            return phone;
                        }
                        if(upQuestion.includes('SINH')){
                            return '16/08/1989';
                        }

                        return 'Email: ' + email + '. SDT: '+phone;
                    }
                    function answerData2 (q) {
                        var upQuestion = q.toUpperCase();
                        if(upQuestion.includes('TÊN') && upQuestion.includes('HỌ')){
                            return lastName2 + ' ' + firstName2;
                        }
                        if(upQuestion.includes('TÊN')){
                            return firstName2;
                        }
                        if(upQuestion.includes('HỌ')){
                            return lastName2;
                        }
                        if(upQuestion.includes('EMAIL')){
                            return email2;
                        }
                        if(upQuestion.includes('SỐ')){
                            return phone2;
                        }
                        if(upQuestion.includes('SINH')){
                            return '16/08/1989';
                        }

                        return 'Email: ' + email2 + '. SDT: '+ phone2;
                    }
                    question.map((x) => {
                        if(x.type === 1){
                            formAnswers.push({
                                id: 0,
                                formAnswerSheetId: 0,
                                formQuestionId: x.id,
                                formAnswerChoices: [
                                    {
                                        id: 0,
                                        formAnswerId: 0,
                                        formAnswerChoiceComponents: [
                                            {
                                                id: 0,
                                                formAnswerChoiceId: 0,
                                                formQuestionOptionId: null,
                                                answer: answerData(x.question),
                                            },
                                        ],
                                    },
                                ],
                                show: true,
                            });
                            formAnswers2.push({
                                id: 0,
                                formAnswerSheetId: 0,
                                formQuestionId: x.id,
                                formAnswerChoices: [
                                    {
                                        id: 0,
                                        formAnswerId: 0,
                                        formAnswerChoiceComponents: [
                                            {
                                                id: 0,
                                                formAnswerChoiceId: 0,
                                                formQuestionOptionId: null,
                                                answer: answerData2(x.question),
                                            },
                                        ],
                                    },
                                ],
                                show: true,
                            });
                        }

                        if(x.type === 3){
                            formAnswers.push({
                                id: 0,
                                formAnswerSheetId: 0,
                                formQuestionId: x.id,
                                formAnswerChoices: [
                                    {
                                        id: 0,
                                        formAnswerId: 0,
                                        formAnswerChoiceComponents: [
                                            {
                                                id: 0,
                                                formAnswerChoiceId: 0,
                                                formQuestionOptionId: x.formQuestionOptions[0].id,
                                                answer:  x.formQuestionOptions[0].optionText,
                                            },
                                        ],
                                    },
                                ],
                                show: true,
                            });
                            formAnswers2.push({
                                id: 0,
                                formAnswerSheetId: 0,
                                formQuestionId: x.id,
                                formAnswerChoices: [
                                    {
                                        id: 0,
                                        formAnswerId: 0,
                                        formAnswerChoiceComponents: [
                                            {
                                                id: 0,
                                                formAnswerChoiceId: 0,
                                                formQuestionOptionId: x.formQuestionOptions[0].id,
                                                answer:  x.formQuestionOptions[0].optionText,
                                            },
                                        ],
                                    },
                                ],
                                show: true,
                            });
                        }

                    });
                    $.ajax({
                        url: `https://ticketbox.vn/api/event/${idEvent}/ticket-booking/${idMap}/submit-form-answers`,
                        type: "POST",
                        data: JSON.stringify({
                            commonFormAnswerSheet: null,
                            formAnswerSheets: [
                                {
                                    id: 0,
                                    eventId: idEvent,
                                    ticketTypeId: ticketSelect.id,
                                    ticketId: null,
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    phoneNumber: phone,
                                    website: null,
                                    company: null,
                                    jobTitle: null,
                                    isCommonForOrder: false,
                                    formAnswers: formAnswers,
                                    ticketType: ticketSelect,
                                    open: true,
                                    valid: true,
                                },
                                {
                                    id: 0,
                                    eventId: idEvent,
                                    ticketTypeId: ticketSelect.id,
                                    ticketId: null,
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    phoneNumber: phone,
                                    website: null,
                                    company: null,
                                    jobTitle: null,
                                    isCommonForOrder: false,
                                    formAnswers: formAnswers2,
                                    ticketType: ticketSelect,
                                    open: true,
                                    valid: true,
                                },
                            ],
                            secretKey: "",
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (dt) {
                            if (dt.buyerInfo) {
                                console.log("OK", dt);
                                window.location.replace(
                                    `https://ticketbox.vn/event/${idEvent}/ticket-booking/${idMap}?opm=tbox.edp.buybox.7#/step2`
                                );
                            } else {
                                setTimeout(()=>{
                                    window.location.reload();
                                },2000);

                            }
                        },
                    });
                });

            }
            if (window.location.href.includes("step-select-tickets")) {
                setTimeout(()=>{
                    window.location.reload();
                },30000);
                let nameUrl = window.location.pathname.split("/");
                const idEvent = nameUrl[2];
                const idMap = nameUrl[4];
                var ticketOrder = [];
                var request = $.ajax({
                    url: `https://ticketbox.vn/api/event/${idEvent}/ticket-booking/${idMap}/event-info/false`,
                    type: "get",
                });
                request.done(function (data) {
                    console.log(data);
                    // cau hoi
                    var question = data.form ? data.form.ticketFormQuestions : [];
                    console.log("question", question);
                    // loai ve
                    var typeTicket = data.currentShowing.ticketTypes || [];
                    var ticketName = keyworld ? keyworld.toUpperCase() : "VIP";
                    var ticketSelect = typeTicket[0] || null;
                    if (typeTicket.length > 0) {
                        typeTicket.map((x) => {
                            if (
                                x.title.toUpperCase().includes(ticketName) &&
                                x.displayOrder != 0
                            ) {
                                ticketSelect = x;
                                return;
                            }
                        });
                    }

                    console.log("ticketSelect", ticketSelect);
                    const getRandomElements = (arr) => {
                        if (arr.length < 2) {
                            return [];
                        }
                        const index = Math.floor(Math.random() * (arr.length - 1));

                        const element1 = arr[index];
                        const element2 = arr[index + 1];
                        console.log('Random element');
                        console.log(element1,element2);
                        if(element1.sectionName != element2.sectionName) {
                            return getRandomElements(arr);
                        }


                        return [element1, element2];
                    };
                    //lay ban do
                    try {
                        var requestMap = $.ajax({
                            url: `https://ticketbox.vn/api/v2/seatmap/${idMap}`,
                            type: "get",
                        });

                        requestMap.done(function (map) {
                            console.log(map);

                            var selectMap = map.sections.filter(
                                (x) => x.ticketTypeId == ticketSelect.id
                            );
                            console.log("selectMap", selectMap);
                            selectMap.map((x) => {
                                x.rows.map((m) => {
                                    let allseat = m.seats.filter((s) => s.status == 1);
                                    if (allseat.length > 0) {
                                        ticketOrder.push(
                                            ...allseat.map((t) => {
                                                return {
                                                    id: t.id,
                                                    name: t.name,
                                                    rowName: m.name,
                                                    sectionName: x.name,
                                                    sectionId: x.id,
                                                    status: null,
                                                };
                                            })
                                        );
                                    }
                                });
                            });
                            const  tickets = [...getRandomElements(ticketOrder)];
                            console.log('tickets', tickets);
                            $.ajax({
                                url: `https://ticketbox.vn/api/event/${idEvent}/ticket-booking/${idMap}/submit-ticket-info`,
                                type: "POST",
                                data: JSON.stringify({
                                    MobileOS: null,
                                    capcha: window.tokenV3,
                                    orderDetails: [
                                        {
                                            quantity: 2,
                                            sections: [
                                                {
                                                    isReserveSeating: true,
                                                    quantity: 2,
                                                    seats: tickets,
                                                    sectionId: tickets.length > 0 ? getRandomElements(ticketOrder)[0].sectionId : null,
                                                },
                                            ],
                                            ticketTypeId: ticketSelect.id,
                                        },
                                    ],
                                    secretKey: "",
                                    securityToken: window.securityToken,
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (dt) {
                                    if (dt.data.buyerInfo) {
                                        console.log("OK", dt);
                                        if (question.length > 0) {
                                            window.location.replace(
                                                `https://ticketbox.vn/event/${idEvent}/ticket-booking/${idMap}?opm=tbox.edp.buybox.7#/step-question-form`
                                            );
                                        } else {
                                            window.location.replace(
                                                `https://ticketbox.vn/event/${idEvent}/ticket-booking/${idMap}?opm=tbox.edp.buybox.7#/step2`
                                            );
                                        }
                                    } else {
                                        setTimeout(()=>{
                                            window.location.reload();
                                        },2000);
                                    }
                                },
                            });
                        });
                        requestMap.fail(function () {
                            $.ajax({
                                url: `https://ticketbox.vn/api/event/${idEvent}/ticket-booking/${idMap}/submit-ticket-info`,
                                type: "POST",
                                data: JSON.stringify({
                                    MobileOS: null,
                                    capcha: window.tokenV3,
                                    orderDetails: [
                                        {
                                            ticketTypeId: ticketSelect.id,
                                            quantity: 2,
                                            sections: [],
                                        },
                                    ],
                                    secretKey: "",
                                    securityToken: window.securityToken,
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (dt) {
                                    if (dt.data.buyerInfo) {
                                        console.log("OK", dt);
                                        if (question.length > 0) {
                                            window.location.replace(
                                                `https://ticketbox.vn/event/${idEvent}/ticket-booking/${idMap}?opm=tbox.edp.buybox.7#/step-question-form`
                                            );
                                        } else {
                                            window.location.replace(
                                                `https://ticketbox.vn/event/${idEvent}/ticket-booking/${idMap}?opm=tbox.edp.buybox.7#/step2`
                                            );
                                        }
                                    } else {
                                        setTimeout(()=>{
                                            window.location.reload();
                                        },2000);
                                    }
                                },
                            });
                        });
                    } catch (e) {
                        console.log(e);
                    }
                });
            }
            if (window.location.href.includes("step2")) {
                var checkClick = true;
                setInterval(()=> {

                    var ev = new Event("input", { bubbles: true });
                    document.querySelector('input[name="lastName"]').value = lastName;
                    document.querySelector('input[name="lastName"]').dispatchEvent(ev);
                    document.querySelector('input[name="firstName"]').focus();
                    var ev2 = new Event("input", { bubbles: true });
                    document.querySelector('input[name="firstName"]').value = firstName;
                    document.querySelector('input[name="firstName"]').dispatchEvent(ev2);
                    document.querySelector('input[name="email"]').focus();
                    var ev3 = new Event("input", { bubbles: true });
                    document.querySelector('input[name="email"]').value = email;
                    document.querySelector('input[name="email"]').dispatchEvent(ev3);
                    document.querySelector('input[name="confirmEmail"]').focus();
                    var ev4 = new Event("input", { bubbles: true });
                    document.querySelector('input[name="confirmEmail"]').value = email;
                    document.querySelector('input[name="confirmEmail"]').dispatchEvent(ev4);
                    document.querySelector('input[name="phoneNumber"]').focus();
                    var ev5 = new Event("input", { bubbles: true });
                    document.querySelector('input[name="phoneNumber"]').value = phone;
                    document.querySelector('input[name="phoneNumber"]').dispatchEvent(ev5);
                    $('.payment-method')[2].click();

                    setTimeout(()=> {
                        if(checkClick){
                            $('.checkout-section .ladda-button')[0].click();
                        }
                        checkClick = false;
                    },1000)
                    // setTimeout(()=> {
                    //   $('.checkout-section .ladda-button')[0].click();
                    // },2000)
                    // alert(1);
                },3000);


            }
        }


        // if(window.location.pathname === "/sign-in"){
        //   if($('.sc-1tm90jj-6')){
        //     $('.sc-1tm90jj-6')[0].click();
        //   }

        //   setTimeout(() => {
        //     var ev = new Event("input", { bubbles: true });
        //     document.querySelector('input[name="email"]').value = email;
        //     document.querySelector('input[name="email"]').dispatchEvent(ev);
        //     document.querySelector('input[name="email"]').focus();
        //     var ev2 = new Event("input", { bubbles: true });
        //     document.querySelector('input[name="password"]').value = pass;
        //     document.querySelector('input[name="password"]').dispatchEvent(ev2);
        //     document.querySelector('input[name="password"]').focus();
        //     setTimeout(() => { 
        //       document.querySelector('.sc-1455axh-2 button').removeAttribute("disabled");
        //       document.querySelector('.sc-1455axh-2 button').click()
        //     },1000);
        //   }, 1000);
        // }
    }, 2000);
};
```
              
            