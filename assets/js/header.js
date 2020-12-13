var generateHeader = function () {
    var header = document.createElement('header');
    //header.class = 'footer mt-auto py-3';
    header.innerHTML = '<header><nav class="navbar navbar-dark bg-primary fixed-top"><div class="container-fluid"> <a class=" navbar-brand" href="/home.html"><img src="/assets/images/logo.png" width="30" height="30" class="d-inline-block align-top mr-1" alt="" loading="lazy">Point of sales</a></div></nav></header>';
    document.body.appendChild(header);
}

generateHeader();
