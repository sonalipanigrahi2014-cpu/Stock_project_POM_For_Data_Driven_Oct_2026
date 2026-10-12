import { expect, Locator, Page } from "@playwright/test";
export class AdminLoginPage{
     page:Page
    readonly username: Locator
    readonly password: Locator
    readonly loginbtn: Locator
    HompePageIdetifier :Locator
    constructor(page:Page)
    {
        this.page= page
        this.username = page.getByRole('textbox',{name:'User Name'})
        this.password = page.getByRole('textbox',{name:'Password'})
        this.loginbtn =page.getByRole('button',{name:'Login'})
        this.HompePageIdetifier = page.locator('#ewPageCaption')
    }
    //method for launch url
    async launchURl(url:string)
    {
        await this.page.goto(url)
    }
    //method for login
    async login(user:string,pass:string)
    {
        await this.username.waitFor()
        await this.username.clear()
        await this.username.fill(user)
        await this.password.clear()
        await this.password.fill(pass)
        await this.loginbtn.click()
        await expect(this.HompePageIdetifier).toBeVisible()
    }
          
    
}