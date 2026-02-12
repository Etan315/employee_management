function ParticipantsInput({ label, value, onChange, query, setQuery, suggestions }) {
  console.log("suggesstions: ", suggestions);
  
  const handleChange = (e) => {
    const typedValue = e.target.value;
    setQuery(typedValue);

    // Check if user typed or selected a valid username
    const selectedUser = suggestions.find((item) => item.username === typedValue);

    onChange(selectedUser || { username: typedValue, user_id: null });
  };

  return (
    <div className="input-group">
      <label className="required">{label}</label>
      <input
        type="text"
        value={value}             // just the username for display
        onChange={handleChange}
        list="participants-list"
      />
      <datalist id="participants-list">
        {suggestions?.map((item) => (
          <option key={item.user_id} value={item.username} />
        ))}
      </datalist>
    </div>
  );
}



export default ParticipantsInput;
