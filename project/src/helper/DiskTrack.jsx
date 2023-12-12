const DiskTrack = (props) => {
  const { radius, hovered, setHovered, unsetHovered, onClick } = props;
  const styles = {
    width: `${radius}px`,
    height: `${radius}px`,
    border: "3px solid black",
    borderRadius: "100%",
    position: "absolute",
    background: hovered
      ? "linear-gradient(to right,#8ae68b,#6713df)"
      : "linear-gradient(to right, #eee, #000)",
    borderColor: hovered ? "white" : "black",
    cursor: hovered ? "pointer" : "default",
  };
  return (
    <div
      onMouseOver={setHovered}
      onMouseLeave={unsetHovered}
      onClick={onClick}
      style={styles}
    ></div>
  );
}
export default DiskTrack;
