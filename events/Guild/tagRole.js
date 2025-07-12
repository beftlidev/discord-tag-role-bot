const { Events } = require("discord.js");
const config = require("../../config");
const { successEmbed, errorEmbed } = require("../../functions/embed");
const { Tag } = require("../../helpers/databases");

module.exports = {
    name: 'raw',
    run: async (client, packet) => {

        const rawData = {
            event: packet.t,
            data: packet.d
        };

        if (rawData.event === 'GUILD_MEMBER_UPDATE') {

            if (!config.guild.id || !config.guild.tag.roleId) {
                console.error('Environment variables not set');
                return;
            }

            if (rawData.data.guild_id !== config.guild.id) {
                return;
            }

            const guild = client.guilds.cache.get(config.guild.id);
            if (!guild) {
                console.error('Guild not found');
                return;
            }

            let member = guild.members.cache.get(rawData.data.user.id);
            if (!member) {
                try {
                    member = await guild.members.fetch(rawData.data.user.id);
                } catch (error) {
                    console.error('Member not found in guild');
                    return;
                }
            }

            const role = guild.roles.cache.get(config.guild.tag.roleId);
            if (!role) {
                console.error('Role not found');
                return;
            }

            const userTag = rawData.data.user.primary_guild?.tag;
            const userTagGuildId = rawData.data.user.primary_guild?.identity_guild_id;
            const hasCorrectTag = userTagGuildId === config.guild.id;
            const hasRole = member.roles.cache.has(role.id);

            const logChannel = config.guild.tag.logChannelId ? guild.channels.cache.get(config.guild.tag.logChannelId) : null;

            if (hasCorrectTag && !hasRole) {
                if (await Tag.fetch(`${rawData.data.user.id}.isSelected`)) return;
                try {
                    await Tag.set(`${rawData.data.user.id}.isSelected`, true)
                    await member.roles.add(role);
                    const logMessage = `Role \`${role.name}\` added to **${member.user.username}** ( \`${member.user.id}\` ) for guild tag \`${userTag}\``;

                    if (logChannel && logChannel.isTextBased()) {
                        await logChannel.send({
                            embeds: [
                                await successEmbed({
                                    description: `${logMessage}`
                                })
                            ]
                        });
                    } else {
                        console.log(logMessage);
                    }
                } catch (error) {
                    console.error('Failed to add role:', error);
                    if (logChannel && logChannel.isTextBased()) {
                        await logChannel.send({
                            embeds: [
                                await errorEmbed({
                                    description: `Failed to add role to **${member.user.username}** ( \`${member.user.id}\` ): ${error.message}`
                                })
                            ]
                        });
                    }
                }
            } else if (!hasCorrectTag && hasRole) {
                if (!await Tag.fetch(`${rawData.data.user.id}.isSelected`)) return;
                try {
                    await Tag.set(`${rawData.data.user.id}.isSelected`, false)
                    await member.roles.remove(role);
                    const logMessage = `Role \`${role.name}\` removed from **${member.user.username}** ( \`${member.user.id}\` ) - no guild tag or wrong tag: \`${userTag}\``;

                    if (logChannel && logChannel.isTextBased()) {
                        await logChannel.send({
                            embeds: [
                                await successEmbed({
                                    description: `${logMessage}`
                                })
                            ]
                        });
                    } else {
                        console.log(logMessage);
                    }
                } catch (error) {
                    console.error('Failed to remove role:', error);
                    if (logChannel && logChannel.isTextBased()) {
                        await logChannel.send({
                            embeds: [
                                await errorEmbed({
                                    description: `Failed to remove role from **${member.user.username}** ( \`${member.user.id}\` ): ${error.message}`
                                })
                            ]
                        });
                    }
                }
            }
        }
    }
};