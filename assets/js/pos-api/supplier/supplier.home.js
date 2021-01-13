'use strict';

function getPagination(url, paginationObj, mnCallback) {
    fetch(url)
        .then(response => response.json())
        .then(result => mnCallback(result, paginationObj));
}

async function getData(url, mnCallback) {
    await fetch(url, {
        method: 'Get'
    }).then(function (response) {
        return response.json()
    }).then(function (result) {
        if (result.length == 0) {
            emptyMessage()
        } else {
            result.forEach(mnCallback);
        }
    }).catch(function (error) {
        alert('error get data supplier_home.js' + error)
    });
}

var displayData = function (offset, limit, order, descending) {
    document.querySelectorAll('.supplier-data').forEach(e => e.remove());

    let url = MnSupplier.paginatorUrl
    let searchTerm = document.getElementById('search').value
    url = url + 'offset=' + offset + '&limit=' + limit + '&order=' + order + '&descending=' + descending
    if (searchTerm != '') {
        url = url + '&search=' + searchTerm
    }
    getData(url, generateSupplierHtml)
}

function init(data, pagination) {
    pagination.size = data.totalsize
    var numRows = document.querySelector('input[name = "btnradiorows"]:checked').value;
    document.querySelectorAll('ul.pagination li.page-item').forEach(e => e.remove());
    generatePagination(pagination)
    let offset = (pagination.currentPage - 1) * pagination.rowsPerPage
    let limit = pagination.rowsPerPage
    let order = pagination.order
    let descending = pagination.descending
    displayData(offset, limit, order, descending)
}

function emptyMessage() {
    var wrapper = document.getElementById('accordionFlushExample')
    var accItem = document.createElement("div");
    var accHeader = document.createElement('div');
    var accHeaderLink = document.createElement('a');
    var accCollapse = document.createElement('div');
    var accCollapseItem = document.createElement('div');

    accItem.className = 'accordion-item supplier-data'
    accHeaderLink.id = 'flush-heading-empty'
    accHeaderLink.setAttribute('role', 'button')
    accHeaderLink.setAttribute('aria-expanded', 'false')
    accHeaderLink.innerHTML = '<div class="d-flex justify-content-center pt-1">No Record Found</div>'

    accHeader.appendChild(accHeaderLink)
    accItem.appendChild(accHeader)
    accItem.appendChild(accCollapse)
    wrapper.appendChild(accItem)


}


function generateSupplierHtml(item, index) {

    var supp = MnSupplier.fromJson(item);
    var wrapper = document.getElementById('accordionFlushExample')
    var accItem = document.createElement("div");
    var accHeader = document.createElement('div');
    var accHeaderLink = document.createElement('a');
    var accCollapse = document.createElement('div');
    var accCollapseItem = document.createElement('div');

    accItem.className = 'accordion-item supplier-data'

    accHeader.className = 'accordion-header'
    accHeaderLink.className = 'accordion-button collapsed btn'
    accHeaderLink.setAttribute('data-bs-toggle', 'collapse')

    accHeaderLink.id = 'flush-heading' + index
    accHeaderLink.setAttribute('data-bs-target', '#flush-collapse' + index)
    accHeaderLink.setAttribute('role', 'button')
    accHeaderLink.setAttribute('aria-expanded', 'false')
    accHeaderLink.setAttribute('aria-controls', '#flush-collapse' + index)
    accHeaderLink.innerHTML = '<div class="container-fluid p-0 m-0"><dl class="row m-0"><dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">Id</dt>                                    <dd class="col-9 col-md-1 text-left border-right-md">' + supp.id + '</dd><dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">Company</dt>                                    <dd class="col-9 col-md-3 text-left border-right-md">' + supp.company + supp.id + '</dd><dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">Sales</dt><dd class="col-9 col-md-4 text-left border-right-md">' + supp.name + '</dd><dt class="col-3 p-0 m-0 text-left d-md-none d-sm-block">City</dt><dd class="col-9 col-md-4 text-left">' + supp.city + '</dd></dl></div>'

    accCollapse.className = 'accordion-collapse collapse'
    accCollapse.id = 'flush-collapse' + index
    accCollapse.setAttribute('aria-labelledby', 'flush-heading' + index)
    accCollapse.setAttribute('data-bs-parent', '#accordionFlushExample')


    var accCollapseItemContainer = document.createElement('div')
    var accCollapseContentContainer = document.createElement('dl')
    var accCollapseContentButtonContainer = document.createElement('div')
    var accCollapseContentDt = document.createElement('dt')
    var accCollapseContentDd = document.createElement('dd')
    var accCollapseContentButtonEdit = document.createElement('button')
    var accCollapseContentButtonDelete = document.createElement('button')

    accCollapseItem.className = 'accordion-body bg-light'
    accCollapseItemContainer.className = 'container-fluid'
    accCollapseContentContainer.className = 'row'
    accCollapseContentButtonContainer.className = '"d-flex flex-row-reverse bd-highlight'

    accCollapseContentContainer.innerHTML = '<dt class="col-2 small p-0">Contact</dt><dd class="col-10 small">' + supp.contactno + '</dd><dt class="col-2 small p-0">Email</dt><dd class="col-10 small">' + supp.email + '</dd><dt class="col-2 small p-0">Street</dt><dd class="col-10 small">' + supp.street + '</dd><dt class="col-2 small p-0">City</dt><dd class="col-10 small">' + supp.city + '</dd><dt class="col-2 small p-0">State</dt><dd class="col-10 small">' + supp.state + '</dd><dt class="col-2 small p-0">Country</dt><dd class="col-10 small">' + supp.country + '</dd><dt class="col-2 small p-0">Bank</dt><dd class="col-10 small">' + supp.bank + '</dd><dt class="col-2 small p-0">Note</dt><dd class="col-10 small">' + supp.notes + '</dd>'

    accCollapseContentButtonEdit = document.createElement('button')
    accCollapseContentButtonEdit.className = 'btn btn-primary ml-1 mr-1'
    accCollapseContentButtonEdit.innerHTML = '<i class = "fas fa-pencil-alt"></i>'
    accCollapseContentButtonDelete = document.createElement('button')
    accCollapseContentButtonDelete.className = 'btn btn-primary mr-1'
    accCollapseContentButtonDelete.innerHTML = '<i class="fas fa-trash-alt"></i>'

    accCollapseContentButtonEdit.addEventListener('click', function () {
        window.location.href = "supplier_edit.html?id=" + supp.id;
    })

    accCollapseContentButtonDelete.addEventListener('click', function () {
        Swal.fire({
            title: 'Delete ' + supp.name,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(MnSupplier.deleteUrl + 'id=' + supp.id)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted')
                    .then(function () {
                        // Redirect the user
                        window.location.href = "supplier_home.html";
                    })
            }
        })
    })

    accCollapseContentButtonContainer = document.createElement('div')
    accCollapseContentButtonContainer.className = 'd-flex flex-row-reverse bd-highlight'
    accCollapseContentButtonContainer.appendChild(accCollapseContentButtonDelete)
    accCollapseContentButtonContainer.appendChild(accCollapseContentButtonEdit)
    accCollapseContentContainer.appendChild(accCollapseContentButtonContainer)

    accCollapseItemContainer.appendChild(accCollapseContentContainer)
    accCollapseItem.appendChild(accCollapseItemContainer)
    accCollapse.appendChild(accCollapseItem)


    accHeader.appendChild(accHeaderLink)
    accItem.appendChild(accHeader)
    accItem.appendChild(accCollapse)
    wrapper.appendChild(accItem)


}

var sortables = document.getElementsByClassName("sortable");
for (var i = 0; i < sortables.length; i++) {
    //alert(sortables[i].id)
    sortables[i].addEventListener('click', changeOrder)
}



var url = MnSupplier.sizeUrl + 'all'
var numRows = document.querySelector('input[name = "btnradiorows"]:checked').value;
var paginationInit = new MnPagination(0, numRows, 1, 3, 'paginatorTop', 'id', '1', displayData)
paginationInit.paginationUrl = url
getPagination(paginationInit.paginationUrl, paginationInit, init)

function noRowsChanged() {
    let url = MnSupplier.sizeUrl
    let searchTerm = document.getElementById('search').value
    if (searchTerm == '') {
        url = url + 'all'
    } else {
        url = url + 'search=' + searchTerm
    }
    var numRows = document.querySelector('input[name = "btnradiorows"]:checked').value;
    //var pagination = new MnPagination(0, numRows, 1, 3, 'paginatorTop', 'id', '', displayData)
    paginationInit.rowsPerPage = numRows
    paginationInit.currentPage = 1
    getPagination(url, paginationInit, init)


}

function changeOrder() {
    let from = this.id
    let url = MnSupplier.sizeUrl
    let searchTerm = document.getElementById('search').value
    if (searchTerm == '') {
        url = url + 'all'
    } else {
        url = url + 'search=' + searchTerm
    }
    var numRows = document.querySelector('input[name = "btnradiorows"]:checked').value;
    var desc = 0;


    if (this.classList.contains('asc')) {
        this.classList.remove('asc')
        this.classList.add('desc')
        desc = 1
    } else if (this.classList.contains('desc')) {
        this.classList.remove('desc')
        this.classList.add('asc')
        desc = 0
    } else {
        this.classList.add('asc')
    }

    for (var i = 0; i < sortables.length; i++) {
        if (sortables[i].id != from) {
            sortables[i].classList.remove('desc')
            sortables[i].classList.remove('asc')

        }
    }

    paginationInit.order = from
    paginationInit.descending = desc
    getPagination(url, paginationInit, init)


}

function search() {
    var url = MnSupplier.sizeUrl + 'search=' + document.getElementById('search').value
    var numRows = document.querySelector('input[name = "btnradiorows"]:checked').value;
    paginationInit.rowsPerPage = numRows
    paginationInit.currentPage = 1
    getPagination(url, paginationInit, init)

}
