import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MaterialRequestList from "./pages/MaterialRequestList";
import MaterialRequestForm from "./pages/MaterialRequestForm";

function App() {
  return (
    <Router>
      <div className="app-root">
        <Header />
        <main className="container app-main">
          <Routes>
            <Route path="/" element={<MaterialRequestList />} />
            <Route path="/requests/new" element={<MaterialRequestForm />} />
            <Route path="/requests/edit/:id" element={<MaterialRequestForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
