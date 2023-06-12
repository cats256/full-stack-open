const Filter = ({ filter, setFilter }) => (
    <form>
        <div>Filter shown with <input value={filter} onChange={(event) => setFilter(event.target.value)} /></div>
    </form>
)

export default Filter