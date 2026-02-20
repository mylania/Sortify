
# Sortify
With this [Spicetify](https://spicetify.app/) extension, you can sort your playlist by artist! <br/>
Spotify already offers the option to sort songs by artist, but this is only stored locally. The extension creates a new playlist and automatically replaces the unsorted playlist.

![Screenshot](https://github.com/mylania/Sortify/blob/main/Artist.png)

## Installation
Install [Spicetify](https://spicetify.app/) first. To install the extension, first download Sortify.js from [here](https://github.com/Xeralin/Sortify/blob/main/Sortify.js). Then you need to enter a few commands in the terminal.
First, open the Spicetify folder:
```bash
spicetify config-dir
```
Then place the Sortify.js file in the **Extension** folder.
Finally, you need to adjust the configuration:
```bash
spicetify config extensions Sortify.js
spicetify apply
```

<br/>

## Uninstallation
If you want to remove the extension, you can enter the following in the terminal:
```bash
spicetify config extensions Sortify.js-
```
