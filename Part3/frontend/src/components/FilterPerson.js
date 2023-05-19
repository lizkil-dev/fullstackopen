const FilterPerson = ({newFilter, handleFilter}) => {
  return (
  <div>
    <span>filter shown with: </span><input value={newFilter} onChange={handleFilter} />
  </div>
  )
}

export default FilterPerson