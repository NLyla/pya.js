const Canvas = require("@napi-rs/canvas")
const { body, randomHex, wrapText } = require("./utils/function.js")

module.exports = async (options) => {
  // name .
  if (!options.name) {
    throw new Error("Pya Error: options.name is required.")
  }
  // text length
  if (options.text.length > 60) {
    throw new Error("Pya Error: options.text must be no more than 60 characters ")
  }
  // content shadow
  if (!options.shadow) {
    throw new Error("Pya Error: options.shadow , need to be set, enabled, color, blur")
  }
  
  if (typeof options.shadow.enabled !== "boolean") {
    throw new TypeError("Pya Error: options.shadow.enabled , requires false or true")
  }
  if (!options.shadow.color) {
    options.shadow.color = "#FFFFFF"
  }
  if (typeof options.shadow.blur !== "number") {
    throw new TypeError("Pya Error: options.shadow.blur, must be with a number")
  }
  if (!options.shadow.blur) {
    options.shadow.blur = 10
  }
  // primary background
  if (!options.backgroundURL) {
    options.backgroundURL = "https://cdn.discordapp.com/attachments/1158613124606349322/1158789833800560762/img.png?ex=651e2f61&is=651cdde1&hm=17376bbc6ace511bf0e9227ae492356cb98b72568e8137aaf6b9a51d87765704&"
  }
  if (!options.backgroundURL.startsWith("https")) {
    throw new Error("Pya Error: options.backgroundURL, should be with URL")
  }
  // square cover background 
  
  if (typeof options.cover.enabled !== "boolean") {
    throw new TypeError("Pya Error: options.cover.enabled , requires Boolean false or true")
  }
  if (!options.cover.opacity) {
    options.cover.opacity = 0.5
  }
  if (!options.cover.color) {
    options.cover.color = "#000000"
  }
  if (options.cover.opacity > 1) {
    throw new Error("Pya Error: options.cover.opacity maximum number is 1")
  }
  // avatar
  if (!options.avatarURL) {
    options.avatarURL = "https://cdn.discordapp.com/attachments/1158613124606349322/1159044774783897710/discord-avatar-512-3HOF0.png?ex=651e7410&is=651d2290&hm=1979090e59a384c927635c9e7d40a174625ae7a56203473ba4b5377cbf89f235&"
  }
  if (!options.avatarURL.startsWith("https")) {
    throw new Error("Pya Error: options.avatarURL, should be with URL")
  }
  // circle border 
  
  if (typeof options.border.enabled !== "boolean") {
    throw new TypeError("Pya Error: options.border.enabled , requires false or true")
  }
  if (!options.border.color) {
    return options.border.color = "#FF628B"
  }
  if (!options.color || !options.color.name || !options.color.text) {
    throw new Error("Pya Error: options.color.name and options.color.text are required")
  }


  // ===== [ MAIN FEATURES ] ===== //
  let name = options.name
  let text = options.text || "hello..... ෆ.̮ ෆ"
  let avatar = options.avatarURL
  let color = {
    name: options.color.name || "#FF628B",
    text: options.color.text || "#FFFFFF",
  }
  let background = options.backgroundURL
  let shadow = {
    enabled: options.shadow.enabled,
    color: options.shadow.color || "#FFFFFF",
    blur: options.shadow.blur || 10
  }
  let border = {
    enabled: options.border.enabled,
    color: options.border.color || "#FF628B"
  }

  if (color.name === "random") {
    color.name = randomHex()
  }
  if (color.text === "random") {
    color.text = randomHex()
  }
  if (shadow.color === "random") {
    shadow.color = randomHex()
  }
  if (border.color === "random") {
    border.color = randomHex()
  }
  if (options.cover.color === "random") {
    options.cover.color = randomHex()
  }

  let validCoverColor = options.cover.color.replace("#", "")
  let validNameColor = color.name.replace("#", "")
  let validTextColor = color.text.replace("#", "")
  let validBorderColor = border.color.replace("#", "")
  let validShadowColor = shadow.color.replace("#", "")


  const avatarCanvas = await Canvas.createCanvas(1000, 1000)
  const avatarCtx = await avatarCanvas.getContext("2d")
  const avatarImage = await Canvas.loadImage(await body(avatar))

  avatarCtx.beginPath()
  avatarCtx.arc(500, 500, 500, 0, Math.PI * 2, true)
  avatarCtx.clip()
  avatarCtx.drawImage(avatarImage, 0, 0, avatarCanvas.width, avatarCanvas.height)

  if (border.enabled === true) {
    avatarCtx.strokeStyle = `#${validBorderColor}`
    avatarCtx.lineWidth = 100
    avatarCtx.strokeRect(0, 0, avatarCanvas.width, avatarCanvas.height)
    avatarCtx.stroke()
  }

  const textCanvas = await Canvas.createCanvas(1000, 200);
  const textCtx = await textCanvas.getContext("2d")

  textCtx.font = "700 40px Noto Sans"
  textCtx.fillStyle = `#${validTextColor}`
  wrapText(textCtx, text, 20, 60, 600, 60)

  const nameCanvas = await Canvas.createCanvas(1000, 250)
  const nameCtx = await nameCanvas.getContext("2d")

  if (name.length > 20) name = name.substr(0, 20) + "..."

  nameCtx.font = `900 ${nameCanvas.width / (5 + (name.length/2))}px Noto Sans`
  nameCtx.fillStyle = `#${validNameColor}`
  nameCtx.fillText(name, 50, nameCanvas.height / 1.5)


  const coverCanvas = await Canvas.createCanvas(1280, 600)
  const coverCtx = await coverCanvas.getContext("2d")
  if (options.cover.enabled === true) {
    coverCtx.globalAlpha = options.cover.opacity
    coverCtx.rect(0, 0, coverCanvas.width, coverCanvas.height)
    coverCtx.beginPath()
    coverCtx.roundRect(40, 40, 1200, 520, [50])
    coverCtx.fillStyle = `#${validCoverColor}`
    coverCtx.fill()
  }
  const canvas = await Canvas.createCanvas(1280, 600)
  const ctx = await canvas.getContext("2d")
  const bg = await Canvas.loadImage(await body(background))

  if (shadow.enabled === true) {
    ctx.shadowBlur = shadow.blur
    ctx.shadowColor = `#${validShadowColor}`
  }

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(coverCanvas, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(avatarCanvas, 70, 100, 400, 400)
  ctx.drawImage(nameCanvas, 500, 80, 1000, 250)
  ctx.drawImage(textCanvas, 530, 280, 1000, 200)

  return canvas

} 
