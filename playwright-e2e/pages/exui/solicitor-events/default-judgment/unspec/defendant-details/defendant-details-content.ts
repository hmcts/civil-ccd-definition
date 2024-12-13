export const defendantButton = (defendantName: string) => ({
  text: `${defendantName}`,
  selector:
    "div[id='multiple-choice ng-star-inserted'] button[class='form-control ng-untouched ng-pristine ng-invalid']",
});
