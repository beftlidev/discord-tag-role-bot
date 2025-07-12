const { readdirSync } = require("fs")

module.exports = (client, clearCache) => {

  const loadEvents = () => {

    var events = readdirSync("./events")
    var files;
    let loadedCount = 0;
    let errorCount = 0;
    
    for(var event in events) {
  
      if (!events[event].endsWith(".js")) {
  
        try {
          files = readdirSync(`./events/${events[event]}`)
        } catch (error) {
          console.error(`❌ EVENTS | Error reading directory ${events[event]}:`, error.message);
          errorCount++;
          continue;
        }
  
        for(var file in files) {

          try {
            if(clearCache == "true") {
              delete require.cache[require.resolve(`../events/${events[event]}/${files[file]}`)]
            }

            const props = require(`../events/${events[event]}/${files[file]}`)
            
            if (!props.name || !props.run) {
              console.error(`❌ EVENTS | Error in ${events[event]}/${files[file]}: Missing name or run function`);
              errorCount++;
              continue;
            }
            
            client.on(props.name, (...data) => props.run(client, ...data))
            loadedCount++;
            
          } catch (error) {
            console.error(`❌ EVENTS | Error loading ${events[event]}/${files[file]}:`, error.message);
            errorCount++;
          }
          
        }
        
      } else {

        try {
          if(clearCache == "true") {
            delete require.cache[require.resolve(`../events/${events[event]}`)]
          }
          
          const props = require(`../events/${events[event]}`)
          
          if (!props.name || !props.run) {
            console.error(`❌ EVENTS | Error in ${events[event]}: Missing name or run function`);
            errorCount++;
            continue;
          }
          
          client.on(props.name, (...data) => props.run(client, ...data))
          loadedCount++;
          
        } catch (error) {
          console.error(`❌ EVENTS | Error loading ${events[event]}:`, error.message);
          errorCount++;
        }
  
      }
      
    }
  
    if (errorCount > 0) {
      console.log(`⚠️  EVENTS | ${loadedCount} loaded successfully, ${errorCount} failed to load.`);
    } else {
      console.log(`✅ EVENTS | All ${loadedCount} events successfully loaded.`);
    }

  }

  loadEvents()
  
}