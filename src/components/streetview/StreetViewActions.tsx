import { useFloating } from '@floating-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MdiCardsHeart from '~icons/mdi/cards-heart';
import RiHeartsFill from '~icons/ri/hearts-fill';
import RiShareForwardFill from '~icons/ri/share-forward-fill';
import {
  LoadingStatus,
  isCurrentPlaceLovedSelector,
  toggleFavoriteForCurrnetPlace,
} from '../../store/placesSlice';
import Modal from './Modal';

function ViewAcitons() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.places);
  const isCurrentPlaceLoved = useSelector(isCurrentPlaceLovedSelector);
  const isLoading = status == LoadingStatus.LOADING;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalElement, setModalElement] = useState();

  const { refs, context } = useFloating({
    open: isModalOpen,
    onOpenChange: setIsModalOpen,
  });

  const ViewActionButtonStyle =
    'flex flex-col items-center font-semibold px-1 py-2 w-full hover:bg-white/20 rounded box-border ';

  function openModal(element) {
    setModalElement(element);
    setIsModalOpen(true);
  }

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

      <button
        onClick={() => openModal(null)}
        disabled={isLoading}
        className={ViewActionButtonStyle}
      >
        <RiHeartsFill />
        <span>Likes</span>
      </button>

      <button
        disabled={isLoading}
        onClick={() => openModal(null)}
        className={ViewActionButtonStyle}
        ref={refs.setReference}
      >
        <RiShareForwardFill />
        <span>Share</span>
      </button>

      <Modal
        setIsModalOpen={setIsModalOpen}
        childern={modalElement}
        context={context}
        refs={refs}
      >
        <p>Andrew</p>
      </Modal>
    </div>
  );
}

export default ViewAcitons;
