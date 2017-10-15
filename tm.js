tape = [];
tm = new TM();

const_1 = "伊";
const_0 = "勢";

function TM () {
    this.state = 1;
    this.pos = 0;
    this.move = function(tape) {
        var ret = new TM();
        ret.pos = this.next_pos(this.state, tape[this.pos], this.pos);
        ret.state = this.next_state(this.state, tape[this.pos]);
        return ret;
    }

    this.write = function(tape) {
        var ret = tape.concat();
        ret[this.pos] = this.next_number(this.state, tape[this.pos]);
        return ret;
    }

    this.execute = function(tape) {
        return { TM: this.move(tape), tape: this.write(tape) };
    }

    this.next_state = function(state, num) {
        var ret;
        switch (state) {
        case 1:
            if (num == const_1)
                ret = 2;
            else
                ret = 1;
            break;
        case 2:
            if (num == const_1)
                ret = 2;
            else
                ret = 3;
            break;
        case 3:
            if (num == const_1)
                ret = 3;
            else
                ret = 4;
            break;
        case 4:
            if (num == const_1)
                ret = 4;
            else
                ret = 0;
            break;
        default:
            ret = state;
        }
        return ret;
    }

    this.next_pos = function(state, num, pos) {
        var ret = pos;
        switch (state) {
        case 1:
            ret++;
            break;
        case 2:
            if (num == const_1) ret++;
            break;
        case 3:
            if (num == const_1)
                ret++;
            else
                ret--;
            break;
        default:
            ret = pos;
        }
        return ret;
    }

    this.next_number = function(state, num) {
        var ret = num;
        switch (state) {
        case 2:
            if (num != const_1)
                ret = const_1;
            break;
        case 4:
            if (num == const_1)
                ret = const_0;
            break;
        default:
            ret = num;
        }
        return ret;
    }
}

function write_tape(arr) {
    for (var i = 0; i < 19; i++) {
        var tape = document.getElementById("tape"+i);
        if (arr[i] == undefined) {
            tape.innerHTML = "";
        } else if (arr[i] == const_1) {
            tape.setAttribute("style", "color: red;");
            tape.innerHTML = arr[i];
        } else {
            tape.setAttribute("style", "color: black;");
            tape.innerHTML = arr[i];
        }
    }
}

function write_head(tm) {
    for (var i = 0; i < 19; i++) {
        var tape = document.getElementById("head"+i);
//        type.setAttribute("style", "background-color: white;");
        tape.innerHTML = "";
    }
    var i = tm.pos;
    var tape = document.getElementById("head"+i);
//    type.setAttribute("style", "background-color: yellow;");
    tape.innerHTML = "HEAD";
}

function write_tm_info(tm) {
    var naibu = document.getElementById("naibu");
    naibu.innerHTML = "内部状態: "+tm.state;
    var position = document.getElementById("position");
    position.innerHTML = "HEAD位置: "+tm.pos;
}

function OnProgram() {
    tape = document.getElementById("program").value.split("");
    write_tape(tape);
}

function OnButtonClick() {
    var exec = tm.execute(tape);
    tape = exec.tape;
    tm = exec.TM;
    write_tape(tape);
    write_head(tm);
    write_tm_info(tm);
}

window.onload = function() {
    tape = "勢伊伊伊勢伊伊伊勢".split("");
    tm.execute(tape);
    write_tape(tape);
    write_head(tm);
    write_tm_info(tm);
}
