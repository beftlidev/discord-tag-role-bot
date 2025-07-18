const JsonDatabase = require("../functions/database.js")

const data = "./databases/"

const BlackList = new JsonDatabase({
    databasePath: data + "Bot/blacklist.json"
})

const CoolDown = new JsonDatabase({
    databasePath: data + "Bot/cooldown.json"
})

const Profile = new JsonDatabase({
    databasePath: data + "Bot/profile.json"
})

const Tag = new JsonDatabase({
    databasePath: data + "Guild/tag.json"
})

module.exports = {
    BlackList, CoolDown, Profile, Tag
}