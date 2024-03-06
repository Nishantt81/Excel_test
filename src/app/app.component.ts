import { Component, ViewChild, ElementRef } from '@angular/core';
import { ExcelService } from './excel.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  excelData: any;
  columnNames: string[] = [];
  predefinedArray = [
    'product_id',
    'product_name',
    'product_price'
  ];
  mapping: { [key: string]: string } = {};
  isMappingConfirmed = false;
  mappingItems = [
    { predefinedColumnName: 'product_id', excelColumnName: '' },
    { predefinedColumnName: 'product_name', excelColumnName: '' },
    { predefinedColumnName: 'product_price', excelColumnName: '' }
  ];
  title = 'Excel';

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor( private excelService: ExcelService) {}

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: any) {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      this.excelService.readExcel(selectedFile).then(data => {
        console.log("Excel data: ", data);
        this.excelData = data.data;
        this.columnNames = data.columns;
        this.openMappingDialog();
      }).catch(error => {
        console.error('Error reading Excel file: ', error);
      });
    }
  }

  openMappingDialog() {
    
    
    this.mapping = {
      'product_id': this.columnNames[0] || '',
      'product_name': this.columnNames[1] || '',
      'product_price': this.columnNames[2] || '',
      
    };
    this.isMappingConfirmed = true;
  }

  confirmMapping(mapping: { [key: string]: string }) {
    
    this.mapping = mapping;
    this.isMappingConfirmed = true;

    const tableData = this.excelData.map((row: any) => {
      const mappedRow: any = {};
      for (const key of this.predefinedArray) {
        mappedRow[key] = row[this.mapping[key]];
      }
      return mappedRow;
    });

    this.openTablePopupWindow(tableData);
  }

  openTablePopup() {
    if (!this.isMappingConfirmed) {
      this.openMappingDialog();
      
    } else {
      
      const tableData = this.excelData.map((row: any) => {
        const mappedRow: any = {};
        for (const key of this.predefinedArray) {
          mappedRow[key] = row[this.mapping[key]];
        }
        return mappedRow;
      });
      
      this.openTablePopupWindow(tableData);
    }
  }

  openTablePopupWindow(data: any[]) {
    const popupWidth = 600; 
    const popupHeight = 400; 

    const left = (window.screen.width - popupWidth) / 2;
    const top = (window.screen.height - popupHeight) / 2;

    const popupWindow = window.open('', '_blank', `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`);
    
    if (popupWindow) {
      popupWindow.document.write('<h2>Table Data</h2>');
      popupWindow.document.write('<table border="1">');
      popupWindow.document.write('<tr>');
      for (const key of Object.keys(this.mapping)) {
        popupWindow.document.write(`<th>${key}</th>`);
      }
      popupWindow.document.write('</tr>');
      for (const row of data) {
        popupWindow.document.write('<tr>');
        for (const key of Object.keys(this.mapping)) {
          popupWindow.document.write(`<td>${row[key]}</td>`);
        }
        popupWindow.document.write('</tr>');
      }
      popupWindow.document.write('</table>');
      popupWindow.document.close();
    } else {
      console.error('Failed to open popup window.');
    }
  }
}

  
