import {APIRequestContext, request} from "@playwright/test";
import {ccdDataStoreApiBaseUrl, createCase, documentManagementStoreApiBaseUrl} from "../iacConfig";
import fs from "fs";
import path from "path";
import {APIResponse} from "playwright";
import {stringify} from "node:querystring";
import {AriaReferenceNumberHelper} from "./AriaReferenceNumberHelper";
import {TokensHelper} from "./TokensHelper";

export class CcdApiHelper {

    private tokensHelper: TokensHelper;
    private accessToken: string;
    private s2sToken: string;
    private uid: string;
    private eventToken: string;

    constructor() {
        this.tokensHelper = new TokensHelper();
    }

    async getNonEventTokens(user){
        this.accessToken = await this.tokensHelper.getAccessToken(user);
        this.s2sToken = await this.tokensHelper.getS2SToken()
        this.uid = await this.tokensHelper.getUserId(this.accessToken);
    }


    async validatePageData(pageId:string, eventName: string, eventData:unknown) {
        const url: string = `${ccdDataStoreApiBaseUrl}/caseworkers/${this.uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/${createCase.caseTypeCode}/validate?pageId=${pageId}`;
        const apiRequestContext: APIRequestContext = await request.newContext();

        try {
            const response = await apiRequestContext.post(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${this.accessToken}`,
                    ServiceAuthorization: this.s2sToken
                },
                data: {
                    data: eventData,
                    event: {
                        id: eventName,
                        summary: "",
                        description: ""
                    },
                    event_token: this.eventToken,
                    ignore_warning: false
                }
            });

            if (!response.ok() && !(response.status() === 422)) {
                throw new Error(
                    `Failed to Validate the page data: ${response.status()} - ${await response.text()}. Ensure your VPN is connected or check your URL/SECRET.`
                );
            }
            return response;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to validate the page data: ${
                    error instanceof Error ? error.message : error
                }`
            );
        };
    };

    async uploadDocument(documentName: string = 'TEST_DOCUMENT_1.pdf') {
        const apiRequestContext: APIRequestContext = await request.newContext();
        const file = path.resolve("./tests/documents", documentName);
        const document = fs.readFileSync(file);

        const response = await apiRequestContext.post(documentManagementStoreApiBaseUrl + "/documents", {
            headers: {
                Accept: "*/*",
                ContentType: "multipart/form-data",
                Authorization: `Bearer ${this.accessToken}`,
                ServiceAuthorization: this.s2sToken
            },
            multipart: {
                files: {
                    name: file,
                    mimeType: "application/pdf",
                    buffer: document,
                },
                key: "file",
                type: "file",
                classification: "PUBLIC"
            },
        });
        const body = await response.json();
        return body._embedded.documents[0]._links.self.href;
    }

    async getAriaReferenceNumber(eventName: string) {
        const maxRetries: number = 10;
        const ariaReferenceNumberHelper = new AriaReferenceNumberHelper();
        let ariaRefNumber = ariaReferenceNumberHelper.getValidAriaReferenceNumber();

        for (let retry=0; retry < maxRetries; retry++)
        {
            let eventData = { appealReferenceNumber: ariaRefNumber };

            const response: APIResponse =  (await this.validatePageData(`${eventName}appealReferenceNumber`, eventName, eventData));

            if (await response.status() === 200) {
                console.log(`Aria reference number: ${ariaRefNumber} is valid and not assigned to an existing appeal.`);
                break;
            }

            if (await response.status() === 422) {
                console.log(`Aria reference number: ${ariaRefNumber} cannot be used: ${(await response.json()).callbackErrors[0]} Generating a new Aria reference number for retry.`);
                ariaRefNumber = ariaReferenceNumberHelper.getValidAriaReferenceNumber();
                continue;
            } else {
                throw new Error(`An unknown error was returned when validating the Aria Reference number using the CCD API: ${response}`);
            }
        }

        return ariaRefNumber;

    }

    async saveDataToDataStore(eventName:string, caseId, eventData:unknown,  ) {
        let url: string;
        let caseData;

        if (eventName === 'startAppeal' || eventName === 'ariaCreateCase') {
            url = `${ccdDataStoreApiBaseUrl}/caseworkers/${this.uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/${createCase.caseTypeCode}/cases`;
        } else {
            url = `${ccdDataStoreApiBaseUrl}/caseworkers/${this.uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/${createCase.caseTypeCode}/cases/${caseId}/events`;
        }


            const apiRequestContext: APIRequestContext = await request.newContext();

        try {
              const response = await apiRequestContext.post(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${this.accessToken}`,
                    ServiceAuthorization: this.s2sToken
                },
                data: {
                    data:eventData,
                    event:{"id": eventName,"summary":"","description":""},
                    event_token:this.eventToken,
                    ignore_warning:false,
                    draft_id:null
                }
            });

            if (!response.ok()) {
                console.log(stringify(await response.json()));
                if (response.status() === 422) {
                    const errorTextJson: string[] = (await response.json()).callbackErrors;
                    return errorTextJson;
                } else {
                    const errorText = await response.text();
                    throw new Error(
                        `Failed to create appeal: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`
                    );
                }
            }
            //caseData = await response.json();
            caseData = {...await response.json(), ...{httpResponse: response.status()}};
            return caseData;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to validate the page data: ${
                    error instanceof Error ? error.message : error
                }`
            );
        };
    };

    async startEvent(eventName: string, caseId: string){
        this.eventToken = await this.tokensHelper.getEventToken(eventName, caseId, this.uid, this.accessToken, this.s2sToken);
    };

    async getAvailableEvents(caseId: string) {
        const url: string = `${ccdDataStoreApiBaseUrl}/caseworkers/${this.uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/${createCase.caseTypeCode}/cases/${caseId}/events`;
        const apiRequestContext: APIRequestContext = await request.newContext();

        try {
            const response = await apiRequestContext.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${this.accessToken}`,
                    ServiceAuthorization: this.s2sToken
                },
                data: {}
            });

            if (!response.ok()) {
                console.log(stringify(await response.json()));
            }
            return await response.json();
        } catch (error) {
            throw new Error(
                `An error occurred while trying to retrieve the available events for the case: ${
                    error instanceof Error ? error.message : error
                }`
            );
        };
    };

    async getCaseData(caseId: string) {
        const url: string = `${ccdDataStoreApiBaseUrl}/caseworkers/${this.uid}/jurisdictions/${createCase.jurisdictionCode}/case-types/${createCase.caseTypeCode}/cases/${caseId}`;
        const apiRequestContext: APIRequestContext = await request.newContext();

        try {
            const response = await apiRequestContext.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${this.accessToken}`,
                    ServiceAuthorization: this.s2sToken
                },
                data: {}
            });

            if (!response.ok()) {
                console.log(stringify(await response.json()));
            }
            return (await response.json()).case_data;
        } catch (error) {
            throw new Error(
                `An error occurred while trying to return the case data: ${
                    error instanceof Error ? error.message : error
                }`
            );
        };
    };


}