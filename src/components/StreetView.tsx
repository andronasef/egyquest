import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MdiCardsHeart from '~icons/mdi/cards-heart';
import RiHeartsFill from '~icons/ri/hearts-fill';
import RiShareForwardFill from '~icons/ri/share-forward-fill';
import SvgSpinnersPulse2 from '~icons/svg-spinners/pulse-2';
import { LoadingStatus, fetchPlace } from '../store/placesSlice';

function ViewAcitons() {
  const ButtonStyle =
    'flex flex-col items-center font-semibold px-1 py-2 w-full hover:bg-white/20 rounded box-border ';

  return (
    <div
      className={
        'bg-surface text-white rounded absolute right-0 top-[10%] flex flex-col justify-center items-center z-50 gap-1 p-1 transition-all'
      }
    >
      <button className={ButtonStyle} >
        <MdiCardsHeart />
        <span>Love</span>
      </button>
      <button className={ButtonStyle}>
        <RiHeartsFill />
        <span>Likes</span>
      </button>
      <button className={ButtonStyle}>
        <RiShareForwardFill />
        <span>Share</span>
      </button>
    </div>
  );
}

function StreetViewIframe({ data }: { data: unknown }) {
  const url = (data as any)['Embed Url'];
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
  const dispatch = useDispatch();
  const { status, currentPlace } = useSelector((state) => state.places);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    //@ts-ignore
    dispatch(fetchPlace(id));
  }, []);
  return (
    <div className="relative h-full">
      <ViewAcitons />
      {status == LoadingStatus.LOADING && <Loader />}
      {status == LoadingStatus.SUCCEEDED && (
        <StreetViewIframe data={currentPlace} />
      )}
    </div>
  );
}
export default StreetView;
