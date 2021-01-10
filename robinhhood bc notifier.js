$(function() {
    let fetchLink = "https://api.robinhood.com/marketdata/forex/quotes/3d961844-d360-45fc-989b-f6fca761d511/";
    let currentSellPrice = null;
    let maxThreshold = 0;
    let minThreshold = 0;
    let riseSound = "https://raw.githubusercontent.com/ShroudKing/External-Resources/main/Good%20Alert.mp3";
    let dropSound = "https://raw.githubusercontent.com/ShroudKing/External-Resources/main/Bad%20Alert.mp3";

    function playSound(type) {
        let mySound;
        if (type === "good")
            mySound = new Audio(riseSound);
        else if (type === "bad")
            mySound = new Audio(dropSound);
        mySound.play();
        return true;
    }
    
    async function start() {
        let data = await fetch(fetchLink, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2MTA3MzkzMTksInRva2VuIjoieFZZOG1SalFMbFBFcTNCMDI2ajNSMnd5akNmZ0F1IiwidXNlcl9pZCI6IjlmNjgzOTA4LTRjYjktNDMxNi04NWM4LWRlN2IyYWQ0NzJiZiIsImRldmljZV9oYXNoIjoiM2QyMjJmYjEyMTI5NTU4NTg0MjM1ZWNjMWMyZjY3NTciLCJzY29wZSI6IndlYl9saW1pdGVkIiwiZGN0IjoxNjA5Njk4MzYxLCJ1c2VyX29yaWdpbiI6IlVTIiwib3B0aW9ucyI6ZmFsc2UsImxldmVsMl9hY2Nlc3MiOmZhbHNlfQ.RM_gScoDCZpRLthRHuXrBN7nNQJ9J3SAmKa7axlQB_GA4gjd-TXvUhNsRw0Q4-jt-ppg8iq245mth8Tfn1_MgQqNQnVx6HTTISDn16ZKV8I4VvsBKUI_xzhVhS9BIosvOeYFK5zjLmaeMRweE9SCDHVwDBB0LP-A9s1sCGMYdOU88EwJIuz3AUqolbfA1xTNSzHKNaVIHaHJxKccnE3_T7EGcZu6NhBT65L55pW2LpSLR5JqXjfaiypU0LvMiIZYR7ErncNzLRDuwRikR71OuIAHec0D5ngVlmrO8g7-XK_dJqMTOzIuL6xpxYcjW-VqwGcYIn98HlRvj3Q2NsYZjg",
                "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://robinhood.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "same-origin"
        });
        
        data = await data.json();
        
        if (data) {
            let price = data["mark_price"];
            if (price) {
                if (parseFloat(price)) {
                    price = Math.round(price);
                    if (currentSellPrice === null) {
                        currentSellPrice = Math.round(price);
                        maxThreshold = currentSellPrice + 2500;
                        minThreshold = currentSellPrice - 2500;
                    } else if (price > maxThreshold) {
                        minThreshold, maxThreshold += 1000;
                        playSound("good");
                    } else if (price < minThreshold) {
                        minThreshold, maxThreshold -= 1000;
                        playSound("bad");
                    }
                }
            }
        }
        setTimeout(() => {
            start();
        }, 2000);
    }
    start();
});
