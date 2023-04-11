import Header from './components/Header';
import MyInfo from './components/MyInfo';
import StreetView from './components/StreetView';

const TestUrl =
  'https://www.google.com/maps/embed?pb=!4v1679645714357!6m8!1m7!1sCAoSLEFGMVFpcFBFSEw0ZlBOYlI4MVlpdUJsQ1FjZkh1cDB6cGFvb3lfN09tNFFC!2m2!1d29.9662851!2d31.1247014!3f40!4f0!5f0.7820865974627469';
function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <StreetView url={TestUrl} />
      <MyInfo />
    </div>
  );
}
export default App;
