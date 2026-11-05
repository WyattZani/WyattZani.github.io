// Opens project photos full size. Arrow keys / buttons move through the photos in the same section.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.step-media a.thumb'));
  if (!links.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Photo viewer');
  box.hidden = true;
  box.innerHTML =
    '<button class="lb-btn lb-close" type="button" aria-label="Close">×</button>' +
    '<button class="lb-btn lb-prev" type="button" aria-label="Previous photo">‹</button>' +
    '<figure class="lb-figure"><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-btn lb-next" type="button" aria-label="Next photo">›</button>';
  document.body.appendChild(box);

  var img = box.querySelector('img');
  var cap = box.querySelector('figcaption');
  var prev = box.querySelector('.lb-prev');
  var next = box.querySelector('.lb-next');
  var group = [], index = 0, opener = null;

  function show(i) {
    index = (i + group.length) % group.length;
    var link = group[index], thumb = link.querySelector('img');
    img.src = link.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = group.length > 1 ? (index + 1) + ' of ' + group.length : '';
    prev.hidden = next.hidden = group.length < 2;
  }
  function open(link) {
    var section = link.closest('.step-media');
    group = Array.prototype.slice.call(section.querySelectorAll('a.thumb'));
    opener = link;
    show(group.indexOf(link));
    box.hidden = false;
    document.body.classList.add('lb-open');
    box.querySelector('.lb-close').focus();
  }
  function close() {
    box.hidden = true;
    img.removeAttribute('src');
    document.body.classList.remove('lb-open');
    if (opener) opener.focus();
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (e) { e.preventDefault(); open(link); });
  });
  box.querySelector('.lb-close').addEventListener('click', close);
  prev.addEventListener('click', function () { show(index - 1); });
  next.addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
})();
