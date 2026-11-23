import moment from "moment";
const year = moment().year().toString()
const invalidYear = moment().subtract(100, 'years').year().toString();



export class AriaReferenceNumberHelper {
    constructor() {
    }

    private validAriaCodes: string[] = ['HU','DA','DC','EA','PA','RP','LE','LD','LP','LH','LR','IA'];

    private getRandomAriaCode() {
        const element: number = Math.floor(Math.random() * this.validAriaCodes.length);
        return this.validAriaCodes[element];
    }

    private getRandomIntInclusive(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }

    getValidAriaReferenceNumber() {
        return this.getRandomAriaCode() +'/'+ this.getRandomIntInclusive(0, 2).toString() + this.getRandomIntInclusive(0, 9999).toString().padStart(4,"0") + '/' + year;
    }

    getInvalidAriaReferenceNumber(part: string = 'start') {
        switch (part) {
            case 'start':
                return 'XX/12345/' + year;
            case 'middle':
                return 'HU/31234/' + year;
            case 'end':
                return 'HU/12345/' + invalidYear;
            case 'all':
                return 'XX/91234/' + invalidYear;
            default:
                return 'XX/91234/' + invalidYear;
        }
    }
}