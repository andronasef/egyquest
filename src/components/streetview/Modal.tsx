import {
  FloatingFocusManager,
  FloatingOverlay,
  useClick,
  useDismiss,
  useInteractions,
  useTransitionStatus,
  useTransitionStyles,
} from '@floating-ui/react';
import IcRoundCancel from '~icons/ic/round-cancel';

function Modal({ childern, setIsModalOpen, refs, context }) {
  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const modalTranstion = useTransitionStyles(context, {
    initial: {
      opacity: 0,
    },
    close: {
      opacity: 0,
    },
  });

  const modalBodyTranstion = useTransitionStyles(context, {
    initial: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    close: {
      opacity: 0,
    },
  });

  const { isMounted, status } = useTransitionStatus(context);

  return (
    <>
      {isMounted && (
        <FloatingOverlay
          style={{
            ...modalTranstion.styles,
          }}
          lockScroll
          className="flex items-center justify-center bg-black/80"
        >
          <FloatingFocusManager context={context}>
            <div
              style={{ ...modalBodyTranstion.styles }}
              className="relative flex flex-col items-center justify-center w-[90%] h-full max-w-sm gap-3 rounded-md min-h-[16rem] h-auto bg-surface "
              ref={refs.setFloating}
              {...getFloatingProps()}
            >
              <button
                className="absolute text-2xl text-white top-2 right-3"
                onClick={() => setIsModalOpen(false)}
              >
                <IcRoundCancel />
              </button>
              {childern}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </>
  );
}
export default Modal;
