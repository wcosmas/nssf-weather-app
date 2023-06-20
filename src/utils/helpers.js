export function convertFahrenheitToCelsius(fahrenheit) {
  var celsius = Math.round(((fahrenheit - 32) * 5) / 9);
  return celsius;
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
