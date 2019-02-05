function menusetting (logged) {
    if(logged == true){
        menu = true;
    }else{
        menu = false;
    }
    return menu;
}

module.exports.menusetting = menusetting;