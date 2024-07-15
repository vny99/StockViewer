
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/globals.css'
import RootLayout from "./layout";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from './components/Dashboard/Dashboard';
import { StoreProvider } from './components/StoreProvider';


export default function Home() {
  return (
    <RootLayout>
      <StoreProvider>
        <Navbar>
          <Dashboard/>
        </Navbar>
      </StoreProvider>
    </RootLayout>);
}
