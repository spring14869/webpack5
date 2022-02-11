import 'main.css';
import esm from 'components/esm';
// const common = require('./components/common.js');

class Main {
    constructor(){
        this.pageTitle = '首頁page';
        console.log('esm', esm);

        $('#console').html(esm.description);
    }

    logState = () => {
        //do somthing
    }
}

new Main();