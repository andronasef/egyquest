import MdiCardsHeart from '~icons/mdi/cards-heart';
import RiHeartsFill from '~icons/ri/hearts-fill';
import RiShareForwardFill from '~icons/ri/share-forward-fill';

function ViewAcitons() {
  const ButtonStyle =
    'flex flex-col items-center font-semibold px-1 py-2 w-full hover:bg-white/20 rounded box-border';

  return (
    <div className="bg-surface text-white rounded absolute right-0 top-[10%] flex flex-col   justify-center items-center z-50 gap-1 p-1">
      <button className={ButtonStyle}>
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

function StreetViewIframe({ url }: { url: string }) {
  return <iframe width="100%" height="100%" src={url} />;
}

function StreetView({ url }: { url: string }) {
  <ViewAcitons></ViewAcitons>;
  return (
    <div className="relative h-full">
      <ViewAcitons />
      <StreetViewIframe url={url} />
    </div>
  );
}
export default StreetView;
