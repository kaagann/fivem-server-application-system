import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PageContent from "./compoments/PageContent";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { MainContect } from "./utils/context";
import { ROUTES } from "./utils/routes";

function App() {
  const [showSidebar, setSidebar] = useState(true);

  const data = {
    showSidebar,
    setSidebar
  }

  return (
    <div className="App w-full bg-image">
        <AuthContextProvider>
          <Routes>
            {ROUTES.map((r) => 
            <Route path={r.path} element={
              r.protected == true ? 
              <ProtectedRoute>
                <PageContent>
                  {r.compoment}
                </PageContent>
              </ProtectedRoute> : 
              r.compoment
            } />)}
            
          </Routes>
        </AuthContextProvider>
    </div>
  );
}

export default App;
