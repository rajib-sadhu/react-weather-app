// City fetch API - https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [cities, setCities] = useState([]);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&offset=${offset}&order_by=name `
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newCities = data?.results.map((record) => ({
          city: record.name,
          country: record.cou_name_en,
          timezone: record.timezone,
        }));
        setCities((prevCities) => [...prevCities, ...newCities]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [offset]);

  const handleScroll = () => {
    const scrollTop =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    // Add a small tolerance value to account for potential rounding errors
    const tolerance = 1;

    if (scrollHeight - scrollTop - tolerance <= clientHeight) {
      // Scrolled to the bottom
      setOffset((prevOffset) => prevOffset + 1); // Increment offset
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(offset);

  return (
    <div>
      <div className="fixed bg-slate-300 min-h-40 w-full flex justify-center items-center flex-col z-50">
        <h1 className=" text-center uppercase md:text-4xl text-2xl font-bold">
          Weather App React
        </h1>
        <div className="mt-3">
          <form action="" className="h-10 flex ">
            <input type="text" className="md:w-80 p-2 py-1 h-full" />
            <button type="submit" className="px-2 h-full bg-slate-500" >Search</button>
          </form>
        </div>
      </div>

      <section className="md:p-10">
        <div className="overflow-x-auto overflow-hidden pt-40">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="md:block hidden">#</th>
                <th>City</th>
                <th>Country</th>
                <th>Timezone</th>
              </tr>
            </thead>
            <tbody
              className=""
              style={{ height: "100vh", overflowY: "scroll" }}
              onScroll={handleScroll}
            >
              {cities.map((value, i) => {
                const { city, country, timezone } = value;
                return (
                  <tr key={i}>
                    <th className="md:block hidden" >{i + 1}</th>
                    <td><Link to={``} className="text-blue-800 hover:underline" >{city}</Link></td>
                    <td>{country}</td>
                    <td>{timezone}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
