import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./components/app.component.js";
//ReactDOM.render(<App />, document.querySelector("#root"));
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);