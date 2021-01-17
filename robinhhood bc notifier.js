$(function() {
    let first = true;
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
                "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2MTExODI3ODEsInRva2VuIjoiYXhIa2U4SzY1SFFYZXBwUGdOQXBVV2VQWU5tSHhjIiwidXNlcl9pZCI6IjlmNjgzOTA4LTRjYjktNDMxNi04NWM4LWRlN2IyYWQ0NzJiZiIsImRldmljZV9oYXNoIjoiM2QyMjJmYjEyMTI5NTU4NTg0MjM1ZWNjMWMyZjY3NTciLCJzY29wZSI6ImludGVybmFsIiwiZGN0IjoxNjA5Njk4MzYxLCJ1c2VyX29yaWdpbiI6IlVTIiwib3B0aW9ucyI6ZmFsc2UsImxldmVsMl9hY2Nlc3MiOmZhbHNlfQ.MzzYamUlqgW-guMUhRIOTETqtR2-fcwgBI5X0dX8Delz3IwlfAofz6IuCjxfUlF0_5ix2reFTSoowTJ5eHZBFGxmtXJcEXH0cJGTUcXtZSoIW6Wz2EFHiYxnS_U7lGP7gTVAvyDu4x_JWNEmgj5iAfcyzxcTy8kR90CEDirfwnYhOKWbqY4lo7dkgWhzARKnJGNv8V5mcHkk_yGiCD6BMRSmX1U5JTez1c6A7E8l1qDhBGQIA_WH5YPVAUJcThTkv4POR4qI6NRO_7nY5j4Ru7bPWc7oa__y7EjbRZhhDJ1p-KBRg3la5kQ0KefyFX0vTpYePg0f-RjR2XS61TQC6w",
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
                        maxThreshold += 1000;
                        minThreshold += 1000;
                        playSound("good");
                    } else if (price < minThreshold) {
                        maxThreshold -= 1000;
                        minThreshold -= 1000;
                        playSound("bad");
                    }
                }
            }
        }
        if (first) {
            first = false
            console.log("Notifier Online");
        }
        setTimeout(() => {
            start();
        }, 2000);
    }
    start();
});
