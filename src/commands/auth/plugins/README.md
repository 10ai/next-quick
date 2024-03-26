The plugins directory should be used for automatically installing packages after command run.
Use the config.json file to turn on/off plugins you'd like to enable _for all projects that run this command_

```
{
    "name": "name-of-command",
    "plugins": {
        "prettier": true,
        "husky": false
    }
}
```

As long as the command's TypeScript file is set up correctly to read and install the config.json packages, then this example config.json will run the prettier plugin but not the husky plugin.

When adding to this directory, make sure to update config.json and index.ts

You can begin adding a plugin by copying the PLUGIN_TEMPLATE.ts file located at /commands/COMMAND_TEMPLATE/plugins/PLUGIN_TEMPLATE.ts
