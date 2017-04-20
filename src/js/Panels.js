(function() {
  const panels = Array.from(document.querySelectorAll('.panel'));
  let currentPanelNumber = 0;

  function panelClick(e) {
    if (!e.target.classList.contains('panel')) return;
    openPanel(e.target); // 'this' refers to the panel that was clicked
  }

  function openPanel(panel) {
    if (currentPanelNumber === parseInt(panel.dataset.panel)) return;

    onClose(currentPanelNumber);
    currentPanelNumber = parseInt(panel.dataset.panel);
    onOpen(currentPanelNumber);

    panels.forEach((div) => {
      div.classList.remove('active');
      div.classList.add('inactive');
    });

    panel.classList.add('active');
    panel.classList.remove('inactive');
  }

  function prevPanel() {
    const panel = document.querySelector(`.panel-${currentPanelNumber - 1}`);

    if (panel) {
      openPanel(panel);
    }
  }

  function nextPanel() {
    const panel = document.querySelector(`.panel-${currentPanelNumber + 1}`);

    if (panel) {
      openPanel(panel);
    }
  }

  function closePanels() {
    onClose(currentPanelNumber);
    currentPanelNumber = 0;

    panels.forEach((div) => {
      div.classList.remove('active');
      div.classList.remove('inactive');
    });
  }

  panels.forEach((panel) => {
    panel.addEventListener('click', panelClick, false);
  });

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 37) {
      prevPanel();
    } else if (e.keyCode === 39) {
      nextPanel();
    } else if (e.keyCode === 27) {
      closePanels();
    }
  });

  function onOpen(panelNumber) {
    setTimeout(() => {
      const panel = panels[panelNumber - 1];
      panel.classList.add('opened');

      if (panelNumber === 1) {

      } else if (panelNumber === 2) {

      } else if (panelNumber === 3) {
        splitText('.panel-3 .quote-1');
        splitText('.panel-3 .quote-2');
        splitText('.panel-3 .quote-3');
      } else if (panelNumber === 4) {
        splitText('.panel-4 .quote-1');
        splitText('.panel-4 .quote-2');
        splitText('.panel-4 .quote-3');
      } else if (panelNumber === 5) {
        splitText('.panel-5 .quote-1');
        splitText('.panel-5 .quote-2');
        splitText('.panel-5 .quote-3');
      } else if (panelNumber === 6) {
        splitText('.panel-6 .quote-1');
        splitText('.panel-6 .quote-2');
        splitText('.panel-6 .quote-3');
      }
    }, 1000);
  }

  function onClose(panelNumber) {
    if (panelNumber === 0) return;

    setTimeout(() => {
      const panel = panels[panelNumber - 1];
      panel.classList.remove('opened');

      if (panelNumber === 1) {
        const video = document.querySelector('.old-portfolio');
        video.pause();
      } else if (panelNumber === 2) {

      } else if (panelNumber === 3) {

      } else if (panelNumber === 4) {

      } else if (panelNumber === 5) {

      } else if (panelNumber === 6) {

      }
    }, 200);
  }

  const home = document.getElementById('home').addEventListener('click', (e) => {
    e.preventDefault();
    scene.play();

    TweenMax.fromTo('.panels', 1, {opacity: 1}, {opacity: 0, onComplete: showLanding});
  });

  function showLanding() {
    scene.play();

    const panels = document.querySelector('.panels');
    panels.style.display = 'none';

    const landing = document.querySelector('.landing');
    landing.style.display = 'block';

    TweenMax.fromTo('.landing', 1, {opacity: 0}, {opacity: 1});
  }

  function splitText(selector) {
    const quote = document.querySelector(selector);
    // Reset text for subsequent calls
    quote.innerHTML = quote.textContent;
    const mySplitText = new SplitText(quote, {type:"chars"});
    const tl = new TimelineMax({delay:0.2});

    //prep the quote div for 3D goodness
    TweenLite.set(quote, {transformPerspective:600, perspective:300, transformStyle:"preserve-3d", autoAlpha:1});

    //intro sequence
    mySplitText.chars.forEach((char) => {
      tl.from(char, 1.5, {z:randomNumber(-500,300), opacity:0, rotationY:randomNumber(-40, 40)}, Math.random()*1.5);
    })

    tl.from(quote, tl.duration(), {rotationY:180, transformOrigin:"50% 75% 200", ease:Power2.easeOut}, 0);
  }

  function randomNumber(min, max){
      return Math.floor(Math.random() * (1 + max - min) + min);
  }
})();
