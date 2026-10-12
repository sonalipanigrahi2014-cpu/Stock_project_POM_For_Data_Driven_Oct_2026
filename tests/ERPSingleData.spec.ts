import { AdminLoginPage } from "../Pages/AdminLoginPage";
import { SuppliersPage } from "../Pages/SuppliersPage";
import { CustomersPage } from "../Pages/CustomersPage";
import { AdminLogout } from "../Pages/AdminLogout";
import test from "@playwright/test";
let login:AdminLoginPage
let sup:SuppliersPage
let cus :CustomersPage
let logout: AdminLogout
test.beforeEach(async({page})=>{
    login = new AdminLoginPage(page)
    await login.launchURl(process.env.BASE_URL!)
    await login.login(process.env.BASE_USER!,process.env.BASE_PASS!)
    
})
test.describe('End To End ERP Management',()=>{
    //supplier module
    test('Validate Supplier Module',async({page})=>{
        sup = new SuppliersPage(page)
        await sup.NavigateToSupplier()
        await sup.addSupplierDeatils(
            'MrJohn',
            'USA',
            'London',
            'NewYork',
            'MR Mark',
            '87654987867',
            'john@gmail.com',
            '8765432',
            'New Supplier'
        )
        await sup.confirmdialog()
        await sup.supplierTable()

    })
    //customer module
    test('Validate Customer Module',async({page})=>{
        cus = new CustomersPage(page)
         await cus.NavigateToCustomer()
         await cus.addCustomerDetails(
            'Raghul',
            'Ameerpet',
            'Hyd',
            'India',
            'Qedge',
            '9876564898767',
            'Test@gmail.com',
            '7654328767',
            'Happy Customer'

        )
        await cus.confirmdialog()
        await cus.customerTable()
    })
})
test.afterEach(async({page})=>{
    logout = new AdminLogout(page)
    await logout.ErpLogout()
})