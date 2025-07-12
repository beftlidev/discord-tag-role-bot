const { readdirSync } = require("fs")

module.exports = (client, clearCache) => {

  const loadEvents = () => {

    var events = readdirSync("./helpers/processEvents")
    var files;
    let loadedCount = 0;
    let errorCount = 0;

    for(var event in events) {
  
      if (!events[event].endsWith(".js")) {
  
        try {
          files = readdirSync(`./helpers/processEvents/${events[event]}`)
        } catch (error) {
          console.error(`❌ PROCESS EVENTS | Error reading directory ${events[event]}:`, error.message);
          errorCount++;
          continue;
        }
  
        for(var file in files) {

          try {
            if(clearCache == "true") {
              delete require.cache[require.resolve(`../helpers/processEvents/${events[event]}/${files[file]}`)]
            }

            const props = require(`../helpers/processEvents/${events[event]}/${files[file]}`)
            
            if (!props.name || !props.run) {
              console.error(`❌ PROCESS EVENTS | Error in ${events[event]}/${files[file]}: Missing name or run function`);
              errorCount++;
              continue;
            }
            
            process.on(props.name, (...data) => props.run(client, ...data))
            loadedCount++;
            
          } catch (error) {
            console.error(`❌ PROCESS EVENTS | Error loading ${events[event]}/${files[file]}:`, error.message);
            errorCount++;
          }

        }
        
      } else {

        try {
          if(clearCache == "true") {
            delete require.cache[require.resolve(`../helpers/processEvents/${events[event]}`)]
          }
          
          const props = require(`../helpers/processEvents/${events[event]}`)
          
          if (!props.name || !props.run) {
            console.error(`❌ PROCESS EVENTS | Error in ${events[event]}: Missing name or run function`);
            errorCount++;
            continue;
          }
          
          process.on(props.name, (...data) => props.run(client, ...data))
          loadedCount++;
          
        } catch (error) {
          console.error(`❌ PROCESS EVENTS | Error loading ${events[event]}:`, error.message);
          errorCount++;
        }
  
      }
      
    }
  
    if (errorCount > 0) {
      console.log(`⚠️  PROCESS EVENTS | ${loadedCount} loaded successfully, ${errorCount} failed to load.`);
    } else {
      console.log(`✅ PROCESS EVENTS | All ${loadedCount} events successfully loaded.`);
    }

  }

  loadEvents()
  
}