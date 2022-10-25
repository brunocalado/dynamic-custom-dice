const moduleName = 'dynamic-custom-dice';
import { common } from './common.js';

Hooks.once('i18nInit', () => {
  // --------------------------------------------------
  // Load API
  game.modules.get(moduleName).dcd = { common }; 
  /* Request with: 
    const dcd = game.modules.get('dynamic-custom-dice')?.dcd;
    dcd.common.debug();
  */

  // --------------------------------------------------
  // SETTINGS
  const debouncedReload = debounce(() => location.reload(), 1000); // RELOAD AFTER CHANGE

  // Data --------------------------------------------------------------
  // call this with: game.settings.get("dynamic-custom-dice", "d20jsondata")
  game.settings.register(moduleName, `d20jsondata`, {
    name: "D20 Data",
    hint: "This should be a valid json with the images data, use the macro to auto set this. Changing this settings will reload the world.",
    scope: 'world',
    config: false,
    default: '',
    type: String,
    onChange: debouncedReload
  });

  // call this with: game.settings.get("dynamic-custom-dice", "d6jsondata")
  game.settings.register(moduleName, `d6jsondata`, {
    name: "D6 Data",
    hint: "This should be a valid json with the images data, use the macro to auto set this. Changing this settings will reload the world.",
    scope: 'world',
    config: false,
    default: '',
    type: String,
    onChange: debouncedReload
  });
  
  // Optons --------------------------------------------------------------
  // call this with: game.settings.get("dynamic-custom-dice", "d6settingname")
  game.settings.register(moduleName, `d6settingname`, {
    name: "D6 Name",
    hint: "This is the name of the dice that shows in Dice So Nice Settings. Changing this settings will reload the world.",
    scope: 'world',
    config: true,
    default: 'My Custom D6',
    type: String,
    onChange: debouncedReload
  });
  
  // call this with: game.settings.get("dynamic-custom-dice", "d20settingname")
  game.settings.register(moduleName, `d20settingname`, {
    name: "D20 Name",
    hint: "This is the name of the dice that shows in Dice So Nice Settings. Changing this settings will reload the world.",
    scope: 'world',
    config: true,
    default: 'My Custom D20',
    type: String,
    onChange: debouncedReload
  });

  // call this with: game.settings.get("dynamic-custom-dice", "diceemission")
  game.settings.register(moduleName, `diceemission`, {
    name: "Light Color",
    hint: "Color of the light (hexa code) emited by the dice",
    scope: 'world',
    config: true,
    default: '0x00ff00',
    type: String
  });  
});

Hooks.once('diceSoNiceReady', (dice3d) => {
  let imgs;
  let data;
  
  // ---------------------------------------------------------
  // d6
  if ( game.settings.get("dynamic-custom-dice", "d6jsondata")!='' ) {
    dice3d.addSystem({id: "d6SystemID", name: game.settings.get("dynamic-custom-dice", "d6settingname") }, false);
    imgs = JSON.parse( game.settings.get("dynamic-custom-dice", "d6jsondata") );
console.log(imgs)
    data = {
      type:"d6",
      system:"d6SystemID"
    }

    if (imgs.Labels.length>0) {
      data.labels = imgs.Labels;
    }
    if (imgs.Bumps.length>0) {
      data.bumpMaps = imgs.Bumps;
    }
    if (imgs.Emissive.length>0) {
      data.emissiveMaps = imgs.Emissive;
      data.emissive = game.settings.get("dynamic-custom-dice", "diceemission");
    } 

    dice3d.addDicePreset(data);
  }

  // ---------------------------------------------------------
  // d20
  if ( game.settings.get("dynamic-custom-dice", "d20jsondata")!='' ) {
    dice3d.addSystem({id: "d20SystemID", name: game.settings.get("dynamic-custom-dice", "d20settingname") }, false);
    imgs = JSON.parse( game.settings.get("dynamic-custom-dice", "d20jsondata") );
    
    data = {
      type:"d20",
      system:"d20SystemID"      
    }

    if (imgs.Labels.length>0) {
      data.labels = imgs.Labels;
    }
    if (imgs.Bumps.length>0) {
      data.bumpMaps = imgs.Bumps;
    }
    if (imgs.Emissive.length>0) {
      data.emissiveMaps = imgs.Emissive;
      data.emissive = game.settings.get("dynamic-custom-dice", "diceemission");      
    } 

    dice3d.addDicePreset(data);
  }
 
});