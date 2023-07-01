import { useEffect } from 'react';
import Header from './components/Header';
import MyInfo from './components/MyInfo';
import StreetView from './components/streetview/StreetView';
import { useAppDispatch } from './store/hooks';
import { fetchPlace } from './store/placesSlice';

function App() {
  const dispatch = useAppDispatch();

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
