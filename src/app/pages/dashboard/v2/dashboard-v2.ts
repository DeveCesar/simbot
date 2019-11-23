import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TableData } from './data';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'dashboard-v2',
  templateUrl: './dashboard-v2.html'
})

export class DashboardV2Page implements OnInit {

   //Tabla
     public rows:Array<any> = [];
     public columns:Array<any> = [
    {title: 'Tipo documento', name: 'tipodocumento', filtering: {filterString: '', placeholder: 'Tipo documento'}},
    {title: 'Documento',      name: 'documento', filtering: {filterString: '', placeholder: 'Filtro por Documento'}, sort: 'asc'},
    {title: 'Primer nombre',  name: 'primernombre', sort: '', filtering: {filterString: '', placeholder: 'Primer nombre'}},
    {title: 'Segundo nombre', name: 'segundonombre'},
    {title: 'Primer apellido',name: 'primerapellido'},
    {title: 'Segundo apellido',name: 'segundoapellido'},
    {title: 'Fecha Nacimiento', name: 'fechanacimiento'},
    {title: 'Sexo',      name: 'sexo'},
    {title: 'Direccion', name: 'direccion'},
    {title: 'Eps - Ips', name: 'eps'},
    {title: 'Telefono',  name: 'telefono'},
    {title: 'Regimen',   name: 'regimen'}

  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered', 'm-b-0', 'overflow-hidden']
  };

  private data:Array<any> = TableData;
   //end tabla

  closeResult: string;
  
  //13 Variables a validar
  /*tipodocumento: string;
  documento: number;
  primernombre: string;
  segundonombre: string;
  primerapellido: string;
  segundoapellido: string;
  fechanacimiento: string;
  sexo: string;
  direccion: string;
  eps: string;
  telefono: number;
  regimen: string;*/

  constructor(private modalService: NgbModal) {
  this.length = this.data.length;
  }

  ngOnInit():void {
   this.onChangeTable(this.config);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } 



   public changePage(page:any, data:Array<any> = this.data):Array<any> {
    this.numPages = (page.itemsPerPage) ? page.itemsPerPage : this.numPages;
    page = (page.page) ? page.page : page;
    let start = (page - 1) * this.itemsPerPage;
    let end = this.itemsPerPage > -1 ? (start + this.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }




}
