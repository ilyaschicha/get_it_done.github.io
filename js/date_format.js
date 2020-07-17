/**
 * getCurrentDate :
 * - get the day and month
 * - return the value to the function CompletedTask in file tasks.js  
 */
function getCurrentDate() {
  //date varible take the date of today
  let date = new Date();
  //array months hava the manthes in shortcut
  let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  /* 
    month varible store shortcut othe month 
    function getMonth() return number
  */
  //
  let month = months[date.getMonth()];
  /* 
    day varible store day with Ordinal indicator 
    function getDate() return the day of today
  */
  let day = addOrdinalIndicator(date.getDate());
  //function addOrdinalIndicator() give the day ordinal indicator ("th" "st" "nd" "rd")
  function addOrdinalIndicator(day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        day = day + "st";
        break;
      case 2:
      case 22:
        day = day + "nd";
        break;
      case 3:
      case 23:
        day = day + "rd";
        break;
      default: day = day + "th";
    }
    return day;
  }
  /*
     fullDate varible store the value of the varible month and day 
   */
  fullDate = `${month} ${day}`;

  return fullDate;
}
