export default function Input() {
  return (
    <div className="control no-margin">
      <label>Estimated turnaround time (in hours): </label>
      <input
        id="turnaround"
        type="number"
        name="turnaround"
        required
        min="0" // Can't submit negative times
      ></input>
    </div>
  );
}
