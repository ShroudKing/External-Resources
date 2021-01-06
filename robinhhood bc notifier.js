$(function() {
    let onCooldown = false;
    let attempts = 0;

    function playSound(type) {
        let mySound;
        if (type === "good")
            mySound = new Audio("https://raw.githubusercontent.com/ShroudKing/External-Resources/main/Good%20Alert.mp3");
        else if (type === "bad")
            mySound = new Audio("https://raw.githubusercontent.com/ShroudKing/External-Resources/main/Bad%20Alert.mp3");
        mySound.play();
        return true;
    }

    let checkExist = setInterval(function() {
        if ($('.udYkAW2UrhZln2Iv62EYb').length) {
            $('.udYkAW2UrhZln2Iv62EYb').on("DOMSubtreeModified", function(){
                let number = Number(this.innerHTML.replace(/[^0-9.-]+/g,""));
                console.log(number);
                if (number > (40000).toFixed(2)) {
                    if (!onCooldown) {
                        if (attemps < 3) {
                            attempts++;
                            playSound("good");
                            onCooldown = true;
                            setTimeout(function(){
                                onCooldown = false
                            }, 60000);
                        }
                    }
                } else if (number < (30000).toFixed(2)) {
                    if (!onCooldown) {
                        if (attemps < 3) {
                            attempts++;
                            playSound("bad");
                            onCooldown = true;
                            setTimeout(function(){
                                onCooldown = false
                            }, 60000);
                        }
                    }
                } else
                    attemps = 0;
            });
            clearInterval(checkExist);
        }
    }, 100);
});
