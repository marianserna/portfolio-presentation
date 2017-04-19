(function() {
  TweenMax.fromTo('h1', 0.5, {opacity: 0}, {opacity: 1, delay: 2, ease: Power2.easeInOut});

  const start = document.getElementById('right-heading');
  const name = document.getElementById('left-heading');
  const topLine = document.querySelector('.top-line');
  const leftLine = document.querySelector('.left-line');
  const bLeftHeading = document.getElementById('bLeft-heading');

  start.addEventListener('click', (e) => {
    e.preventDefault();
    showTopLine();
  });

  function showTopLine() {
    topLine.style.opacity = 1;
    TweenMax.fromTo(topLine, 0.5, {width: '0'}, {width: '100%', onComplete: showName});
  }

  function showName() {
    TweenMax.fromTo('#left-heading', 0.5, {color: '#000000'}, {color: '#FFFFFF', onComplete: showLeftLine});
  }

  function showLeftLine() {
    leftLine.style.opacity = 1;
    TweenMax.fromTo(leftLine, 0.5, {height: '0'}, {height: '100%', onComplete: showTitle});
  }

  function showTitle() {
    TweenMax.fromTo('#bLeft-heading', 0.8, {color: '#000000'}, {color: '#FFFFFF', onComplete: fadeLanding});
  }

  function fadeLanding() {
    TweenMax.fromTo('.landing', 1, {opacity: 1}, {opacity: 0, onComplete: showPanels});
  }

  function showPanels() {
    topLine.style.opacity = 0;
    topLine.style.width = 0;
    name.style.color = '#000';
    leftLine.style.height = 0;
    bLeftHeading.style.color = '#000';

    scene.pause();

    const landing = document.querySelector('.landing');
    landing.style.display = 'none';

    const panels = document.querySelector('.panels');
    panels.style.display = 'flex';

    TweenMax.fromTo('.panels', 0.3, {opacity: 0}, {opacity: 1, delay: 0.3});
  }
})();
