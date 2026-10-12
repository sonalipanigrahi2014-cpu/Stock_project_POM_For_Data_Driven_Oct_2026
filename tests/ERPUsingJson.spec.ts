import { AdminLoginPage } from "../Pages/AdminLoginPage";
import { SuppliersPage } from "../Pages/SuppliersPage";
import { CustomersPage } from "../Pages/CustomersPage";
import { AdminLogout } from "../Pages/AdminLogout";
//Playwright Json data we stored in one variable i.e stockdata
import stockdata from "../TestData/ERPData.json"
import test from "@playwright/test";
//console.log(stockdata)
let login: AdminLoginPage
let sup: SuppliersPage
let cus: CustomersPage
let logout:AdminLogout
test.beforeEach(async({page})=>{
    login = new AdminLoginPage(page)
    await login.launchURl(process.env.BASE_URL!)
    await login.login(process.env.BASE_USER!,process.env.BASE_PASS!)

})
test.describe('ERP Management Modules',()=>{
    for (const supdata of stockdata.Suppliers) {
      test(`Validate supplier ${supdata.Suppliername}`,async({page})=>{
        sup = new SuppliersPage(page)
        await sup.NavigateToSupplier()
        await sup.addSupplierDeatils(
            supdata.Suppliername,
            supdata.Address,
            supdata.City,
            supdata.Country,
            supdata.ContactPerson,
            supdata.PhoneNumber,
            supdata.Email,
            supdata.MobileNumber,
            supdata.Notes
        )
        await sup.confirmdialog()
        await sup.supplierTable()

      })  
    }
    //customer module
    for (const cusdata of stockdata.customers) {
        test(`Customer Validatation ${cusdata.Customername}`,async({page})=>{
            cus = new CustomersPage(page)
            await cus.NavigateToCustomer()
            await cus.addCustomerDetails(
                cusdata.Customername,
                cusdata.Address,
                cusdata.City,
                cusdata.Country,
                cusdata.ContactPerson,
                cusdata.PhoneNumber,
                cusdata.Email,
                cusdata.MobileNumber,
                cusdata.Notes
            )
            await cus.confirmdialog()
            await cus.customerTable()
        })
    }
})
test.afterEach(async({page})=>{
    logout = new AdminLogout(page)
    await logout.ErpLogout()

})