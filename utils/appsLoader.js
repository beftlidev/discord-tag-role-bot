const fs = require("fs")

module.exports = async(client, clearCache) => {

  const loadApps = () => {

    let commandPath = "./appsCommands"
    let loadedCount = 0;
    let errorCount = 0;

    for (const file of fs.readdirSync(commandPath).filter((file) => file.endsWith(".js"))) {

      try {
        if(clearCache == "true") {
          delete require.cache[require.resolve(`../appsCommands/${file}`)]
        }

        const command = require(`../appsCommands/${file}`);
        
        if (!command.data || !command.data.name) {
          console.error(`❌ APPS COMMANDS | Error in ${file}: Missing command data or name`);
          errorCount++;
          continue;
        }
        
        client.commands.set(command.data.name, command);
        loadedCount++;
        
      } catch (error) {
        console.error(`❌ APPS COMMANDS | Error loading ${file}:`, error.message);
        errorCount++;
      }

    }

    if (errorCount > 0) {
      console.log(`⚠️  APPS COMMANDS | ${loadedCount} loaded successfully, ${errorCount} failed to load.`);
    } else {
      console.log(`✅ APPS COMMANDS | All ${loadedCount} commands successfully loaded.`);
    }

  }

  loadApps()

}
