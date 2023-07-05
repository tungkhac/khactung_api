https://ticketbox.vn/event/87554/ticket-booking

-> https://ticketbox.vn/event/87554/ticket-booking/75060#/step-select-tickets



##### ACC 1:
```
Nguyễn Khắc Tùng
0984778052
tungnk.hn@gmail.com
```


##### ACC 2:
```
Nguyễn Khắc Tùng
084775163382
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
        "phoneNumber": "084775163382"
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