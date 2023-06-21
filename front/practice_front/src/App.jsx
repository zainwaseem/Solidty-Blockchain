import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
const App = () => {
  return (
    <div id="myApp">
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <Router />        
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    </div>
  );
};

export default App;
