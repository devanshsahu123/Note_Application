import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogSignLayOut from './components/LoginSignup/LogSignLayOut.js';
import LayOut from './components/LayOut.js';
import NoteLayOut from './components/Note/NoteLayOut.js';
import ViewNote from './components/Note/ViewNote.js';
import AddNote from './components/Note/AddNote.js';
import { Navigate } from 'react-router-dom';
function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/view-note'/>}/>
        <Route path='/login-signup' element={<LogSignLayOut />} />
        <Route element={<LayOut />}>
          <Route element={<NoteLayOut />}>
            <Route path='/view-note' element={<ViewNote />} />
            <Route path='/add-note' element={<AddNote />} />
            <Route path='/update-note/:id' element={<AddNote />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
