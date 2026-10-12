import { expect, Locator, Page } from "@playwright/test";
export class SuppliersPage{
      //declration of properties as Locaators
    page:Page
    readonly ClickSuppliers:Locator
    readonly ClickAaddIcon: Locator
    readonly supplierNumber:Locator
    readonly EnterSupplierName:Locator
    readonly EnterAddress:Locator
    readonly EnterCity:Locator
    readonly EnterCountry:Locator
    readonly EnterCperson:Locator
    readonly EnterPnumber:Locator
    readonly EnterEmail:Locator
    readonly EnterMnumber: Locator
    readonly EnterNotes:Locator
    readonly ClickAddBtn: Locator
    readonly ClickConfirmOk: Locator
    readonly ClickAlertOk:Locator
    readonly ClickSearchPanel:Locator
    readonly EnterSearchSnumber:Locator
    readonly ClickSearchBtn:Locator
    readonly SupplierGrid:Locator
     private expNumber!: string;
    //create constructor to initilize Locator values
    constructor(page:Page)
    {
        this.page =page
        this.ClickSuppliers = page.locator('#mi_a_suppliers')
        this.ClickAaddIcon = page.locator("span[data-caption='Add']").first()
        this.supplierNumber = page.getByRole('textbox',{name:'Supplier Number'})
        this.EnterSupplierName = page.getByPlaceholder('Supplier Name')
        this.EnterAddress= page.getByPlaceholder('Address')
        this.EnterCity = page.getByPlaceholder('City')
        this.EnterCountry = page.getByPlaceholder('Country')
        this.EnterCperson = page.getByPlaceholder('Contact Person')
        this.EnterPnumber = page.getByPlaceholder('Phone Number')
        this.EnterEmail = page.getByPlaceholder('Email')
        this.EnterMnumber = page.getByPlaceholder('Mobile Number')
        this.EnterNotes = page.getByPlaceholder('Notes')
        this.ClickAddBtn = page.locator('#btnAction')
        this.ClickConfirmOk =page.getByText('OK!',{exact:true}).last()
        this.ClickAlertOk = page.locator('.ajs-button.btn.btn-primary')
        this.ClickSearchPanel = page.locator('span[data-caption="Search"]')
        this.EnterSearchSnumber =page.locator('#psearch')
        this.ClickSearchBtn = page.locator('#btnsubmit')
        this.SupplierGrid = page.locator("#tbl_a_supplierslist>tbody>tr:nth-child(1)>td:nth-child(6)>div>span>span")
    }
    //method for navigate to supplier page
    async NavigateToSupplier()
    {
        await this.ClickSuppliers.waitFor()
        await this.ClickSuppliers.click()
        await this.ClickAaddIcon.waitFor()
        await this.ClickAaddIcon.click()

    }
    //method for fill supplier deatils
    async addSupplierDeatils(sname:string,saddress:string,scity:string,sCountry:string,
        sCperson:string,spNumber:string,sEmail:string,smnumber:string,sNotes:string)
    {
        await this.supplierNumber.waitFor()
        this.expNumber = await this.supplierNumber.inputValue()
        await this.EnterSupplierName.fill(sname)
        await this.EnterAddress.fill(saddress)
        await this.EnterCity.fill(scity)
        await this.EnterCountry.fill(sCountry)
        await this.EnterCperson.fill(sCperson)
        await this.EnterPnumber.fill(spNumber)
        await this.EnterEmail.fill(sEmail)
        await this.EnterMnumber.fill(smnumber)
        await this.EnterNotes.fill(sNotes)
        await this.ClickAddBtn.click()
        }
        //method for confir dialog
        async confirmdialog()
        {
            await this.ClickConfirmOk.waitFor()
            await this.ClickConfirmOk.click()
            await this.ClickAlertOk.waitFor()
            await this.ClickAlertOk.click()

        }
        //method for table validation
        // async supplierTbale()
        // {
        //     await this.EnterSearchSnumber.waitFor()
        //     if(! await this.EnterSearchSnumber.isVisible())
        //      await this.ClickSearchPanel.click()
        //     await this.EnterSearchSnumber.clear()
        //     await this.EnterSearchSnumber.fill(Exp_Number)
        //     await this.ClickSearchBtn.click()
        //     await this.SupplierGrid.waitFor()
        //     const Act_Number = await this.SupplierGrid.innerText()
        //     console.log(`Supplier Number Found in Table ${Exp_Number}  ${Act_Number}`)
        //     await expect(Exp_Number).toContain(Act_Number)

        // }
        async supplierTable() {

        if (!await this.EnterSearchSnumber.isVisible()) {
            await this.ClickSearchPanel.click();
        }

        await this.EnterSearchSnumber.fill(this.expNumber)

        await this.ClickSearchBtn.click();

        const supplierRow =this.page.locator('#tbl_a_supplierslist tbody tr',
                {
                    hasText: this.expNumber
                }
            )

        await expect(supplierRow).toBeVisible();

        console.log(`Supplier Number Found in Table: ${this.expNumber}`)
        await expect(supplierRow).toContainText(this.expNumber)
    }

}