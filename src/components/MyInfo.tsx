import MaterialSymbolsInfo from '~icons/material-symbols/info';

function MyInfo() {
  return (
    <a href="https://andronasef.github.io/projects/en/egyquest">
      <button className="absolute text-2xl rounded-full shadow text-white/90 md:text-3xl bottom-3 left-3">
        <MaterialSymbolsInfo />
      </button>
    </a>
  );
}
export default MyInfo;
