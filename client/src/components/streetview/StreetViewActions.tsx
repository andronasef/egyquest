import { useFloating } from '@floating-ui/react';
import { useState } from 'react';
import MdiCardsHeart from '~icons/mdi/cards-heart';
import RiHeartsFill from '~icons/ri/hearts-fill';
import RiShareForwardFill from '~icons/ri/share-forward-fill';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  LoadingStatus,
  isCurrentPlaceLovedSelector,
  toggleFavoriteForCurrnetPlace,
} from '../../store/placesSlice';
import LovedList from './LovedList';
import Modal from './Modal';
import ShareButtons from './ShareButtons';

function ViewAcitons() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.places);
  const isCurrentPlaceLoved = useAppSelector(isCurrentPlaceLovedSelector);
  const isLoading = status == LoadingStatus.LOADING;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalElement, setModalElement] = useState<JSX.Element>();

  const { refs, context } = useFloating({
    open: isModalOpen,
    onOpenChange: setIsModalOpen,
  });

  const ViewActionButtonStyle =
    'flex flex-col items-center font-semibold px-1 py-2 w-full hover:bg-white/20 rounded box-border ';

  function openModal(element: JSX.Element) {
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
        onClick={() => openModal(<LovedList />)}
        disabled={isLoading}
        className={ViewActionButtonStyle}
      >
        <RiHeartsFill />
        <span>Likes</span>
      </button>

      <button
        disabled={isLoading}
        onClick={() => openModal(<ShareButtons />)}
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
      ></Modal>
    </div>
  );
}

export default ViewAcitons;
