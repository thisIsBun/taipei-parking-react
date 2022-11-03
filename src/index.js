import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store";


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);


ReactDOM.render(
  <React.StrictMode>
    {/* 利用 Provider把 redux裡的 store值傳給 App */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// reportWebVitals();