import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import {
  containers,
  buttons,
  inputs,
  paragraphs,
  radioButtons,
} from '../query-details/query-details-content';

@AllMethodsStep()
export default class QueryPage extends BasePage {
  async verifyContent() {
    await super.expectButton(buttons.backToQueryList.title);
    await super.expectText(paragraphs.queryDetails.title, {
      containerSelector: containers.queryDetails.selector,
    });
    await super.expectText(paragraphs.queryDetails.senderName, {
      containerSelector: containers.querySenderName.selector,
    });
    await super.expectText(paragraphs.queryDetails.querySubject, {
      containerSelector: containers.queryDetails.selector,
    });
    await super.expectText(paragraphs.queryDetails.queryBody, {
      containerSelector: containers.queryDetails.selector,
    });
    await super.expectText(paragraphs.queryDetails.isQueryHearingRelated, {
      containerSelector: containers.queryDetails.selector,
    });
    await super.expectText(paragraphs.queryDetails.attachments, {
      containerSelector: containers.queryDetails.selector,
    });
  }

  async verifyQueryResponse() {
    await super.expectText(paragraphs.response.title, {
      containerSelector: containers.response.selector,
    });
    await super.expectText(paragraphs.response.responseDetail, {
      containerSelector: containers.response.selector,
    });
  }

  async verifyQueryFollowup() {
    await super.expectText(paragraphs.followupQuery.title, {
      containerSelector: containers.followupQuery.selector,
    });
    await super.expectText(paragraphs.followupQuery.lastSubmittedBy, {
      containerSelector: containers.followupQuery.selector,
    });
    await super.expectText(paragraphs.followupQuery.queryDetail, {
      containerSelector: containers.followupQuery.selector,
    });
  }

  async verifyQueryNonHearing() {
    await super.runVerifications([
      super.expectButton(buttons.backToQueryList.title),
      super.expectText(paragraphs.queryDetails.title, {
        containerSelector: containers.queryDetails.selector,
      }),
      super.expectText(paragraphs.queryDetails.querySubject, {
        containerSelector: containers.queryDetails.selector,
      }),
      super.expectText(paragraphs.queryDetails.queryBody, {
        containerSelector: containers.queryDetails.selector,
      }),
      super.expectText(paragraphs.queryDetails.isQueryHearingRelated, {
        containerSelector: containers.queryDetails.selector,
      }),
      super.expectText(paragraphs.queryDetails.attachments, {
        containerSelector: containers.queryDetails.selector,
      }),
    ]);
  }

  async verifyQueryWithHearing() {
    await super.runVerifications([
      super.expectButton(buttons.backToQueryList.title),
      super.expectText(paragraphs.queryDetails.title, {
        containerSelector: containers.queryDetails.selector,
      }),
      super.expectText(paragraphs.queryDetails.querySubject, {
        containerSelector: containers.queryDetails.selector,
      }),
      super.expectText(paragraphs.hearingQuery.queryBody, {
        containerSelector: containers.queryDetails.selector,
      }),
      super.expectText(radioButtons.isQueryHearingRelated.yes.label, {
        containerSelector: containers.queryDetails.selector,
      }),
      super.expectText(inputs.hearingDate.label, {
        containerSelector: containers.queryDetails.selector,
      }),
    ]);
  }

  async askFollowUpQuestion() {
    await super.clickButtonByName(buttons.askFollowUpQuestion.title);
  }

  async backToQueryList() {
    await super.clickButtonByName(buttons.backToQueryList.title);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
