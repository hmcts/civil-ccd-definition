import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ExuiPage from '../../exui-page/exui-page';
import { inputs, subheadings, links } from './organisation-search-content';

@AllMethodsStep()
export default class OrganisationSearchFragment extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications(
      [
        super.expectSubheading(subheadings.organisations),
        super.expectLabel(inputs.search.label),
        super.expectSubheading(subheadings.search),
      ],
      {
        runAxe: false,
      },
    );
  }

  async searchForOrganisation(organisationName: string) {
    await super.inputText(organisationName, inputs.search.selector);
    //method incomplete, need to add method in basePage for waiting for Organisation list to appear.
    await super.clickBySelector(links.selectOrganisation.selector(organisationName));
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
