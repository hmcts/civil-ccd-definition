export class CaseIdHelper {

    private static caseId: string;

    public async setCaseId(caseId: string): Promise<void> {
        CaseIdHelper.caseId = caseId;
    }

    public static async getCaseId(): Promise<string> {
        return CaseIdHelper.caseId;
    }

}