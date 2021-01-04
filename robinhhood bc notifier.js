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
                        mySound = new Audio("https://raw.githubusercontent.com/ShroudKing/External-Resources/main/Good%20Alert.mp3");
                    } else if (type === "bad") {
                        mySound = new Audio("https://raw.githubusercontent.com/ShroudKing/External-Resources/main/Bad%20Alert.mp3");
                    }
                    mySound.play()
                    return;
                }

                var checkExist = setInterval(function() {
                    if ($('.udYkAW2UrhZln2Iv62EYb').length) {
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
                       clearInterval(checkExist);
                    }
                 }, 100);
            });
        });
    });
    return true;
})();
