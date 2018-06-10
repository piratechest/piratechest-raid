
var tabs = {}
var currentTab = null;

function isChromePage(){
    return document.location.href.indexOf("chrome://") == 0;
}


chrome.tabs.onActivated.addListener(function(tab) {
    console.log('tab change', tab)
    currentTab = tab.tabId;
    chrome.runtime.sendMessage({
        method: "piratechest-putmenu",
        data: tabs[tab.tabId],
        tabId: tab.tabId
    });
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

    if (request.id == "piratechest") {    
        console.log('recieving data', request, sender)
        var numberOfMagnets = Object.keys(request.magnets).length;

        if (sender.tab && sender.tab.id) {
            tabs[sender.tab.id] = {
                count: numberOfMagnets,
                magnets: request.magnets,
                url: request.url
            }
            chrome.browserAction.setBadgeText({
                text: numberOfMagnets.toString(),
                tabId: sender.tab.id
            });
        }
    }

    if (request.method == "piratechest-getmenu") {
        console.log('getting data')
        sendResponse({
            from: "piratechest-getmenu",
            data: tabs[currentTab],
            tabId: currentTab
        });
    }
});
