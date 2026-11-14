// Intro-filmpje bij het openen van de homepage.
// Speelt zonder geluid af (browsers blokkeren automatisch afspelen mét geluid);
// bezoekers kunnen het geluid aanzetten of het filmpje overslaan.
// Aan het eind vervaagt het filmpje en blijft de homepage over.
(function () {
  const intro = document.querySelector('.intro')
  if (!intro) {
    return
  }

  const video = intro.querySelector('.intro-video')
  const soundBtn = intro.querySelector('.intro-sound')
  const skipBtn = intro.querySelector('.intro-skip')
  const playBtn = intro.querySelector('.intro-play')
  let closed = false

  document.documentElement.classList.add('intro-open')

  function close() {
    if (closed) {
      return
    }
    closed = true
    video.pause()
    intro.classList.add('is-closing')
    document.documentElement.classList.remove('intro-open')
    // Na het vervagen helemaal weghalen, zodat niets de homepage blokkeert
    setTimeout(() => {
      intro.remove()
    }, 600)
  }

  soundBtn.addEventListener('click', () => {
    video.muted = !video.muted
    soundBtn.textContent = video.muted ? 'Geluid aan' : 'Geluid uit'
    soundBtn.setAttribute('aria-pressed', String(!video.muted))
    if (video.paused) {
      video.play().catch(() => {})
    }
  })

  skipBtn.addEventListener('click', close)
  video.addEventListener('ended', close)
  // Kan het filmpje niet laden, dan meteen door naar de homepage
  video.addEventListener('error', close)

  // Sommige telefoons (bijv. in energiebesparingsmodus) weigeren ook
  // automatisch afspelen zonder geluid: dan tonen we een afspeelknop.
  playBtn.addEventListener('click', () => {
    playBtn.hidden = true
    video.play().catch(close)
  })

  // Is het laden al mislukt voordat dit script draaide? Dan direct door.
  if (video.error) {
    close()
    return
  }

  const attempt = video.play()
  if (attempt) {
    attempt.catch(() => {
      if (closed) {
        return
      }
      if (video.error) {
        close()
      } else {
        playBtn.hidden = false
      }
    })
  }
})()
