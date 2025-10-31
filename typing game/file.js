
// Variables globales

let Faut = 0;
let wpm;
let timeSpentMinutes;
let accuracy;
let correct = 0;
let index = 0;
let time = timeLeft = 60;
let countinput = "";


// Sélecteurs

const timing = document.querySelector(".time");
const res = document.querySelector(".finish");
const score = document.querySelector(".score");
const btn = document.querySelector(".btn");
const faute = document.querySelector(".faute");
const typing_game = document.querySelector(".typing-game");

res.style.color = "red";
res.style.fontSize = "20px";

// Texte cible

let x = "bonjour tout le monde";
let f = [];
for (let i = 0; i < x.length; i++) {
    f = [...f, `<span>${x[i]}</span>`];
}


document.getElementById("txt").innerHTML = f.join("");


typing_game.disabled = true;

let interval;

// calculer wpm  accurcy en etat de finer avant timer
typing_game.addEventListener('input', (e) => {
    countinput = e.target.value;

    if (countinput.length === x.length && timeLeft > 0) {
        clearInterval(interval);
        typing_game.disabled = true;

        timeSpentMinutes = (time - timeLeft) / 60;
        wpm = Math.round((correct / 5) / timeSpentMinutes);
        accuracy = Math.round((correct / (correct + Faut)) * 100);

        res.innerHTML = `<span style="color:white">WPM : ${wpm} // Accuracy: ${accuracy}%</span>`;
    }
});



//Fonction chrono() relier à bnt

function chrono() {

      typing_game.disabled = false;
    // Gestion de la frappe au clavier
    typing_game.addEventListener('keydown', function (e) {

        // Gestion des touches Backspace et Enter
        if (e.key == "Enter" || e.key == "Backspace") {
            if (index === 0) return;
            index--;
            document.querySelectorAll('span')[index].style.color = "white";
            return;
        }

       
        if (index >= x.length) return;

        // Vérification du caractère
        if (x[index] === e.key) {
            document.querySelectorAll('span')[index].style.color = "green";
            correct += 1;
            score.textContent = correct;
        } else {
            document.querySelectorAll('span')[index].style.color = "red";
            Faut += 1;
            faute.textContent = "Faute : " + Faut;
        }

        index++;
    });

    // Démarrage du timer
    interval = setInterval(() => {
        timeLeft--;
        document.getElementById("time2").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            typing_game.disabled = true;

            timeSpentMinutes = (time - timeLeft) / 60;
            wpm = Math.round((correct / 5) / timeSpentMinutes);
            accuracy = Math.round((correct / (correct + Faut)) * 100);

            res.innerHTML = `<span style="color:white"> WPM : ${wpm} // Accuracy: ${accuracy}%</span>`;
        }
    }, 1000);
}

