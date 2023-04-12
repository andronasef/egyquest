import { useEffect } from 'react';
import Header from './components/Header';
import MyInfo from './components/MyInfo';
import StreetView from './components/StreetView';
import { useDispatch } from 'react-redux';
import { fetchPlace } from './store/placesSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    //@ts-ignore
    dispatch(fetchPlace(id));
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <StreetView />
      <MyInfo />
    </div>
  );
}
export default App;
