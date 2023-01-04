import { App } from "./app/App";
import { appContainer } from "./config/dependency/Container";
import { TYPES } from "./config/dependency/types";
import { CrypTool } from "./utils/auth/CrypTool";

var app:App = appContainer.get(TYPES.App)
var cryp: CrypTool = appContainer.get(TYPES.CrypTool)
cryp.encodePassword("pass").then( pass =>
    console.log(pass)
)
app.start()