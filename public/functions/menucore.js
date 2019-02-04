function menusetting (logged) {
    if(logged == true){
        menu = 'Кабинет';
    }else{
        menu = 'Вход';
    }
    return menu;
}

module.exports.menusetting = menusetting;