

function raid() {
    if (document.location.href.indexOf("chrome://") >= 0) return;

    var magnetRegex = /([A-F\d]{32,40})\b/i;
    var magnetBase64 = "data:image/png;base64,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"

    function textNodesUnder(node){
        var all = [];
        if (!node) return [];
        for (node=node.firstChild;node;node=node.nextSibling){
            if (node.nodeType==3) all.push(node);
            else all = all.concat(textNodesUnder(node));
        }
        return all;
    }

    function containsInfoHash(node) {
        return magnetRegex.test(node.nodeValue);
    }
    
    var ofInterest = textNodesUnder( document.querySelector('body') ).filter( containsInfoHash );
    var magnets = {};
    
    for (var i=0; i < ofInterest.length; i++) {
        
        var match = ofInterest[i].nodeValue.match( magnetRegex );
        var href = "magnet:?xt=urn:btih:" + match[0];
        var title = ofInterest[i].parentElement.closest('.rc').querySelector('.r').innerText
        magnets[ match[0] ] = title;

        if (typeof ofInterest[i].parentNode.href == 'undefined' || ofInterest[i].parentNode.href != href) {
            var link = document.createElement('a');
            link.href = href
            link.setAttribute( "style", "padding-left: 1.5em; background-repeat: no-repeat; background-position: left center; width: 1em; height: 1em; background-image: url(" + magnetBase64 + ");" );
            link.innerHTML = match[0];
            link.title = title;
            var rest = document.createTextNode( match.input.replace(match[0], ""))
            ofInterest[i].parentNode.replaceChild( link, ofInterest[i] );
            link.parentNode.insertBefore( rest, link.nextSibling );
        }
        
    }

    try {
        chrome.runtime.sendMessage({
            id: "piratechest",
            magnets: magnets
        }, function(response) {
            // console.log(response);
        });
    } catch(err) { console.info(err)}

}

function tick() {
    raid()
    window.setTimeout( tick, 5000 )
}

window.addEventListener("hashchange", function(){
    raid();
}, false);

tick()

