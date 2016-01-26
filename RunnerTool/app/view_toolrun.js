var run_view = {};


$(document).ready(function () {
    run_view.set_deafult_values_inctrl();

    // Toolbar teo/real table
    $("#btNewDetPass")
        .html(run_view.getTranslMessage('msg__nuovi_dati'))
        .button({
            text: false,
            icons: {
                primary: "ui-icon-document"
            }
        }).click(function () {
            run_view.teoreal_newdataset();
        });

    $("#btEditDetPass")
        .html(run_view.getTranslMessage('msg__cambia_dett'))
        .button({
            text: false,
            icons: {
                primary: "ui-icon-pencil"
            }
        }).click(function () {
            run_view.teoreal_show_edit_dlg();
        });

    $("#btCalcDetTeoreal")
        .html(run_view.getTranslMessage('msg__tabella_teo'))
        .button().click(function () {
            run_view.confronta_tabella();
            run_view.set_result_to('liCalcDetTeoreal');
        });

    // toolbar
    $("#btDistMara")
        .html(run_view.getTranslMessage('msg__maratona'))
        .button().click(function () {
            run_view.set_distance(42.2);
        });
    $("#btDistHM")
        .html(run_view.getTranslMessage('msg__mezza_marat'))
        .button().click(function () {
            run_view.set_distance(21.1);
        });
    $("#btDist10k")
        .html(run_view.getTranslMessage('btDist10k'))
        .button().click(function () {
            run_view.set_distance(10.0);
        });
    $("#btDist5k")
        .html(run_view.getTranslMessage('btDist5k'))
        .button().click(function () {
            run_view.set_distance(5.0);
        });
    $("#btDist1k")
        .html(run_view.getTranslMessage('btDist1k'))
        .button().click(function () {
            run_view.set_distance(1.0);
        });
    $("#btDistClearRes")
        .html(run_view.getTranslMessage('msg__cancella_ri'))
        .button().click(function () {
            run_view.clear_result();
        });

    // buttons

    $("#btCalcMean")
        .html(run_view.getTranslMessage('msg__calcola_med'))
        .button().click(function () {
            run_view.mean_vel();
            run_view.set_result_to('liCalcMean');
        });
    $("#btFinalTime")
        .html(run_view.getTranslMessage('msg__calcola_tem'))
        .button().click(function () {
            run_view.tempo_finale();
            run_view.set_result_to('liFinalTime');
        });
    $("#btCalcTableRangeVel")
        .html(run_view.getTranslMessage('msg__converti_ve'))
        .button().click(function () {
            run_view.calculate_table_range_vel();
            run_view.set_result_to('liCalcTableRangeVel');
        });
    $("#btMinutiCorsi")
        .html(run_view.getTranslMessage('msg__calcola_tem'))
        .button().click(function () {
            run_view.minuti_corsi();
            run_view.set_result_to('liMinutiCorsi');
        });
    $("#btTablePerDist")
        .html(run_view.getTranslMessage('msg__tabella_pas'))
        .button().click(function () {
            run_view.tabella_per_dist();
            run_view.set_result_to('liTablePerDist');
        });
    $("#btPercPulsMax")
        .html(run_view.getTranslMessage('msg__percentuali'))
        .button().click(function () {
            run_view.freq_puls_table();
            run_view.set_result_to('liPercPulsMax');
        });
    $("#btEqTempi")
        .html(run_view.getTranslMessage('msg__equivalenza'))
        .button().click(function () {
            run_view.equilval_tempi();
            run_view.set_result_to('liEqTempi');
        });
    $("#btSommaTempi")
        .html(run_view.getTranslMessage('msg__somma_i_tem'))
        .button().click(function () {
            run_view.somma_tempi();
            run_view.set_result_to('idSommaTempi');
        });
    $("#btSottrTempi")
        .html(run_view.getTranslMessage('msg__sottrae_i_t'))
        .button().click(function () {
            run_view.sottr_tempi();
            run_view.set_result_to('idSommaTempi');
        });
    $("#btRisSumInT1")
        .html(run_view.getTranslMessage('msg__risultato_i'))
        .button().click(function () {
            run_view.partial_sum_in_t1();
        });

    // labels
    $("#msgDis1").html(run_view.getTranslMessage('msg__distanza_es'));
    $("#msgTime1").html(run_view.getTranslMessage('msg__tempo_es__0'));
    $("#msgDis2").html(run_view.getTranslMessage('msg__distanza_es_1'));
    $("#msgVelAlKm").html(run_view.getTranslMessage('msg__velocita_al'));
    $("#msgDis3").html(run_view.getTranslMessage('msg__distanza_es'));
    $("#msgVelKmh12").html(run_view.getTranslMessage('msg__velocita_al_1'));
    $("#msgDis4Hm").html(run_view.getTranslMessage('msg__distanza_es_2'));
    $("#msgVelAlkm1").html(run_view.getTranslMessage('msg__velocita_al_2'));
    $("#msgPassoOStep").html(run_view.getTranslMessage('msg__passo_o_ste'));
    $("#msgPolsoMax").html(run_view.getTranslMessage('msg__passo_o_ste'));
    $("#msgDist10km").html(run_view.getTranslMessage('msg__distanza_es_3'));
    $("#msgTempo3736").html(run_view.getTranslMessage('msg__tempo_es__0'));
    $("#msgDistObbiet").html(run_view.getTranslMessage('msg__distanza_ob'));
    $("#msgVelTeo").html(run_view.getTranslMessage('msg__velocita_te'));
    $("#msgPassRealiPar").html(run_view.getTranslMessage('msg__dettaglio_p'));
    $("#msgT1").html(run_view.getTranslMessage('msg__tempo_1'));
    $("#msgT2").html(run_view.getTranslMessage('msg__tempo_2'));
    $("#msgRangeVelOpt").html(run_view.getTranslMessage('msg__serie_di_ve'));
    $("#msgFunUtil").html(run_view.getTranslMessage('msg__funzioni_ut'));


    $("#cmbDisteq").combobox();
    $("#cmbDisteq_goal").combobox();

    // dialogo della lista tempi effettivi
    $("#dialog-form-teoreal").dialog({
        autoOpen: false,
        height: 450,
        width: 390,
        modal: true,
        buttons: [
            {
                text: run_view.getTranslMessage('msg__aggiungi'),
                click: function () {
                    run_view.teoreal_add_new_item();
                }
            },
            {
                text: run_view.getTranslMessage('msg__ok'),
                click: function () {
                    $(this).dialog("close");
                    run_view.tabeff_in_ctrl();
                }
            },
            {
                text: run_view.getTranslMessage('msg__cancella'),
                click: function () {
                    $(this).dialog("close");
                }
            }
        ],
        close: function () { }
    });

    // dialogo per cambiare un singolo record della lista tempi effettivi
    $("#dialog-form-edit-eff").dialog({
        autoOpen: false,
        height: 200,
        width: 300,
        modal: true,
        buttons: [
            {
                text: run_view.getTranslMessage('msg__ok'),
                click: function () {
                    $(this).dialog("close");
                    run_view.tabeff_item_edit();
                }
            },
            {
                text: run_view.getTranslMessage('msg__cancella'),
                click: function () {
                    run_view.teoreal_add_new_item_cancel();
                    $(this).dialog("close");
                }
            }
        ],
        close: function () { }
    });

    $("#detTabRealData").delegate('td', 'mouseover mouseleave', function (e) {
        if (e.type == 'mouseover') {
            $(this).parent().addClass("hover");
        }
        else {
            $(this).parent().removeClass("hover");
        }
    });


    run_view.dom_is_ready();
});

(function () {
    run_view.mean_vel = function () {
        var dist = $('#txtDist1').val();
        var time = $('#txtTime1').val();
        $('#result').empty();
        writeln_inresult('<p>' + run_view.getTranslMessage('msg__calcola_vel_1') + dist + run_view.getTranslMessage('msg___km_nel_tem') + time);
        var ct = conv_tempi();
        var res = ct.vel_media_per_dist(dist, time);
        if (check_result(ct)) {
            mostra_vel_kmminuto([res.velmedia]);
            _defaults.distance = dist;
            _defaults.time = time;
            run_view.set_deafult_values_inctrl();
        }

    }

    run_view.tempo_finale = function () {
        var dist = $('#txtDist2').val();
        var velmin = $('#txtVelMmSs1').val();
        $('#result').empty();
        writeln_inresult('<p>' + run_view.getTranslMessage('msg__calcola_tem_1') + dist + run_view.getTranslMessage('msg___km_nel_tem') + velmin + ' mm:ss');
        var ct = conv_tempi();
        var res = ct.tempo_finale(dist, velmin);
        if (check_result(ct)) {
            minuti_corsi(res.velmed_in_kmh, res.dist_km);
            mostra_vel_kmminuto([res.velmed_in_kmh]);
        }
    }

    run_view.calculate_table_range_vel = function () {
        var range_str = $('#txtrangevel').val(),
            input_range_arr = [], vals_f, num_f, i;
        if (range_str.length > 0) {
            vals_f = range_str.split(',');
            for (i = 0; i < vals_f.length; i++) {
                num_f = parseFloat(vals_f[i]);
                input_range_arr.push(num_f);
            }
        }

        $('#result').empty();
        writeln_inresult('<p>' + run_view.getTranslMessage('msg__mostra_tabe') + range_str);
        var ct = conv_tempi();
        var res = ct.process_range_vel(input_range_arr);
        if (check_result(ct)) {
            for (i = 0; i < res.length; i++) {
                res[i].mmss = make_min_form(res[i].time_part);
            }
            show_table(res);
        }
    }

    run_view.minuti_corsi = function () {
        var vel, dist;
        vel = parseFloat($('#txtVel').val());
        dist = parseFloat($('#txtDist3').val());
        $('#result').empty();

        if (vel < 0.0 || dist < 0.0) {
            writeln_inresult('<p>' + run_view.getTranslMessage('msg__sono_acceta'));
            return;
        }

        writeln_inresult('<p>' + run_view.getTranslMessage('msg__minuti_cors') + vel + run_view.getTranslMessage('msg___km_h_per_u') + dist);
        minuti_corsi(vel, dist);
    }

    run_view.tabella_per_dist = function () {
        var dist = parseFloat($('#txtDist4').val());
        var dist_step = parseFloat($('#txtStep').val());
        var tempo_mmss = $('#txtVelMmSs2').val();
        $('#result').empty();

        if (dist_step < 0.0 || dist < 0.0) {
            writeln_inresult('<p>' + run_view.getTranslMessage('msg__sono_acceta'));
            return;
        }
        writeln_inresult('<p>' + run_view.getTranslMessage('msg__tabella_pas_1') + dist + run_view.getTranslMessage('msg___km_con_uno') + dist_step + run_view.getTranslMessage('msg___km_ed_una_') + tempo_mmss + run_view.getTranslMessage('msg___mm_ss_al_k') + '<br/>');
        var ct = conv_tempi();
        var res = ct.tabella_per_dist(dist, tempo_mmss, dist_step);
        if (check_result(ct)) {
            show_table_per_dist(res);
        }
    }

    run_view.freq_puls_table = function () {
        var maxpuls = parseInt($('#txtMaxPuls').val(), 10);

        $('#result').empty();

        if (maxpuls > 250 || maxpuls < 50) {
            writeln_inresult('<p>' + run_view.getTranslMessage('msg__valore_batt'));
            return;
        }

        writeln_inresult('<p>' + run_view.getTranslMessage('msg__tabella_per') + maxpuls + '<br/>');

        var ct = conv_tempi();
        var res = ct.freq_puls_table(maxpuls);
        if (check_result(ct)) {
            show_table_puls(res);
        }

    }

    run_view.equilval_tempi = function () {
        var dist = $('#cmbDisteq').val();
        var dist_goal = $('#cmbDisteq_goal').val();
        var tempo = $('#txtTime2').val();
        $('#result').empty();
        writeln_inresult('<p>' + run_view.getTranslMessage('msg__calcola_equ') + dist + run_view.getTranslMessage('msg___con_tempo_') + tempo + run_view.getTranslMessage('msg___e_') + dist_goal + ' <br/>');
        var ct = conv_tempi();
        var res = ct.equilval_tempi(dist, tempo, dist_goal);
        if (check_result(ct)) {
            var str_time = make_min_form_withh(res / 60);
            writeln_inresult('<strong>' + str_time + '</strong>' + ' (hh:mm:ss)<br/>');
        }
    }

    run_view.confronta_tabella = function () {
        var detail_real_str = $('#txtDetailReal').val();
        var detail_real_arr = detail_real_str.split(',');
        var tempo_mmss = $('#txtVelMmSs3').val();
        $('#result').empty();
        writeln_inresult('<p>' + run_view.getTranslMessage('msg__tabella_tor') + tempo_mmss + run_view.getTranslMessage('msg___mm_ss_al_k_1') + '<br/>');
        var ct = conv_tempi();
        var res = ct.confronta_tabella(tempo_mmss, detail_real_arr);
        if (check_result(ct)) {

            show_table_deltas(res);

            _defaults.time_mmss = tempo_mmss;
            _defaults.detail_real = detail_real_str;
        }
    }

    run_view.dom_is_ready = function () {
        // some init when all controls are ready
    }

    // region teoreal toolbar START

    var _teorealDataList = null, _teoreal_initial_id = 3;
    var _teorealEditItem = { id: 0, km: '', tempo: '' };

    run_view.teoreal_show_edit_dlg = function () {
        var teorelTemplates = {
            valueNames: ['id', 'dist', 'tempo']
        }
        // empty the table  body to avoid reappend data
        $('#terealBody').empty();
        // need an element otherwise list can't work...
        $('#terealBody').append("<tr> \
            <td class=\"edit\"><button class=\"edit-item-btn\">Modifica</button></td> \
            <td class=\"remove\"><button class=\"remove-item-btn\">Rimuovi</button></td> \
            <td class=\"id\" style=\"display:none;\">1</td> \
            <td class=\"dist\">5</td> \
            <td class=\"tempo\">0:24:11</td></tr>");
        // List coud be created only if html is ready and it is populated using current dom
        _teorealDataList = new List('teoRealData', teorelTemplates);
        teoreal_add_data_from_teoCtrl();

        teoreal_dlg_refresh_cb();

        $("#dialog-form-teoreal").dialog("open");
    }

    // create a new item to be edit by user for the teoreal list
    run_view.teoreal_add_new_item = function () {
        var idnew = _teorealDataList.size() + _teoreal_initial_id;
        _teorealDataList.add({ id: idnew, dist: 2.0, tempo: '00:12:00' });
        _teorealEditItem = _teorealDataList.get('id', idnew).values();
        _teorealEditItem['is_new'] = true;

        teoreal_open_dialog_edititem(_teorealEditItem);
    }

    // new item refesued to be edited, remove it
    run_view.teoreal_add_new_item_cancel = function () {
        if (_teorealEditItem['is_new'] !== undefined && _teorealEditItem['is_new']) {
            _teorealDataList.remove("id", _teorealEditItem.id);
        }
    }

    run_view.teoreal_newdataset = function () {
        $('#txtDetailReal').val('');
        run_view.teoreal_show_edit_dlg();
    }


    var teoreal_add_data_from_teoCtrl = function () {
        // populate the list data parsing the string control 
        var detail_real_str = $('#txtDetailReal').val();
        var detail_real_arr = detail_real_str.split(',');
        var ct = conv_tempi();
        var res = ct.confronta_tabella('00:06:00', detail_real_arr);
        var id = _teoreal_initial_id, i, item;
        if (check_result(ct) && res.length > 0) {
            // remove the first default item
            _teorealDataList.remove("id", 1);
            for (i = 0; i < res.length; i++) {
                item = res[i];
                _teorealDataList.add({ id: id, dist: item.step, tempo: format_pad_time(item.time_eff) });
                id = id + 1;
            }
        }
    }

    var teoreal_dlg_refresh_cb = function () {
        var removeBtns = $('.remove-item-btn');
        var editBtns = $('.edit-item-btn');

        removeBtns = $(removeBtns.selector);
        removeBtns.click(function () {
            var itemId = $(this).closest('tr').find('.id').text();
            _teorealDataList.remove('id', itemId);
        });

        editBtns = $(editBtns.selector);
        editBtns.click(function () {
            var itemId = $(this).closest('tr').find('.id').text();
            var itemValues = _teorealDataList.get('id', itemId).values();
            _teorealEditItem = itemValues;
            teoreal_open_dialog_edititem(itemValues);

        });

        $(".edit-item-btn").button({
            text: false,
            icons: {
                primary: "ui-icon-pencil"
            }
        });
        $(".remove-item-btn").button({
            text: false,
            icons: {
                primary: "ui-icon-trash"
            }
        });
    }

    var teoreal_open_dialog_edititem = function (itemValues) {
        $('#dlg_effitem_km').val(itemValues.dist);
        $('#dlg_effitem_tempo').val(itemValues.tempo);
        $("#dialog-form-edit-eff").dialog("open");
    }
    // region teoreal toolbar END

    // Writes the list content into the txtDetailReal
    run_view.tabeff_in_ctrl = function () {
        var i, item, arr_res = [];

        for (i = 0; i < _teorealDataList.size() ; i++) {
            item = _teorealDataList.items[i];
            arr_res.push(item.values().dist + ";" + item.values().tempo);
        }
        $('#txtDetailReal').val(arr_res.join(','));
    }

    // Update list edited item changed using the dialogbox
    run_view.tabeff_item_edit = function () {
        var item = _teorealDataList.get('id', _teorealEditItem.id);
        item.values({
            id: _teorealEditItem.id,
            dist: $('#dlg_effitem_km').val(),
            tempo: $('#dlg_effitem_tempo').val()
        });

        teoreal_dlg_refresh_cb();
    }

    run_view.somma_tempi = function () {
        var t1 = $('#txtVelMmSs4').val();
        var t2 = $('#txtVelMmSs5').val();
        $('#result').empty();
        writeln_inresult('<p>' + run_view.getTranslMessage('msg___somma_di_') + t1 + run_view.getTranslMessage('msg___e_') + t2);
        var ct = conv_tempi();
        var res = ct.somma_tempi(t1, t2);
        if (check_result(ct)) {
            var str_time = make_sec_form_withh(res.sec_tot);
            writeln_inresult('<strong>' + str_time + '</strong> ');
            _defaults.partial_sum = str_time;
            $('#btRisSumInT1').button({ disabled: false });
        }
    }

    run_view.sottr_tempi = function () {
        var t1 = $('#txtVelMmSs4').val();
        var t2 = $('#txtVelMmSs5').val();
        $('#result').empty();
        writeln_inresult('<p>' + run_view.getTranslMessage('msg___sottrazion') + t1 + ' - ' + t2);
        var ct = conv_tempi();
        var res = ct.sottrae_tempi(t1, t2);
        if (check_result(ct)) {
            var str_time = make_sec_form_withh(res.sec_tot);
            writeln_inresult('<strong>' + str_time + '</strong> ');
            _defaults.partial_sum = str_time;
            $('#btRisSumInT1').button({ disabled: false });
        }
    }

    run_view.partial_sum_in_t1 = function () {
        if (_defaults.partial_sum.length > 0) {
            $('#txtVelMmSs4').val(_defaults.partial_sum);
        }
    }

    run_view.clear_result = function () {
        $('#result').empty();
        _defaults.partial_sum = '';
        $('#btRisSumInT1').button({ disabled: true });
    }

    run_view.set_deafult_values_inctrl = function () {
        $('#txtDist1').val(_defaults.distance);
        $('#txtDist2').val(_defaults.distance);
        $('#txtDist3').val(_defaults.distance);
        $('#txtDist4').val(_defaults.distance);
        $('#txtDist5').val(_defaults.distance);

        $('#txtTime1').val(_defaults.time);

        $('#txtVelMmSs1').val(_defaults.time_mmss);
        $('#txtVelMmSs2').val(_defaults.time_mmss);
        $('#txtVelMmSs3').val(_defaults.time_mmss);
        $('#txtTime2').val(_defaults.time_hm);

        $('#txtVel').val(_defaults.velocity);
        $('#txtStep').val(_defaults.distance_step);
        $('#txtrangevel').val(_defaults.rangevel);

        $('#txtDetailReal').val(_defaults.detail_real);

    }

    run_view.set_result_to = function (labelDest) {
        var element = $('#result').detach();
        var dst_selector_lbl = '#' + labelDest;
        $(dst_selector_lbl).append(element);
    }

    var _defaults = {
        distance: "10.0", time: "00:48:20", rangevel: '10,11,12,13,14,15', time_hm: "01:45:40",
        velocity: 10.2, time_mmss: "05:00", distance_step: 5.0, max_puls: 197,
        dist_eq: 'HM', dist_goal: 'MT',
        detail_real: '5; 0:24:11, 10; 0:48:22, 15; 01:12:42, 20;01:37:20,  21.1;1:42:46, 26.1;2:07:12, 31.1;02:31:11, 36.1;02:56:30, 41.1;03:26:11, 42.2; 3:33:07',
        partial_sum: ''
    }

    run_view.set_distance = function (dist) {
        _defaults.distance = dist;
        run_view.set_deafult_values_inctrl();

    }

    run_view.getTranslMessage = function (label, msg_default) {
        if (chrome.i18n !== undefined) {
            var message = chrome.i18n.getMessage(label);
            console.log("Message i18: ", message);
            return message;
        }
        return msg_default;
    }

    // funzioni private
    var check_result = function (ct) {
        if (ct.error_info().is_error) {
            writeln_inresult('<p>' + run_view.getTranslMessage('msg__errore_nel_') + ct.error_info().msg);
            return false;
        }
        return true;
    }

    var minuti_corsi = function (vel_kmh, km) {
        var min_part = 1.0 / vel_kmh * km * 60.0,
            mm_formatted = make_min_form_withh(min_part);
        writeln_inresult('<p>' + '<strong>' + mm_formatted + '</strong> (mm:ss)<br/>');
    }

    // restitisce qualcosa di simile a "01:00:02" da 3602. sec deve essere positivo.
    var make_sec_form_withh = function (sec) {
        sec = Math.abs(sec);
        var hh = sec / 3600, mm_formatted = "";
        var mm, ss;

        hh = Math.floor(hh);
        mm = (sec - (hh * 3600)) / 60;
        mm = Math.floor(mm);
        ss = sec - (hh * 3600 + mm * 60);

        if (hh >= 1) {
            mm_formatted = sprintf("%02d:%02d:%02d", hh, mm, ss);
        }
        else {
            mm_formatted = sprintf("%02d:%02d", mm, ss);
        }


        return mm_formatted;
    }

    // fornisce una stringa per il tempo in formato "00:00:00", partendo da stringhe come "2:5", "3:22:2"
    var format_pad_time = function (time_str) {
        var hh = 0, mm = 0, ss = 0;
        var arr = time_str.split(':');
        if (arr.length === 2) {
            mm = parseInt(arr[0], 10);
            ss = parseInt(arr[1], 10);
        }
        else if (arr.length === 3) {
            hh = parseInt(arr[0], 10);
            mm = parseInt(arr[1], 10);
            ss = parseInt(arr[2], 10);
        }
        res = sprintf("%02d:%02d:%02d", hh, mm, ss);
        return res;
    }

    var make_min_form_withh = function (min_part) {
        var hh = min_part / 60, mm_formatted = "";

        if (hh >= 1) {
            min_part = min_part % 60;
        }
        mm_formatted = make_min_form(min_part);

        if (hh >= 1) {
            mm_formatted = "" + Math.floor(hh) + ":" + mm_formatted;
        }
        return mm_formatted;
    }

    var mostra_vel_kmminuto = function (range_vel) {
        var time_arr = [], i, vel, min_part, mm_formatted;
        for (i = 0; i < range_vel.length; i++) {
            vel = range_vel[i];
            min_part = 1000 / (vel / 3.6) / 60;
            mm_formatted = make_min_form(min_part);
            time_arr.push({ vel_km: vel, time_part: min_part, mmss: mm_formatted });
        }
        show_table(time_arr);
    }

    // Produce qualcosa di simile: 4:08 partendo da 4,10
    var make_min_form = function (min_part) {
        var min_only, sec_perc, sec_only, mm_formatted;
        min_only = Math.floor(min_part);
        sec_perc = min_part - min_only;
        sec_only = 60 * sec_perc;
        if (sec_only > 59.5) {
            min_only += 1;
            sec_only = 0;
        }
        mm_formatted = pad_to_col(min_only, "0", 2) + ':' + pad_to_col(Math.round(sec_only), "0", 2);
        return mm_formatted;
    }

    var pad_to_col = function (str, pad, width) {
        var str_res = "" + str;
        while (str_res.length < width) {
            str_res = pad + str_res
        }
        return str_res.slice(0, width);
    }

    var show_table = function (time_arr) {
        var linehtml = "<table cellpadding=\"5\" cellspacing=\"5\">";
        linehtml = linehtml.concat("<th>Km/h</th><th>mm:ss</th>");
        for (var i = 0; i < time_arr.length; i++) {
            var line = time_arr[i], col1, col3;
            col1 = make_fix_col(line.vel_km, 6);
            col3 = make_fix_col(line.mmss, 9);
            linehtml = linehtml.concat("<tr><td>" + col1 + "</td><td>" + col3 + "</td></tr>");
        }
        linehtml = linehtml.concat("</table>");
        writeln_inresult(linehtml);
    }

    var show_table_deltas = function (deltas_arr) {
        var linehtml = "<table id=\"tbResTeoReal\" cellpadding=\"3\" cellspacing=\"3\">";
        linehtml = linehtml.concat('<th>Km</th><th>' + run_view.getTranslMessage('msg__teorico') + '</th><th>' + run_view.getTranslMessage('msg__reale') + '</th><th>' + run_view.getTranslMessage('msg__delta') + '</th>');
        var i, line, col1, col2, col3, col4, color_style;
        for (i = 0; i < deltas_arr.length; i++) {
            line = deltas_arr[i];
            col1 = make_fix_col(line.step, 8);
            col2 = make_fix_col(make_sec_form_withh(line.time_teo), 8);
            col3 = make_fix_col(line.time_eff, 8);
            col4 = make_fix_col(make_sec_form_withh(line.delta), 8);
            color_style = line.delta_segn === 'neg' ? "Green" : "Red";
            linehtml = linehtml.concat('<tr><td>' + col1 + '</td><td>' + col2 + '</td><td>' + col3 + '</td><td style=\"color:' + color_style + ';\">' + col4 + '</td></tr>');
        }
        linehtml = linehtml.concat('</table>');
        writeln_inresult(linehtml);
    }

    var show_table_puls = function (puls_arr) {
        var linehtml = "<table cellpadding=\"2\" cellspacing=\"2\">", i;
        linehtml = linehtml.concat('<th>%</th><th>' + run_view.getTranslMessage('msg__pulsazioni') + '</th>');
        for (i = 0; i < puls_arr.length; i++) {
            var perc = puls_arr[i].perc,
                proz = puls_arr[i].proz;
            linehtml = linehtml.concat('<tr><td>' + perc + '</td><td>' + proz + '</td></tr>');
        }
        linehtml = linehtml.concat('</table>');
        writeln_inresult(linehtml);
    }

    var show_table_per_dist = function (arr_time_km) {
        var linehtml = "<table cellpadding=\"2\" cellspacing=\"2\">";
        linehtml = linehtml.concat("<th>Km</th><th>mm:ss</th>");
        var line, i, col1, col2;
        for (i = 0; i < arr_time_km.length; i++) {
            line = arr_time_km[i];
            col1 = make_fix_col(line.km, 6);
            col2 = make_fix_col(make_min_form_withh(line.min_par), 6);
            linehtml = linehtml.concat("<tr><td>" + col1 + "</td><td>" + col2 + "</td></tr>");
        }
        linehtml = linehtml.concat("</table>");
        writeln_inresult(linehtml);
    }

    var make_fix_col = function (str, len) {
        var str_res = "" + str;
        if (str_res.length > len) {
            str_res = str_res.slice(0, len);
        }
        else {
            while (str_res.length <= len) {
                str_res += " ";
            }
        }

        return str_res
    }

    var writeln_inresult = function (linehtml) {
        $('#result').append(linehtml);
    }
})();