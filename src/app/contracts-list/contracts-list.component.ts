import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EthcontractService } from '../ethcontract.service';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.css']
})
export class ContractsListComponent implements OnInit {

  deployedContracts = [];

  constructor(
    private ethcontractService: EthcontractService,
    private spinner: NgxSpinnerService,
  ) { }


  loadContracts() {
    this.ethcontractService.getContractsRegistryMulticall().then((result) => {

      this.deployedContracts = result;

      this.spinner.hide();
    });
  }


  ngOnInit() {
      this.spinner.show(); // Initialize spinner
      this.loadContracts();
    }


}
