import Vue from 'vue'
Vue.filter("isnewFormat", (status) => {
    switch(status) {
        case 1:
            return "是";
            break;
        case 2:
            return "否";
            break;
    }
})