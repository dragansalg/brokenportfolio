document.addEventListener("DOMContentLoaded", function(event) {
    //Funktion för att göra text osynlig förutom när musen pekar
    function hide(target, zone) {
        target.classList.add("invisible");
        zone.onmouseover = function() {
            target.classList.remove("invisible");
            target.classList.add("visible")
        };
        zone.onmouseout = function() {
            target.classList.remove("visible");
            target.classList.add("invisible")
        };
    }
    //Funktion för att göra bakgrundsfärgen grön på möjliga fält
    function green(target) {
        target.style.backgroundColor = "lightgreen";
    }
    //Funktion för att ta bort det gröna
    function silver(target) {
        target.style.backgroundColor = "silver";
    }
    //
    function randOneSix() {
        return Math.floor(Math.random() * 6) + 1;
    }
    //Funktioner som triggas vid ändring i fälten:
    window.addEventListener("change", function(event) {
        //Player 1
        //Kod för att räkna ut summa från "p1" fälten
        //denna kod kan förenklas senare
        //Skapar först en HTML collection med allt som har
        //klassnamet "p1"
        let arr1 = document.getElementsByClassName('p1');
        //Gör om HTML collection till array
        let arr2 = Array.from(arr1);
        //Använder map funktion för att göra så att
        //arrayen endast innehåller nummervärden
        //"|| 0" är så att det inte ska bli fel för
        //fälten som inte har något innehåll än
        let arr3 = arr2.map((element) => {
            return parseInt(element.value) || 0
        });
        //Kod för att skriva ut summan av "p1" fälten
        let arrsum = arr3.reduce((a, b) => {
            return a + b;
        }, 0);
        document.getElementById("p1sum").innerHTML = arrsum;
        //Kod för att skriva ut 50 bonus poäng om summan av 
        //"p1" fälten är 63 eller mer
        let bonus = 0;
        if (arrsum >= 63) bonus = 50;
        document.getElementById("player1bonus").innerHTML = bonus;
        //Kod för att skriva ut totalsumman längst ner
        let arr7 = document.getElementsByClassName('p1l');
        let arr8 = Array.from(arr7);
        let arr9 = arr8.map((element) => {
            return parseInt(element.value) || 0
        });
        let totalsum3 = arr9.reduce((a, b) => {
            return a + b;
        }, 0);
        document.getElementById("player1total").innerHTML = arrsum + bonus + totalsum3;
        
        //Player 2
        //Kod för att räkna ut summa från "p2" fälten
        //denna kod kan förenklas senare
        let arr4 = document.getElementsByClassName('p2');
        let arr5 = Array.from(arr4);
        let arr6 = arr5.map((element) => {
            return parseInt(element.value) || 0
        });
        //Kod för att skriva ut summan av "p1" fälten
        let arrsum2 = arr6.reduce((a, b) => {
            return a + b;
        }, 0);
        document.getElementById("p2sum").innerHTML = arrsum2;
        //Kod för att skriva ut 50 bonus poäng om summan av 
        //"p2" fälten är 63 eller mer
        let bonus2 = 0;
        if (arrsum2 >= 63) bonus2 = 50;
        document.getElementById("player2bonus").innerHTML = bonus2;
        //Kod för att skriva ut totalsumman längst ner
        let arr10 = document.getElementsByClassName('p2l');
        let arr11 = Array.from(arr10);
        let arr12 = arr11.map((element) => {
            return parseInt(element.value) || 0
        });
        let totalsum4 = arr12.reduce((a, b) => {
            return a + b;
        }, 0);
        document.getElementById("player2total").innerHTML = arrsum2 + bonus2 + totalsum4;
    });

    //The dices
    //Creates a set of new dice
    let current_set = new Dice_set();
    //Antal kast funktion
    let throwsField = document.getElementById("throwsLeft")
    let throws = 3;
    //Funktioner som triggas när man trycker på knappen:
    document.getElementById("rollButton").
    addEventListener("click", function(e) {
            //Skapar en array med checkboxarna
            let check_arr = Array.from(document.getElementsByClassName('checkbox'));
            //Skapar en array med de ocheckade boxarnas index
            unchecked_arr = check_arr.filter(box => box.checked == false);
            let unchecked_arr2 = unchecked_arr.map(a => a.value);
            let tmp = 0;
            //Checking the checkboxes.
            // means no checked dices
            //Converting array of strings to numbers
            let unchecked_arr3 = unchecked_arr2.map(function(v) {
                return parseInt(v, 10);
                });            
            for (i=0; i<unchecked_arr2.length; i++) {
                //Change value of uncheced dice in dice set
                let tmp2 = unchecked_arr3[i]-1;
                current_set.dice[tmp2].value = randOneSix();
            }     
            for (let i = 1; i <= 5; i++) {                    
                tmp = current_set.dice[i-1].value;
                document.getElementById("dice" + i).src =
                    "images/" + tmp + ".png";
            }
            //Antal kast minskas efter varje kast 
            //throws--; <- växla till denna för verklig funktion
            throws = 2; //detta är för att testa kod
            throwsField.innerHTML = throws;
            //Inaktiverar slag knappen när kast är slut
            if (throws == 0) {
                document.getElementById("rollButton").disabled = true;
            }
            //Funktion för att gömma checkboxarna+text innan 1:a slag
            if (throws <= 2) {
                let cb = document.getElementsByClassName("checkbox");
                for (let cbs of cb) {
                    cbs.style.display = "flex";
                }
                document.getElementById("explaination").style.display = "flex";
            }

            /* //Funktioner för att highlighta möjliga rutor
            //Par
            let td_p1p = document.getElementById("td-p1p");
            current_set.checkPair()
            if (current_set.) {
                green(td_p1p);
            } else {
                silver(td_p1p);
            }

            //Två par 
            //(först filtrera ur 4or & 2or, sen kolla om summa är 4)
            let dice_no2 = dice_no.filter(numb => (numb === 2) || (numb === 4) == true);
            dice_no3 = dice_no2.reduce((a, b) => a + b, 0);
            let td_p12p = document.getElementById("td-p12p");
            if (dice_no3 === 4) {
                green(td_p12p);
            } else {
                silver(td_p12p);
            }

            //Tretal
            let td_p1t = document.getElementById("td-p1t");
            if (dice_no.includes(3) || dice_no.includes(4) || dice_no.includes(5)) {
                green(td_p1t);
            } else {
                silver(td_p1t);
            }

            //Fyrtal
            let td_p1f = document.getElementById("td-p1f");
            if (dice_no.includes(4) || dice_no.includes(5)) {
                green(td_p1f);
            } else {
                silver(td_p1f);
            }

            //Small straight
            let dice_no4 = dice_no.filter(numb => (numb === 1) == true);
            dice_no5 = dice_no4.reduce((a, b) => a + b, 0);
            let td_p1ss = document.getElementById("td-p1ss");
            let player1ss = document.getElementById("player1ss");
            if ((dice_no5 === 5) && (dice_array.includes(1)) && (dice_array.includes(6) == false)) {
                player1ss.innerHTML = "15";
                green(td_p1ss);
                hide(player1ss, td_p1ss);
            } else {
                player1ss.innerHTML = null;
                silver(td_p1ss);
            }

            //Large straight
            let td_p1ls = document.getElementById("td-p1ls");
            let player1ls = document.getElementById("player1ls");
            if ((dice_no5 === 5) && (dice_array.includes(6)) && (dice_array.includes(1) == false)) {
                player1ls.innerHTML = "20";
                green(td_p1ls);
                hide(player1ls, td_p1ls);
            } else {
                player1ls.innerHTML = null;
                silver(td_p1ls);
            }

            //Kåk
            let td_p1fh = document.getElementById("td-p1fh")
            if (dice_no.includes(2) && dice_no.includes(3)) {
                let chance_sum = dice_array.reduce((a, b) => a + b, 0);
                p1fh.innerHTML = chance_sum;
                green(td_p1fh);
                hide(p1fh, td_p1fh);
            } else {
                //green(td_p1fh);
                p1fh.innerHTML = null;
                silver(td_p1fh);
            }

            //Chans
            let td_p1ch = document.getElementById("td-p1ch");
            let player1ch = document.getElementById("player1ch");
            if (throws <= 2) {
                let chance_sum = dice_array.reduce((a, b) => a + b, 0);
                player1ch.innerHTML = chance_sum;
                green(td_p1ch);
                hide(player1ch, td_p1ch);
            } else {
                player1ch.innerHTML = null;
                silver(td_p1ch);
            }

            //Yatzy
            let td_p1y = document.getElementById("td-p1y")
            let player1y = document.getElementById("player1y")
            if (dice_no.includes(5)) {
                player1y.innerHTML = 50;
                green(td_p1y);
                hide(player1y, td_p1y);
            } else {
                player1y.innerHTML = null;
                silver(td_p1y);
            } */
        })
    //Chatt script
    let list = document.getElementById("ul_list");
    let btnSend = document.getElementById("btnSend");

    btnSend.addEventListener("click", function(e) {
        let divRow = document.createElement("divChat");
        list.appendChild(divRow);

        let listRow = document.createElement("liChat");
        divRow.appendChild(listRow);

        let spanRow = document.createElement("spanChat")
        divRow.appendChild(spanRow);
        spanRow.innerHTML = "Remove";

        let input = document.getElementById("inputText");
        listRow.innerHTML = input.value;

        input.value = "";
        input.focus();
    });

    list.addEventListener("click", function(event) {
        if (event.target.tagName == "SPANCHAT") {
            event.target.parentNode.remove();
        }
    })
});