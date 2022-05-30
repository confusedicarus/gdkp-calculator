class Raid {
    constructor(payout, players, tankCount, healerCount, orgCut) {
        this.payout = payout;
        this.players = players;
        this.tankCount = tankCount;
        this.healerCount = healerCount
        this.orgCut = orgCut;
    }
    getPayout(){
        return this.payout
    }
    getPlayers(){
        return this.players;
    }
    getTankCount(){
        return this.tankCount;
    }
    getHealerCount(){
        return this.healerCount
    }
    getOrgCut(){
        return this.orgCut
    }
}
module.exports = Raid