import { PLATTER_SIZE } from "./../assets/constants.jsx";

const DiskArm = (props) => {
  const { degreeRotation, currentlyWriting } = props;

  return (
      <div>
          <div style={{ position: "absolute", top: 70, left: "calc(50% - 12.5px)", zIndex: 0, background: "black", width: "25px", height: "25px", borderRadius: "100%"}}></div>
          <div
              style={{
                  background: "black",
                  width: "5px",
                  height: `${PLATTER_SIZE / 2}px`,
                  position: "absolute",
                  zIndex: 1,
                  top: 80,
                  left: "50%",
                  transformOrigin: "top center",
                  transform: `rotate(${degreeRotation}deg)`,
                  transition: "0.1s linear",
              }}
          >
              <div style={{ 
                  width: "20px", 
                  height: "50px", 
                  background: "maroon",
                  borderRadius: "20px",
                  position: "relative", 
                  border: "2px solid white",
                  zIndex: 1,
                  top: `${(PLATTER_SIZE / 2) - 25}px`,
                  left: "-10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
              }}>
                { currentlyWriting === -1 ? "" : currentlyWriting }
              </div>
          </div>
      </div>
  );
}

export default DiskArm;