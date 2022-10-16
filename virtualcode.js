fs = require('fs');
var readlineSync = require('readline-sync');
let arg = process.argv;
var memorial = new Array()
let text = fs.readFileSync('factorial.jss').toString();
memorial = text.split(/[ ,\n]/);

for (let i = 0; i < memorial.length; i++) {
    console.log(i, memorial[i]);
}

var nedeedvariables = new Array();
var keysOFcode = new Array();

let ip = 0;
let flag = true;
let ifFlag = false;
while (flag) {
    
    if (ifFlag && memorial[ip] != 'fiED\r') {
        ip += 1;
        continue
    }

    switch (memorial[ip]) {
        
        case 'jsin':
            nedeedvariables[memorial[ip + 1].substring(0, memorial[ip + 1].length - 1)] = parseFloat(readlineSync.question('\n Print input:\n'));
            ip += 2;
            break;

        case 'set':
            nedeedvariables[memorial[ip + 1]] = parseFloat(memorial[ip + 2]);
            ip += 3;
            break;

        case 'jsout':
            console.log(nedeedvariables[memorial[ip + 1].substring(0, memorial[ip + 1].length - 1)]);
            ip += 2;
            break;

        case 'add':
            if (memorial[ip + 1].startsWith('$')) {
                if (memorial[ip + 2].startsWith('$')) {
                    nedeedvariables[memorial[ip + 3].substring(0, memorial[ip + 3].length - 1)] = nedeedvariables[memorial[ip + 1]] + nedeedvariables[memorial[ip + 2]];
                } else {
                    nedeedvariables[memorial[ip + 3].substring(0, memorial[ip + 3].length - 1)] = nedeedvariables[memorial[ip + 1]] + parseFloat(memorial[ip + 2]);
                }
            } else {
                if (memorial[ip + 2].startsWith('$')) {
                    nedeedvariables[memorial[ip + 3].substring(0, memorial[ip + 3].length - 1)] = parseFloat(memorial[ip + 1]) + nedeedvariables[memorial[ip + 2]];
                } else {
                    nedeedvariables[memorial[ip + 3].substring(0, memorial[ip + 3].length - 1)] = parseFloat(memorial[ip + 1]) + parseFloat(memorial[ip + 2]);
                }
            }
            ip += 4;
            break;

        case 'multiplus':
            if (memorial[ip + 1].startsWith('$')) {
                if (memorial[ip + 2].startsWith('$')) {
                    nedeedvariables[memorial[ip + 3].substring(0, memorial[ip + 3].length - 1)] = nedeedvariables[memorial[ip + 1]] * nedeedvariables[memorial[ip + 2]];
                } else {
                    nedeedvariables[memorial[ip + 3].substring(0, memorial[ip + 3].length - 1)] = nedeedvariables[memorial[ip + 1]] * memorial[ip + 2];
                }
            } else {
                if (memorial[ip + 2].startsWith('$')) {
                    nedeedvariables[memorial[ip + 3].substring(0, memorial[ip + 3].length - 1)] = memorial[ip + 1] * nedeedvariables[memorial[ip + 2]];
                } else {
                    nedeedvariables[memorial[ip + 3].substring(0, memorial[ip + 3].length - 1)] = memorial[ip + 1] * memorial[ip + 2];
                }
            }
            ip += 4
            break

        case 'IfEqual':
            ifFlag = nedeedvariables[memorial[ip + 1]] == nedeedvariables[memorial[ip + 2].substring(0, memorial[ip + 2].length - 1)];
            ip += 3;
            break;

        case 'fiED\r':
            ifFlag = false;
            ip += 1;
            break;

        case 'key':
            keysOFcode[memorial[ip + 1]] = ip + 2;
            ip += 2;
            break;

        case 'goONto':
            ip = keysOFcode[memorial[ip + 1]]
            break;
    
        case 'exit':
            flag = false;
    }
}