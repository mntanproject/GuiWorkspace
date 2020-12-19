var generateFooter = function () {
    var footer = document.createElement('footer');
    footer.className = 'footer mt-auto py-3';
    footer.innerHTML = '<div class="container"><div class = "d-flex mt-5 mb-3 justify-content-end text-muted" > &#169; 2020, All rights reserved</div></div>';
    document.body.appendChild(footer);

}

var generateScript =
    function (scripts) {
        if (Array.isArray(scripts)) {
            var temp = 0,
                footerScript;

            while (scripts[temp]) {
                footerScript = document.createElement('script');
                footerScript.src = scripts[temp];
                footerScript.type = 'text/javascript';
                document.body.appendChild(footerScript);
                footerScript.addEventListener("load", scriptLoaded(scripts[temp]), false);
                temp++;
            }
        }

    }



function scriptLoaded(name) {
    console.log(name + " is loaded");

}
var scripts = ['/assets/js/popper.min.js',
 '/assets/js/bootstrap.min.js', '/assets/js/pos-api/genericApi.js'];
//var scripts = ['/assets/js/popper.min.js', '/assets/js/bootstrap.min.js'];
generateFooter();
generateScript(scripts);

window.addEventListener('load', function () {
    alert("It's loaded!")
    var scriptss = ['/assets/js/pos-api/supplier/supplier.js'];
    generateScript(scriptss);
})



//getCss2('../assets/css/bootstrap.min.css');
