import { googleApiKey } from './constants';

export function kelvinToCelsius(kelvin) {
  var celsius = kelvin - 273.15;
  var roundedCelsius = Math.round(celsius);
  return roundedCelsius;
}

export function getDayOfWeek(number) {
  var today = new Date();
  var daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var targetDay = new Date(
    today.getTime() + (number + 1) * 24 * 60 * 60 * 1000
  ); // Adding milliseconds for the desired number of days

  var dayOfWeek = daysOfWeek[targetDay.getDay()];
  return dayOfWeek;
}

export const getDistanceUsingGoogleMaps = async (lat, long) => {
  const latlong = `${lat},${long}`;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?&latlng=${latlong}&key=${googleApiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.results.length) return;
  return data.results[0].formatted_address;
};
