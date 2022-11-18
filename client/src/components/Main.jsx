import emma from '../images/emma.jpg';
function Main() {
  return (
    <div className="main-shell w-1/2 !mx-auto h-1/2 text-amber-300">
      <h1 className="text-xl font-burtons text-center text-blue-600">
        Where is all my stuff?
        </h1>
      <h2 className="font-burtons text-lg text-center text-orange-500">An inventory app</h2>
        <div className="!mt-4 text-stone-300">
          <img src={emma} alt="emma the dog" />
        </div>
    </div>
  )
}

export default Main



/*
{
    "copyright": "Jean-Francois\nGraffand",
    "date": "2019-09-13",
    "explanation": "Famed in festival, story, and song the best known full moon is the Harvest Moon. For northern hemisphere dwellers that's a traditional name of the full moon nearest the September equinox. In most North America time zones this year's Harvest Moon will officially rise on Friday, September 13. In fact the same Harvest Moon will rise on September 14 for much of the planet though. Of course the Moon will look almost full in the surrounding days. Regardless of your time zone the Harvest Moon, like any other full moon, will rise just opposite the setting Sun. Near the horizon, the Moon Illusion might make it appear bigger and brighter to you but this Harvest Moon will be near lunar apogee. That's the farthest point in its orbit, making it the most distant, and so the smallest, full moon of the year. On August 15 a wheat field harvested in south central France made this a harvest moon scene too, the full moon shining on with beautiful iridescent clouds at sunset.",
    "hdurl": "https://apod.nasa.gov/apod/image/1909/HarvestmoonGraffand.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "A Harvest Moon",
    "url": "https://apod.nasa.gov/apod/image/1909/HarvestmoonGraffand.jpg"
}
*/