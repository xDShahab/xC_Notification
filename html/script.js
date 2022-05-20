let notifications = [];
let selectedPos = "";
let soundActive = true;
let displayTitles = true;
let titlesText = []


const GetTitleByType = (type) => {

    let data = titlesText.filter((item) => {
        return item.type == type
    })
    return data[0] ? data[0].title : "UNKOWN"
}

window.addEventListener("message", function(event) {
    let data = event.data;
    if (data.type == "ADD_NOTIFICATION") {
        let notificationContainer = $(".hepsi");
        let wrapper = $(".wrapper");
        let id = notifications.length + 1;
        let position = data.selectedPosition;
        let transformcss = "";
        if (position == "top") {
            transformcss = "translateY(-200px)";
            wrapper.css("left", "50%");
            wrapper.css("right", "");

            wrapper.css("top", "5%");
            wrapper.css("bottom", "");
            wrapper.css("transform", "translateX(-50%)");
        } else if (position == "bottom") {
            transformcss = "translateY(200px)";
            wrapper.css("left", "50%");
            wrapper.css("right", "");

            wrapper.css("bottom", "5%");
            wrapper.css("top", "");
            wrapper.css("transform", "translateX(-50%)");
        } else if (position == "left") {
            transformcss = "translateX(-320px)";
            wrapper.css("left", "3%");
            wrapper.css("right", "");

            wrapper.css("top", "15%");
            wrapper.css("bottom", "");
            wrapper.css("transform", "");
        } else if (position == "onhud") {
            transformcss = "translateX(-320px)";
            wrapper.css("left", "3%");
            wrapper.css("right", "");

            wrapper.css("bottom", "30%");
            wrapper.css("top", "");
            wrapper.css("transform", "");
        } else if (position == "right") {
            transformcss = "translateX(320px)";
            wrapper.css("right", "3%");
            wrapper.css("left", "");

            wrapper.css("top", "15%");
            wrapper.css("bottom", "");
            wrapper.css("transform", "");
        }
        let colorcornertopleft = ``;
        let colorcornerbottomleft = ``;
        let colorcornertopright = ``;
        let colorcornerbottomright = ``;
        let titleColor = ``
        let titleColorType = ``
        if (data.notifytype == null || data.notifytype == undefined) {
            data.notifytype = "info";
        }
        if (data.time == null || data.time == undefined) {
            data.time = 2500;
        }

        if (data.notifytype == "check") {
            colorcornertopleft = "#00ff24";
            colorcornerbottomleft = "#00ff24";
            colorcornertopright = "#00ff24";
            colorcornerbottomright = "#00ff24";
            titleColor = "#00ff24"
            titleColorType = "color"
        } else if (data.notifytype == "info") {
            colorcornertopleft = "#fff000";
            colorcornerbottomleft = "#fff000";
            colorcornertopright = "#fff000";
            colorcornerbottomright = "#fff000";
            titleColor = "#fff000"
            titleColorType = "color"

        } else if (data.notifytype == "ann") {
            colorcornertopleft = "#00ffe9";
            colorcornerbottomleft = "#ff0054";
            colorcornertopright = "#ff8700";
            colorcornerbottomright = "#0060ff";
            titleColor = "linear-gradient(90deg, rgba(42,255,237,1) 0%, rgba(255,132,0,1) 36%, rgba(255,0,84,1) 67%, rgba(42,122,255,1) 100%)"
            titleColorType = "background"

        } else if (data.notifytype == "msg") {
            colorcornertopleft = "#ffae00";
            colorcornerbottomleft = "#ffae00";
            colorcornertopright = "#ffae00";
            colorcornerbottomright = "#ffae00";
            titleColor = "#ffae00"
            titleColorType = "color"

        } else if (data.notifytype == "save") {
            colorcornertopleft = "#ffffff";
            colorcornerbottomleft = "#ffffff";
            colorcornertopright = "#ffffff";
            colorcornerbottomright = "#ffffff";
            titleColor = "#ffffff"
            titleColorType = "color"

        } else if (data.notifytype == "twt") {
            colorcornertopleft = "#55acee";
            colorcornerbottomleft = "#55acee";
            colorcornertopright = "#55acee";
            colorcornerbottomright = "#55acee";
            titleColor = "#55acee"
            titleColorType = "color"

        } else if (data.notifytype == "call") {
            colorcornertopleft = "#4eff00";
            colorcornerbottomleft = "#4eff00";
            colorcornertopright = "#4eff00";
            colorcornerbottomright = "#4eff00";
            titleColor = "#4eff00"
            titleColorType = "color"

        } else if (data.notifytype == "xcbank") {
            colorcornertopleft = "#ff0054";
            colorcornerbottomleft = "#00ffe9";
            colorcornertopright = "#00ffe9";
            colorcornerbottomright = "#ff0054";
            titleColor = "linear-gradient(90deg, rgba(42,255,237,1) 0%, rgba(255,0,84,1) 100%)"
            titleColorType = "background"

        } else if (data.notifytype == "bill") {
            colorcornertopleft = "#ff0054";
            colorcornerbottomleft = "#00ffe9";
            colorcornertopright = "#00ffe9";
            colorcornerbottomright = "#ff0054";
            titleColor = "linear-gradient(90deg, rgba(42,255,237,1) 0%, rgba(255,0,84,1) 100%)"
            titleColorType = "background"

        } else if (data.notifytype == "lspd") {
            colorcornertopleft = "#1200fc";
            colorcornerbottomleft = "#1200fc";
            colorcornertopright = "#1200fc";
            colorcornerbottomright = "#1200fc";
            titleColor = "#1200fc"
            titleColorType = "color"

        } else if (data.notifytype == "error") {
            colorcornertopleft = "#ff0000";
            colorcornerbottomleft = "#ff0000";
            colorcornertopright = "#ff0000";
            colorcornerbottomright = "#ff0000";
            titleColor = "#ff0000"
            titleColorType = "color"

        } else if (data.notifytype == "ems") {
            colorcornertopleft = "#e8002f";
            colorcornerbottomleft = "#e8002f";
            colorcornertopright = "#e8002f";
            colorcornerbottomright = "#e8002f";
            titleColor = "#e8002f"
            titleColorType = "color"
        }

        let image = ``;

        if (data.notifytype == "check") {
            image = "check.png";
        } else if (data.notifytype == "info") {
            image = "info.png";
        } else if (data.notifytype == "ann") {
            image = "megaphone.png";
        } else if (data.notifytype == "msg") {
            image = "speech-bubble.png";
        } else if (data.notifytype == "save") {
            image = "save.png";
        } else if (data.notifytype == "twt") {
            image = "twitter.png";
        } else if (data.notifytype == "call") {
            image = "phone.png";
        } else if (data.notifytype == "xcbank") {
            image = "transfer.png";
        } else if (data.notifytype == "bill") {
            image = "bill.png";
        } else if (data.notifytype == "lspd") {
            image = "police.png";
        } else if (data.notifytype == "error") {
            image = "warning.png";
        } else if (data.notifytype == "ems") {
            image = "hospital.png";
        }

        let title = GetTitleByType(data.notifytype)
        let notification;
        if (displayTitles) {
            notification = `
        <div class="noti-main" id="notify-${id}" style="transform: ${transformcss}">

        <div class="cornertopleft">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34.5px" height="30.5px">
            <path fill-rule="evenodd" stroke="${colorcornertopleft}" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M3.000,26.000 L3.000,15.000 C3.000,15.000 4.221,3.000 18.000,3.000 C23.032,3.000 30.000,3.000 30.000,3.000 " />
          </svg>
        </div>
        <div class="cornerbottomleft">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34.5px" height="30.5px">
            <path fill-rule="evenodd" stroke="${colorcornerbottomleft}" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M3.000,3.000 L3.000,14.000 C3.000,14.000 4.221,26.000 18.000,26.000 C23.032,26.000 30.000,26.000 30.000,26.000 " />
          </svg>
        </div>
        <div class="cornertopright">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34.5px" height="30.5px">
            <path fill-rule="evenodd" stroke="${colorcornertopright}" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M30.000,26.000 L30.000,15.000 C30.000,15.000 28.779,3.000 15.000,3.000 C9.968,3.000 3.000,3.000 3.000,3.000 " />
          </svg>
        </div>
        <div class="cornerbottomright">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34.5px" height="30.5px">
            <path fill-rule="evenodd" stroke="${colorcornerbottomright}" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M30.000,3.000 L30.000,14.000 C30.000,14.000 28.779,26.000 15.000,26.000 C9.968,26.000 3.000,26.000 3.000,26.000 " />
          </svg>
        </div>
        <div class="notification-wrapper">
          <div class="left">
            <div class="hataicon">
              <img src="./img/${image}" alt="" />
            </div>
          </div>
          <div class="right">
            <div class="texttype"> 
              <h1 style="${titleColorType}: ${titleColor}; ${titleColorType == "background" && "-webkit-background-clip: text; -webkit-text-fill-color: transparent;"}">${title}</h1>
            </div>
            <div class="textinput">
              <h1>${data.text}</h1>
            </div>
          </div>
        </div>
      </div>
    `;
        } else {
            notification = `
      <div class="noti-main" id="notify-${id}" style="transform: ${transformcss}">

      <div class="cornertopleft">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34.5px" height="30.5px">
          <path fill-rule="evenodd" stroke="${colorcornertopleft}" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M3.000,26.000 L3.000,15.000 C3.000,15.000 4.221,3.000 18.000,3.000 C23.032,3.000 30.000,3.000 30.000,3.000 " />
        </svg>
      </div>
      <div class="cornerbottomleft">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34.5px" height="30.5px">
          <path fill-rule="evenodd" stroke="${colorcornerbottomleft}" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M3.000,3.000 L3.000,14.000 C3.000,14.000 4.221,26.000 18.000,26.000 C23.032,26.000 30.000,26.000 30.000,26.000 " />
        </svg>
      </div>
      <div class="cornertopright">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34.5px" height="30.5px">
          <path fill-rule="evenodd" stroke="${colorcornertopright}" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M30.000,26.000 L30.000,15.000 C30.000,15.000 28.779,3.000 15.000,3.000 C9.968,3.000 3.000,3.000 3.000,3.000 " />
        </svg>
      </div>
      <div class="cornerbottomright">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34.5px" height="30.5px">
          <path fill-rule="evenodd" stroke="${colorcornerbottomright}" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M30.000,3.000 L30.000,14.000 C30.000,14.000 28.779,26.000 15.000,26.000 C9.968,26.000 3.000,26.000 3.000,26.000 " />
        </svg>
      </div>
      <div class="notification-wrapper">
        <div class="left">
          <div class="hataicon">
            <img src="./img/${image}" alt="" />
          </div>
        </div>
        <div class="right">
          <div class="textinput">
            <h1>${data.text}</h1>
          </div>
        </div>
      </div>
    </div>`;
        }

        notificationContainer.append(notification);
        setTimeout(() => {
            if (position == "top" || position == "bottom") {
                anime({
                    targets: `#notify-${id}`,
                    translateY: 0,
                    duration: 750,
                    easing: "spring(1, 70, 100, 10)",
                });
            } else {
                anime({
                    targets: `#notify-${id}`,
                    translateX: 0,
                    duration: 750,
                    easing: "spring(1, 70, 100, 10)",
                });
            }
        }, 200);

        if (soundActive) {
            let audio = new Audio(`./notification.mp3`);
            audio.play();
            audio.volume = 0.17;
        }

        notifications[id] = setTimeout(() => {
            $(`#notify-${id}`).animate({ height: "0px" }, "slow");
            if (position == "bottom") {
                anime({
                    targets: `#notify-${id}`,
                    translateY: "200px",
                    duration: 750,
                    easing: "spring(1, 70, 100, 10)",
                });
            } else if (position == "top") {
                anime({
                    targets: `#notify-${id}`,
                    translateY: "-200px",
                    duration: 750,
                    easing: "spring(1, 70, 100, 10)",
                });
            } else if (position == "left" || position == "onhud") {
                anime({
                    targets: `#notify-${id}`,
                    translateX: "-320px",
                    duration: 750,
                    easing: "spring(1, 70, 100, 10)",
                });
            } else if (position == "right") {
                anime({
                    targets: `#notify-${id}`,
                    translateX: "320px",
                    duration: 750,
                    easing: "spring(1, 70, 100, 10)",
                });
            }

            setTimeout(() => {
                $("#notify-" + id).remove();
                notifications[id] = null;
            }, 150);
        }, data.time);
    } else if (data.type == "DISPLAY_TITLES") {
        displayTitles = data.display;
    } else if (data.type == "ENABLE_NOTIFY_SETTINGS") {
        $("#notification-settings").fadeIn(500);
    } else if (data.type == "TOGGLE_NOTIFICATIONS") {
        if (data.display) {
            $(".Display-Notifications").addClass("Hide-Notifications");
            $(".Display-Notifications").removeClass("Display-Notifications");
        } else {
            $(".Hide-Notifications").addClass("Display-Notifications");
            $(".Hide-Notifications").removeClass("Hide-Notifications");
        }
    } else if (data.type == "ON_NOTIFICATION_POSITION_CHANGE") {
        $(".bg-hover").css("opacity", 0);
        selectedPos = data.selectedPosition;
        $(`.${data.selectedPosition}-placeholder .bg-hover`).css("opacity", 1);
    } else if (data.type == "TOGGLE_SOUND") {
        if (data.soundActive) {
            $(".Enable-sound").addClass("Disable-sound");
            $(".Enable-sound").removeClass("Enable-sound");
        } else {
            $(".Disable-sound").addClass("Enable-sound");
            $(".Disable-sound").removeClass("Disable-sound");
        }
        soundActive = data.soundActive;
    } else if (data.type == "SET_TITLES_LANGUAGE") {
        titlesText = data.texts
    }
});

$(".display-hover").hover(
    function() {
        $(this).find(".bg-hover").css("opacity", "1");
    },
    function() {
        if (!$(this).hasClass(`${selectedPos}-placeholder`)) {
            $(this).find(".bg-hover").css("opacity", "0");
        }
    }
);

$(document).ready(function() {
    $.post("https://xC_Notification/Ready", JSON.stringify({}));
});

$(document).on("click", ".Exit-button", function() {
    $("#notification-settings").fadeOut(500);
    $.post("https://xC_Notification/Close", JSON.stringify({}));
});

$(document).on("click", ".top-placeholder", function() {
    $.post(
        "https://xC_Notification/SelectPosition",
        JSON.stringify({
            position: "top",
        })
    );
});

$(document).on("click", ".Display-Notifications", function() {
    $.post("https://xC_Notification/ActiveNotifications");
});

$(document).on("click", ".Hide-Notifications", function() {
    $.post("https://xC_Notification/HideNotifications");
});
$(document).on("click", ".Enable-sound", function() {
    $.post("https://xC_Notification/EnableSound");
});

$(document).on("click", ".Disable-sound", function() {
    $.post("https://xC_Notification/DisableSound");
});

$(document).on("click", ".onhud-placeholder", function() {
    $.post(
        "https://xC_Notification/SelectPosition",
        JSON.stringify({
            position: "onhud",
        })
    );
});

$(document).on("click", ".left-placeholder", function() {
    $.post(
        "https://xC_Notification/SelectPosition",
        JSON.stringify({
            position: "left",
        })
    );
});

$(document).on("click", ".bottom-placeholder", function() {
    $.post(
        "https://xC_Notification/SelectPosition",
        JSON.stringify({
            position: "bottom",
        })
    );
});

$(document).on("click", ".right-placeholder", function() {
    $.post(
        "https://xC_Notification/SelectPosition",
        JSON.stringify({
            position: "right",
        })
    );
});