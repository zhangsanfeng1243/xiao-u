import Vue from 'vue'
Vue.filter("ishotFormat", (status) => {
    switch(status) {
        case 1:
            return "是";
            break;
        case 2:
            return "否";
            break;
    }
})