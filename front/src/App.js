import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Main from './component/Main';
import  SendMail  from './component/SendMail';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/send-mail" element={<SendMail/>}/>
      </Routes> 
    </Router>
  );
}

export default App;
