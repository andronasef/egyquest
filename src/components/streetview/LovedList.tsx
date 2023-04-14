import { useDispatch, useSelector } from 'react-redux';
import { fetchPlace } from '../../store/placesSlice';

function LovedList() {
  const dispatch = useDispatch();
  const lovedPlaces = useSelector((state) => state.places.places);

  function handlePlaceClick(place) {
    // @ts-ignore
    dispatch(fetchPlace(place.ID));
    // close modal using escape key
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  }
  return (
    <>
      {lovedPlaces.length == 0 && (
        <p className="text-xl font-bold text-white select-none">
          There no loved places yet!
        </p>
      )}
      {lovedPlaces &&
        lovedPlaces.map((place) => {
          return (
            <button
              onClick={() => handlePlaceClick(place)}
              className="w-[90%] rounded text-center p-1  transition hover:bg-white/10"
              key={place.ID}
            >
              {place['Place Name']}
            </button>
          );
        })}
    </>
  );
}
export default LovedList;
