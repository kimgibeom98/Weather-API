import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalFont } from './component/GlobalFont'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <GlobalFont />
    <App />
  </>
);
