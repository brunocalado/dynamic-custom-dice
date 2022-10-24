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
  // test
  static async diceImagesParser(folderName) {
    let imgs = {}; 
    imgs.Labels = [];
    imgs.Bumps = [];
    imgs.Emissive = [];
    
    let {files} = await FilePicker.browse("data", folderName);
    
    for (let imagePath of files) {
      const fileName = this.splitPath(imagePath).split('_');
      const side = fileName[0];
      const imageType = fileName[1];
        
      if (imageType=='label') {
        imgs.Labels.push(imagePath);
      }
      if (imageType=='bump') {
        imgs.Bumps.push(imagePath);
      }
      if (imageType=='emission') {
        imgs.Emissive.push(imagePath);
      }      
      if (imageType=='dummy') {
        imgs.Labels.push(side);
      }       
    }

    return imgs;    
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
            const imgs = await this.diceImagesParser(folderPath);
            
            switch(diceType) {
              case 'd4':
                game.settings.set("dynamic-custom-dice", "d4jsondata", JSON.stringify(imgs));
                break;
              case 'd6':
                game.settings.set("dynamic-custom-dice", "d6jsondata", JSON.stringify(imgs));
                break;
              case 'd8':
                game.settings.set("dynamic-custom-dice", "d8jsondata", JSON.stringify(imgs));
                break;
              case 'd10':
                game.settings.set("dynamic-custom-dice", "d10jsondata", JSON.stringify(imgs));
                break;
              case 'd12':
                game.settings.set("dynamic-custom-dice", "d12jsondata", JSON.stringify(imgs));
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
    console.log( game.settings.get("dynamic-custom-dice", "d6jsondata") );
    console.log("==============================");
  } 
}