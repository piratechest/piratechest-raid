

function createSearch() {
    var f = document.createElement('form')
    f.action = "#"
    f.addEventListener('submit', doSearch)
    var s = document.createElement('input')
    s.className = "search"
    s.placeholder = "Search"
    s.type = "text"
    f.appendChild( s )
    return f;
}

function doSearch() {
    var s = this;
    var prefix = "https://google.com#q="
    var postfix = " infoHash site:thepiratebay.se"
    var input = s.querySelector('.search').value;
    chrome.tabs.create({
        url: prefix + encodeURIComponent( input + postfix )
    });
    return false;
}


function updateMenu(data) {

    var e = document.createElement('em')
    var s = createSearch()

    document.body.innerHTML = ""

    if (data && data.count > 0) {
        e.innerHTML = "Url: " + data.url
        e.innerHTML += 'Found (' + data.count + ') hashes:'
        // document.body.appendChild( createSearch() )
        document.body.appendChild( e )
        for (var m in data.magnets) {
            var link = document.createElement('a')
            link.innerHTML = data.magnets[m]
            link.className = "magnet"
            link.target = "_blank"
            link.href = "magnet:?xt=urn:btih:" + m + "&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969";
            link.title = data.magnets[m]
            document.body.appendChild( link )
        }
    } else {        
        e.innerHTML = 'No hashes found.'
        document.body.appendChild( createSearch() )
        document.body.appendChild( e )
    }
}




document.addEventListener('DOMContentLoaded', function () {

    chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
        if (request.method == "piratechest-putmenu") {
            console.log("putmenu")
            updateMenu( request.data );
            chrome.browserAction.setBadgeText({
                text: request.data ? request.data.count.toString() : ""
            }, function(){});
        }   
    });

    chrome.runtime.sendMessage({ method: "piratechest-getmenu" }, function(res){
        updateMenu( res.data );
    });

    updateMenu({});
});

