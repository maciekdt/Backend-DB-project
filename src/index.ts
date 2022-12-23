import { App } from "./app/App";
import { appContainer } from "./config/dependency/Container";
import { TYPES } from "./config/dependency/types";

var app:App = appContainer.get(TYPES.App)
app.start()