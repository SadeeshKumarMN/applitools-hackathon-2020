import { sideBarFilters, filterByNameAndValue, btnFilter, productGrid, filteredItems, appliAirNightShoe } from '../../pageobjects/main.page';
import { productImage } from '../../pageobjects/product.page';
import { Target } from '@applitools/eyes-webdriverio';

describe('AppliFashion', () => {

  before(() => {
    /**
     * As per the instruction for Part3 - If the environment is final production version, then configure the tests with various browser/devices combinations using Ultrafast Grid.
     * Note:Chrome browser is configured already and its details are present in wdio.conf.js
    */
    if (browser.options.baseUrl.includes('tlcHackathonMasterV2')) {
      let configuration = browser.eyesGetConfiguration();
      configuration.addBrowser({ width: 1200, height: 800, name: 'firefox' });
      configuration.addBrowser({ width: 1200, height: 800, name: 'edgechromium' });
      configuration.addBrowser({ width: 1200, height: 800, name: 'safari' });
      configuration.addBrowser({ deviceName: 'iPhone X' });
      browser.eyesSetConfiguration(configuration);
    }
  });

  beforeEach(() => {
    browser.url(browser.options.baseUrl);
  });

  it('Test 1', () => {
    //Assert that main Page is loaded before taking the snapshot
    expect(sideBarFilters).toBeDisplayed();
    browser.eyesCheck('main page');
  });

  it('Test 2', () => {
    filterByNameAndValue("colors", "Black").clickElement();
    btnFilter.clickElement();
    browser.eyesCheck('filter by color', Target.region(productGrid));
    //As per the instruction for Part2, assert that there are two black colored shoes would be listed after filtering
    const noOfBlackColoredShoes = filteredItems;
    expect(noOfBlackColoredShoes).toBeElementsArrayOfSize(2);
  });

  it('Test 3', () => {
    appliAirNightShoe.clickElement();
    //Assert that product details page is loaded before taking the snapshot
    expect(productImage).toBeDisplayed();
    browser.eyesCheck('product details');
  });

  afterEach(() => {
    const testResults = browser.eyesGetTestResults();
    if (typeof (testResults) !== "undefined" && testResults !== null) {
      //Print the visual comparison test results
      if (testResults.isPassed()) {
        console.log(`${testResults.getName()} is passed.`);
      } else {
        console.log(`Test is not passed: ${testResults.getMismatches()} out of ${testResults.getSteps()} failed.`);
        console.log(`Step details URL: ${testResults.getAppUrls().getSession()}`);
      }
    }
  });

});