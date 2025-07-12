const Discord = require('discord.js')
const { Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType, EmbedBuilder, WebhookClient, PermissionsBitField } = require("discord.js")
const config = require('../config')

async function invite({ type = "row" } = {}) {

    const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(`https://ptb.discord.com/oauth2/authorize?client_id=${config.bot.id}`)
        .setLabel("Invite")

    if (type == "row") {
        return new ActionRowBuilder()
            .addComponents(
                button
            )
    } else if (type == "button") {
        return button
    }

}

async function voteMe({ type = "row" } = {}) {

    const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(`https://top.gg/bot/${config.bot.id}/vote`)
        .setLabel("Vote Me")

    if (type == "row") {
        return new ActionRowBuilder()
            .addComponents(
                button
            )
    } else if (type == "button") {
        return button
    }

}

async function support({ type = "row" } = {}) {

    const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(config.bot.support || "https://example.com")
        .setLabel("Support Server")

    if (type == "row") {
        return new ActionRowBuilder()
            .addComponents(
                button
            )
    } else if (type == "button") {
        return button
    }

}

async function website({ label = "Website", type = "row" } = {}) {

    const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(config.bot.website || "https://example.com")
        .setLabel(label)

    if (type == "row") {
        return new ActionRowBuilder()
            .addComponents(
                button
            )
    } else if (type == "button") {
        return button
    }

}

async function link({ label = "Link", type = "row", link = "https://example.com", emoji }) {

    const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(link)
        .setLabel(label)

    if(emoji) button.setEmoji(emoji);

    if (type == "row") {
        return new ActionRowBuilder()
            .addComponents(
                button
            )
    } else if (type == "button") {
        return button
    }
    
}

module.exports = {
    invite,
    voteMe,
    support,
    website,
    link
} 