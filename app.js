function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      beastHealth: 100,
      currentRound: 0,
    }
  },
  computed: {
    isSpecialAttackEnabled() {
      return this.currentRound % 3 !== 0 || this.currentRound === 0
    },
    playerHealthStyles() {
      return { width: this.playerHealth + "%" }
    },
    beastHealthStyles() {
      return { width: this.beastHealth + "%" }
    },
  },
  methods: {
    playerAttacks() {
      const attackValue = getRandomValue(12, 5)
      this.beastHealth -= attackValue
      this.beastAttacks()
      this.currentRound++
    },
    playerAttacksSpecial() {
      const attackValue = getRandomValue(25, 10)
      this.beastHealth -= attackValue
      this.beastAttacks()
      this.currentRound++
    },
    beastAttacks() {
      const attackValue = getRandomValue(15, 8)
      this.playerHealth -= attackValue
    },
  },
}).mount("#game")
