const SearchForm = ({ filter, setFilter}) => (
    <form>
      <div>Find countries <input value={filter} onChange={(event) => setFilter(event.target.value)} /></div>
    </form>
)

export default SearchForm