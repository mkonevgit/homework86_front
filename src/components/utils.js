export const getDateStr = (datetimeStr) => {
   let date = new Date(Date.parse(datetimeStr));
   let result;
   let weekDay;
   switch (date.getDay()) {
      case 1:
         weekDay = "Mo";
         break;
      case 2:
         weekDay = "Tu";
         break;
      case 3:
         weekDay = "We";
         break;
      case 4:
         weekDay = "Th";
         break;
      case 5:
         weekDay = "Fr";
         break;
      case 6:
         weekDay = "Sa";
         break;
      case 0:
         weekDay = "Su";
         break;
      default:
         break;
   }
   result = date.toLocaleDateString() + "(" + weekDay + ")" + date.toLocaleTimeString();
   return result;
}

export const scrollToPageDown = () => {
   window.scrollTo(0, document.body.scrollHeight);
}

export const scrollToPageUp = () => {
   window.scrollTo(0, 0);
}

export const ALERT_DELAY = 10000;
export const ERROR_DELAY = 30000;

