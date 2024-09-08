/* HERO BUTTONS */
const supportBtn = document.querySelector(
   ".hero-content-buttons button:first-child"
);
const aboutBtn = document.querySelector(
   ".hero-content-buttons button:last-child"
);

supportBtn.addEventListener("click", () => {
   window.scrollTo({
      top: document.querySelector(".support").offsetTop,
      behavior: "smooth",
   });
});

aboutBtn.addEventListener("click", () => {
   window.scrollTo({
      top: document.querySelector(".stages").offsetTop,
      behavior: "smooth",
   });
});

/* PLAYERS CAROUSEL */
const nextPlayer = document.querySelector(
   ".players-pagination .pagination-next"
);
const prevPlayer = document.querySelector(
   ".players-pagination .pagination-prev"
);
const playersCarousel = document.querySelector(".players-carousel");

let playersPaginationCount = "";
if (window.innerWidth < 580) {
   playersPaginationCount = document.querySelector(
      ".players-pagination-count > span:nth-child(2)"
   );
} else {
   playersPaginationCount = document.querySelector(
      ".players-pagination-count > span:nth-child(1)"
   );
}

const playersPaginationTotal = document.querySelector(
   ".players-pagination-count > span:last-child"
);
const playerCardWidth = window.innerWidth < 580 ? window.innerWidth : window.innerWidth * 0.33;

// Включить/выключить кнопку "вперед"
const updateNextPlayerClass = () => {
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
const updatePrevPlayerClass = () => {
   if (
      (parseInt(playersPaginationCount.innerText) === 1 &&
         window.innerWidth < 580) ||
      parseInt(playersPaginationCount.innerText) === 3 && window.innerWidth >= 580
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
         left: 0,
         behavior: "smooth",
      });
      playersPaginationCount.innerText = window.innerWidth < 580 ? 1 : 3;
      prevPlayer.classList.add("disabled");
   } else {
      //перемещение вперед
      prevPlayer.classList.remove("disabled");
      playersCarousel.scrollBy({
         left: playerCardWidth,
         behavior: "smooth",
      });
      playersPaginationCount.innerText =
         parseInt(playersPaginationCount.innerText) + 1;
   }
   updateNextPlayerClass();
};
const moveToPrevPlayer = () => {
   //перемещение назад
   playersCarousel.scrollBy({
      left: -playerCardWidth,
      behavior: "smooth",
   });
   playersPaginationCount.innerText =
      parseInt(playersPaginationCount.innerText) - 1;
   updatePrevPlayerClass();
   updateNextPlayerClass();
};

setInterval(moveToNextPlayer, 4000);
nextPlayer.addEventListener("click", moveToNextPlayer);
prevPlayer.addEventListener("click", moveToPrevPlayer);

/* STAGES CAROUSEL */
const stagesCarousel = document.querySelector(".stages-container");
const nextStage = document.querySelector(".stages-pagination-next");
const prevStage = document.querySelector(".stages-pagination-prev");
const stageWidth =
   document.querySelector(".stages-container li").offsetWidth +
   0.1 * window.innerWidth;

const stageCount = document.querySelectorAll(
   ".stages-pagination-count li"
).length;
let currentStage = 1;

const updatePrevStageClass = () => {
   if (currentStage > 1) {
      prevStage.classList.remove("disabled");
   } else {
      prevStage.classList.add("disabled");
   }
};
const updateNextStageClass = () => {
   if (currentStage < stageCount) {
      nextStage.classList.remove("disabled");
   } else {
      nextStage.classList.add("disabled");
   }
};

const updatePaginationCount = () => {
   document
      .querySelector(".stages-pagination-count li.active")
      .classList.remove("active");
   document
      .querySelector(
         ".stages-pagination-count li:nth-child(" + currentStage + ")"
      )
      .classList.add("active");
};

const moveToNextStage = () => {
   stagesCarousel.scrollBy({
      left: stageWidth,
      behavior: "smooth",
   });
   currentStage++;
   updatePrevStageClass();
   updateNextStageClass();
   updatePaginationCount();
};
const moveToPrevStage = () => {
   stagesCarousel.scrollBy({
      left: -stageWidth,
      behavior: "smooth",
   });
   currentStage--;
   updatePrevStageClass();
   updateNextStageClass();
   updatePaginationCount();
};

nextStage.addEventListener("click", moveToNextStage);
prevStage.addEventListener("click", moveToPrevStage);
