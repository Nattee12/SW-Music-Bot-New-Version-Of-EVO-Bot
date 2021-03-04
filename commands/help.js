const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions of 𝙎𝙒メ MUSIC",
  execute(client ,message , args) {
    var allcmds = "";

    client.commands.forEach(cmd => {
      let cmdinfo = cmd.info
      allcmds += "`" + client.config.prefix + cmdinfo.name + " " + cmdinfo.usage + "` ~ " + cmdinfo.description + "\n"
    })

    let embed = new MessageEmbed()
      .setAuthor("Commands of " + client.user.username, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setColor("Random")
      .setDescription(allcmds)
      .setFooter(`To get info of each command you can do ${client.config.prefix}help [command] | Made by Kabir Jaipal#2021`)

    if (!args[0]) return message.channel.send(embed)
    else {
      let cmd = args[0]
      let command = client.commands.get(cmd)
      if (!command) command = client.commands.find(x => x.info.aliases.includes(cmd))
      if (!command) return message.channel.send("Unknown Command")
      let commandinfo = new MessageEmbed()
        .setTitle("Command: " + command.info.name + " info")
        .setColor("YELLOW")
        .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
Aliases: ${command.info.aliases.join(", ")}
`)
      message.channel.send(commandinfo)
    }
  }
};
