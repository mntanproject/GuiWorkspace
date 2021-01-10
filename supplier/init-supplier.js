'use strict';

const appPlatform = 'android'
const absolutePath = 'file:///android_asset/gui'
const appendAbsolutePath = 0
const testparam = 'me'

window.onload = () => {


    let headerScript = document.createElement('script');
    headerScript.src = '/assets/js/header.js';
    headerScript.type = 'text/javascript';
    document.body.prepend(headerScript);

    let initScript = document.createElement('script');
    initScript.src = '/assets/js/init-page.js';
    initScript.type = 'text/javascript';
    document.body.prepend(initScript);
    //    let footerScript = document.createElement('script');
    //    footerScript.src = '/assets/js/init-page.js';
    //    footerScript.type = 'text/javascript';
    //    document.body.prepend(footerScript);}
}
