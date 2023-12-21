const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const qdb = require('quick.db');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  setBotStatus();

  setInterval(() => {
    setBotStatus();
  }, 600000); // 10 minutes
});




const { MessageEmbed } = require("discord.js");

// Declara un contador fuera de la función para llevar un seguimiento de los tickets
let ticketCounter = 1;

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "ticket") {
      await interaction.deferUpdate();

      // Encuentra el rol de @everyone
      const everyone = interaction.guild.roles.cache.find((r) => r.name === "@everyone");

      // Crea el nombre del canal con el contador
      const channelName = `ticket-${ticketCounter}`;

      // Incrementa el contador para el próximo ticket
      ticketCounter++;

      // Crea el canal con el nombre generado y otras configuraciones
      const createdChannel = await interaction.guild.channels.create(channelName, {
        type: "GUILD_TEXT",
        parent: "1186164522449383475",
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
        ],
      });

      // Verifica si el canal se creó correctamente
      if (createdChannel) {
        // Envia un mensaje embed con información del ticket
        const embed = new MessageEmbed()
          .setTitle("Nuevo Ticket Creado")
          .setDescription(`Se ha creado un nuevo ticket: ${createdChannel}`)
          .setColor("#00ff00"); // Puedes cambiar el color a tu preferencia

        interaction.reply({ embeds: [embed] });
      } else {
        // Manejar el caso en que el canal no se creó correctamente
        interaction.followUp("Hubo un problema al crear el ticket. Por favor, inténtalo de nuevo.");
      }
    }
  }
});





//el pendejo el pendejo







function setBotStatus() {
  const guildsCount = client.guilds.cache.size;
  const usersCount = client.users.cache.size;

  client.user.setPresence({
    activities: [
      {
        name: 'mc.hyvortex.biz',
        type: 'PLAYING',
      },
    ],
     status: 'online',
  });
}

function showBotInfo(message) {
  const botInfoEmbed = {
    color: 0x0099ff,
    title: 'Información del Bot',
    fields: [
      {
        name: 'Servidores',
        value: `${client.guilds.cache.size}`,
        inline: true,
      },
      {
        name: 'Usuarios',
        value: `${client.users.cache.size}`,
        inline: true,
      },
      {
        name: 'Versión',
        value: '1.0.0',
      },
    ],
  };

  message.channel.send({ embeds: [botInfoEmbed] });
}

const mySecret = process.env.MYTOKEN;
client.login(mySecret);





