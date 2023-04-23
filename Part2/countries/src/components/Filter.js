const Filter = ({value, onChange}) =>
    <div>
      <span>Find countries</span><input value={value} onChange={onChange} />
    </div>

export default Filter