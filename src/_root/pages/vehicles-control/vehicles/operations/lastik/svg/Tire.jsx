import React from "react";

const Tire = ({
  topLeftCount = 1,
  bottomLeftCount = 1,
  topRightCount = 1,
  bottomRightCount = 1,
}) => {
  const renderTires = (count) =>
    Array.from({ length: count }, (_, index) => (
      <img
        key={index}
        src="/images/tire.png"
        alt="tire"
        className="sidebar-logo"
      />
    ));

  return (
    <div className="grid gap-1 justify-center">
      <div className="col-span-3">
        <div className="flex flex-col justify-between h-full w-full align-end">
          <div className="flex justify-end">
            {topLeftCount > 0 && renderTires(topLeftCount)}
          </div>
          <div className="flex justify-end">
            {bottomLeftCount > 0 && renderTires(bottomLeftCount)}
          </div>
        </div>
      </div>
      <div className="col-span-4 text-center">
        <img src="/images/car_body.png" alt="car body" className="w-full" />
      </div>
      <div className="col-span-3">
        <div className="flex flex-col justify-between h-full w-full align-end">
          <div className="flex">
            {topRightCount > 0 && renderTires(topRightCount)}
          </div>
          <div className="flex">
            {bottomRightCount > 0 && renderTires(bottomRightCount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tire;
