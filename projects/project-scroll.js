(function () {
  if (!document.body.classList.contains('project-page')) return;
  if (window.innerWidth < 900) return;

  const track = document.querySelector('.project-track');
  if (!track) return;

  window.addEventListener('wheel', function (e) {
    if (e.ctrlKey || e.metaKey) return;

    const scrollAmount =
      Math.abs(e.deltaX) > Math.abs(e.deltaY)
        ? e.deltaX
        : e.deltaY;

    e.preventDefault();
    track.scrollLeft += scrollAmount;
  }, {
    passive: false,
    capture: true
  });
})();