/* PLAYERS CAROUSEL */
const nextPlayer = document.querySelector(".players-pagination-next");
const prevPlayer = document.querySelector(".players-pagination-prev");
const playersCarousel = document.querySelector(".players-carousel");
const playersPaginationCount = document.querySelector(
   ".players-pagination-count > span:first-child"
);
const playersPaginationTotal = document.querySelector(
   ".players-pagination-count > span:last-child"
);
const playerCardWidth =
   document.querySelector(".players-carousel li").offsetWidth +
   window.innerWidth * 0.069;

// Включить/выключить кнопку "вперед"
const updateNextClass = () => {
   if (
      parseInt(playersPaginationCount.innerText) ==
      parseInt(playersPaginationTotal.innerText)
   ) {
      nextPlayer.classList.add("disabled");
   } else {
      nextPlayer.classList.remove("disabled");
   }
};

// Включить/выключить кнопку "назад"
const updatePrevClass = () => {
   if (
      parseInt(playersPaginationCount.innerText) === 1 ||
      parseInt(playersPaginationCount.innerText) === 3
   ) {
      prevPlayer.classList.add("disabled");
   } else {
      prevPlayer.classList.remove("disabled");
   }
};
const moveToNextPlayer = () => {
   //возвращение к началу
   if (
      parseInt(playersPaginationCount.innerText) ===
      parseInt(playersPaginationTotal.innerText)
   ) {
      playersCarousel.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
      });
      playersPaginationCount.innerText = window.innerWidth < 768 ? 1 : 3;
      prevPlayer.classList.add("disabled");
   } else {
      //перемещение вперед
      prevPlayer.classList.remove("disabled");
      playersCarousel.scrollBy({
         top: 0,
         left: playerCardWidth,
         behavior: "smooth",
      });
      playersPaginationCount.innerText =
         parseInt(playersPaginationCount.innerText) + 1;
   }
   updateNextClass();
};
const moveToPrevPlayer = () => {
   //перемещение назад
   playersCarousel.scrollBy({
      top: 0,
      left: -playerCardWidth,
      behavior: "smooth",
   });
   playersPaginationCount.innerText =
      parseInt(playersPaginationCount.innerText) - 1;
   updatePrevClass();
   updateNextClass();
};

setInterval(moveToNextPlayer, 4000);

nextPlayer.addEventListener("click", moveToNextPlayer);
prevPlayer.addEventListener("click", moveToPrevPlayer);
