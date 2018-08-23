 //My variables
 const deck = document.querySelector('.deck');
 const cards = document.querySelectorAll('.card');
 const restart = document.querySelector('.restart');
 const moves = document.querySelector('.moves');
 const mintues = document.querySelector('.min');
 const seconds = document.querySelector('.sec');
 const finalMessage = document.querySelector('.congrats');
 const finalMoves = document.querySelector('.moves-final');
 const finalTime = document.querySelector('.time-final');
 const finalStars = document.querySelector('.stars-final');
 const finish = document.querySelector('button');
 let icons = ["smile", "smile", "baseball-ball", "baseball-ball", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];
 let openedCards = [];
 let numMoves = 0;
 let min = 0;
 let sec = 0;
 let interval;


 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length,
         temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

 function shuffleCards() {
     shuffle(icons);
     //Loop to add shuffledIcons to the cards.
     // for(let i = 0; i < cards.length; i++){
     //        let iconClass = icons[i];
     //        let icon = `<i class='${iconClass}'></i>`
     //     cards[i].innerHTML = icon;

     // }
     //Loop to add shuffledIcons to the cards. 
     for (let i = 0; i < cards.length; i++) {
         cards[i].innerHTML = icons[i];
     }
 }
 //Function for the click on a card.
 function clickEvent() {
     if (event.target.nodeName === 'LI') {
         event.target.classList.add('open', 'show', 'rotate');
         openedCards.push(event.target);
         //Stop the double click on the first card.
         if (openedCards.length === 1) {
             openedCards[0].removeEventListener('click', clickEvent);
         } else if (openedCards.length === 2) {
             matched();
         }
         movesIncrement();
         starsRate();
         setTimeout(win, 750);
     }
 }
 //Function to see if the two card matches.
 function matched() {
     if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
         openedCards[0].classList.add('match');
         openedCards[1].classList.add('match');
         //Stop the double click on the second card.
         openedCards[1].removeEventListener('click', clickEvent);
         openedCards.length = 0;

     } else {
         //Stop the events on the cards
         for (var i = 0; i < cards.length; i++) {
             cards[i].removeEventListener('click', clickEvent);
         }
         //Return back the events on the cards exept the matched ones.
         setTimeout(function() {
             openedCards[0].classList.remove('open', 'show');
             openedCards[1].classList.remove('open', 'show');
             openedCards.length = 0;
             for (var i = 0; i < cards.length; i++) {
                 if (!cards[i].classList.contains('match')) {
                     cards[i].addEventListener('click', clickEvent);
                 }
             }
         }, 1000);
     }
 }

 function timer() {
     sec++;
     seconds.textContent = sec;
     if (sec === 59) {
         sec = 0;
         min++;
         mintues.textContent = min;
     }

 }
 //Function to increment the number of moves.
 function movesIncrement() {
     numMoves++;
     moves.textContent = parseInt(numMoves / 2);
     if (numMoves === 1) {
         interval = setInterval(timer, 1000);
     }
 }
 //Function for the congratulation modal.
 function win() {
     let cardsWin = document.querySelectorAll('.match');
     if (cardsWin.length === 16) {
         clearInterval(interval);
         finalMessage.style.display = 'block';
         finalMoves.textContent = 'Your number of moves are: ' + (numMoves / 2) + ' moves';
         finalTime.textContent = 'Your time is: ' + min + ' minutes ' + sec + ' seconds';
         const stars = document.querySelector('.stars');
         finalStars.innerHTML = 'Your stars rate: ' + stars.innerHTML;
     }
 }
 //Function for the number of stars according to the number of moves.
 function starsRate() {
     let movesNum = moves.textContent;
     const stars = document.querySelector('.stars');
     if ((movesNum == 10 && stars.firstChild) || (movesNum == 20 && stars.firstChild)) {
         stars.removeChild(stars.firstChild);
     }
 }

 function starsReset() {
     const starReset = `<li><i class="fa fa-star"></i></li>   
                     <li><i class="fa fa-star"></i></li>
                     <li><i class="fa fa-star"></i></li>`;
     const stars = document.querySelector('.stars');
     stars.innerHTML = starReset;
 }
 //Function for the begin and reset of the game.
 function reset() {
     clearInterval(interval);
     numMoves = 0;
     sec = 0;
     min = 0;
     moves.textContent = 0;
     mintues.textContent = 0;
     seconds.textContent = 0;
     deck.innerHTML = '';
     for (var i = 0; i < cards.length; i++) {
         deck.appendChild(cards[i]);
         cards[i].classList.remove('open', 'show', 'match', 'rotate');
         cards[i].addEventListener('click', clickEvent);
     }

     starsReset();
     shuffleCards();
     finalMessage.style.display = 'none';
 }
 //Adding the reset function to the reset button.
 restart.addEventListener('click', reset);

 window.onload = reset;
 //Adding the reset function to the play again button.
 finish.onclick = reset;