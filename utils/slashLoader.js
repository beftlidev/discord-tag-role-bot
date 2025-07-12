const fs = require("fs")
const { Collection } = require("discord.js")

module.exports = async(client, clearCache) => {

  const loadSlashs = () => {

    let commandPath = "./commands"
    let loadedCount = 0;
    let errorCount = 0;

    for (const file of fs.readdirSync(commandPath).filter((file) => file.endsWith(".js"))) {

      try {
        if(clearCache == "true") {
          delete require.cache[require.resolve(`../commands/${file}`)]
        }

        const command = require(`../commands/${file}`);
        
        if (!command.data || !command.data.name) {
          console.error(`❌ SLASH COMMANDS | Error in ${file}: Missing command data or name`);
          errorCount++;
          continue;
        }
        
        client.commands.set(command.data.name, command);
        loadedCount++;
        
      } catch (error) {
        console.error(`❌ SLASH COMMANDS | Error loading ${file}:`, error.message);
        errorCount++;
      }

    }

    if (errorCount > 0) {
      console.log(`⚠️  SLASH COMMANDS | ${loadedCount} loaded successfully, ${errorCount} failed to load.`);
    } else {
      console.log(`✅ SLASH COMMANDS | All ${loadedCount} commands successfully loaded.`);
    }

  }

  loadSlashs()

}
