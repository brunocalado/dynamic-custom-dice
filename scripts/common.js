export class common {
  
  // ---------------------------------------------------------
  // Clean the name 
  static splitPath(str) {
    // Name Cleaning
    let imageName = str.split('\\').pop().split('/').pop(); // remove path
    imageName = imageName.split('.').slice(0, -1).join('.'); // remove extension
    return decodeURI( imageName );
  }
  
  // ---------------------------------------------------------
  // This will read the images in a folder and create an Object.
  static async diceImagesParser(folderName, diceType) {
    const diceSides = parseInt( diceType.replace('d','') );
    let data = {}; 
    
    let {files} = await FilePicker.browse("data", folderName);

    for (let imagePath of files) {
      const fileName = this.splitPath(imagePath).split('_');
      const sideNumber = parseInt(fileName[0], 10);
      const imageType = fileName[1];
        
      if (imageType=='label') {
        if (!data.labels) {
          data.labels = [];
        }
        data.labels.push(imagePath);
      }
      if (imageType=='bump') {
        if (!data.bumpMaps) {
          const arr = new Array(diceSides).fill(null);
          data.bumpMaps = arr;          
        }        
        data.bumpMaps[sideNumber-1] = imagePath;
      }
      if (imageType=='emission') {
        if (!data.emissiveMaps) {
          const arr = new Array(diceSides).fill(null);
          data.emissiveMaps = arr;
        }        
        data.emissiveMaps[sideNumber-1] = imagePath;
      }      
      if (imageType=='dummy') {
        if (!data.labels) {
          data.labels = [];
        }        
        data.labels.push( sideNumber.toString() );
      }       
    }

    return data;    
  }

  static async readFolder() {
    const basePath = '';    
    const templateData = {basePath: basePath}; 
    const dialogTemplate = await renderTemplate( `modules/dynamic-custom-dice/templates/dice-image-folder-dialog.html`, templateData );                
    
    new Dialog({
      title: `Folder`,
      content: dialogTemplate,
      buttons: {
        roll: {
          label: "Update",
          callback: async (html) => {
            const folderPath = html.find("input[name=folder-path]").val();  
            const diceType = html.find("select[name=select_dice_type]").val();  
            const imgs = await this.diceImagesParser(folderPath, diceType);
            
            switch(diceType) {
              case 'd6':
                game.settings.set("dynamic-custom-dice", "d6jsondata", JSON.stringify(imgs));
                break;
              case 'd8':
                game.settings.set("dynamic-custom-dice", "d8jsondata", JSON.stringify(imgs));
                break;
              case 'd20':
                game.settings.set("dynamic-custom-dice", "d20jsondata", JSON.stringify(imgs));
                break;                
              default:
                break;
            }            
          }
        }, 
        cancel: {
          label: "Cancel"
        }
      },
      render: (html) => listener(html)
    }).render(true);

    function listener(html) {
      html.find(".picker-button").on("click", function() {
        new FilePicker({
          type: "folder",
          callback: function (path) {
            html.find("input[name=folder-path]").val(path);
        }}).render(true);
      });
    }    
    
  }
  
  // ---------------------------------------------------------
  // test
  static debug() {
    console.log("DEBUG=========================");
    console.log(JSON.parse(game.settings.get( "dynamic-custom-dice", "d4jsondata")));  
    console.log(JSON.parse(game.settings.get( "dynamic-custom-dice", "d6jsondata")));
    console.log(JSON.parse(game.settings.get( "dynamic-custom-dice", "d8jsondata")));
    console.log(JSON.parse(game.settings.get( "dynamic-custom-dice", "d10jsondata")));
    console.log(JSON.parse(game.settings.get( "dynamic-custom-dice", "d12jsondata")));      
    console.log(JSON.parse(game.settings.get( "dynamic-custom-dice", "d20jsondata"))); 
    console.log("==============================");
  } 
}