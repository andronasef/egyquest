import { useSelector } from 'react-redux';
import RiFacebookFill from '~icons/ri/facebook-fill';
import RiLinkM from '~icons/ri/link-m';
import RiTwitterFill from '~icons/ri/twitter-fill';
import RiWhatsappFill from '~icons/ri/whatsapp-fill';

function ShareButtons() {
  const message = 'Check out this place on EGYQUEST:';
  const placeID = useSelector((state) => state.places.currentPlace['ID']);
  const url = `https://andronasef.github.io/egyquest?id=${placeID}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${message}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${message} ${url}`;

  function shareOnFacebook() {
    window.open(facebookUrl, '_blank');
  }

  function shareOnTwitter() {
    window.open(twitterUrl, '_blank');
  }
  function shareOnWhatsApp() {
    window.open(whatsappUrl, '_blank');
  }

  function copyUrl() {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  }

  return (
    <>
      <p className="text-2xl">Share</p>
      <div className="grid grid-cols-3 gap-3 [&>button>span]:text-lg">
        <button
          onClick={shareOnFacebook}
          className="flex flex-col items-center gap-1 px-2 py-4 rounded-md bg-white/20"
        >
          <span className="text-2xl">
            <RiFacebookFill />
          </span>
          <span>Facebook</span>
        </button>
        <button
          onClick={shareOnTwitter}
          className="flex flex-col items-center gap-1 px-2 py-4 rounded-md bg-white/20"
        >
          <span className="text-2xl">
            <RiTwitterFill />
          </span>
          <span>Twitter</span>
        </button>
        <button
          onClick={shareOnWhatsApp}
          className="flex flex-col items-center gap-1 px-2 py-4 rounded-md bg-white/20"
        >
          <span className="text-2xl">
            <RiWhatsappFill />
          </span>
          <span>WhatsApp</span>
        </button>
      </div>
      {/* copy url */}
      <button
        onClick={copyUrl}
        className="flex flex-row items-center gap-1 px-2 py-1 rounded-md bg-white/20"
      >
        <span className="text-2xl">
          <RiLinkM />
        </span>
        <span>Copy URL</span>
      </button>
    </>
  );
}
export default ShareButtons;
