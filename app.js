function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      beastHealth: 100,
      currentRound: 0,
      winner: null,
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.beastHealth <= 0) {
        this.winner = "There Was a Draw!"
      } else if (value <= 0) {
        this.winner = "You Lost!"
      }
    },
    beastHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "There Was a Draw!"
      } else if (value <= 0) {
        this.winner = "You Won!"
      }
    },
  },
  computed: {
    isGameOver() {
      return this.winner !== null
    },
    isSpecialAttackEnabled() {
      return this.currentRound % 3 !== 0 || this.currentRound === 0
    },
    playerHealthStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" }
      }
      return { width: this.playerHealth + "%" }
    },
    beastHealthStyles() {
      if (this.beastHealth < 0) {
        return { width: "0%" }
      }
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
    healsPlayer() {
      const healValue = getRandomValue(18, 13)
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100
      } else {
        this.playerHealth += healValue
      }
      this.beastAttacks()
      this.currentRound++
    },
    surrender() {
      this.winner = "You Lost!"
    },
  },
}).mount("#game")
