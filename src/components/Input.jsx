const Input = (props) => {
  return (
    <>
      <div className="my-3">
        <label className="text-gray my-1">{props.name}</label>
        <input
          className="form-control"
          type={props.name}
          onChange={props.change}
        />
      </div>
    </>
  );
};

export default Input;
