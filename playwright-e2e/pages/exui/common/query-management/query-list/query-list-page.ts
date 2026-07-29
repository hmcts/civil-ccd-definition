import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { buttons, containers, paragraphs } from './query-list-content';

@AllMethodsStep()
export default class QueryListPage extends BasePage {
  async verifyContent() {
    await super.expectSelector(containers.queryTable.selector);
    await super.expectText(paragraphs.tableHeadings.querySubject);
    await super.expectText(paragraphs.tableHeadings.senderName);
    await super.expectText(paragraphs.tableHeadings.lastSubmittedBy);
    await super.expectText(paragraphs.tableHeadings.lastSubmissionDate);
    await super.expectText(paragraphs.tableHeadings.lastResponseDate);
    await super.expectText(paragraphs.tableHeadings.responseStatus);
  }

  // async verifyQueryWithHearing() {
  //   await super.runVerifications([
  //     super.expectSelector(containers.queryTable.selector),
  //     super.expectText(paragraphs.querySubject, {
  //       containerSelector: containers.queryTable.selector,
  //       count: 2,
  //     }),
  //     super.expectText(paragraphs.awaitingResponse, {
  //       containerSelector: containers.queryTable.selector,
  //       count: 2,
  //     }),
  //   ]);
  // }

  // async verifyQueryNonHearing() {
  //   await super.runVerifications([
  //     super.expectSelector(containers.queryTable.selector),
  //     super.expectText(paragraphs.querySubject, {
  //       containerSelector: containers.queryTable.selector,
  //       count: 2,
  //     }),
  //     super.expectText(paragraphs.awaitingResponse, {
  //       containerSelector: containers.queryTable.selector,
  //       count: 2,
  //     }),
  //   ]);
  // }

  async openQuery() {
    await super.clickButtonByName(buttons.openQuery.title, {
      containerSelector: containers.firstQuery.selector,
    });
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
