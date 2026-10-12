import { expect, Locator, Page } from "@playwright/test";

export class CustomersPage {
    // declaration of properties as Locators
    page: Page;
    readonly ClickCustomers: Locator;
    readonly ClickAddIcon: Locator;
    readonly customerNumber: Locator;
    readonly EnterCustomerName: Locator;
    readonly EnterAddress: Locator;
    readonly EnterCity: Locator;
    readonly EnterCountry: Locator;
    readonly EnterCperson: Locator;
    readonly EnterPnumber: Locator;
    readonly EnterEmail: Locator;
    readonly EnterMnumber: Locator;
    readonly EnterNotes: Locator;
    readonly ClickAddBtn: Locator;
    readonly ClickConfirmOk: Locator;
    readonly ClickAlertOk: Locator;
    readonly ClickSearchPanel: Locator;
    readonly EnterSearchCnumber: Locator;
    readonly ClickSearchBtn: Locator;
    //readonly CustomerGrid: Locator;

     private expNumber!: string;

    // create constructor to initialize Locator values
    constructor(page: Page) {
        this.page = page;
        this.ClickCustomers = page.locator('#mi_a_customers');
        this.ClickAddIcon = page.locator("span[data-caption='Add']").first();
        this.customerNumber = page.getByRole('textbox', { name: 'Customer Number' });
        this.EnterCustomerName = page.getByPlaceholder('Customer Name');
        this.EnterAddress = page.getByPlaceholder('Address');
        this.EnterCity = page.getByPlaceholder('City');
        this.EnterCountry = page.getByPlaceholder('Country');
        this.EnterCperson = page.getByPlaceholder('Contact Person');
        this.EnterPnumber = page.getByPlaceholder('Phone Number');
        this.EnterEmail = page.getByPlaceholder('Email');
        this.EnterMnumber = page.getByPlaceholder('Mobile Number');
        this.EnterNotes = page.getByPlaceholder('Notes');
        this.ClickAddBtn = page.locator('#btnAction')
        this.ClickConfirmOk = page.getByText('OK!', { exact: true }).last();
        this.ClickAlertOk = page.locator('.ajs-button.btn.btn-primary')
        this.ClickSearchPanel = page.locator('span[data-caption="Search"]')
        this.EnterSearchCnumber = page.locator('#psearch');
        this.ClickSearchBtn = page.locator('#btnsubmit');
        //this.CustomerGrid = page.locator("#tbl_a_customerslist>tbody>tr:nth-child(1)>td:nth-child(6)>div>span>span");
    }

    // method for navigate to customer page
    async NavigateToCustomer() {
        await this.ClickCustomers.waitFor();
        await this.ClickCustomers.click();
        await this.ClickAddIcon.waitFor();
        await this.ClickAddIcon.click();
    }

    // method for fill customer details
    async addCustomerDetails(cname: string, caddress: string, ccity: string, cCountry: string,
         cCperson: string, cpNumber: string, cEmail: string, cmnumber: string, cNotes: string) {
        await this.customerNumber.waitFor();
        this.expNumber = await this.customerNumber.inputValue();
        await this.EnterCustomerName.fill(cname);
        await this.EnterAddress.fill(caddress);
        await this.EnterCity.fill(ccity);
        await this.EnterCountry.fill(cCountry);
        await this.EnterCperson.fill(cCperson);
        await	this.EnterPnumber.fill(cpNumber);
        await	this.EnterEmail.fill(cEmail);
        await	this.EnterMnumber.fill(cmnumber);
        await	this.EnterNotes.fill(cNotes);
        await	this.ClickAddBtn.click();
	}
	// method for confirm dialog
	async confirmdialog() {
		await	this.ClickConfirmOk.waitFor();
		await	this.ClickConfirmOk.click();
		await	this.ClickAlertOk.waitFor();
		await	this.ClickAlertOk.click();

	}
	// method for table validation
	// async customerTable() {
	// 	await	this.EnterSearchCnumber.waitFor();
	// 	if(!	await	this.EnterSearchCnumber.isVisible())
	// 		await	this.ClickSearchPanel.click();
	// 	await	this.EnterSearchCnumber.clear();
	// 	await	this.EnterSearchCnumber.fill(this.expNumber);
	// 	await	this.ClickSearchBtn.click();
	// 	await	this.CustomerGrid.waitFor();
	// 	const Act_Number = await	this.CustomerGrid.innerText();
	// 	console.log(`Customer Number Found in Table ${this.expNumber}  ${Act_Number}`);
	// 	await	expect(this.expNumber).toContain(Act_Number);

	// }
	async customerTable() {

	if (!await	this.EnterSearchCnumber.isVisible()) {
		await	this.ClickSearchPanel.click();
	}

	await	this.EnterSearchCnumber.fill(this.expNumber)

	await	this.ClickSearchBtn.click();

	const customerRow =this.page.locator('#tbl_a_customerslist tbody tr',
			{
				hasText: this.expNumber
			}
		);

	await expect(customerRow).toBeVisible();

	console.log(`Customer Number Found in Table: ${this.expNumber}`);
	await expect(customerRow).toContainText(this.expNumber);
}
}