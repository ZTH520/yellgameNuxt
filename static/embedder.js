/* jshint:ignore start*/

var device;
(function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))device="mobile"})(navigator.userAgent||navigator.vendor||window.opera,'http://detectmobilebrowser.com/mobile');

function embed(d,scriptId,gn,par){

    if (typeof sgTrack === 'undefined') {
        if (!par.isWidget) {
            var s = document.createElement('script');
            s.src = '//dop3jnx8my3ym.cloudfront.net/sg-track-sdk.js';
            s.async = true;
            s.type = 'text/javascript';
            s.onreadystatechange = s.onload = function () {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                    s.onreadystatechange = s.onload = null;
                    embedGame(d, scriptId, gn, par)
                }
            };
            document.getElementsByTagName('head')[0].appendChild(s);
        } else {
            embedGame(d, scriptId, gn, par)
        }
    }

    function embedGame(d, scriptId, gn, par) {

        var myWidth = 0;
        var myHeight = 0;

        // sets the game variables according to the parameters
        var agent = par.agent || 'publisher';
        var bgColor = par.bgcolor || '#fff';
        var viewport = par.viewport || '1';
        var wrapperWidth = par.wrapperwidth || '100%';
        var wrapperHeight = par.wrapperheight || '100%';
        var gameWidth = par.gamewidth || '100%';
        var gameHeight = par.gameheight || '100%';
        var fullscreenOnMobile = par.fullscreen_on_mobile || 'false';
        var gameFullscreenOnMobile = par.game_fullscreen_on_mobile || 'false';
        var locale = par.locale || 'en';
        device = device || 'desktop';
        var testUrl = par.testUrl || '';
        var ivwConfig = par.ivwConfig || '';
        var isWidget = par.isWidget || false;
        var sflow = par.sflow || 'false';
        var uid = par.u || '';
        var customParams = par.customParams || {};
        var source = '';
        var url = '';
        var xmlhttp;
        var agentId;
        var DEFAULT_AGENT_ID = 5;

        var p2Partners = ['nifty', 'm.softgames.de']
        var p2PubExceptions = ['pub-10119-10119', 'pub-12921-12988']
        var IS_PUP = /^pub-[0-9]+-[0-9]+$/i

        setMeasurements();
        if (!scriptId) {
            console.error('Can\'t embed game, no scriptId supplied!')
            return
        }
        var root = d.getElementById("iframe");

        var sgPlayer = createSoftgamesPlayer();
        var iFrame = createIFrame();

        sgPlayer.appendChild(iFrame);

        if (!isWidget) {
            sendTrack();
        }


        // Sets the correct measurements depending on the browser.
        function setMeasurements() {
            if (typeof( window.innerWidth ) == 'number') {
                //Non-IE
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
            } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
                //IE 6+ in 'standards compliant mode'
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
            } else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) {
                //IE 4 compatible
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
        }

        // Creates and styles the player
        function createSoftgamesPlayer() {
            var player = createElement('div');
            player.setAttribute('class', 'sgplayer');
            if (gameFullscreenOnMobile === 'true' && device === 'mobile') {
                setStyleAttribute(player, 'width', myWidth + 10 + 'px');
                setStyleAttribute(player, 'height', myHeight + 'px');
            } else {
                setStyleAttribute(player, 'width', wrapperWidth);
                setStyleAttribute(player, 'height', wrapperHeight);
            }
            root.appendChild(player);
            return player;
        }

        // Creates and styles the iframe
        function createIFrame() {
            var iframe = createElement('iframe');
            setStyleAttribute(iframe, "background-color", bgColor);
            if (device == 'mobile' && fullscreenOnMobile == 'false' && gameFullscreenOnMobile === 'true') {
                setStyleAttribute(iframe, "width", myWidth + "px");
                setStyleAttribute(iframe, "height", myHeight + "px");
            } else {
                setStyleAttribute(iframe, "width", wrapperWidth);
                setStyleAttribute(iframe, "height", wrapperHeight);
            }

            setStyleAttribute(iframe, "border", "0px");
            setStyleAttribute(iframe, "border", "0px");

            iframe.setAttribute('id', 'sgiframeplayer');
            iframe.setAttribute('name', 'sgiframeplayer');
            iframe.setAttribute('seamless', 'seamless');
            iframe.setAttribute('allowtransparency', true);
            iframe.setAttribute('frameborder', 0);
            iframe.setAttribute('scrolling', 'no');
            iframe.setAttribute('horizontalscrolling', 'no');
            iframe.setAttribute('verticalscrolling', 'no');
            iframe.setAttribute('role', 'application');

            if (testUrl != '') {
                console.log('---using alternative testing url---');
                console.log(testUrl);
                iframe.src = testUrl;
            } else {
                xmlhttp = new XMLHttpRequest();
                xmlhttp.ontimeout = function () {
                    console.log('---getting agent id timed out, not redirecting to new platform---')
                    iframe.src = getDefaultUrl();
                };
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        var apiResponse = JSON.parse(xmlhttp.responseText);
                        if (apiResponse && apiResponse.id !== "undefined") {
                            agentId = apiResponse.id;
                        } else {
                            agentId = DEFAULT_AGENT_ID;
                        }
                        if (agent === 'nifty') {
                            source = '//play.softgames.de/games/' + gn + '/gamesites/' + agentId + '/locale/' + locale + '?pl=2';
                            source += getCustomParams();
                            console.log('---agent is nifty, using play.softgames.de as p2 host---');
                            console.log(source);
                            iframe.src = source;
                        }
                        else if (apiResponse.redirectToP2 ||
                          (p2Partners.indexOf(agent) !== -1 || (p2PubExceptions.indexOf(agent) == -1 && IS_PUP.test(agent)))) {
                            source = '//games.softgames.com/games/' + gn + '/gamesites/' + agentId + '/locale/' + locale + '?pl=2';
                            source += getCustomParams();
                            //+'?logLevel=-1';
                            console.log('---agent set to redirect. redirection to new platform---');
                            console.log(source);
                            iframe.src = source;
                        } else {
                            console.log('---agent not set to redirect. not redirecting to new platform---')
                            iframe.src = getDefaultUrl();
                        }
                    } else {
                        console.log('---getting agent id failed, not redirecting to new platform---')
                        iframe.src = getDefaultUrl();
                    }
                };
                xmlhttp.open("GET", "https://m.softgames.de/api/v1/agent/" + agent.replace(/\./g, '{dot}') + "/show?gameSlug=" + gn, true);
                xmlhttp.timeout = 2000;
                xmlhttp.send();
            }
            // Detect whether device supports orientationchange event, otherwise fall back to
            // the resize event.
            // Because orientationchange event is fired before screen size is changed we are listening only on resize event
            var orientationEvent = "resize";
            window.addEventListener(orientationEvent, orientationChangedEventHandler, false);

            return iframe;
        }

        function getDefaultUrl() {
            if (agent === 'wowapp-test') {
                source = '//sg-games.wowapp.com/';
            } else if (sflow === 'true') {
                source = '//m.softgames.de/provider_connection/callback/game/';
            } else {
                source = location.protocol === 'https:' ? '//d3ktldhyer9fya.cloudfront.net/' : '//games.softgames.de/';
            }

            url = source + gn + '/?p=' + agent + '&vp=' + viewport + '&locale=' + locale;
            // if ( agent != 'pub-10119-10119' && agent.match(/pub-(.*)/)) {
            //   url = source;
            // } else {
            //   url = source + gn + '/?p=' + agent + '&vp=' + viewport + '&locale=' + locale;
            // }

            if (ivwConfig != '') {
                url += '&ivwConfig=' + ivwConfig;
            }
            if (isWidget) {
                url += '&isWidget=true';
            }
            if ( sflow === 'true' && uid != '') {
                url += '&uid=' + uid;
            }
            url += getCustomParams();
            return url
        }

        function getCustomParams() {
            var params = '';
            for (var property in customParams){
                if (customParams.hasOwnProperty(property)) {
                    params += '&' + encodeURIComponent(property) + '=' + encodeURIComponent(customParams[property]);
                }
            }
            return params;
        }

        function orientationChangedEventHandler() {
            if (fullscreenOnMobile == 'false' && gameFullscreenOnMobile === 'true' && device == 'mobile') {
                setMeasurements();

                setStyleAttribute(iFrame, "width", myWidth + "px");
                setStyleAttribute(iFrame, "height", myHeight + "px");

                window.scrollTo(0, 0);
            }
        }

        function sendTrack() {
            var trackObj = {
                'publisher': agent,
                'device': device,
                'location': window.location.href,
                'game': gn
            };
            console.log('track obJ: ', trackObj);
            sgTrackSdk.trackEvent('embed', 'loaded', trackObj);
        }

        //convenience method to create a tag
        function createElement(tagName) {
            return d.createElement(tagName);
        }

        //convenience method to style an element
        function setStyleAttribute(element, attribute, value) {
            element.style[attribute] = value;
        }
    }
}



/* jshint:ignore end*/