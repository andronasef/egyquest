import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PlaceType, fetchPlace } from '../../store/placesSlice';

function LovedList() {
  const dispatch = useAppDispatch();
  const lovedPlaces = useAppSelector((state) => state.places.places);

  function handlePlaceClick(place: PlaceType) {
    // @ts-ignore
    dispatch(fetchPlace(place.ID));
    // close modal using escape key
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  }

  if (lovedPlaces.length == 0)
    return (
      <p className="text-xl font-bold text-white select-none">
        There no loved places yet!
      </p>
    );

  return (
    <div className="flex flex-col text-center w-full py-4 overflow-hidden gap-2">
      <p className="text-2xl">Your Likes</p>
      <div className="overflow-y-scroll flex flex-col">
        {lovedPlaces &&
          lovedPlaces.map((place:PlaceType) => {
            return (
              <button
                onClick={() => handlePlaceClick(place)}
                className="rounded p-1  transition hover:bg-white/20"
                key={place.ID}
              >
                {place['Place Name']}
              </button>
            );
          })}
      </div>
    </div>
  );
}
export default LovedList;
