import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store";
import { NoPage } from "./components/pages";


ReactDOM.render(
  <React.StrictMode>
    {/* 利用 Provider把 redux裡的 store值傳給 App */}
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/taipei-parking-react/" element={<App />} />
          <Route path="/taipei-parking-react/*" element={<NoPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();