import BasePage from '../../../../base/base-page';
import ExuiPage from '../../exui-page/exui-page';
import { inputs, subheadings } from './statement-of-truth-content';

export default class StatementOfTruthFragment extends ExuiPage(BasePage) {
  async verifyContent() {
    super.runVerifications(
      [
        super.expectSubheading(subheadings.statementOfTruth),
        super.expectLabel(inputs.name.label),
        super.expectLabel(inputs.role.label),
      ],
      { runAxe: false },
    );
  }

  async enterDetails(name: string, role: string) {
    await super.inputTextBySelector(name, inputs.name.selector);
    await super.inputTextBySelector(role, inputs.role.selector);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
