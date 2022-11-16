const { pasrse, parse } = require("csv-parse");
const fs = require("fs");

const results = [];
const habitablePlanets = [];

const isHabbitable = (planet) => {
  // criteria can be added to make finer result
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
};
const fileStreamer = fs.createReadStream("../kepler_data.csv");
fileStreamer
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabbitable(data) === true) habitablePlanets.push(data);
  })
  .on("end", () => {
    console.log("Done finding habitable planets, see count below");
    console.log(habitablePlanets.length);
  })
  .on("error", (error) => {
    console.log(error);
  });
