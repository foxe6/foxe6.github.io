window.account_js=function(a){delete window.account_js;a.ac_info().appendTo("div#ac td#ac_info_target");a.change_password().wrapAll(a.dialog_resource.ac_row_wrap).parent().parent().appendTo("div#ac div#ac_info");a.update_postal_info().wrapAll(a.dialog_resource.ac_row_wrap).parent().parent().appendTo("div#ac div#ac_info")};