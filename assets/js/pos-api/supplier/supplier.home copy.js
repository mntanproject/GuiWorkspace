'use strict';

function getPagination(url, mnCallback) {
    fetch(url)
        .then(response => response.json())
        .then(result => mnCallback(result));
}



async function getData(url, mnCallback) {
    await fetch(url, {
        method: 'Get'
    }).then(function (response) {
        return response.json()
    }).then(function (result) {
        result.forEach(mnCallback);

    }).catch(function (error) {
        alert('error')
    });
}

var displayData = function (offset, limit, order, descending) {
    document.querySelectorAll('.supplier-data').forEach(e => e.remove());
    let url = 'http://localhost:9000/api/supplier/paginator/'
    getData(url + 'offset=' + offset + '&limit=' + limit + '&order=' + order + '&descending=' + descending, generateSupplierHtml)
}


//function refreshPage() {
//    document.querySelectorAll('ul.pagination li.page-item').forEach(e => e.remove());
//    getPagination('http://localhost:9000/api/supplier/size/all', supplierHome)
//}
//
//function sort(from) {
//    switch (from) {
//        case ("id"):
//            break;
//        case ("name"):
//            break;
//            //var pagination = new MnPagination(data.totalsize, numRows, 1, 3, 'paginatorTop', 'id', '1', displayData)
//        default:
//            // code block
//    }
//
//}
function sortCallback(paginationObj) {

    var numRows = document.querySelector('input[name = "btnradiorows"]:checked').value;
    //var pagination = new MnPagination(data.totalsize, numRows, 1, 3, 'paginatorTop', 'id', '1', displayData)
    var pagination = paginationObj
    generatePagination(pagination)
    let offset = (pagination.currentPage - 1) * pagination.rowsPerPage
    let limit = pagination.rowsPerPage
    let order = pagination.order
    let descending = pagination.descending
    displayData(offset, limit, order, descending)

}

function supplierHome(data) {

    var numRows = document.querySelector('input[name = "btnradiorows"]:checked').value;
    var pagination = new MnPagination(data.totalsize, numRows, 1, 3, 'paginatorTop', 'id', '1', displayData)
    generatePagination(pagination)
    let offset = (pagination.currentPage - 1) * pagination.rowsPerPage
    let limit = pagination.rowsPerPage
    let order = pagination.order
    let descending = pagination.descending
    displayData(offset, limit, order, descending)

}

function supplierData(paginationObj, url) {
    getData(url + 'offset=' + paginationObj.currentPage + '&limit=' + paginationObj.rowsPerPage, generateSupplierHtml)
}

function generateSupplierHtml(item, index) {
    var supp = MnSupplier.fromJson(item);
    var wrapper = document.getElementById('accordionFlushExample')
    var accItem = document.createElement("div");
    accItem.className = 'accordion-item supplier-data'
    accItem.innerHTML = '<div class="accordion-header" id="flush-heading' + index + '">\
                    <a class="accordion-button collapsed btn" data-bs-toggle="collapse" href="#flush-collapse' + index + '" role="button" aria-expanded="false" aria-controls="#flush-collapse' + index + '">\
                        <div class="container-fluid p-0 m-0">\
                            <dl class="row m-0">\
 <dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">Id</dt>\
                                <dd class="col-9 col-md-1 text-left border-right-md">' + supp.id + '</dd>\
                                <dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">Company</dt>\
                                <dd class="col-9 col-md-3 text-left border-right-md">' + supp.company + supp.id + '</dd>\
                                <dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">Sales</dt>\
                                <dd class="col-9 col-md-4 text-left border-right-md">' + supp.name + '</dd>\
                                <dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">City</dt>\
                                <dd class="col-9 col-md-4 text-left">' + supp.city + '</dd>\
                            </dl>\
                        </div>\
                    </a>\
                </div>\
                <div id="flush-collapse' + index + '" class="accordion-collapse collapse" aria-labelledby="flush-heading' + index + '" data-bs-parent="#accordionFlushExample">\
                    <div class="accordion-body bg-light">\
                        <div class="container-fluid">\
                            <dl class="row">\
                                <dt class="col-2 small pt-01">Contact</dt>\
                                <dd class="col-10">' + supp.contactno + '</dd>\
                                <dt class="col-2 small pt-01">Email</dt>\
                                <dd class="col-10">' + supp.email + '</dd>\
                                <dt class="col-2 small pt-01">Street</dt>\
                                <dd class="col-10">' + supp.street + '</dd>\
                                <dt class="col-2 small pt-01">City</dt>\
                                <dd class="col-10">' + supp.city + '</dd>\
                                <dt class="col-2 small pt-01">State</dt>\
                                <dd class="col-10">' + supp.state + '</dd>\
                                <dt class="col-2 small pt-01">Country&nbsp;</dt>\
                                <dd class="col-10">' + supp.country + '</dd>\
                                <dt class="col-2 small pt-01">Bank</dt>\
                                <dd class="col-10">' + supp.bank + '</dd>\
                                <dt class="col-2 small pt-01">Note</dt>\
                                <dd class="col-10">' + supp.notes + '</dd>\
                            </dl>\
                            <div class="d-flex flex-row-reverse bd-highlight">\
                                <button class="btn btn-primary mr-1" type="button" id="button-addon2"><i class="fas fa-trash-alt"></i></button>\
                                <button class="btn btn-primary ml-1 mr-1" type="button" id="button-addon3"><i class="fas fa-pencil-alt"></i></button>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
    wrapper.appendChild(accItem)

}

getPagination('http://localhost:9000/api/supplier/size/all', supplierHome)
