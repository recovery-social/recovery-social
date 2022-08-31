import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-recovery-service',
  templateUrl: './ui-recovery-service.component.html',
  styleUrls: ['./ui-recovery-service.component.scss']
})
export class UiRecoveryServiceComponent implements OnInit {
  @Input() address?: string
  @Input() guardian?: any
  
  @Input() small = false

  constructor() { }

  ngOnInit(): void {
  }


}
