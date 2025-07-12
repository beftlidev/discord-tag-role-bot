module.exports = {
    bot: {
        id: "", // required
        version: "0.0.1",
        owner: "", // required
        support: "", // optional
        website: "", // optional
        statusMessages: [
            "🐈 meow 🐈 meow 🐈 meow 🐈",
        ]
    },
    token: {
        bot: "", // required
        topGG: "" // optional
    },
    guild: {
        id: "", // required
        tag: {
            logChannelId: "", //optional
            raw: "", // optional
            roleId: "" // required - role to be given
        }
    },
    webhook: { // optional
        status: {
            id: "",
            token: ""
        },
        error: {
            id: "",
            token: ""
        },
    },
    emoji: {
        checkmark: "<:checkmark:1196518475275960330>",
        cross: "<:cross:1196518471232655440>",
        info: "<:info:1196518477469585528>",
        cooldown: "<:cooldown:1213924898695675904>",
        loading: "<a:loading:1196516175476162750>",
    },
    emojiId: {
        checkmark: "1196518475275960330",
        cross: "1196518471232655440",
        info: "1196518477469585528",
        cooldown: "1213924898695675904",
        loading: "1196516175476162750",
    }
}   