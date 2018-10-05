export default function toJS(obj) {
  return JSON.parse(JSON.stringify(obj));
}