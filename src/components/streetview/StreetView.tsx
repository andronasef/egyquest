import { useSelector } from 'react-redux';
import { LoadingStatus } from '../../store/placesSlice';
import ViewAcitons from './StreetViewActions';
import Loader from '../Loader';

function StreetViewIframe() {
  const { currentPlace } = useSelector((state) => state.places);

  const url = (currentPlace as any)['Embed Url'];
  return <iframe width="100%" height="100%" src={url} />;
}

function StreetView() {
  const { status } = useSelector((state) => state.places);

  return (
    <div className="relative h-full">
      <ViewAcitons />
      {status == LoadingStatus.LOADING && <Loader />}
      {status == LoadingStatus.SUCCEEDED && <StreetViewIframe />}
    </div>
  );
}
export default StreetView;
