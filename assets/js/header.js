var generateHeader = function () {
    var header = document.createElement('header');
    //header.class = 'footer mt-auto py-3';
    header.innerHTML = '<nav class="navbar navbar-dark bg-primary fixed-top"><div class="container-fluid"> <a class=" navbar-brand" href="/home.html"><img src="/assets/images/logo.png" width="30" height="30" class="d-inline-block align-top mr-1" alt="" loading="lazy">Point of sales</a></div></nav>\
<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">\
<div class="modal-dialog modal-dialog-centered">\
    <div class="modal-content">\
        <div class="modal-header">\
            <div id="myModalTitle" class="modal-title"></div>\
            <button type="button" class="btn-close" onclick="hideModal()" aria-label="Close"></button>\
        </div>\
        <div id="myModalBody" class="modal-body"></div>\
        <div class="modal-footer">\
            <button id="btnModalNo" type="button" class="btn btn-secondary">No</button>\
            <button id="btnModalYes" type="button" class="btn btn-primary">Yes</button>\
        </div>\
    </div>\
</div></div>';
    document.body.appendChild(header);
}

generateHeader();
