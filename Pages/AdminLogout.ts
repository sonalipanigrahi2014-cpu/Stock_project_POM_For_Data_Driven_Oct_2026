import { Locator, Page } from "@playwright/test";

export class AdminLogout{
    page:Page
    readonly clickLogout:Locator
    constructor(page:Page)
    {
        this.page =page
        this.clickLogout = page.locator('#mi_logout')

    }
    async ErpLogout()
    {
        await this.clickLogout.click()
    }
}