import { useAppSelector } from '../../store/hooks';
import { LoadingStatus } from '../../store/placesSlice';
import Loader from '../Loader';
import ViewAcitons from './StreetViewActions';

function StreetViewIframe() {
  const { currentPlace } = useAppSelector((state) => state.places);

  const url = (currentPlace as any)['Embed Url'];
  return <iframe width="100%" height="100%" src={url} />;
}

function StreetView() {
  const { status } = useAppSelector((state) => state.places);

  return (
    <div className="relative h-full">
      <ViewAcitons />
      {status == LoadingStatus.LOADING && <Loader />}
      {status == LoadingStatus.SUCCEEDED && <StreetViewIframe />}
    </div>
  );
}
export default StreetView;
