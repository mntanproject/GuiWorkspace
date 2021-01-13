'use strict';


function MnPagination(full_data_size, rows_per_page, current_page, pagination_max_page, wrapper_id, order_page, descending_page, display_callback) {

    this.rowsPerPage = rows_per_page
    this.currentPage = current_page
    this.size = full_data_size
    this.maxPage = pagination_max_page
    this.wrapper = document.getElementById(wrapper_id)
    this.order = order_page
    this.descending = descending_page
    this.paginationUrl = ''
    this.displayCallback = display_callback
}

var generatePagination = function (paginationObj) {


    let pageCount = Math.ceil(paginationObj.size / paginationObj.rowsPerPage)
    let startRange = 1
    let endRange = 7

    let currentPage = paginationObj.currentPage
    let maxPage = paginationObj.maxPage
    let size = paginationObj.size


    if (currentPage != 1) {
        createPaginationButton(paginationObj, '<span aria-hidden="true">&laquo;</span>', 'page-item')

    }
    startRange = currentPage - maxPage
    if (startRange < 1) {
        startRange = 1
    }
    endRange = currentPage + maxPage

    if (endRange < 7) {
        endRange = 7
    }
    if (currentPage > 2 + maxPage) {
        createPaginationButton(paginationObj, 1, 'page-item')
        createPaginationButton(paginationObj, '<span aria-hidden="true">&hellip;</span>', 'page-item  disabled')

    }


    for (let i = startRange; i < endRange; i++) {
        if (i > pageCount) {
            break
        }

        if (i == currentPage) {
            createPaginationButton(paginationObj, i, 'page-item active')
        } else {
            createPaginationButton(paginationObj, i, 'page-item')
        }



    }

    if (currentPage + maxPage < pageCount) {
        createPaginationButton(paginationObj, '<span aria-hidden="true">&hellip;</span>', 'page-item  disabled')
        createPaginationButton(paginationObj, pageCount, 'page-item')

    }

    if (currentPage < pageCount) {
        createPaginationButton(paginationObj, '<span aria-hidden="true">&raquo;</span>', 'page-item')
    }

}

function createPaginationButton(paginationObj, linkInnerHTML, btnClassName) {
    let btn = document.createElement('li')
    btn.className = btnClassName
    let link = document.createElement('a')
    link.className = 'page-link'
    link.innerHTML = linkInnerHTML
    btn.appendChild(link)

    //let wrapper = document.getElementById(paginationObj.wrapperId)
    paginationObj.wrapper.appendChild(btn)
    if (!btn.className.includes("disabled")) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('ul.pagination li.page-item').forEach(e => e.remove());
            if (Number.isInteger(linkInnerHTML)) {
                paginationObj.currentPage = linkInnerHTML
            } else {

                if (linkInnerHTML.includes("&laquo")) {
                    paginationObj.currentPage = paginationObj.currentPage - 1
                }
                if (linkInnerHTML.includes("&raquo")) {
                    paginationObj.currentPage = paginationObj.currentPage + 1
                }
            }

            generatePagination(paginationObj);
            let offset = (paginationObj.currentPage - 1) * paginationObj.rowsPerPage
            let limit = paginationObj.rowsPerPage
            let order = paginationObj.order
            let descending = paginationObj.descending
            paginationObj.displayCallback(offset, limit, order, descending);
            //
            //            document.querySelectorAll('.page-item').forEach(e => e.remove());
            //            //let current_btn = document.querySelector('.pagination li.active');
            //            //current_btn.classList.remove('active');
            //            getAllSuppliers('http://localhost:9000/api/supplier/paginator/offset=' + current_page + '&limit=' + rowPerPage);
            //            getPaginator('http://localhost:9000/api/supplier/view/all')
            //            console.log('current-page:' + current_page)
            //            generatePaginator(current_page)
            //            btn.classList.add('active');
        });
    }
}
