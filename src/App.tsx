import Header from './components/Header';
import MyInfo from './components/MyInfo';
import StreetView from './components/StreetView';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <StreetView />
      <MyInfo />
    </div>
  );
}
export default App;
