import { useAppDispatch, useAppSelector } from '../store/hooks';
import PhRepeatBold from '~icons/ph/repeat-bold';
import { LoadingStatus, fetchPlace } from '../store/placesSlice';
function Header() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.places);

  return (
    <>
      <header className="flex flex-row items-center justify-between h-16 px-5 text-white bg-surface">
        <h1 className="text-2xl font-bold text-white">EGYQUEST</h1>
        <button
          disabled={status == LoadingStatus.LOADING}
          className="bg-primary text-white font-bold h-[2.5rem] px-3 rounded-md flex justify-center items-center gap-2 disabled:hover:bg-primary"
          onClick={() => {
            // @ts-ignore
            dispatch(fetchPlace(''));
          }}
        >
          <span className="text-lg">
            <PhRepeatBold />
          </span>
          <span>Random</span>
        </button>
      </header>
    </>
  );
}
export default Header;
