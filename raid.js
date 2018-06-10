
var tabs = {}
var currentTab = null;

function isChromePage(){
    return document.location.href.indexOf("chrome") == 0;
}


chrome.tabs.onActivated.addListener(function(tab) {
    currentTab = tab.tabId;
    chrome.runtime.sendMessage({
        method: "piratechest-putmenu",
        data: tabs[tab.tabId]
    });
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

    if (request.id == "piratechest") {    

        var numberOfMagnets =Object.keys(request.magnets).length;

        if (sender.tab && sender.tab.id) {
            tabs[sender.tab.id] = {
                count: numberOfMagnets,
                magnets: request.magnets,
                url: request.url
            }
        }
        if (sender.tab.id == currentTab) {
            chrome.browserAction.setBadgeText({
                text: numberOfMagnets.toString()
            });
            
        }
    }

    if (request.method == "piratechest-getmenu") {
        sendResponse({
            from: "piratechest-getmenu",
            data: tabs[currentTab]
        });
    }
});
