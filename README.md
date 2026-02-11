<div align="center">

# PlayPOM Template Project </div>

This is a template project demonstrating how to use the PlayPOM framework for Playwright test automation.

## Pre-requisite

Before starting, ensure you have the following:

- **Node.js (v20+)** installed on your system.
- **PlayPOM** tarfile inside the `fixtures` folder
- **PlayPOM-Template dependencies** installed via `npm install`.
- The `package.json` in PlayPOM-Template includes scripts for setup, test execution, environment management, and reporting.
- The folder structure contains essential directories:
  - `pages/` for Page Object Model classes
  - `tests/` for test specifications
  - `Data/` for test data files
  - `fixtures/` for credentials and configuration
  - `generated/` for reports and logs
- Verify that `playwright.config.ts`, `tsconfig.json`, and `ProjectConfig.properties` exist in the root directory.
- Ensure the PlayPOM package is built and available inside the fixtures folder.

These prerequisites guarantee the template project will run as expected and all scripts in `package.json` will function correctly.

## Features

- **Page Object Model**: Clean separation of page logic and test logic
- **Base Test Classes**: Reusable test foundation with built-in utilities
- **Assertion Framework**: Type-safe assertions with descriptive messages
- **Data-Driven Testing**: Excel and JSON data integration
- **API Testing**: Built-in API testing capabilities
- **Configuration Management**: Properties-based configuration
- **Custom Reporting**: Enhanced test reporting

## Project Structure important entity

```
PlayPOM-Template/
├── pages/                  # Page Object Model classes
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── tests/                  # Test specifications
│   ├── login.spec.ts
│   ├── api.spec.ts
│   └── data-driven.spec.ts
├── Data/                   # Test data files
│   ├── automation_exercise.properties
│   ├── data.json
│   └── data.xlsx (optional)
├── fixtures/               # Configuration and credentials
│   ├── credentials.json    # Google OAuth2 credentials
│   ├── token.json          # OAuth2 refresh token
│   └── playpom-1.0.0tgz    # PlayPOM dependency
├── generated/              # Generated reports and logs
├── ProjectConfig.properties # Main project configuration
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint configuration for strcting typescript
└── package.json            # Project dependencies
```

## Getting Started

---

## Pre-requisite

Before setting up the project, ensure the following tools are installed:

- Supported OS - Windows, Linux
- Git
- Node.js 20=+
- VSCode
- VSCode Extenstions:
  - Playwright Test
  - EsLint
  - Prettier

---

## Setup (Before Execution) in local

Follow the steps below:

1. **Clone the project** from _[Git](https://github.com/codal/costplusdrugs-test-automation)_.
2. **Install dependencies**:

   ```bash
   npm i
   npm run installBrowsers
   ```

   - `npm i` → Installs required dependencies
   - `npm run installBrowsers` → Installs Playwright browsers

3. **Update configuration** in `playwright.config.ts` for Playwright & PlayPOM. Need to replace the highlighted for local:
   ![Playwright Configuration for local](./fixtures/readme/playwright_config.png)

4. **Set environment base data** in `ProjectConfig.properties` (QA, STAGE). Need to replace the highlighted for local:
   ![Project Configuration for local](./fixtures/readme/project_config.png)

5. **Add GMAIL credentials.json** getting it from cloud in fixtures folder: <br/>
   ![GMAIL Credentials for local](./fixtures/readme/gmail_credentials.png)

6. **Review `package.json` scripts** for available execution commands.

---

## Execution

### Debugging

- `npm run debug` → Debug all tests with browser debug window.
- `npm run debugTest --test=SignIn.spec.ts` → Debug specific test file.
- `npm run debugTestProject --test=SignIn.spec.ts --project=chromium` → Debug specific test in chosen browser.

### Running Tests (Local)

- `npm run all` → Run all Playwright tests.
- `npm run tag --tag=yourTag` → Run tests by tag.
- `npm run givenTest --test=yourTestFile.spec.ts` → Run specific test file.
- `npm run givenProject --project=yourProject` → Run tests in specific browser project.
- `npm run givenTestProject --project=yourProject --test=yourTestFile.spec.ts` → Run specific test in a specific browser (headed mode).

---

## After Execution

Execution generates outputs inside the **`generated/`** folder:

- **Reports**
  - Playwright built-in HTML report
  - Ortoni Report → Provides visualized test insights

- **Result Files**
  - Screenshots
  - Playwright Trace Viewer files

- **Logs**
  - Project (browser)-specific folders
  - Test-specific log files (integrated into Ortoni Report)

- **Email Summary**
  - If enabled, summary emails are sent to addresses defined in `sendEmailAddresses` (inside `playwright.config.ts`).

# IMPORTANT DETAILS OF PROJECT TO BE FOLLOWED

### Test/Scenarios(s)

There are 2 subfolders inside _tests_ folder which contains the scenarios:

1. Setup
   This folder has the BaseSuite which can extend the PlayPOM provided IterationTest and modify and include any configuration needed for the page and export the projectTest & authenticatedTest:
   ![BaseSuite.png]()

Few points to take care here:

- No need to modify this, without any genuence need.
- It provides the central logic code. For easy maintenance.
- Use
  - **projectTest** - for the Pre Login scenarios.
  - **authenticatedTest**- for the Post Login scenarios.

2. Suites
   This folder needs to have the \*.spec.ts file(s) having the suites containing scenario(AKS test) using the BaseSuite test as per the need. Kindly see the example of spec:

   Few points to take care while building spec file having scenarios:
   - It should start with test.describe().
   - Inside describe in test.beforeTest() get the data using 'INPUT.
   - Write the scenario calling methods, passing parameter data from pages.

### Pages

Project contains _pages_ folder in which if project is having only one url to be automated then it's folder inside it needs to be there. If there are multiple url in the flow then for each url needs to be one folder.

Now for each _url/website_, need to follow the below hirarchy for creation of the pages:

- First at the url folder it needs to have below files:
  - **CommonActions.ts** - It will contains reusables used across the project and extending _BasePage_, providing the PlayPOM reusables and the common actions for the given website/url.
  - **Common_OR.ts** - The OR locators which are common and needs to used insite CommonActions & across the pages.
  - **URL specific entry page** - It will extend the CommonActions and the strategy of creating page as show above.
- Next at the url folder inside - there will be other folder as per the flow of the website and methods returning the pages after the click navigation for easy understanding of the flow without UI.
- We can create contants folder if there contants specific to the url & common across the urls as per the need.
- Common goal is the separation of contants. For examples there is _Strings.ts_ which is to store the strings separtely and can be used anywhere inside project pages.

### Data-Driven Testing

```typescript
import { IterationsTest } from "playpom";

class DataTest extends IterationsTest {
  async testWithData(): Promise<void> {
    const username = this.getExcelData("username");
    const password = this.getExcelData("password");

    // Use the data in your test
    await this.performLogin(username, password);

    // Update results
    this.updateExcelResult("PASS", "Test completed successfully");
  }
}
```

## Configuration

### PlayPOM Configuration

Configure PlayPOM features in `playwright.config.ts`:

```typescript
export const playPOMConfig: PlayPOMConfig = {
  sendEmailAddresses: ["your-email@example.com"],
};
```

### Configuration Management

#### ProjectConfig.properties

The main configuration file containing:

- Application URLs and endpoints
- Test credentials and authentication data
- Timeouts and browser settings
- Feature flags and environment settings
- Database and API configuration

```typescript
import { ProjectConfig } from "playpom";

// Get configuration values
const baseURL = ProjectConfig.get("baseURL");
const timeout = ProjectConfig.getNumber("page.timeout");
const enableFeature = ProjectConfig.getBoolean("enable.screenshots");
```

#### Fixtures Directory

Contains credentials and configuration files:

- `credentials.json`: Google OAuth2 credentials for Gmail reader
- `token.json`: OAuth2 refresh token for API access
- Setup instructions for Gmail integration

### Test Data

- **Properties**: Use `.properties` files for configuration
- **JSON**: Use `.json` files for structured test data
- **Excel**: Use `.xlsx` files for data-driven testing

## Available Utilities

### Assertions

- `ASSERTION_TYPES`: Element and page assertions
- `VALUE_ASSERTION_TYPES`: Value-based assertions
- `ASSERT.hardAssert()`: Throws on failure
- `ASSERT.softAssert()`: Continues on failure

### Actions

- `WEB`: Web element interactions
- `API`: HTTP API calls
- `FILE`: File operations
- `GMAIL`: Email reading operations

### Utilities

- `Input`: Data file reading
- `Config`: PlayPOM-specific configuration
- `ProjectConfig`: Project-wide configuration management
- `getLogger()`: Returns Logger for integration

## Best Practices

1. **Page Objects**: Keep page logic separate from test logic
2. **Descriptive Messages**: Always provide meaningful assertion messages
3. **Data Management**: Use external data files for test data
4. **Error Handling**: Use appropriate assertion types (hard vs soft)
5. **Logging**: Leverage built-in logging for debugging

### Gmail Reader Setup

For email testing functionality:

1. **Configure Google OAuth2**:
   - Set up Google Cloud project with Gmail API
   - Create OAuth2 credentials
   - Update `fixtures/credentials.json`

2. **Generate Token**:
   - First run will prompt for authorization
   - `fixtures/token.json` will be created automatically

3. **Update Configuration**:
   ```properties
   # In ProjectConfig.properties
   gmail.user=your-test-email@gmail.com
   gmail.app.password=your-app-password
   ```

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure PlayPOM is properly installed
2. **Type Errors**: Import types from `playpom/types`
3. **Path Issues**: Check `tsconfig.json` path mappings
4. **Browser Issues**: Run `npm run install:browsers`
5. **Config Errors**: Verify `ProjectConfig.properties` exists and has correct format
6. **Gmail Issues**: Check `fixtures/` setup and Google API credentials

### Getting Help

- Check the PlayPOM documentation
- Review the example tests in this template
- Examine the generated logs in `generated/logs/`
