var conv_tempi = function () {
    var that = {};
    var has_errors = false;
    var error_msg = "";

    //time_str: formato"hh:mm:ss" qualcosa come "1:30:2" oppure "30:02" senza le ore
    var check_time_format = function (time_str) {
        var res_arr = time_str.split(':'), hhi, mmi, ssi;
        if (res_arr.length === 3) {
            hhi = parseInt(res_arr[0], 10);
            mmi = parseInt(res_arr[1], 10);
            ssi = parseInt(res_arr[2], 10);
            if (hhi > 1000 || mmi > 59 || ssi > 59) {
                has_errors = true;
                error_msg = "Ore, minuti o secondi non sono in range (" + res_arr.join(',') + ")";
                return undefined;
            }
            return { hh: hhi, mm: mmi, ss: ssi };
        }
        else if (res_arr.length === 2) {
            hhi = 0;
            mmi = parseInt(res_arr[0], 10);
            ssi = parseInt(res_arr[1], 10);
            if (mmi > 59 || ssi > 59) {
                has_errors = true;
                error_msg = "minuti o secondi non sono in range (" + res_arr.join(',') + ")";
                return undefined;
            }
            return { hh: hhi, mm: mmi, ss: ssi };
        }
        has_errors = true;
        error_msg = "Formato del tempo non corretto per '" + time_str + "'";
        return undefined;
    }

    //Mostra la velocita media da tenere per percorrere distkm nel tempo time_str
    //distkm: distanza in km
    //time_str: formato"hh:mm:ss" qualcosa come "1:30:2"
    that.vel_media_per_dist = function (distkm_str, time_str) {
        var time_arr = check_time_format(time_str);
        if (time_arr === undefined) {
            return;
        }
        var distkm = parseFloat(distkm_str);
        var mm_dec = time_arr.mm / 60.0;
        var ss_dec = time_arr.ss / 3600.0;
        var htot = time_arr.hh + mm_dec + ss_dec;
        var vel_med = distkm / htot;

        return { velmedia: vel_med };
    }

    that.freq_puls_table = function (puls_max) {
        var res = [], i;
        var arr_proc = [60, 70, 75, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
        for (i = 0; i < arr_proc.length; i++) {
            res.push({ perc: arr_proc[i], proz: Math.round(puls_max * (arr_proc[i] / 100.0)) });
        }


        return res;
    }

    that.error_info = function () {
        return { is_error: has_errors, msg: error_msg };
    }

    that.tempo_finale = function (distkm_str, vel_km_min_str) {
        var time_arr = check_time_format(vel_km_min_str);
        if (time_arr === undefined) {
            return;
        }
        var distkm = parseFloat(distkm_str), mm_dec, ss_dec, htot, vel_med_in_kmh;
        mm_dec = time_arr.mm / 60.0;
        ss_dec = time_arr.ss / 3600.0;
        htot = mm_dec + ss_dec;
        vel_med_in_kmh = 1 / htot;

        return { velmed_in_kmh: vel_med_in_kmh, dist_km: distkm }
    }

    // range_vel: qualcosa come [10.3, 12.5,...] un array di velocità in km/h in float
    that.process_range_vel = function (range_vel) {
        var time_arr = [], min_part, i, vel;
        for (i = 0; i < range_vel.length; i++) {
            vel = range_vel[i];
            min_part = 1000 / (vel / 3.6) / 60;
            time_arr.push({ vel_km: vel, time_part: min_part });
        }
        return time_arr;
    }

    that.somma_tempi = function (t1, t2) {
        var t1_arr = check_time_format(t1);
        var t2_arr = check_time_format(t2);
        if (t1_arr === undefined || t2_arr === undefined) {
            return;
        }
        var min_rip = 0, h_rip = 0;
        var stot = t1_arr.ss + t2_arr.ss;
        if (stot >= 60) {
            stot = stot - 60;
            min_rip = 1;
        }
        var mtot = t1_arr.mm + t2_arr.mm + min_rip;
        if (mtot >= 60) {
            mtot = mtot - 60;
            h_rip = 1;
        }
        var htot = t1_arr.hh + t2_arr.hh + h_rip;
        return { sec_tot: htot * 3600 + mtot * 60 + stot,
            hh_sum: htot, mm_sum: mtot, ss_sum: stot
        };
    }

    // sottrazione tempi t1 - t2
    that.sottrae_tempi = function (t1, t2) {
        var t1_arr = check_time_format(t1);
        var t2_arr = check_time_format(t2);
        if (t1_arr === undefined || t2_arr === undefined) {
            return;
        }
        var min_rip = 0, h_rip = 0;
        var stot = t1_arr.ss - t2_arr.ss;
        if (stot < 0) {
            stot = 60 - Math.abs(stot);
            min_rip = 1;
        }
        var mtot = t1_arr.mm - min_rip - t2_arr.mm;
        if (mtot < 0) {
            mtot = 60 - Math.abs(mtot);
            h_rip = 1;
        }
        var htot = t1_arr.hh - h_rip - t2_arr.hh;
        return { sec_tot: htot * 3600 + mtot * 60 + stot,
            hh_sum: htot, mm_sum: mtot, ss_sum: stot
        };
    }

    var parse_veloc_km_almin = function (vel_km_min_str) {
        var time_frm = check_time_format(vel_km_min_str), mm, ss, mm_dec, ss_dec, htot, vel_med_in_kmh;
        if (time_frm === undefined) {
            return undefined;
        }
        if (time_frm.hh > 0) {
            has_errors = true;
            error_msg = 'Errore nel formato ' + vel_km_min_str + ', aspetto una stringa come mm:ss';
            return undefined;
        }
        mm = time_frm.mm;
        ss = time_frm.ss;
        mm_dec = mm / 60.0;
        ss_dec = ss / 3600.0;
        htot = mm_dec + ss_dec;
        vel_med_in_kmh = 1 / htot;
        return vel_med_in_kmh;
    }

    var calc_range_min = function (vel_med_in_kmh, range) {
        var min_part = 1.0 / vel_med_in_kmh * range * 60.0; // qualcosa come 4,3 min ma noi interessa tipo 4min 20sec
        var hh_in_form = 0, mm_in_form = 0, ss_in_form = 0, sec_tot = 0, sec_perc;
        var min_part_initial = min_part;
        var hh = min_part / 60;
        if (hh > 0) {
            min_part = min_part % 60;
        }
        hh_in_form = Math.floor(hh);
        mm_in_form = Math.floor(min_part);
        sec_perc = min_part - mm_in_form;
        ss_in_form = 60 * sec_perc;
        if (ss_in_form > 59.5) {
            mm_in_form += 1;
            ss_in_form = 0;
        }
        ss_in_form = Math.round(ss_in_form);

        sec_tot = hh_in_form * 3600 + mm_in_form * 60 + ss_in_form;
        return { km: range, sec_tot: sec_tot, hh: hh_in_form,
            mm: mm_in_form, ss: ss_in_form, min_par: min_part_initial
        }
    }

    that.tabella_per_dist = function (distkm, vel_km_min_str, step_km) {
        var vel_med_in_kmh = parse_veloc_km_almin(vel_km_min_str);
        if (vel_med_in_kmh === undefined) {
            return [];
        }
        var arr_time_km = [], range_hm = 21.1, last_range = 0.0, i, range;
        for (i = step_km; i < distkm; i += step_km) {
            range = i;
            if (last_range < range_hm && range > range_hm) {
                arr_time_km.push(calc_range_min(vel_med_in_kmh, range_hm));
            }
            last_range = range;
            arr_time_km.push(calc_range_min(vel_med_in_kmh, range));
        }

        if (last_range < range_hm && distkm > range_hm) {
            arr_time_km.push(calc_range_min(vel_med_in_kmh, range_hm));
        }
        last_range = distkm;
        arr_time_km.push(calc_range_min(vel_med_in_kmh, distkm));

        return arr_time_km;
    }

    that.equilval_tempi = function (dist_org, temp_org_str, dist_goal) {
        var eq_tabl = { '1km': 0.6215, '2km': 1.243, '3km': 1.8645, '5km': 3.107,
            '10km': 6.215, 'HM': 13.109, 'MT': 26.219, '50km': 31.07
        };
        var time_arr = check_time_format(temp_org_str);
        if (time_arr === undefined) {
            return;
        }
        var fac1, fac2, time_goal_insec;
        var time_org_insec = time_arr.ss + 60 * time_arr.mm + 3600 * time_arr.hh;
        var index_org = eq_tabl[dist_org];
        var index_dest = eq_tabl[dist_goal];
        if (index_org == undefined || index_dest == undefined) {
            error_msg = "Errore formato equivalenza distanze non riconosciuto";
            has_errors = true;
            return undefined;
        }

        fac1 = 3600 / (13.5 - (0.049 * index_org) + 2.44 / Math.pow(index_org, 0.79)) * index_org;
        fac2 = 3600 / (13.5 - (0.049 * index_dest) + 2.44 / Math.pow(index_dest, 0.79)) * index_dest;
        time_goal_insec = (time_org_insec / fac1) * fac2;


        return time_goal_insec;

    }

    that.confronta_tabella = function (vel_km_min_str, arr_steps) {
        var vel_med_in_kmh = parse_veloc_km_almin(vel_km_min_str);
        var deltas_arr = [], i, step_time_str, step_km, sec_totali, time_eff;
        var step_time_res_parse, delta_segn, delta_sec, info_teo_step, info_line;


        for (i = 0; i < arr_steps.length; i++) {
            step_time_str = arr_steps[i];
            if (step_time_str === '') {
                continue;
            }
            step_time_res_parse = parse_step_time_str(step_time_str);
            if (step_time_res_parse == undefined) {
                return;
            }
            step_km = step_time_res_parse.step_km;
            sec_totali = step_time_res_parse.sec_totali;
            time_eff = step_time_res_parse.time_eff;
            info_teo_step = calc_range_min(vel_med_in_kmh, step_km);
            delta_sec = info_teo_step.sec_tot - sec_totali;
            delta_segn = delta_sec < 0 ? 'pos' : 'neg';
            info_line = { step: step_km, time_teo: info_teo_step.sec_tot, time_eff: time_eff, delta: delta_sec, delta_segn: delta_segn };
            deltas_arr.push(info_line);
        }
        deltas_arr = deltas_arr.sort(function (a, b) {
            if (a.step > b.step) {
                return 1;
            }
            else if (a.step < b.step) {
                return -1;
            }
            else {
                return 0;
            }
        });
        return deltas_arr;

    }

    // fornisce km e secondi totali da una stringa tipo "5;0:30:16"
    // in questo caso 5km, 1816 sec, "0:30:16"
    var parse_step_time_str = function (step_time_str) {
        var items = step_time_str.split(";");
        if (items.length != 2) {
            return build_error("Errore nel formato di " + step_time_str + ", il separatore ;  va messo tra il km e il tempo");
        }
        var km_str = items[0];
        var tempo_str = items[1];
        var time_det_arr = tempo_str.split(":");
        if (time_det_arr.length != 3) {
            return build_error("Errore nel formato di " + step_time_str + ", il tempo " + tempo_str + " va messo in formato hh:mm:ss");
        }
        var step_km = parseFloat(km_str);
        var hh = parseInt(time_det_arr[0], 10);
        var mm = parseInt(time_det_arr[1], 10);
        var ss = parseInt(time_det_arr[2], 10);
        var sec_tot = ss + mm * 60 + hh * 3600;

        return { step_km: step_km, sec_totali: sec_tot, time_eff: tempo_str };
    }

    var build_error = function (msg) {
        has_errors = true;
        error_msg = msg;
        return undefined;
    }

    return that;
}




