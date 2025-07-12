const fs = require("fs")

module.exports = async(client, clearCache) => {

  const loadFunctions = async() => {

    let commandPath = "./functions"
    let loadedCount = 0;
    let errorCount = 0;

    for (const file of fs.readdirSync(commandPath).filter((file) => file.endsWith(".js"))) {

      try {
        if(clearCache == "true") {
            delete require.cache[require.resolve(`../functions/${file}`)]
        }

        require(`../functions/${file}`)
        loadedCount++;
        
      } catch (error) {
        console.error(`❌ FUNCTIONS | Error loading ${file}:`, error.message);
        errorCount++;
      }

    }

    if (errorCount > 0) {
      console.log(`⚠️  FUNCTIONS | ${loadedCount} loaded successfully, ${errorCount} failed to load.`);
    } else {
      console.log(`✅ FUNCTIONS | All ${loadedCount} functions successfully loaded.`);
    }
    console.log()

  }

  await loadFunctions()

}
