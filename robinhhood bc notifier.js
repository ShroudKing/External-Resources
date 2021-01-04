(function() {
    setTimeout(function() {
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);

        var checkReady = function(callback) {
            if (window.jQuery) {
                callback(jQuery);
            }
            else {
                window.setTimeout(function() { checkReady(callback); }, 20);
            }
        };

        checkReady(function($) {
            $(function() {
                var onCooldown = false;
                var attempts = 0;

                function playSound(type) {
                    var mySound
                    if (type === "good") {
                        mySound = new Audio("https://soundsnap-prod.nyc3.digitaloceanspaces.com/files/audio/7a/transcode/404570-Tennis_Stadium_Cheering_Clapping_-High_Energy_-10_Thousand_People_-Crowd_-Arena_-Sydney_-Australia-03.mp3?response-content-disposition=attachment%3B+filename%3D%22404570-Tennis_Stadium_Cheering_Clapping_-High_Energy_-10_Thousand_People_-Crowd_-Arena_-Sydney_-Australia-03.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AD4PI63EK5AJWZMJZZKH%2F20210103%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20210103T205434Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Signature=9f1f95219f926c2db63521194e16f77448e9ae00ecd8dc6d460ac4ee4718f5e0");
                    } else if (type === "bad") {
                        mySound = new Audio("https://fsb.zobj.net/download/biWoehu3jYCIKOePc1XK0Q-5lqrUfniDUaNRUR0Q5ik4E9zSS5q_OuXsr6GwgDeKlZ47OGgsOCcBtLt55pt1oUkFp5SsCdy9EHQRNTMQ8MGm6FF74XkX5szQuikM/?a=web&c=72&f=imperial_alarm.mp3&special=1609762471-97JDaGUSGEKnrVHyJTkvSgbnhRY5LboygjghG2%2BrtGw%3D");
                    }
                    mySound.play()
                    return;
                }

                $(".udYkAW2UrhZln2Iv62EYb").on("DOMSubtreeModified", function(){
                    var number = Number(this.innerHTML.replace(/[^0-9.-]+/g,""));
                    console.log(number);

                    if (number > (34000).toFixed(2)) {
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
                    } else {
                        attemps = 0;
                    }
                });
            });
        });
    });
    return true;
})();