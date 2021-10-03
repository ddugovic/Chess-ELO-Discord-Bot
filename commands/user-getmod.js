const { SlashCommandBuilder } = require('@discordjs/builders');


const Discord = require('discord.js');
const { Collection } = require('discord.js');
const Canvas = require('canvas');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { Permissions } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const Parser = require('expr-eval').Parser;
const fetch = require('node-fetch');

const jsGay = require('../util.js')

let embed
let row
let attachment

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getmod')
		.setDescription('List of roles that can moderate this bot ( excludes default MANAGE_SERVER roles ).')

    .addBooleanOption((option) =>
      option.setName('ephemeral').setDescription('Only you can see this message?')
    ),
    async execute(client, interaction, settings) {

      let [ratingRoles, puzzleRatingRoles, titleRoles, lichessRatingEquation, chessComRatingEquation, modRoles, timestamp, lichessAccount, chessComAccount, lichessAccountData, chessComAccountData] = await jsGay.getCriticalData(interaction)
      
      let ephemeral = interaction.options.getBoolean('ephemeral');

      let msgToSend = ""

      for (let i = 0; i < modRoles.length; i++)
      {
          msgToSend = msgToSend + "<@&" + modRoles[i] + ">\n"
      }

      if (msgToSend == "")
      {
          msgToSend = "None."
      }

      embed = new MessageEmbed()
          .setColor('#0099ff')
          .setDescription(msgToSend)

      interaction.editReply({ embeds: [embed], failIfNotExists: false, ephemeral: ephemeral})
	},
};