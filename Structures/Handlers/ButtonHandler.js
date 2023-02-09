async function loadButton(client) {
    const { loadFiles } = require('../Functions/fileLoader');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading("Button Handler");

    await client.buttons.clear();

    const Files = await loadFiles("Buttons")

    Files.forEach((file) => {
        const buttonFile = require(file);

        if(!buttonFile.id) return;

        client.buttons.set(buttonFile.id, buttonFile);

        table.addRow(buttonFile.id, "LOADED");
    });

    return console.log(table.toString()); 
}

module.exports = { loadButton };