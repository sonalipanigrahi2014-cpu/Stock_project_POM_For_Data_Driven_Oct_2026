import xlsx from 'xlsx'
export class ExcelFileUtil {
    static getCellData(filepath:string,sheetName:string)
    {
        try {
            //get workbook from file
            const workbook = xlsx.readFile(filepath)
            //get all sheets from wb
            const sheet = workbook.Sheets[sheetName]
            //convert all sheet data into json data
            const jsondata = xlsx.utils.sheet_to_json(sheet)
            return jsondata

        } catch (error) {
            console.log(error)
        }
    }
}