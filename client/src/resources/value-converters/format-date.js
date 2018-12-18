export class FormatDateValueConverter {
  toView(value) {
    let myDate = new Date(value);
    return myDate.toLocaleDateString() + "<br/>" + myDate.toLocaleTimeString();
  }
}