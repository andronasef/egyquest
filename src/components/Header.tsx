import PhRepeatBold from '~icons/ph/repeat-bold';
function Header() {
  return (
    <>
      <header className="flex flex-row items-center justify-between h-16 px-5 text-white bg-surface">
        <h1 className="text-2xl font-bold text-white select-none">EGYQUEST</h1>
        <button
          className="bg-primary text-white font-bold h-[2.5rem] px-3 rounded-md flex justify-center items-center gap-2"
          onClick={() => {
            return null;
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
