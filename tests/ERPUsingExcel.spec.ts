import { AdminLoginPage } from "../Pages/AdminLoginPage";
import { SuppliersPage } from "../Pages/SuppliersPage";
import { CustomersPage } from "../Pages/CustomersPage";
import { AdminLogout } from "../Pages/AdminLogout";
import { ExcelFileUtil } from "../Utils/ExcelFileUtil";
import path from "path";
import test from "@playwright/test";
//store path of excel file
const excelPath = path.join(__dirname,"../TestData/StockData.xlsx")
let login: AdminLoginPage
let sup: SuppliersPage
let cus: CustomersPage
let logout:AdminLogout
//declare varibales to store sheets
let supSheet:any
let cusSheet:any
try {
    //get supplier sheet data from excel sheet name("SuppliersExcelData")
    supSheet = ExcelFileUtil.getCellData(excelPath,"SuppliersExcelData")
    //get customer sheet data from excel sheet name("CustomersExcelData")
    cusSheet = ExcelFileUtil.getCellData(excelPath,"CustomersExcelData")
} catch (error) {
    console.log(error)
}
//console.log(supSheet)
//console.log(cusSheet)
test.beforeEach(async({page})=>{
    login = new AdminLoginPage(page)
    await login.launchURl(process.env.BASE_URL!)
    await login.login(process.env.BASE_USER!,process.env.BASE_PASS!)
})
test.describe('ERP Management Using Excel',()=>{
    //supplier test case
    for (const data of supSheet) {
     test.skip(`Supplier data ${data.suppliername}`,async({page})=>{
        sup = new SuppliersPage(page)
        await sup.NavigateToSupplier()
        await sup.addSupplierDeatils(
            data.suppliername,
            data.Address,
            data.City,
            data.Country,
            data.Contactperson,
            data.phoneNumber,
            data.Email,
            data.MobileNumber,
            data.Notes
        )
        await sup.confirmdialog()
        await sup.supplierTable()
     })   
    }

    //customer test case
    for (const data of cusSheet) {
//data is holding excel header and cusSheet is holding the data value.
        test(`Customer Test ${data.customername}`,async({page})=>{
//data.customername mean's atleast one excel column name parameter should give
            cus = new CustomersPage(page)
            await cus.NavigateToCustomer()
            await cus.addCustomerDetails(
                data.customername,
                data.Address,
                data.City,
                data.Country,
                data.contactPerson,
                data.PhoneNumber,
                data.Email,
                data.MobileNumber,
                data.Notes
                
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