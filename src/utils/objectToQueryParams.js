import isNumber from './checking/isNumber';

export default function objectToQueryParams(obj){
  return Object.entries(obj || {})
          .filter(([_, value]) => value && (isNumber(value) || typeof value === 'string'))
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');
}
