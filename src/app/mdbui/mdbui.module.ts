import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox'
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse'

const mdb = [
  CommonModule,
  MdbCheckboxModule,
  MdbCollapseModule,
]

@NgModule({
  declarations: [],
  imports: [ mdb ],
  exports: [ mdb ]
})
export class MdbuiModule { }
