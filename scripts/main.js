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
  // call this with: game.settings.get("dynamic-custom-dice", "d4jsondata")
  game.settings.register(moduleName, `d4jsondata`, {
    name: "D4 Data",
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
  
  // call this with: game.settings.get("dynamic-custom-dice", "d8jsondata")
  game.settings.register(moduleName, `d8jsondata`, {
    name: "D8 Data",
    hint: "This should be a valid json with the images data, use the macro to auto set this. Changing this settings will reload the world.",
    scope: 'world',
    config: false,
    default: '',
    type: String,
    onChange: debouncedReload
  });

  // call this with: game.settings.get("dynamic-custom-dice", "d10jsondata")
  game.settings.register(moduleName, `d10jsondata`, {
    name: "D10 Data",
    hint: "This should be a valid json with the images data, use the macro to auto set this. Changing this settings will reload the world.",
    scope: 'world',
    config: false,
    default: '',
    type: String,
    onChange: debouncedReload
  });
  
  // call this with: game.settings.get("dynamic-custom-dice", "d12jsondata")
  game.settings.register(moduleName, `d12jsondata`, {
    name: "D12 Data",
    hint: "This should be a valid json with the images data, use the macro to auto set this. Changing this settings will reload the world.",
    scope: 'world',
    config: false,
    default: '',
    type: String,
    onChange: debouncedReload
  });
  
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
  
  // Options --------------------------------------------------------------
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

  // call this with: game.settings.get("dynamic-custom-dice", "d8settingname")
  game.settings.register(moduleName, `d8settingname`, {
    name: "D8 Name",
    hint: "This is the name of the dice that shows in Dice So Nice Settings. Changing this settings will reload the world.",
    scope: 'world',
    config: true,
    default: 'My Custom D8',
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
  let importedData;
  let data;
  
  // ---------------------------------------------------------
  // d6
  if ( game.settings.get("dynamic-custom-dice", "d6jsondata")!='' ) {
    dice3d.addSystem({id: "d6SystemID", name: game.settings.get("dynamic-custom-dice", "d6settingname") }, false);
    importedData = JSON.parse( game.settings.get("dynamic-custom-dice", "d6jsondata") );

    data = importedData;
    data.type = "d6";
    data.system = "d6SystemID";

    if (data.emissiveMaps) {
      data.emissive = game.settings.get("dynamic-custom-dice", "diceemission");
    } 

    dice3d.addDicePreset(data);
  }

  // ---------------------------------------------------------
  // d8
  if ( game.settings.get("dynamic-custom-dice", "d8jsondata")!='' ) {
    dice3d.addSystem({id: "d8SystemID", name: game.settings.get("dynamic-custom-dice", "d8settingname") }, false);
    importedData = JSON.parse( game.settings.get("dynamic-custom-dice", "d8jsondata") );
    
    data = importedData;
    data.type = "d8";
    data.system = "d8SystemID";

    if (data.emissiveMaps) {
      data.emissive = game.settings.get("dynamic-custom-dice", "diceemission");
    } 

    dice3d.addDicePreset(data);
  }

  // ---------------------------------------------------------
  // d20
  if ( game.settings.get("dynamic-custom-dice", "d20jsondata")!='' ) {
    dice3d.addSystem({id: "d20SystemID", name: game.settings.get("dynamic-custom-dice", "d20settingname") }, false);
    importedData = JSON.parse( game.settings.get("dynamic-custom-dice", "d20jsondata") );
    
    data = importedData;
    data.type = "d20";
    data.system = "d20SystemID";

    if (data.emissiveMaps) {
      data.emissive = game.settings.get("dynamic-custom-dice", "diceemission");
    } 

    dice3d.addDicePreset(data);
  }

});