export default function dateFormat(date, options = { locale: 'en-GB', dateStyle: 'full' }){
  let res = "";
  if(window.Intl && date){
    const { locale, ...etc } = options || {};
    res = new Intl.DateTimeFormat(locale || 'en-GB', etc).format(new Date(date));
  }
  return res;
}
