import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Write from './components/Write';
import Read from './components/Read';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Write' element={<Write/>}/>
          <Route path='/Read' element={<Read/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
