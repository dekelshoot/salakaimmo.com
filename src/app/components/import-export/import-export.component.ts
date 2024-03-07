import { Component, OnInit } from '@angular/core';
import { ImportexportService } from '../../services/importexport.service';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit {

  constructor(private importexportService: ImportexportService) { }
  loader = false
  ngOnInit() { }

  onImportData() {
    this.loader = true;
    this.importexportService.importData().then(
      (data: any) => {
        this.loader = false;
        console.log(data)
      }, (error: any) => {
        this.loader = false;
        console.log(error)
      }
    )
  }
  onExportData() { }

}
