var number1, namber2;
const sad = new Audio();
sad.src = "sound/sad.mp3";
sad.volume = 0.3;
const exited = new Audio();
exited.src = "sound/exited.mp3";
exited.volume = 0.1;
$(document).ready(function() {
    $('#button').click(function() {
        $('body').toggleClass('day');
        if ($('#button').text() === 'day') {
            sad.play();
            $('#button').text('night');
        } else {
            exited.play();
            $('#button').text('day');
        }
    });
});
const rules = new Audio();
rules.src = "sound/rules.mp3";
rules.volume = 0.1;
window['rulesWnd'].style.display = 'none';
$(document).ready(function() {
    $('#rules').click(function() {
        rules.play();
        $('.buttons').siblings(".rulesWnd").toggle();
    });
});

const dice = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
}

const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const dices = ["img/dice-six-faces-one.png", "img/dice-six-faces-two.png",
    "img/dice-six-faces-three.png", "img/dice-six-faces-four.png",
    "img/dice-six-faces-five.png", "img/dice-six-faces-six.png"
];

var match = false;
const diceSound = new Audio();
diceSound.src = "sound/dice.mp3";
const roll = () => {
    diceSound.play();
    number1 = dice();
    number2 = dice();
    if (number1 === number2) match = true;
    else match = false;
    dice1.style.backgroundImage = 'url("' + dices[number1 - 1] + '")';
    dice2.style.backgroundImage = 'url("' + dices[number2 - 1] + '")';
    return number1 + number2;
};

const timer = function(left) {
    let downloadTimer = setInterval(function() {
        left--;
        window['timer'].textContent = left;
        if (left <= 0)
            clearInterval(downloadTimer);
    }, 1000);
}


function Field() {
    this.field = document.getElementsByClassName('plot');
    this.playersAmount = 0;
    this.maxPlayersAmount = 5;
    this.currentPlayer = null;
    this.players = new Array(0);
    this.allCards = Array.from(document.getElementsByClassName('card'));
    this.canBuy = Array.from(document.getElementsByClassName('card'));
};

Field.prototype.addPlayerN = function(nickname) {
    if (++this.playersAmount <= this.maxPlayersAmount) {
        let playerInfo = document.createElement('div');
        playerInfo.className = 'playerInfo';
        playerInfo.classList.add('playerInfo_' + this.playersAmount);
        playerInfo.innerHTML = `\<span class="nickname"\>${nickname}\</span\>\<div class="avatar"\></div\>\<div class="capital"\>$\<span class="amount"\>1500\</span\>K`;
        let player = document.createElement('div');
        player.className = 'player';
        player.classList.add('player_' + this.playersAmount);
        player.id = 'player_' + this.playersAmount;
        player.style.bottom = '-115px';
        let div = window['start'];
        if (this.playersAmount > 1 && this.playersAmount <= 3) {
            let prevTop = document.getElementsByClassName('player')[this.playersAmount - 2].style.bottom;
            let bottom = Number(prevTop.substring(0, prevTop.length - 2)) + 30;
            player.style.bottom = bottom + 'px';
            player.style.left = div.getBoundingClientRect().left + pageXOffset;
        } else if (this.playersAmount === 4) {
            player.style.top = div.getBoundingClientRect().top + pageXOffset - 80 + 'px';
            player.style.left = div.getBoundingClientRect().left + pageXOffset - 365 + 'px';
        } else if (this.playersAmount === 5) {
            player.style.top = div.getBoundingClientRect().top + pageXOffset - 50 + 'px';
            player.style.left = div.getBoundingClientRect().left + pageXOffset - 365 + 'px';
        }

        div.appendChild(player);
        window['playersInfo'].appendChild(playerInfo);
        this.players.push(new Player(nickname))
    } else console.log('Максимальное количество игроков на поле!');
};
Field.prototype.addPlayer = function() {
    if (++this.playersAmount <= this.maxPlayersAmount) {
        let playerInfo = document.createElement('div');
        playerInfo.className = 'playerInfo';
        playerInfo.classList.add('playerInfo_' + this.playersAmount);
        playerInfo.innerHTML = `\<span class="nickname"\>Player_${this.playersAmount}\</span\>\<div class="avatar"\></div\>\<div class="capital"\>$\<span class="amount"\>1500\</span\>K`;
        let player = document.createElement('div');
        player.className = 'player';
        player.classList.add('player_' + this.playersAmount);
        player.id = 'player_' + this.playersAmount;
        player.style.bottom = '-115px';
        let div = window['start'];
        if (this.playersAmount > 1 && this.playersAmount <= 3) {
            let prevTop = document.getElementsByClassName('player')[this.playersAmount - 2].style.bottom;
            let bottom = Number(prevTop.substring(0, prevTop.length - 2)) + 30;
            player.style.bottom = bottom + 'px';
            player.style.left = div.getBoundingClientRect().left + pageXOffset;
        } else if (this.playersAmount === 4) {
            player.style.top = div.getBoundingClientRect().top + pageXOffset - 80 + 'px';
            player.style.left = div.getBoundingClientRect().left + pageXOffset - 365 + 'px';
        } else if (this.playersAmount === 5) {
            player.style.top = div.getBoundingClientRect().top + pageXOffset - 50 + 'px';
            player.style.left = div.getBoundingClientRect().left + pageXOffset - 365 + 'px';
        }
        window['start'].appendChild(player);
        window['playersInfo'].appendChild(playerInfo);
        this.players.push(new Player(`Player_${this.playersAmount}`))
    } else console.log('Максимальное количество игроков на поле!');
};

function Player(nickname) {
    this.nickname = nickname;
    this.playerNumber = findPInfByNick(nickname);
    this.playerInfo = document.getElementsByClassName('playerInfo')[this.playerNumber - 1];
    this.player = document.getElementsByClassName('player')[this.playerNumber - 1];
    this.money = this.getMoney();
    this.turn = false;
    this.rollCount = 1;
    this.owned = new Array(0);
    this.inJail = false;
    this.div = this.player.parentElement;
    this.timesInJail = 0;
    this.darkBlue = new Array(2);
    this.gray = new Array(3);
    this.purple = new Array(3);
    this.orange = new Array(3);
    this.red = new Array(3);
    this.yellow = new Array(3);
    this.green = new Array(3);
    this.blue = new Array(2);
    this.railroad = new Array(4);
    this.x100 = new Array(2);
    this.monopolyCount = 0;
};
const findPInfByNick = (nickname) => {
    let players = document.getElementsByClassName('nickname');
    let i = 0;
    for (i = 0; i < players.length; i++) {
        if (players[i].textContent === nickname)
            return i + 1;
    }
    return null;
};
Player.prototype.getMoney = function() {
    let childElems = this.playerInfo.childNodes;
    let i = 0;
    for (i = 0; i < childElems.length; i++) {
        if (childElems[i].className === 'capital')
            return Number(childElems[i].childNodes[1].textContent);
    }
    return null;
};
Player.prototype.setMoney = function(money) {
    let childElems = this.playerInfo.childNodes;
    let i = 0;
    for (i = 0; i < childElems.length; i++) {
        if (childElems[i].className === 'capital')
            childElems[i].childNodes[1].textContent = money;
    }
};
const showField = () => {
    if (window['field'].style.display === 'none') {
        window['playersInfo'].style.display = 'flex';
        window['field'].style.display = 'block';
    } else {
        window['field'].style.display = 'none';
        window['playersInfo'].style.display = 'none';
    }
};
Player.prototype.move = function(sum) {
    let current = getIndex(field_.field, this.player.parentElement);
    let moveTo = current + sum;
    if (current + sum >= 40) {
        moveTo -= 40;
        this.money += 200;
        this.setMoney(this.money);
    }

    let top = field_.field[moveTo].getBoundingClientRect().top + pageYOffset;
    //let player_ = this.player;
    let playerCount = field_.field[moveTo].getElementsByClassName('player').length;
    if (field_.field[moveTo].classList.contains('vertical'))
        this.player.style.top = top - 120 + playerCount * 30 + 'px';
    else this.player.style.top = top - 120 + 'px';
    if (field_.field[moveTo].classList.contains('horizontal'))
        this.player.style.left = field_.field[moveTo].getBoundingClientRect().left - 390 + playerCount * 30 + pageXOffset + 'px';
    else this.player.style.left = field_.field[moveTo].getBoundingClientRect().left - 385 + pageXOffset + 'px';
    this.div = field_.field[moveTo];
    field_.field[current].removeChild(this.player);
    field_.field[moveTo].appendChild(this.player);
    if (contains(field_.allCards, this.div))
        if (!contains(field_.canBuy, this.div) && !contains(this.owned, this.div)) {
            let rent = Number(this.div.getElementsByClassName('amount')[0].textContent);
            console.log('rent' + rent)
            this.money -= rent;
            this.setMoney(this.money);
        }
    switch (moveTo) {
        case 4:
            this.money -= 200;
            this.setMoney(this.money);
            break;
        case 38:
            this.money -= 75;
            this.setMoney(this.money);
            break;
        case 2:
            chest(this);
            break;
        case 17:
            chest(this);
            break;
        case 33:
            chest(this);
            break;
        case 30:
            info(this.player, 'jail');
            let current_ = getIndex(field_.field, this.player.parentElement);
            pl = this.player;
            this.player.style.top = field_.field[10].getBoundingClientRect().top + pageYOffset - 120 + 'px';
            this.player.style.left = field_.field[10].getBoundingClientRect().left - 385 + pageXOffset + 'px';
            this.player.inJail = true;
            field_.field[current_].removeChild(this.player);
            field_.field[10].appendChild(this.player);
            break;
        case 7:
            chance(this);
            break;
        case 22:
            chance(this);
            break;
        case 36:
            chance(this);
            break;
    }
};
const chest = (_player) => {
    let chest = window['chestPrompt'];
    chest.style.display = 'block';
    switch (Math.floor(Math.random() * 11)) {
        case 0:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>XMAS FUND<br>MATURES<br>COLLECT $100'
            _player.money += 100;
            _player.setMoney(_player.money);
            break;
        case 1:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>FROM SALE OF<br>STOCK<br>YOU GET<br>$45'
            _player.money += 45;
            _player.setMoney(_player.money);
            break;
        case 2:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>BANK ERROR<br>IN YOUR FAVOUR<br>COLLECT $200'
            _player.money += 200;
            _player.setMoney(_player.money);
            break;
        case 3:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>PAY<br>HOSPITAL<br>$100'
            _player.money -= 100;
            _player.setMoney(_player.money);
            break;
        case 4:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>DOCTOR\'S FEE<br>PAY $50'
            _player.money -= 50;
            _player.setMoney(_player.money);
            break;
        case 5:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>PAY<br>SCHOOL TAX<br>OF $150'
            _player.money -= 150;
            _player.setMoney(_player.money);
            break;
        case 6:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>YOU HAVE WON<br>SECOND PRIZE<br>IN A <br>BEAUTY CONTEST<br>COLLECT $10'
            _player.money += 10;
            _player.setMoney(_player.money);
            break;
        case 7:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>INCOME TAX<br>REFUND<br>COLLECT $20'
            _player.money += 20;
            _player.setMoney(_player.money);
            break;
        case 8:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>LIFE<br>INSURANCE<br>MATURES<br>COLLECT $100'
            _player.money += 100;
            _player.setMoney(_player.money);
            break;
        case 9:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>ADVANCE TO GO<br>(COLLECT $200)'
            let current = getIndex(field_.field, _player.player.parentElement);
            _player.move(40 - current);
            break;
        case 10:
            chest.innerHTML = '<span class=\"chestTitle\">Community Chest<\/span><br>GO TO JAIL'
            let current_ = getIndex(field_.field, _player.player.parentElement);
            pl = _player.player;
            pl.style.top = field_.field[10].getBoundingClientRect().top + pageYOffset - 120 + 'px';
            pl.style.left = field_.field[10].getBoundingClientRect().left - 385 + pageXOffset + 'px';
            _player.inJail = true;
            field_.field[current_].removeChild(_player.player);
            field_.field[10].appendChild(pl);
            break;
    }
    setTimeout(function() {
        chest.style.display = 'none';
    }, 3000);
};
const chance = (_player) => {
    let chance = window['chancePrompt'];
    chance.style.display = 'block';
    let current = 0;
    switch (Math.floor(Math.random() * 7)) {
        case 0:
            chance.innerHTML = '<span class=\"chestTitle\">Chance<\/span><br>GO BACK<br>3 SPACES'
            _player.move(-3);
            break;
        case 1:
            chance.innerHTML = '<span class=\"chestTitle\">Chance<\/span><br>PAY<br>POOR TAX<br>OF $15'
            _player.money -= 15;
            _player.setMoney(_player.money);
            break;
        case 2:
            chance.innerHTML = '<span class=\"chestTitle\">Chance<\/span><br>ADVANCE TO<br>ILLINOIS AVE'
            current = getIndex(field_.field, _player.player.parentElement);
            if (current === 7) {
                _player.move(17);
            } else if (current === 15) {
                _player.move(2);
            } else _player.move(28);
            break;
        case 3:
            chance.innerHTML = '<span class=\"chestTitle\">Chance<\/span><br>YOUR BUILDING<br>AND LOAN MATURES<br>COLLECT $150'
            _player.money += 150;
            _player.setMoney(_player.money);
            break;
        case 4:
            chance.innerHTML = '<span class=\"chestTitle\">Chance<\/span><br>ADVANCE TO<br>ST.CHARLES PLACE<br>IF YOU PASS GO, COLLECT $200'
            current = getIndex(field_.field, _player.player.parentElement);
            if (current === 7) {
                _player.move(4);
            } else if (current === 15) {
                _player.move(29);
            } else _player.move(15);
            break;
        case 5:
            chance.innerHTML = '<span class=\"chestTitle\">Chance<\/span><br>ADVANCE TO GO<br>(COLLECT $200)'
            current = getIndex(field_.field, _player.player.parentElement);
            _player.move(40 - current);
            break;
        case 6:
            chance.innerHTML = '<span class=\"chestTitle\">Chance<\/span><br>GO TO JAIL'
            current_ = getIndex(field_.field, _player.player.parentElement);
            pl = _player.player;
            pl.style.top = field_.field[10].getBoundingClientRect().top + pageYOffset - 120 + 'px';
            pl.style.left = field_.field[10].getBoundingClientRect().left - 385 + pageXOffset + 'px';
            _player.inJail = true;
            field_.field[current_].removeChild(_player.player);
            field_.field[10].appendChild(pl);
            break;
    }
    setTimeout(function() {
        chance.style.display = 'none';
    }, 3000);
};
const info = (_player, reason) => {
    let info = document.getElementById('infoPrompt');
    info.style.display = 'block';
    switch (reason) {
        case 'jail':
            info.innerHTML = '<span class=\"promptTitle\">Info<\/span><br>GO TO JAIL';
            break;
        case 'free':
            info.innerHTML = '<span class=\"promptTitle\">Info<\/span><br>YOU ARE FREE';
            break;
        case 'monopoly':
            info.innerHTML = '<span class=\"promptTitle\">Info<\/span><br>YOU GOT MONOPOLY';
            break;
    }
    setTimeout(function() {
        info.style.display = 'none';
    }, 3000);
}
const getIndex = (arr, element) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === element)
            return i;
    }
    return null;
};
const contains = (arr, div) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === div)
            return true;
    }
    return false;
};

Player.prototype.buy = function() {
    if (contains(field_.canBuy, this.div)) {
        let cost = Number(this.div.getElementsByClassName('amount')[0].textContent);
        if (cost < this.money) {
            this.money -= cost;
            this.setMoney(this.money);
            this.owned.push(this.div);
            this.div.classList.add(this.nickname);
            let rent = 0;
            switch (this.div.classList[3]) {
                case 'darkBlue':
                    if (this.div.classList[4] === 'db1') rent = 2;
                    else rent = 4;
                    this.div.getElementsByClassName('price')[0].innerHTML = `RENT $<span class="amount">${rent}</span>`;
                    this.darkBlue.push(this.div);
                    this.darkBlue = this.darkBlue.slice(1);
                    if (this.darkBlue[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
                case 'gray':
                    if (this.div.classList[4] === 'g1' || this.div.classList[4] === 'g2') rent = 6;
                    else rent = 8;
                    this.div.getElementsByClassName('price')[0].innerHTML = `RENT $<span class="amount">${rent}</span>`;
                    this.gray.push(this.div);
                    this.gray = this.gray.slice(1);
                    if (this.gray[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
                case 'purple':
                    if (this.div.classList[4] === 'p1' || this.div.classList[4] === 'p2') rent = 10;
                    else rent = 12;
                    this.div.getElementsByClassName('price')[0].innerHTML = `RENT $<span class="amount">${rent}</span>`;
                    this.purple.push(this.div);
                    this.purple = this.purple.slice(1);
                    if (this.purple[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
                case 'orange':
                    if (this.div.classList[4] === 'o1' || this.div.classList[4] === 'o2') rent = 14;
                    else rent = 16;
                    this.div.getElementsByClassName('price')[0].innerHTML = `RENT $<span class="amount">${rent}</span>`;
                    this.orange.push(this.div);
                    this.orange = this.orange.slice(1);
                    if (this.orange[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
                case 'red':
                    if (this.div.classList[4] === 'r1' || this.div.classList[4] === 'r2') rent = 18;
                    else rent = 20;
                    this.div.getElementsByClassName('price')[0].innerHTML = `RENT $<span class="amount">${rent}</span>`;
                    this.red.push(this.div);
                    this.red = this.red.slice(1);
                    if (this.red[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
                case 'yellow':
                    if (this.div.classList[4] === 'y1' || this.div.classList[4] === 'y2') rent = 22;
                    else rent = 24;
                    this.div.getElementsByClassName('price')[0].innerHTML = `RENT $<span class="amount">${rent}</span>`;
                    this.yellow.push(this.div);
                    this.yellow = this.yellow.slice(1);
                    if (this.yellow[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
                case 'green':
                    if (this.div.classList[4] === 'gr1' || this.div.classList[4] === 'gr2') rent = 26;
                    else rent = 28;
                    this.div.getElementsByClassName('price')[0].innerHTML = `RENT $<span class="amount">${rent}</span>`;
                    this.green.push(this.div);
                    this.green = this.green.slice(1);
                    if (this.green[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
                case 'blue':
                    if (this.div.classList[4] === 'b1') rent = 35;
                    else rent = 50;
                    this.div.getElementsByClassName('price')[0].innerHTML = `RENT $<span class="amount">${rent}</span>`;
                    this.blue.push(this.div);
                    this.blue = this.blue.slice(1);
                    if (this.blue[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
                case 'railroad':
                    if (this.div.classList[4] === 'db1') rent = 2;
                    else rent = 4;
                    this.div.getElementsByClassName('price')[0].innerHTML = `RENT $<span class="amount">${rent}</span>`;
                    this.railroad.push(this.div);
                    this.railroad = this.railroad.slice(1);
                    if (this.railroad[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
                case 'x100':
                    this.x100.push(this.div);
                    this.x100 = this.x100.slice(1);
                    if (this.x100[0] != undefined) {
                        info(this, 'monopoly');
                        this.monopolyCount++;
                    }
                    break;
            }
            field_.canBuy = field_.canBuy.filter(e => e !== this.div);
            window['buy'].style.display = 'none';
        }
    }
};

Player.prototype.canBuyEl = function(div) {
    if (contains(field_.canBuy, div)) {
        let cost = Number(div.getElementsByClassName('amount')[0].textContent);
        if (cost < this.money) return true;
    }
    return false;
};

const field_ = new Field();
var ch = false;
field_.addPlayerN('asd');
field_.addPlayerN('asdd');
field_.addPlayer();
field_.addPlayer();
field_.addPlayer();
field_.currentPlayer = 0;
const click = () => {
    if (field_.currentPlayer > 4) {
        field_.currentPlayer = 0;
        ch = true;
        for (let i = 0; i < field_.players.length; i++)
            field_.players[i].rollCount = 1
    }
    if (field_.players[field_.currentPlayer].inJail) {
        field_.players[field_.currentPlayer].timesInJail++;
        window['release'].style.display = 'block';
        if (field_.players[field_.currentPlayer].timesInJail === 3) {
            field_.players[field_.currentPlayer].inJail = false;
            field_.players[field_.currentPlayer].timesInJail = 0;
            window['release'].style.display = 'none';
            info(field_.players[field_.currentPlayer], 'free');
        }
    } else window['release'].style.display = 'none';
    if (!field_.players[field_.currentPlayer].inJail && field_.players[field_.currentPlayer].rollCount > 0) {
        window['buy'].style.display = 'none';
        let sum = roll();
        field_.players[field_.currentPlayer].move(sum);

        document.activeElement.blur();
        if (field_.players[field_.currentPlayer].canBuyEl(field_.players[field_.currentPlayer].player.parentElement)) {
            window['buy'].style.display = 'block';
        }

        if (match) {
            field_.players[field_.currentPlayer].rollCount++;
            matchCount++;
            if (matchCount === 3) {
                info(field_.players[field_.currentPlayer], 'jail');
                let current_ = getIndex(field_.field, field_.players[field_.currentPlayer].parentElement);
                field_.players[field_.currentPlayer].player.style.top = field_.field[10].getBoundingClientRect().top + pageYOffset - 120 + 'px';
                field_.players[field_.currentPlayer].player.style.left = field_.field[10].getBoundingClientRect().left - 385 + pageXOffset + 'px';
                field_.players[field_.currentPlayer].inJail = true;
                field_.players[field_.currentPlayer].player.parentElement.removeChild(field_.players[field_.currentPlayer].player);
                field_.field[10].appendChild(field_.players[field_.currentPlayer].player);
                matchCount = 0;
            }
            match = false
        } else {
            field_.players[field_.currentPlayer].rollCount--;
            match = false;
            window['diceTitle'].textContent = field_.players[field_.currentPlayer].nickname;
            field_.currentPlayer++;

            matchCount = 0;
        }
    } else if (field_.players[field_.currentPlayer].inJail) {
        let sum = roll();
        if (match) {
            field_.players[field_.currentPlayer].timesInJail = 0;
            info(field_.players[field_.currentPlayer], 'free');
            field_.players[field_.currentPlayer].move(sum);
            if (field_.players[field_.currentPlayer].canBuyEl(field_.players[field_.currentPlayer].player.parentElement)) {
                window['buy'].style.display = 'block';
            }
            match = false;
            field_.players[field_.currentPlayer].rollCount--;
            window['diceTitle'].textContent = field_.players[field_.currentPlayer].nickname;
            field_.currentPlayer++;

        }
        window['diceTitle'].textContent = field_.players[field_.currentPlayer].nickname;
        field_.players[field_.currentPlayer].rollCount--;


    } else {
        window['diceTitle'].textContent = field_.players[field_.currentPlayer].nickname;
        field_.currentPlayer++;
    }
}
var matchCount = 0;
window['roll'].onclick = () => {
    click();
};

window['release'].onclick = () => {
    let curr = field_.players[field_.currentPlayer];
    curr.inJail = false;
    curr.timesInJail = 0;
    curr.money -= 50;
    curr.setMoney(curr.money);
    window['release'].style.display = 'none';
};
document.onkeyup = (e) => {
    if (window['dicesPrompt'].style.display !== 'none')
        if (e.keyCode == 32) {
            click();
        }
};
window['diceTitle'].textContent = field_.players[0].nickname;
window['buy'].onclick = function() {
    console.log(field_.currentPlayer + ' ' + (field_.currentPlayer - 1) + ' ' + ch)
    if (field_.currentPlayer != 5) {
        if (field_.players[field_.currentPlayer].canBuyEl(field_.players[field_.currentPlayer].div) && !field_.players[field_.currentPlayer - 1].canBuyEl(field_.players[field_.currentPlayer - 1].div))
            field_.players[field_.currentPlayer].buy();
        else if (field_.players[field_.currentPlayer - 1].canBuyEl(field_.players[field_.currentPlayer - 1].div)) field_.players[field_.currentPlayer - 1].buy();
    } else field_.players[field_.currentPlayer - 1].buy();

};