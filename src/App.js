import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Write from './components/Write';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Write/>}/>
          <Route path='/Write' element={<Write/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
