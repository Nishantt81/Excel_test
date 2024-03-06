import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  readExcel(file: File): Promise <any>  {
    return new Promise ((resolve, reject)=> {
      const fileReader = new FileReader ();

      fileReader.onload = (e)=> {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, {type:'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, {raw: true});

        const  columnNames = Object.keys(excelData[0]);
        resolve ({data: excelData, columns: columnNames});
      };

      

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsArrayBuffer(file);
    });
  }
}
