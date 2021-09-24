$(document).ready(function(){
    var backup_post = $.post;
    $.post = undefined;
    var api_url = "api.py";
    function open_path(path) {
        path = path || "/";
        last_path = path;
        backup_post(api_url, {"open": path}, function (response) {
            var htmls = "<div class='files'>";
            if (last_path !== "/") {
                var tmp = decodeURIComponent(last_path);
                tmp = tmp.split("/").slice(0, -1).join("/");
                if (tmp === "") {
                    tmp = "/";
                }
                htmls += "<div data-path='"+ encodeURIComponent(tmp).replace(/[!\'()*]/g, escape)+"'>..</div>";
            }
            for(var i=0;i<response.length;i++){
                for(var j=0;j<response[i].length;j++){
                    var tmp = last_path;
                    if (last_path !== "/") {
                        tmp += "/";
                    }
                    tmp += response[i][j];
                    htmls += "<div data-"+(i?"val":"path")+"='"+encodeURIComponent(tmp).replace(/[!'()*]/g, escape)+"'>"+response[i][j].split("/").slice(-1)[0]+"</div>";
                }
            }
            htmls += "</div>";
            $("div#dialog").append(htmls).show();
            $("div#dialog div.files div").mousedown(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).data("path")) {
                    $("div#dialog div.close").click();
                    return open_path(decodeURIComponent($(this).data("path")));
                }
                else if ($(this).data("val")) {
                    var hash = "#" + decodeURIComponent($(this).data("val"));
                    if (e.which === 1) {
                        window.location.hash = hash;
                        try {
                            load_file();
                            $("div#dialog div.close").click();
                        } catch (e) {
                            ;
                        }
                        return;
                    }
                    else if (e.which === 3) {
                        window.open(window.location.origin+"/"+hash);
                    }
                }
            });
        }).fail(function(){
            $("div#dialog div.close").click();
            alert("open file failed.\nplease try again later.");
        });
    }
    function open_file() {
        open_path(last_path);
    }
    function save_file(e, fp) {
        var history_name;
        if (!fp) {
            fp = window.location.hash.slice(1);
            if (editor.session.getValue() === original_text) {
                set_status("File not needed to save.")
                return;
            }
            history_name = prompt("Why do you save this file?\nThis is used for identify history.\nprintable strings only")||"unknown save";
            var matches = [];
            for (var m of history_name.matchAll(/[A-Za-z0-9_]+/g)) {
                matches.push(m[0]);
            }
            history_name = matches.join("_")||"unknown save";
        }
        var content = editor.session.getValue();
        backup_post(api_url, {"save": fp, "content": btoa(encodeURIComponent(content)), "history_name": history_name}, function (response) {
            $("div#statusbar .statustext").html("File loading ...");
            if (typeof response == "string") {
                set_status("File failed to save.\nReason: "+response);
            }
            else {
                original_text = content;
                window.location.hash = "#"+fp;
            }
        }).fail(function(response){
            set_status("File failed to save. Reason: "+response.responseText);
        });
    }
    function save_as_file(e) {
        var fp = prompt("Current file path: '"+window.location.hash.slice(1)+"'\nEnter new file path: (relative/absolute)");
        if (!fp) return;
        if (confirm("Save as file '"+fp+"'?")) {
            return save_file(e, fp);
        }
    }
    function file_history() {
        backup_post(api_url, {"history": window.location.hash.slice(1)}, function (response) {
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    response[i] = response[i].split(".");
                }
                var htmls = "<div class='files'>";
                // htmls += "<div>Current version: "+response[0].slice(-2)[0]+"</div><br/>";
                for (var i = 0; i < response.length; i++) {
                    var name = response[i].slice(-2)[0];
                    // if (i+1 < response.length) {
                    //     name = response[i+1].slice(-2)[0];
                    // }
                    // else {
                    //     name = "- Initial Save -"
                    // }
                    htmls += "<div data-version='" + response[i].join(".") + "'>" + response[i].slice(-3)[0] + ": " + name + "</div>";
                }
                htmls += "</div>";
                $("div#dialog").append(htmls).show();
                $("div#dialog div.files div[data-version]").click(function () {
                    var version = $(this).data("version");
                    backup_post(api_url, {"history": window.location.hash.slice(1), "version": version}, function (response) {
                        if (typeof response == "string") {
                            alert("File failed to history.\nReason: " + response + "\n\neditor will reload.");
                        }
                        window.location.reload();
                    }).fail(function (response) {
                        set_status("File failed to history.\nReason: " + response.responseText);
                    })
                });
            }
            else {
                set_status("File has no history.")
            }
        });
    }
    function print() {
        require("ace/config").loadModule("ace/ext/static_highlight", function(m) {
            var result = m.renderSync(
                editor.getValue(), editor.session.getMode(), editor.renderer.theme
            );
            document.body.style.display="none";
            var d = document.createElement("div");
            d.innerHTML=result.html;
            document.documentElement.appendChild(d);
            require("ace/lib/dom").importCssString(result.css);

            setTimeout(function() {window.print()}, 10);

            window.addEventListener("focus", function restore() {
               window.removeEventListener("focus", restore, false);
               d.parentNode.removeChild(d);
               document.body.style.display= "";
               editor.resize(true);
            }, false);
        });
    }
    function build_toolbar(){
        var buildDom = ace.require("ace/lib/dom").buildDom;
        buildDom(
            [
                "div",
                { class: "toolbar" },
                [
                    "button",
                    {
                        class: "sponsor ace-tomorrow-night-bright",
                        onclick: function () {
                            open("https://ace.c9.io/build/kitchen-sink.html");
                        }
                    },
                    "ACE"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "openButton",
                        onclick: open_file
                    },
                    "Open"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "saveButton",
                        onclick: save_file
                    },
                    "Save"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "saveAsButton",
                        onclick: save_as_file
                    },
                    "Save As"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "historyButton",
                        onclick: file_history
                    },
                    "History"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "findButton",
                        onclick: function () {
                            editor.execCommand("find")
                        }
                    },
                    "Find"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "findButton",
                        onclick: function () {
                            editor.execCommand("replace")
                        }
                    },
                    "Replace"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "wrapButton",
                        onclick: function () {
                            wrap_setting = !wrap_setting;
                            editor.setOption("wrap", wrap_setting);
                        }
                    },
                    "Wrap"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "printButton",
                        onclick: print
                    },
                    "Print"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "logButton",
                        onclick: function () {
                            window.open("/log.log");
                        }
                    },
                    "Log"
                ],
                [
                    "button",
                    {
                        class: "ace-tomorrow-night-bright",
                        ref: "helpButton",
                        onclick: function () {
                            var kbs = "<table class='ace-tomorrow-night-bright' style='margin: 0 auto'>";
                            var _ = [];
                            for (var key in editor.keyBinding.$defaultHandler.commandKeyBinding) {
                                _.push([key, editor.keyBinding.$defaultHandler.commandKeyBinding[key]]);
                            }
                            _.sort(function(a, b) {
                                a = a[0];
                                b = b[0];
                                return a < b ? -1 : (a > b ? 1 : 0);
                            });
                            for (var i = 0; i < _.length; i++) {
                                var k = _[i][0].replace(/-/g, " ").split(" ");
                                for (var j=0; j<k.length; j++){
                                    k[j] = k[j].substr(0, 1).toUpperCase()+k[j].substr(1);
                                }
                                k = k.join(" ");
                                var v = _[i][1];
                                kbs += "<tr><th>"+k+"</th><td>"+v["description"]+"</td></tr>";
                            }
                            kbs += "</table>";
                            $("div#dialog").append(kbs).show();
                        }
                    },
                    "Help"
                ],
            ],
            $("div#toolbar").get(0),
            btns
        )
    }
    function set_status(str) {
        var _statusbar = $("div#statusbar .statustext");
        if (_statusbar.html().indexOf(str) !== -1) {
            return;
        }
        if (_statusbar.hasClass("alert")) {
            clearTimeout(statusbarto);
        }
        if (str.indexOf("failed") === -1 && _statusbar.html().indexOf("failed") !== -1) {
            str += " "+_statusbar.html();
        }
        _statusbar.html(str);
        if (str.indexOf("failed") !== -1) {
            _statusbar.addClass("alert");
        }
        if (_statusbar.hasClass("alert")) {
            statusbarto = setTimeout(function () {
                _statusbar.removeClass("alert");
            }, 500);
        }
    }
    function build_cmds(cmd) {
        var [name, description, exec, win, mac, scrollIntoView, multiSelectAction, readOnly] = cmd;
        cmd = {
            "name": name,
            "description": description,
            "exec": exec,
            "bindKey": {}
        };
        if (win) {
            cmd["bindKey"]["win"] = win;
        }
        if (mac) {
            cmd["bindKey"]["mac"] = mac;
        }
        if (scrollIntoView) {
            if (["animate", "center", "cursor", "selectionPart"].indexOf(scrollIntoView) !== -1) {
                cmd["scrollIntoView"] = scrollIntoView;
            }
        }
        if (multiSelectAction) {
            if (["forEach", "forEachLine", "single"].indexOf(multiSelectAction) !== -1) {
                cmd["multiSelectAction"] = multiSelectAction;
            }
        }
        if (typeof readOnly == "boolean") {
            cmd["readOnly"] = readOnly?true:false;
        }
        return cmd;
    }
    function setup_keybinds() {
        function win(key, ctrl, shift, alt) {
            var binds = [];
            if (ctrl) {
                binds.push("ctrl");
            }
            if (shift) {
                binds.push("shift");
            }
            if (alt) {
                binds.push("alt");
            }
            binds.push(key);
            return binds.join("-");
        }
        function mac(key, cmd, shift, option) {
            var binds = [];
            if (cmd) {
                binds.push("cmd");
            }
            if (shift) {
                binds.push("shift");
            }
            if (option) {
                binds.push("option");
            }
            binds.push(key);
            return binds.join("-");
        }
        var cmds = [
            [
                "save",
                "Save File",
                function () {
                    save_file();
                },
                win("s", 1),
                mac("s", 1),
            ],
            [
                "save_as",
                "Save As File",
                function () {
                    save_as_file();
                },
                win("s", 1, 1),
                mac("s", 1, 1),
            ],
            [
                "open",
                "Open File",
                open_file,
                win("o", 1),
                mac("o", 1),
            ],
            [
                "print",
                "Print File",
                print,
                win("p", 1),
                mac("p", 1),
            ],
            [
                "history",
                "File History",
                file_history,
                win("h", 1),
                mac("h", 1),
            ],
            [
                "replace2",
                "Replace Text",
                function(){
                    editor.execCommand("replace");
                },
                win("r", 1),
                mac("r", 1),
            ],
            [
                "gotoline",
                "Goto Line",
                function(){
                    editor.prompt({ $type: "gotoLine" });
                },
                win("g", 1),
                mac("g", 1),
                0,
                0,
                true
            ],
            [
                "duplicate",
                "Duplicate Text",
                function(){
                    editor.duplicateSelection();
                },
                win("d", 1),
                mac("d", 1),
                "cursor",
                "forEach",
            ],
            [
                "removeline",
                "Remove Line",
                function(){
                    editor.removeLines();
                },
                win("d", 1, 1),
                mac("d", 1, 1),
                "cursor",
                "forEachLine",
            ],
            [
                "addcursorabove",
                "Add Cursor Above",
                function () {
                    editor.selectMoreLines(-1);
                },
                win("up", 1, 1),
                mac("up", 1, 1),
                0,
                0,
                true
            ],
            [
                "addcursorbelow",
                "Add Cursor Below",
                function () {
                    editor.selectMoreLines(1);
                },
                win("down", 1, 1),
                mac("down", 1, 1),
                0,
                0,
                true
            ],

        ]
        var safe_keybinds = [
            "ctrl-y","cmd-y",
            "ctrl-z", "cmd-z",
            "ctrl-f", "cmd-f",
            "up","down","left","right",
            "alt-up","alt-down",
            "ctrl-left","ctrl-right","cmd-left","cmd-right",
            "shift-up","shift-down","shift-left","shift-right",
            "ctrl-shift-left","ctrl-shift-right","cmd-shift-left","cmd-shift-right",
            "pageup","pagedown",
            "shift-pageup","shift-pagedown",
            "ctrl-/","cmd-/",
            "home","end",
            "ctrl-home","ctrl-end","cmd-home","cmd-end",
            "ctrl-shift-home","ctrl-shift-end","cmd-shift-home","cmd-shift-end",
            "tab","shift-tab",
            "ctrl-a","cmd-a",
        ];
        for (var kb in editor.keyBinding.$defaultHandler.commandKeyBinding) {
            if (safe_keybinds.indexOf(kb) === -1) {
                delete editor.keyBinding.$defaultHandler.commandKeyBinding[kb];
            }
        }
        for (var i=0; i<cmds.length; i++) {
            editor.commands.addCommand(build_cmds(cmds[i]));
        }
        console.log("Key Binds", editor.keyBinding.$defaultHandler.commandKeyBinding);
    }
    function load_file(){
        if (window.location.hash.slice(1)){
            prev_hash = window.location.hash.slice(1);
            var f = decodeURIComponent(window.location.hash.slice(1));
            var mode = modelist.getModeForPath(f).mode;
            editor.session.setMode(mode);
            backup_post(api_url, {"file": f}, function (response) {
                response = decodeURIComponent(atob(response));
                last_path = f.split("/").slice(0, -1).join("/");
                original_text = response;
                $("div#statusbar .statustext").html("File loading ...");
                editor.session.setUseSoftTabs(true);
                editor.session.setValue(response, -1);
                set_status("File loaded.");
                $("title").html("ACE - "+f.split("/").slice(-1)[0]);
            }).fail(function (response) {
                original_text = "";
                editor.session.setValue("", -1);
                set_status("File failed to load. Reason: "+response.responseText);
            });
        }
        else {
            set_status("Editor loaded. Text mode. Temp mode. Open or New file to continue.");
        }
    }
    var statusbarto;
    var last_path = "/";
    set_status("Editor loading ...");
    var original_text = "";
    var onbeforeunload = function(){
        return "File is changed.\nAre you sure you want to leave?";
    };
    var modelist = ace.require("ace/ext/modelist");
    var btns = {};
    var wrap_setting = true;
    var editor = ace.edit("editor");
    var prev_hash = window.location.hash.slice(1);
    build_toolbar();
    editor.setFontSize(16);
    editor.setOption("indentedSoftWrap", false);
    editor.setOption("wrap", wrap_setting);
    editor.setTheme("ace/theme/tomorrow_night_bright");
    var StatusBar = ace.require("ace/ext/statusbar").StatusBar;
    var statusbar = new StatusBar(editor, $("div#statusbar").get(0));
    setup_keybinds();
    $("div#dialog div.close").click(function () {
        $("div#dialog > *:not(div.close)").remove();
        $("div#dialog").hide();
    });
    load_file();
    $("div#statusbar .statustext").click(function () {
        alert($(this).text());
    });
    window.onhashchange = function(){
        if (window.location.hash.slice(1) === prev_hash) {
            return;
        }
        if (editor.session.getValue() !== original_text) {
            if (!confirm(onbeforeunload())) {
                window.location.hash = "#"+prev_hash;
                return;
            }
        }
        load_file();
    }
    setInterval(function () {
        if ($(".statustext").html().indexOf("failed") !== -1) return;
        var v = editor.session.getValue();
        var _ = v!==original_text;
        if (_) {
            set_status("File changed. Size change: "+(v.length-original_text.length));
        }
        else {
            set_status("File not changed.")
        }
        window.onbeforeunload = _?onbeforeunload:null;
    }, 500);
});
