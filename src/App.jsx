import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex' }}>

      <Sidebar />

      <div style={{ 
        marginLeft: '240px', 
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        background: '#fcfcfc' 
      }}>
        
        <main style={{ flex: 1, padding: '30px' }}>
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;