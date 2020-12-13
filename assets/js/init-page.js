'use strict';


var generateTitle = function () {

    var title = document.createElement('Title'); // Create a <li> node
    title.innerHTML = 'Point of Sales'
    document.getElementsByTagName('head')[0].appendChild(title);

}

var generateCss = function (arrCss) {
    if (Array.isArray(arrCss)) {
        var temp = 0;
        var cssLink;
        while (arrCss[temp]) {
            cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = arrCss[temp];
            document.getElementsByTagName('head')[0].appendChild(cssLink);
            temp++;
        }
    } else {
        console.error('invalid parameter on generateCss, parameter must be an array');
    }

}


//generateTitle();
//var arrCss = ['https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
//'/assets/css/bootstrap.min.css', '/assets/css/fontawesome5/css/all.css',
//'/assets/css/style.css'];
//generateCss(arrCss);

generateTitle();
var arrCss = ['https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
'/assets/css/bootstrap.min.css', '/assets/css/fontawesome5/css/all.css',
'/assets/css/style.css'];
generateCss(arrCss);
