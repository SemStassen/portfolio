const followingCircle = document.querySelector(".mouse-follow");
const moreArrow = document.querySelector(".more");
const moreArrowIcon = document.querySelector(".more .arrow-down");
const body = document.querySelector("body");

removeMoreArrow(document.documentElement.scrollTop);

window.onscroll = (event) => {
  const scrollTop = document.documentElement.scrollTop;
  removeMoreArrow(scrollTop);
};

window.onpointermove = (event) => {
  const scrollTop = document.documentElement.scrollTop;
  animateCircle(event, scrollTop);
};

function animateCircle(event, scrollTop) {
  const { clientX, clientY } = event;

  followingCircle.animate(
    {
      left: `${clientX - 140}px`,
      top: `${clientY - 140 + scrollTop}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
}

function removeMoreArrow(scrollTop) {
  if (scrollTop >= 10) {
    body.classList.add("scrolled");
    moreArrow.animate(
      {
        opacity: 0,
      },
      {
        duration: 500,
        fill: "forwards",
      }
    );
  } else if (scrollTop < 10) {
    body.classList.remove("scrolled");
    moreArrow.animate(
      {
        opacity: 1,
      },
      {
        duration: 500,
        fill: "forwards",
      }
    );
  }
}

// constantly animates the more about me arrow to bop up and down
moreArrow.animate(
  [
    // keyframes
    { bottom: "25px" },
    { bottom: "35px" },
    { bottom: "25px" },
  ],
  {
    duration: 2500,
    iterations: Infinity,
  }
);

// white bar scroll animation
const tickerWrapper = $(".ticker-wrapper");
const list = tickerWrapper.find("ul.list");
const clonedList = list.clone();
let listWidth = 10;
document.fonts.ready.then(function () {
  list.find("li").each(function (i) {
    listWidth += $(this, i).outerWidth(true);
  });

  const endPos = tickerWrapper.width() - listWidth;

  list.add(clonedList).css({
    width: listWidth + "px",
  });

  clonedList.addClass("cloned").appendTo(tickerWrapper);

  //TimelineMax
  const infinite = new TimelineMax({ repeat: -1, paused: true });
  const time = 15;

  infinite
    .fromTo(
      list,
      time,
      { rotation: 0.01, x: 0 },
      { force3D: true, x: -listWidth, ease: Linear.easeNone },
      0
    )
    .fromTo(
      clonedList,
      time,
      { rotation: 0.01, x: listWidth },
      { force3D: true, x: 0, ease: Linear.easeNone },
      0
    )
    .set(list, { force3D: true, rotation: 0.01, x: listWidth })
    .to(
      clonedList,
      time,
      { force3D: true, rotation: 0.01, x: -listWidth, ease: Linear.easeNone },
      time
    )
    .to(
      list,
      time,
      { force3D: true, rotation: 0.01, x: 0, ease: Linear.easeNone },
      time
    )
    .progress(1)
    .progress(0)
    .play();
});
//Pause/Play
// tickerWrapper
//   .on("mouseenter", function () {
//     infinite.pause();
//   })
//   .on("mouseleave", function () {
//     infinite.play();
//   });

// const projectShowcaseWrapper = document.querySelector(".my-projects");
const projects = document.querySelectorAll(".project");
const project_clip_path_effect = document.querySelector(".clip-path-effect");
const gridTransitionTime = 100;
const gridSquaresOpacity = [{ opacity: 1 }, { opacity: 0 }];
const gridSquaresTiming = {
  duration: gridTransitionTime,
  iterations: 8,
};
let gridTransitionTimeout;
let gridTransitionIsHappening = false;
let previousProject = null;

[...projects].forEach((project) => {
  ["mouseenter", "mouseover"].forEach((evt) => {
    project.addEventListener(evt, function () {
      if (project.dataset.projecttarget !== "clear") {
        if (!gridTransitionTimeout && !gridTransitionIsHappening) {
          gridTransitionTimeout = setTimeout(function () {
            gridTransitionIsHappening = true;
            transitionGrid(
              document.querySelector("." + project.dataset.projecttarget),
              project.dataset.wipedirection
            );
          }, 400);
        }
      }
    });
  });

  project.addEventListener("mouseleave", function () {
    clearTimeout(gridTransitionTimeout);
    gridTransitionTimeout = null;
  });
});

function transitionGrid(project, wipeDirection) {
  let intervalCounter = 0;
  if (project) {
    project.style.zIndex = 2;
    switch (wipeDirection) {
      case "topLeft":
        wipeTopLeftGrid(intervalCounter, project);
        break;
      case "topRight":
        wipeTopRightGrid(intervalCounter, project);
        break;
      case "bottomLeft":
        wipeBottomLeftGrid(intervalCounter, project);
        break;
      case "bottomRight":
        wipeBottomRightGrid(intervalCounter, project);
        break;
    }
  }
}

function wipeTopLeftGrid(intervalCounter, project) {
  window.setInterval(function () {
    switch (intervalCounter) {
      case 0:
        project_clip_path_effect.style.clipPath = `polygon(0 0, 25% 0, 25% 25%, 0 25%)`;
        project.style.clipPath = `polygon(0 0, 25% 0, 25% 25%, 0 25%)`;
        project_clip_path_effect.animate(gridSquaresOpacity, gridSquaresTiming);
        break;
      case 1:
        project_clip_path_effect.style.clipPath = `polygon(25% 0, 50% 0, 50% 25%, 25% 25%, 0 25%, 0 50%, 25% 50%)`;
        project.style.clipPath = `polygon(0 0, 50% 0, 50% 25%, 25% 25%, 25% 50%, 0 50%)`;
        break;
      case 2:
        project_clip_path_effect.style.clipPath = `polygon(50% 0, 75% 0, 75% 25%, 25% 25%, 25% 75%, 0 75%, 0 50%, 50% 50%)`;
        project.style.clipPath = `polygon(0 0, 75% 0, 75% 25%, 50% 25%, 50% 50%, 25% 50%, 25% 75%, 0 75%)`;
        break;
      case 3:
        project_clip_path_effect.style.clipPath = `polygon(75% 0, 100% 0, 100% 25%, 50% 25%, 50% 75%, 0 75%, 0 100%, 25% 100%, 25% 50%, 75% 50%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 25%, 75% 25%, 75% 50%, 50% 50%, 50% 75%, 25% 75%, 25% 100%, 0 100%)`;
        break;
      case 4:
        project_clip_path_effect.style.clipPath = `polygon(75% 25%, 100% 25%, 100% 50%, 50% 50%, 50% 100%, 25% 100%, 25% 75%, 75% 75%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 50%, 75% 50%, 75% 75%, 50% 75%, 50% 100%, 0 100%)`;
        break;
      case 5:
        project_clip_path_effect.style.clipPath = `polygon(75% 50%, 100% 50%, 100% 75%, 50% 75%, 50% 100%, 75% 100%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 75%, 75% 75%, 75% 100%, 0 100%)`;
        break;
      case 6:
        project_clip_path_effect.style.clipPath = `polygon(75% 75%, 100% 75%, 100% 100%, 75% 100%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;
        break;
      case 7:
        project_clip_path_effect.style.clipPath = `polygon(100% 100%)`;
        window.clearInterval;
        resetGridTransitions(project);
        break;
    }
    intervalCounter += 1;
  }, gridTransitionTime);
}

function wipeTopRightGrid(intervalCounter, project) {
  window.setInterval(function () {
    switch (intervalCounter) {
      case 0:
        project_clip_path_effect.style.clipPath = `polygon(75% 0, 100% 0, 100% 25%, 75% 25%)`;
        project.style.clipPath = `polygon(75% 0, 100% 0, 100% 25%, 75% 25%)`;
        project_clip_path_effect.animate(gridSquaresOpacity, gridSquaresTiming);
        break;
      case 1:
        project_clip_path_effect.style.clipPath = `polygon(50% 0, 75% 0, 75% 50%, 100% 50%, 100% 25%, 50% 25%)`;
        project.style.clipPath = `polygon(50% 0, 100% 0, 100% 50%, 75% 50%, 75% 25%, 50% 25%)`;
        break;
      case 2:
        project_clip_path_effect.style.clipPath = `polygon(25% 0, 50% 0, 50% 50%, 100% 50%, 100% 75%, 75% 75%, 75% 25%, 25% 25%)`;
        project.style.clipPath = `polygon(25% 0, 100% 0, 100% 75%, 75% 75%, 75% 50%, 50% 50%, 50% 25%, 25% 25%)`;
        break;
      case 3:
        project_clip_path_effect.style.clipPath = `polygon(0 0, 25% 0, 25% 50%, 75% 50%, 75% 100%, 100% 100%, 100% 75%, 50% 75%, 50% 25%, 0 25%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 75% 100%, 75% 75%, 50% 75%, 50% 50%, 25% 50%, 25% 25%, 0 25%)`;
        break;
      case 4:
        project_clip_path_effect.style.clipPath = `polygon(0 25%, 25% 25%, 25% 75%, 75% 75%, 75% 100%, 50% 100%, 50% 50%, 0 50%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 50% 100%, 50% 75%, 25% 75%, 25% 50%, 0 50%)`;
        break;
      case 5:
        project_clip_path_effect.style.clipPath = `polygon(0 50%, 25% 50%, 25% 100%, 50% 100%, 50% 75%, 0 75%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 25% 100%, 25% 75%, 0 75%)`;
        break;
      case 6:
        project_clip_path_effect.style.clipPath = `polygon(0 75%, 25% 75%, 25% 100%, 0 100%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;
        break;
      case 7:
        project_clip_path_effect.style.clipPath = `polygon(100% 100%)`;
        window.clearInterval;
        resetGridTransitions(project);
        break;
    }
    intervalCounter += 1;
  }, gridTransitionTime);
}

function wipeBottomRightGrid(intervalCounter, project) {
  window.setInterval(function () {
    switch (intervalCounter) {
      case 0:
        project_clip_path_effect.style.clipPath = `polygon(75% 75%, 100% 75%, 100% 100%, 75% 100%)`;
        project.style.clipPath = `polygon(75% 75%, 100% 75%, 100% 100%, 75% 100%)`;
        project_clip_path_effect.animate(gridSquaresOpacity, gridSquaresTiming);
        break;
      case 1:
        project_clip_path_effect.style.clipPath = `polygon(50% 100%, 50% 75%, 100% 75%, 100% 50%, 75% 50%, 75% 100%)`;
        project.style.clipPath = `polygon(50% 100%, 50% 75%, 75% 75%, 75% 50%, 100% 50%, 100% 100%)`;
        break;
      case 2:
        project_clip_path_effect.style.clipPath = `polygon(25% 100%, 25% 75%, 75% 75%, 75% 25%, 100% 25%, 100% 50%, 50% 50%, 50% 100%)`;
        project.style.clipPath = `polygon(25% 100%, 25% 75%, 50% 75%, 50% 50%, 75% 50%, 75% 25%, 100% 25%, 100% 100%)`;
        break;
      case 3:
        project_clip_path_effect.style.clipPath = `polygon(0 100%, 0 75%, 50% 75%, 50% 25%, 100% 25%, 100% 0, 75% 0, 75% 50%, 25% 50%, 25% 100%)`;
        project.style.clipPath = `polygon(0 100%, 0 75%, 25% 75%, 25% 50%, 50% 50%, 50% 25%, 75% 25%, 75% 0, 100% 0, 100% 100%)`;
        break;
      case 4:
        project_clip_path_effect.style.clipPath = `polygon(0 75%, 0 50%, 50% 50%, 50% 0, 75% 0, 75% 25%, 25% 25%, 25% 75%)`;
        project.style.clipPath = `polygon(0 100%, 0 50%, 25% 50%, 25% 25%, 50% 25%, 50% 0, 100% 0, 100% 100%)`;
        break;
      case 5:
        project_clip_path_effect.style.clipPath = `polygon(0 50%, 0 25%, 50% 25%, 50% 0, 25% 0, 25% 50%)`;
        project.style.clipPath = `polygon(0 100%, 0 25%, 25% 25%, 25% 0, 100% 0, 100% 100%)`;
        break;
      case 6:
        project_clip_path_effect.style.clipPath = `polygon(0 25%, 0 0, 25% 0, 25% 25%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;
        break;
      case 7:
        project_clip_path_effect.style.clipPath = `polygon(100% 100%)`;
        window.clearInterval;
        resetGridTransitions(project);
        break;
    }
    intervalCounter += 1;
  }, gridTransitionTime);
}

function wipeBottomLeftGrid(intervalCounter, project) {
  window.setInterval(function () {
    switch (intervalCounter) {
      case 0:
        project_clip_path_effect.style.clipPath = `polygon(0 100%, 0 75%, 25% 75%, 25% 100%)`;
        project.style.clipPath = `polygon(0 100%, 0 75%, 25% 75%, 25% 100%)`;
        project_clip_path_effect.animate(gridSquaresOpacity, gridSquaresTiming);
        break;
      case 1:
        project_clip_path_effect.style.clipPath = `polygon(0 75%, 0 50%, 25% 50%, 25% 100%, 50% 100%, 50% 75%)`;
        project.style.clipPath = `polygon(0 100%, 0 50%, 25% 50%, 25% 75%, 50% 75%, 50% 100%)`;
        break;
      case 2:
        project_clip_path_effect.style.clipPath = `polygon(0 50%, 0 25%, 25% 25%, 25% 75%, 75% 75%, 75% 100%, 50% 100%, 50% 50%)`;
        project.style.clipPath = `polygon(0 100%, 0 25%, 25% 25%, 25% 50%, 50% 50%, 50% 75%, 75% 75%, 75% 100%)`;
        break;
      case 3:
        project_clip_path_effect.style.clipPath = `polygon(0 25%, 0 0, 25% 0, 25% 50%, 75% 50%, 75% 100%, 100% 100%, 100% 75%, 50% 75%, 50% 25%)`;
        project.style.clipPath = `polygon(0 100%, 0 0, 25% 0, 25% 25%, 50% 25%, 50% 50%, 75% 50%, 75% 75%, 100% 75%, 100% 100%)`;
        break;
      case 4:
        project_clip_path_effect.style.clipPath = `polygon(25% 25%, 25% 0, 50% 0, 50% 50%, 100% 50%, 100% 75%, 75% 75%, 75% 25%)`;
        project.style.clipPath = `polygon(0 100%, 0 0, 50% 0, 50% 25%, 75% 25%, 75% 50%, 100% 50%, 100% 100%)`;
        break;
      case 5:
        project_clip_path_effect.style.clipPath = `polygon(50% 25%, 50% 0, 75% 0, 75% 50%, 100% 50%, 100% 25%)`;
        project.style.clipPath = `polygon(0 100%, 0 0, 75% 0, 75% 25%, 100% 25%, 100% 100%)`;
        break;
      case 6:
        project_clip_path_effect.style.clipPath = `polygon(75% 25%, 75% 0, 100% 0, 100% 25%)`;
        project.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%)`;
        break;
      case 7:
        project_clip_path_effect.style.clipPath = `polygon(100% 100%)`;
        window.clearInterval;
        resetGridTransitions(project);
        break;
    }
    intervalCounter += 1;
  }, gridTransitionTime);
}

function resetGridTransitions(project) {
  project.style.zIndex = 1;
  gridTransitionIsHappening = false;
  clearTimeout(gridTransitionTimeout);
  gridTransitionTimeout = null;
  if (previousProject) {
    previousProject.style.zIndex = 0;
    previousProject.style.clipPath = `polygon(0 0)`;
  }
  previousProject = project;
}
