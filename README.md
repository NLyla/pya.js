## pya.js
```code 
npm install pya.js
```
After that, you only need to create options for the file, use the template below, to make it easier for you 

```js
const { AttachmentBuilder } = require("discord.js")
const Image = require("pya.js")

const canvas = await Image({
  name: "PyaPyaPya",
  text: "pya is very cute",
  backgroundURL: "https://my-background.png", // can only image url
  avatarURL: "https://my-avatar.png", // can only image url
  shadow: {
    enabled: true, // whatever, but my recommendation is true
    blur: 10, // for better results, I recommend 10-15
    color: "random" // I can only use hex and "random"
  },
  border: {
    enabled: true, // whatever, but my recommendation is true
    color: "random" // hex or "random"
  },
  cover: {
    enabled: true, // If shadows are enabled, I also recommend this to be enabled
    opacity: 0.5, // You can set it from 0.1 to 1
    color: "random" // hex or "random"
  },
  color: {
    name: "#FF658B", // hex or "random"
    text: "#FFFFFF" // hex or "random"
  }
})

const attachment = new AttachmentBuilder(await canvas.encode("png"), {
  name: "pya-image.png"
})

message.channel.send({files: [attachment]})

```
### finish
congratulations (｡♡‿♡｡)

> [This is me](https://discord.com/users/1158414739156779018)
give me suggestions for the future, by sending me a message on discord 
