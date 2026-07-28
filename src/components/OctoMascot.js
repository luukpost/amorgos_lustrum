/* Octo Chill mascotte met verborgen easter eggs.
   Easter egg 1: tik op de pet -> de octopus zwaait met een tentakel.
   Easter egg 3: tik op de reddingsband -> de octo draait een rondje. */

const WAVE_DURATION = 2200
const SPIN_DURATION = 1800

const OctoMascot = {
  data() {
    return {
      waving: false,
      waveTimer: null,
      spinning: false,
      spinTimer: null,
    }
  },
  methods: {
    wave() {
      if (this.waving) {
        return
      }
      this.waving = true
      this.waveTimer = setTimeout(() => {
        this.waving = false
      }, WAVE_DURATION)
    },

    spin() {
      if (this.spinning) {
        return
      }
      this.spinning = true
      this.spinTimer = setTimeout(() => {
        this.spinning = false
      }, SPIN_DURATION)
    },
  },
  beforeUnmount() {
    clearTimeout(this.waveTimer)
    clearTimeout(this.spinTimer)
  },
  template: `
    <div class="octo" :class="{ 'is-waving': waving, 'is-spinning': spinning }">
      <svg class="octo-arm" viewBox="0 0 962 638" aria-hidden="true" focusable="false">
        <g class="octo-arm-limb">
          <path class="octo-arm-shape" d="M683.6 481.4L665.9 380.2L660.3 335L656.4 290.9L654.5 248.2L654.5 210.4L656.6 170.9L660.5 136.4L669.8 90.4L674.2 82.1L680.9 76.2L689.3 73.6L697.2 74.9L703.6 80.1L707.6 88L708.8 96.8L707.4 100.1L705.1 101.9L702.5 101.4L700.3 97.8L675 102.8L675.3 99.5L678.2 93.4L683.8 89.7L687.2 89L693.8 90.3L698.8 94.8L675.7 106.2L679 114.4L684.3 121.5L691.3 126.8L699.3 129.7L705.5 130.5L713.7 129.6L721.4 126.6L728.4 121.8L734.2 115.3L738.5 107.3L741 98L741.5 90.5L740.4 80L736.6 67.3L732.1 58.8L724.2 49L717 43.1L706.3 37.5L697.6 34.9L685.6 33.7L670.5 35.7L656 41.6L642.8 51.2L631.7 64.4L624.9 77.3L615.8 102.7L600.5 158.8L593.7 193.9L588.4 230.2L581.6 310.3L580.4 398.7L584.4 494.6Z" />
          <path class="octo-arm-shade" d="M650.2 428.8L645.4 389.5L641.6 350.9L639 313.1L637.6 276.2L637.6 240.3L639.1 205.6L642 172L646.5 139.9L652.7 109.2L656.5 94.4L660.2 83.6L665.2 75.7L671.4 69.8L678.3 65.9L685.5 63.9L692.7 63.9L699.6 65.7L705.8 69.5L711.1 75.4" />
        </g>
      </svg>

      <img class="octo-img" src="uploads/Octo Chill.png" alt="Amorgos — Plezier in zeilen" />

      <button
        type="button"
        class="octo-ring"
        aria-label="Tik op de reddingsband"
        @click="spin"
      ></button>

      <button
        type="button"
        class="octo-cap"
        aria-label="Tik op de pet van de octopus"
        @click="wave"
      ></button>
    </div>
  `,
}
