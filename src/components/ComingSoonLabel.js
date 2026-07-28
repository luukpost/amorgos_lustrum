/* "Coming Soon" met verborgen easter egg.
   Easter egg 2: tik in het midden van de O van "Coming" of van de laatste
   O van "Soon" -> een kronkelende stippelroute verschijnt tussen die twee,
   met een schatkaart halverwege. Beide O's krijgen een piratenhoedje.
   De route loopt altijd vanaf de aangetikte O naar de andere toe. */

const ROUTE_DURATION = 5000
const ROUTE_DOTS = 34

/* Op deze hoogte liggen de toppen van de golf. Alles wordt hieraan
   geschaald, zodat de route altijd net onder het tekstblok blijft —
   de tussenruimtes daar staan in vaste pixels, de tekst in em. */
const CREST_LEVEL = 1.62

/* Kronkelroute in genormaliseerde eenheden: x als deel van de afstand
   tussen de twee O's, y als veelvoud van de verticale schaal hieronder
   (positief = omlaag). De route duikt onder de tekst door naar de lege
   ruimte eronder en klimt weer terug. Boven de tekst is geen plek:
   daar zit de octopus.

   Twee dingen houden de route van de datumtekst af: de af- en opgang
   zwenken naar buiten (u < 0 en u > 1), langs de O's heen, en de golf
   zelf blijft op of onder CREST_LEVEL.

   De golf is symmetrisch rond u = 0.5, dus daar ligt precies het midden
   van de lijn — en dat is een dal, zodat de schatkaart vrij ligt. */
const ROUTE_SEGMENTS = [
  [[0, 0], [-0.1, 0.55], [-0.16, 1.45], [-0.07, 1.5]],
  [[-0.07, 1.5], [0.01, 1.5], [0.02, 2.2], [0.1, 2.2]],
  [[0.1, 2.2], [0.19, 2.2], [0.21, 1.62], [0.3, 1.62]],
  [[0.3, 1.62], [0.39, 1.62], [0.41, 2.25], [0.5, 2.25]],
  [[0.5, 2.25], [0.59, 2.25], [0.61, 1.62], [0.7, 1.62]],
  [[0.7, 1.62], [0.79, 1.62], [0.81, 2.2], [0.9, 2.2]],
  [[0.9, 2.2], [0.98, 2.2], [0.99, 1.5], [1.07, 1.5]],
  [[1.07, 1.5], [1.16, 1.45], [1.1, 0.55], [1, 0]],
]

/* Het hoedje wordt getekend in een vak van 48 breed; de onderrand van de
   rand ligt op y = 26 en komt op de bovenkant van de letter te rusten. */
const HAT_BOX = { w: 48, base: 25 }

const ComingSoonLabel = {
  data() {
    return {
      routeVisible: false,
      routeTimer: null,
      viewBox: '0 0 0 0',
      dots: [],
      dotRadius: 3,
      map: null,
      hats: [],
    }
  },
  computed: {
    mapTransform() {
      if (!this.map) {
        return ''
      }
      const scale = this.map.size / 40
      return `translate(${this.map.x} ${this.map.y}) rotate(-8) scale(${scale}) translate(-20 -20)`
    },
  },
  methods: {
    // origin: 'coming' of 'soon' — de O waarop is getikt
    showRoute(origin) {
      if (this.routeVisible || !this.buildRoute(origin)) {
        return
      }
      this.routeVisible = true
      this.routeTimer = setTimeout(() => {
        this.routeVisible = false
      }, ROUTE_DURATION)
    },

    /* De O staat niet gecentreerd in zijn regelvak: met line-height 1
       loopt de hoofdletter van ~0.17em tot ~0.89em vanaf de bovenkant.
       Het hoedje zakt tot 0.30em, dus een stuk over de letter heen —
       anders lijkt het te zweven in plaats van gedragen te worden. */
    hatFor(letterBox, wrapBox, delay, rotation) {
      const width = letterBox.width * 1.6
      const scale = width / HAT_BOX.w
      const x = letterBox.left + letterBox.width / 2 - wrapBox.left
      const y = letterBox.top - wrapBox.top + letterBox.height * 0.3
      return {
        transform: `translate(${x} ${y}) rotate(${rotation}) scale(${scale}) translate(${-HAT_BOX.w / 2} ${-HAT_BOX.base})`,
        delay,
        // Beide hoedjes moeten samen met de route verdwijnen, ondanks
        // hun verschillende starttijd.
        duration: ROUTE_DURATION / 1000 - delay - 0.15,
      }
    },

    buildRoute(origin) {
      const wrap = this.$refs.wrap
      const label = this.$refs.label
      const coming = this.$refs.letterComing
      const soon = this.$refs.letterSoon
      if (!wrap || !label || !coming || !soon) {
        return false
      }

      const wrapBox = wrap.getBoundingClientRect()
      const comingBox = coming.getBoundingClientRect()
      const soonBox = soon.getBoundingClientRect()
      const fromComing = origin === 'coming'
      const fromBox = fromComing ? comingBox : soonBox
      const toBox = fromComing ? soonBox : comingBox
      const height = label.getBoundingClientRect().height
      if (!height || !wrapBox.width) {
        return false
      }

      const ox = fromBox.left + fromBox.width / 2 - wrapBox.left
      const oy = fromBox.top + fromBox.height / 2 - wrapBox.top
      const dx = toBox.left + toBox.width / 2 - wrapBox.left - ox
      const dy = toBox.top + toBox.height / 2 - wrapBox.top - oy

      /* De golftoppen moeten net onder het hele tekstblok liggen (label,
         datum en stippen samen) — dat is de ouder van deze component.
         Daaruit volgt de verticale schaal van de rest van de route. */
      const blockBottom = wrap.parentElement.getBoundingClientRect().bottom - wrapBox.top
      const scale = Math.max(height * 0.5, (blockBottom + height * 0.22 - oy) / CREST_LEVEL)

      const points = []
      for (const [p0, p1, p2, p3] of ROUTE_SEGMENTS) {
        for (let i = points.length ? 1 : 0; i <= 24; i++) {
          const t = i / 24
          const m = 1 - t
          const a = m * m * m
          const b = 3 * m * m * t
          const c = 3 * m * t * t
          const e = t * t * t
          const u = a * p0[0] + b * p1[0] + c * p2[0] + e * p3[0]
          const v = a * p0[1] + b * p1[1] + c * p2[1] + e * p3[1]
          points.push({ x: ox + dx * u, y: oy + dy * u + scale * v })
        }
      }

      // Herbemonster op gelijke afstanden, zodat de stippen netjes verdeeld staan
      const lengths = [0]
      for (let i = 1; i < points.length; i++) {
        const step = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
        lengths.push(lengths[i - 1] + step)
      }
      const total = lengths[lengths.length - 1]
      const pointAt = (distance) => {
        let i = 1
        while (i < lengths.length - 1 && lengths[i] < distance) {
          i++
        }
        const span = lengths[i] - lengths[i - 1] || 1
        const t = (distance - lengths[i - 1]) / span
        return {
          x: points[i - 1].x + (points[i].x - points[i - 1].x) * t,
          y: points[i - 1].y + (points[i].y - points[i - 1].y) * t,
        }
      }

      this.dots = []
      for (let i = 0; i < ROUTE_DOTS; i++) {
        this.dots.push(pointAt((total * i) / (ROUTE_DOTS - 1)))
      }
      this.dotRadius = Math.max(2.5, height * 0.062)
      this.map = { ...pointAt(total / 2), size: height * 0.9 }

      /* Het hoedje op de aangetikte O komt meteen op, dat op de andere O
         pas als de route daar is aangekomen. De schuinstand hoort bij de
         letter zelf, zodat die niet verspringt als je de andere O aantikt. */
      const nearDelay = 0.15
      const farDelay = (ROUTE_DOTS - 1) * 0.045 + 0.1
      this.hats = [
        this.hatFor(comingBox, wrapBox, fromComing ? nearDelay : farDelay, -8),
        this.hatFor(soonBox, wrapBox, fromComing ? farDelay : nearDelay, 7),
      ]

      this.viewBox = `0 0 ${wrapBox.width} ${wrapBox.height}`
      return true
    },
  },

  beforeUnmount() {
    clearTimeout(this.routeTimer)
  },

  template: `
    <div class="label-wrap" ref="wrap">
      <div class="label" ref="label">C<span class="label-o" ref="letterComing">o<button
        type="button"
        class="label-o-hit"
        aria-label="Tik op het midden van de O van Coming"
        @click="showRoute('coming')"
      ></button></span>ming So<span class="label-o" ref="letterSoon">o<button
        type="button"
        class="label-o-hit"
        aria-label="Tik op het midden van de laatste O van Soon"
        @click="showRoute('soon')"
      ></button></span>n</div>

      <svg
        v-if="routeVisible"
        class="treasure"
        :viewBox="viewBox"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          v-for="(dot, i) in dots"
          :key="i"
          class="treasure-dot"
          :cx="dot.x"
          :cy="dot.y"
          :r="dotRadius"
          :style="{ animationDelay: (i * 0.045) + 's' }"
        />

        <g :transform="mapTransform">
          <g class="treasure-map">
            <path class="treasure-paper" d="M4 7.5 14.5 4 26 8 36 4.5 36 32.5 26 36 14.5 32 4 35.5Z" />
            <path class="treasure-fold" d="M14.5 4V32M26 8V36" />
            <path class="treasure-trail" d="M9 27C13 21 17 27 21 21" />
            <path class="treasure-x" d="M25.5 16.5 31 22M31 16.5 25.5 22" />
          </g>
        </g>

        <g v-for="(hat, i) in hats" :key="'hat' + i" :transform="hat.transform">
          <g class="treasure-hat" :style="{ animationDelay: hat.delay + 's', animationDuration: hat.duration + 's' }">
            <path class="hat-felt" d="M0.5 17.5C2.5 8 12 2 24 2 36 2 45.5 8 47.5 17.5 41 23.5 33 26.5 24 26.5 15 26.5 7 23.5 0.5 17.5Z" />
            <path class="hat-band" d="M4.8 18.9C11.4 22.4 17.5 23.9 24 23.9 30.5 23.9 36.6 22.4 43.2 18.9" />
            <circle class="hat-skull" cx="24" cy="11.6" r="4.3" />
            <path class="hat-jaw" d="M21.7 15.3h4.6v2.3h-4.6z" />
            <circle class="hat-eye" cx="22.3" cy="11.2" r="1.15" />
            <circle class="hat-eye" cx="25.7" cy="11.2" r="1.15" />
          </g>
        </g>
      </svg>
    </div>
  `,
}
