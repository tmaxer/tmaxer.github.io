new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: '玩家攻击野怪，普通攻击，伤害值=' + damage
            })
            if(this.checkWin()) {
                return
            }

        
            this.monsterAttacks()

        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: '玩家攻击野怪，特殊攻击，伤害值=' + damage
            })

            if(this.checkWin()) {
                return
            }

            this.monsterAttacks()
        },
        heal: function() {
            if(this.playerHealth <= 90) {
                this.playerHealth += 10
            } else {
                this.playerHealth = 100
            }
            this.turns.unshift({
                isPlayer: true,
                text: '玩家使用治疗，增加10点生命值'
            })
            this.monsterAttacks()
        },
        giveUp: function() {
            this.gameIsRunning = false
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if( this.monsterHealth <= 0 ) {
                if(confirm("你胜利了!再来一局？")) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            } else if( this.playerHealth <= 0 ) {
                if(confirm("你失败了!再来一局？")) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            }
            return false
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer: false,
                text: '野怪攻击玩家，普通攻击，伤害值=' + damage
            })        
            this.checkWin()
        }


    }
})