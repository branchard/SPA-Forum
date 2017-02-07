import "normalize.css";
import "../less/style.less";
/*eslint-disable no-unused-vars*/
import React from "react";
/*eslint-enable no-unused-vars*/
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import "material-ui/styles/";


/* Components */
import App from "./App";

// Needed for onTouchTap
injectTapEventPlugin();

// Render the main app react component into the app div.
ReactDOM.render(<App />, document.getElementById("react-target"));
