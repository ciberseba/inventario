import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from 'ng2-bootstrap-modal';
import { PesoPipe } from './pipes/peso.pipe';

import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { ListarStockComponent } from './components/listar-stock/listar-stock.component';
import { NuevoProductoComponent } from './components/nuevo-producto/nuevo-producto.component';
import { ModalComponent } from './components/modal/modal.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { LoginComponent } from './components/login/login.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedorNuevoComponent } from './components/proveedores/proveedor-nuevo.component';
import { ProveedorComponent } from './components/proveedores/proveedor.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteNuevoComponent } from './components/clientes/cliente-nuevo.component';
import { ClienteComponent } from './components/clientes/cliente.component';
import { ComprasComponent } from './components/compras/compras.component';
import { CompraNuevaComponent } from './components/compras/compra-nueva.component';


const appRouter: Routes = [
  { path: '' , redirectTo: 'login', pathMatch: 'full' },
  { path: 'productos', component: ListadoProductosComponent },
  { path: 'stock', component: ListarStockComponent },
  { path: 'producto/nuevo', component: NuevoProductoComponent },
  { path: 'producto/:id', component: EditarProductoComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'proveedor/nuevo', component: ProveedorNuevoComponent },
  { path: 'proveedor/:id', component: ProveedorComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'cliente/nuevo', component: ClienteNuevoComponent },
  { path: 'cliente/:id', component: ClienteComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'compra/nuevo', component: CompraNuevaComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    PesoPipe,
    AppComponent,
    NavegacionComponent,
    ListadoProductosComponent,
    ListarStockComponent,
    NuevoProductoComponent,
    ModalComponent,
    EditarProductoComponent,
    ProveedoresComponent,
    ProveedorNuevoComponent,
    ProveedorComponent,
    ClientesComponent,
    ClienteNuevoComponent,
    ClienteComponent,
    ComprasComponent,
    CompraNuevaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRouter)
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
