const fs = require("fs")

fs.writeFile("meta.log", "hello there", () => {
    console.log("Export handled")
})