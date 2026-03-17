export class ExampleHelper {
    private caseId: string;

    async setCaseId(caseId: string): Promise<void> {
        this.caseId = caseId;
    }

    async getCaseId(): Promise<string> {
        return this.caseId;
    }

}