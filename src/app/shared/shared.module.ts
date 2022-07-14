import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { QuillModule } from "ngx-quill";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  ]
})

export class SharedModule {

}
