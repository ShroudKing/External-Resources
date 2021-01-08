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
                "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2MTAxNDMwMjYsInRva2VuIjoiUDZzdVZCVE82WDZZUlM0TjV6SXMzeGtJU1ZGcFBjIiwidXNlcl9pZCI6IjlmNjgzOTA4LTRjYjktNDMxNi04NWM4LWRlN2IyYWQ0NzJiZiIsImRldmljZV9oYXNoIjoiM2QyMjJmYjEyMTI5NTU4NTg0MjM1ZWNjMWMyZjY3NTciLCJzY29wZSI6ImludGVybmFsIiwiZGN0IjoxNjA5Njk4MzYxLCJ1c2VyX29yaWdpbiI6IlVTIiwib3B0aW9ucyI6ZmFsc2UsImxldmVsMl9hY2Nlc3MiOmZhbHNlfQ.mvhmnjYUegnPET_8JymP14GGNv38_sDjDMjVCx4PfAyOLY1Wze6uII2BGRXTQvd9bnvL6HTgsicOLd2kgSTZzdC6x5ttfftWTw5B2oyWc3TcyOvlmWXlifjpsJY1twttiv4ZYC7r8zkR6Gl-RsuRyUrPJOHJkyG3XzZkaj2Ew_fLY-LWyMIK4IW5IAZ_xm8m_eXp58ZE09vVdpCiB1qpSt7GwYno5v_htTAc2ZB4FQcGpvO8jctaH3oxI6yf9LY0unf37oczZLG8WJj0xEJDzWmIZpIKnqiO6u01qwlFvBH_zLiXBnOV3oFAaWGQ_lkWSI3esMRH6mgPSWy68Wj4JQ",
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
