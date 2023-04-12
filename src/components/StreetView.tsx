import { useDispatch, useSelector } from 'react-redux';
import MdiCardsHeart from '~icons/mdi/cards-heart';
import RiHeartsFill from '~icons/ri/hearts-fill';
import RiShareForwardFill from '~icons/ri/share-forward-fill';
import SvgSpinnersPulse2 from '~icons/svg-spinners/pulse-2';
import {
  LoadingStatus,
  isCurrentPlaceLovedSelector,
  toggleFavoriteForCurrnetPlace,
} from '../store/placesSlice';

function ViewAcitons() {
  const { status } = useSelector((state) => state.places);

  const dispatch = useDispatch();
  const isCurrentPlaceLoved = useSelector(isCurrentPlaceLovedSelector);
  const isLoading = status == LoadingStatus.LOADING;

  const ViewActionButtonStyle =
    'flex flex-col items-center font-semibold px-1 py-2 w-full hover:bg-white/20 rounded box-border ';

  function toggleCurrentLike() {
    dispatch(toggleFavoriteForCurrnetPlace({}));
  }

  return (
    <div
      className={
        ' bg-surface text-white rounded absolute right-0 top-[10%] flex flex-col justify-center items-center z-50 gap-1 p-1 transition-all'
      }
    >
      <button
        disabled={isLoading}
        onClick={toggleCurrentLike}
        className={
          (isCurrentPlaceLoved && !isLoading
            ? 'bg-white/90 text-red-500 hover:bg-white/80 '
            : '') + ViewActionButtonStyle
        }
      >
        <MdiCardsHeart />
        <span>Love</span>
      </button>
      <button disabled={isLoading} className={ViewActionButtonStyle}>
        <RiHeartsFill />
        <span>Likes</span>
      </button>
      <button disabled={isLoading} className={ViewActionButtonStyle}>
        <RiShareForwardFill />
        <span>Share</span>
      </button>
    </div>
  );
}

function StreetViewIframe() {
  const { currentPlace } = useSelector((state) => state.places);

  const url = (currentPlace as any)['Embed Url'];
  return <iframe width="100%" height="100%" src={url} />;
}

function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full text-5xl text-surface">
      <SvgSpinnersPulse2 />
    </div>
  );
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
