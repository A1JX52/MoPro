$(function() {
    $('#tabKat').click(katLaden);
    $('#tabVor').click(vorLaden);
    registerSW();
});
var txt = '';

function katLaden() {
    $.get("https://hermes.fiw.hs-wismar.de/~etcaan/restsrv/Kat.json", function callback(data) {
        kategorien = JSON.parse(data);
        txt = "<ul id='lv' data-role='listview' data-inset='true'>";
        
        for (i = 0; i < kategorien.length; i++) {
            txt += "<li>" + kategorien[i].name + "</li>"
        }
        txt += "</ul>";

        $('#content').html(txt).trigger('create');
        $('#lv').listview('refresh'); 
    });
}

function vorLaden() {
    $.get("https://hermes.fiw.hs-wismar.de/~etcaan/restsrv/Kat.json", function callback(data) {
        kategorien = JSON.parse(data);
        katNames = {};
        
        for (i = 0; i < kategorien.length; i++) {
            katNames[kategorien[i].id] = kategorien[i].name;
        }

        $.get("https://hermes.fiw.hs-wismar.de/~etcaan/restsrv/Vorrat.json", function callback(data) {
            artikel = JSON.parse(data);
            dividers = {};

            for (i = 0; i < artikel.length; i++) {
                katName = katNames[artikel[i].Kat_uid];

                if (dividers[katName] === undefined) {
                    dividers[katName] = [artikel[i]];
                } else {
                    dividers[katName].push(artikel[i]);
                }
            }
            txt = "<ul id='lv' data-role='listview' data-inset='true' data-divider-theme='b' data-count-theme='b'>";
            
            for (let divider in dividers) {
                txt += "<li data-role='list-divider'>" + divider + "</li>";
                katArtikel = dividers[divider];

                for (i = 0; i < katArtikel.length; i++) {
                    txt += "<li>" + katArtikel[i].name + "<span class='ui-li-count'>" + katArtikel[i].menge + " " + katArtikel[i].groesse + "</span></li>";
                }
            }
            txt += "</ul>";

            $('#content').html(txt).trigger('create');
            $('#lv').listview('refresh');
        });
    });
}

async function registerSW() { 
    if ('serviceWorker' in navigator) { 
        try {
            await navigator.serviceWorker.register('./serviceWorker.js'); 
        } catch (e) {
          alert('ServiceWorker registration failed. Sorry about that.'); 
        }
    } else {
        alert('PWA not possible in this browser'); 
    }
}