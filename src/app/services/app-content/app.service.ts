import { Injectable } from '@angular/core';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';
import * as dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = environment.api_url;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Credentials': `true`,
  });
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getUserProfile(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl + '/auth/user',{headers: this.herdersService.header()}).pipe(catchError(err => {
      return throwError(err);
    }));
              }

  getEntityType(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/types`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllEntity(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntity(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityPaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntitySearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addEntity(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateEntity(data:any,user_id:string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/entities/`+ user_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableEntity(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableEntity(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/entities/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllSeller(type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSeller(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSellerPaginate(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSellerSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSellerPaginateSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addSeller(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateSeller(data:any,user_id:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableSeller(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableSeller(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/entities/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllClient(type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getClient(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getClientPaginate(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getClientSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getClientPaginateSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addClient(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateClient(data:any,user_id:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableClient(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableClient(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/entities/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllProductToAdd(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/products`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllProductRelated(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/products/related/list`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllProduct(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/products/entity/list`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getProduct(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/products/entity/list?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getProductPaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/products/entity/list?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getProductSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/products/entity/list?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getProductPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/products/entity/list?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addProduct(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/products/associate`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableProduct(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/products/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableProduct(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllPriceByProductId(productId:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/prices/product/`+productId,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPrice(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/prices?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPricePaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/prices?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPriceSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/prices?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPricePaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/prices?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addPrice(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/prices`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updatePrice(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/products/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enablePrice(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/products/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disablePrice(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getProfile(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/profils`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllUser(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllUserPaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllUserSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllUserPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUser(page:number,profile:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&profile_id=`+ profile,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserPaginate(page:number,profile:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&profile_id=`+ profile,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserSearch(page:number,profile:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&profile_id=`+ profile +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserPaginateSearch(page:number,profile:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&profile_id=`+ profile +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addUser(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateUser(data:any,user_id:string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/`+ user_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  sendWelcome(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/welcome/send-welcome`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableUser(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableUser(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getTracker(page:number,role:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getTrackerPaginate(page:number,role:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getTrackerSearch(page:number,role:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getTrackerPaginateSearch(page:number,role:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getWallet(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/wallets?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWalletPaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/wallets?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWalletSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/wallets?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWalletPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/wallets?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addWallet(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wallets`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addDeposit(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wallets/balance/add`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSale(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/sales?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSalePaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/sales?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSaleSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/sales?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSalePaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/sales?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addSale(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sales`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  cancelSale(sale_id:any,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sales/state/update/`+sale_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getPurchase(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/purchases?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPurchasePaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/purchases?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPurchaseSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/purchases?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPurchasePaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/purchases?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addPurchase(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/purchases`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  cancelPurchase(purchase_id:any,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/purchases/state/update/`+purchase_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllOperation(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllOperationPaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllOperationSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllOperationPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getOperation(wallet_id:number,page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`+`&walletRef=`+ wallet_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationPaginate(wallet_id:number,page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`+`&walletRef=`+ wallet_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationSearch(wallet_id:number,page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`+`&walletRef=`+ wallet_id +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationPaginateSearch(wallet_id:number,page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`+`&walletRef=`+ wallet_id +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationByEntityId(entity_id:number,page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations/entity-operations/`+entity_id+`?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationByEntityIdPaginate(entity_id:number,page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations/entity-operations/`+entity_id+`?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationByEntityIdSearch(entity_id:number,page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations/entity-operations/`+entity_id+`?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationByEntityIdPaginateSearch(entity_id:number,page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations/entity-operations/`+entity_id+`?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addOperation(wallet_id:number,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/operations`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  cancelOperation(operation_id:number,data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/operations/cancel/`+operation_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getStatistic(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/statistics`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getStatisticWithDate(from:Date,to:Date): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/statistics/`+from+`/`+to,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllArticleCategory(entity_id:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/article-categories?entity_id=` +entity_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getArticleCategory(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/article-categories?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getArticleCategoryPaginate(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/article-categories?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getArticleCategorySearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/article-categories?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getArticleCategoryPaginateSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/article-categories?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addArticleCategory(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/article-categories`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateArticleCategory(sale_id:any,data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/article-categories/`+sale_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllArticle(entity_id:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/articles?entity_id=` +entity_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllArticleByTypeId(entity_id:number, article_type_id: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/articles?entity_id=` +entity_id+ `&article_category_id=`+article_type_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getArticle(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/articles?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getArticlePaginate(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/articles?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getArticleSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/articles?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getArticlePaginateSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/articles?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addArticle(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/articles`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateArticle(sale_id:any,data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/articles/`+sale_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  
  getCashRegister(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/cash-registers?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getCashRegisterPaginate(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/cash-registers?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getCashRegisterSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/cash-registers?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getCashRegisterPaginateSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/cash-registers?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addCashRegister(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cash-registers`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateCashRegister(sale_id:any,data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/cash-registers/`+sale_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }






  getAllSupplier(type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSupplier(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSupplierPaginate(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSupplierSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSupplierPaginateSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addSupplier(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateSupplier(data:any,user_id:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableSupplier(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableSupplier(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/entities/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllSpecialSupplier(type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSpecialSupplier(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSpecialSupplierPaginate(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSpecialSupplierSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSpecialSupplierPaginateSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addSpecialSupplier(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateSpecialSupplier(data:any,user_id:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableSpecialSupplier(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableSpecialSupplier(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/entities/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  
  getAllDelegate(type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDelegate(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDelegatePaginate(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDelegateSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDelegatePaginateSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addDelegate(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateDelegate(data:any,user_id:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableDelegate(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableDelegate(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/entities/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllCooperative(type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getCooperative(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getCooperativePaginate(page:number,type:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}&type=`+type,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getCooperativeSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getCooperativePaginateSearch(page:number,type:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&type=`+type+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addCooperative(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateCooperative(data:any,user_id:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableCooperative(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entities/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableCooperative(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/entities/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityStatistics(entity_product_id:number,campaign_id:number,from:Date,to:Date): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/entities/statistics/`+entity_product_id+`/`+campaign_id+`/`+from+`/`+to,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntitiesStatistics(entity_type_id:number,entity_product_id:number,campaign_id:number,from:Date,to:Date): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/entities/entities-statistics/`+ entity_type_id+`/`+entity_product_id+`/`+campaign_id+`/`+from+`/`+to,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSupplierStatistics(entity_id:number,entity_product_id:number,campaign_id:number,from:Date,to:Date): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/entities/supplier-statistics/`+ entity_id+`/`+entity_product_id+`/`+campaign_id+`/`+from+`/`+to,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getSpecialSupplierStatistics(entity_id:number,entity_product_id:number,campaign_id:number,from:Date,to:Date): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/entities/special-supplier-statistics/`+ entity_id+`/`+entity_product_id+`/`+campaign_id+`/`+from+`/`+to,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDelegateStatistics(entity_id:number,entity_product_id:number,campaign_id:number,from:Date,to:Date): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/entities/delegate-statistics/`+ entity_id+`/`+entity_product_id+`/`+campaign_id+`/`+from+`/`+to,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getDelegateCommissions(entity_id:number,entity_product_id:number,campaign_id:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/entities/delegate-commissions/`+ entity_id+`/`+entity_product_id+`/`+campaign_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllWalletByEntityId(entity_id:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/wallets?entity_id=` +entity_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWalletByEntityId(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/wallets?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWalletByEntityIdPaginate(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/wallets?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWalletByEntityIdSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/wallets?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWalletByEntityIdPaginateSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/wallets?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addWalletByEntityId(entity_id:number, data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/wallets`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateWallet(wallet_id:number, data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/wallets/`+wallet_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getOperationByWalletId(wallet_id:number,page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`+`&wallet_id=`+ wallet_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationByWalletIdPaginate(wallet_id:number,page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`+`&wallet_id=`+ wallet_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationByWalletIdSearch(wallet_id:number,page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`+`&wallet_id=`+ wallet_id +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getOperationByWalletIdPaginateSearch(wallet_id:number,page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/operations?page=${page}`+`&wallet_id=`+ wallet_id +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllEntityProduct(entity_id:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entity-products?entity_id=` +entity_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityProduct(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entity-products?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityProductPaginate(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entity-products?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityProductSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entity-products?entity_id=` +entity_id+`&page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityProductPaginateSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entity-products?entity_id=` +entity_id+`&page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addEntityProduct(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entity-products`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableEntityProduct(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entity-products/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableEntityProduct(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/entity-products/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllEntityCampaign(entity_id:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/campaigns?entity_id=` +entity_id,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityCampaign(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/campaigns?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityCampaignPaginate(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/campaigns?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityCampaignSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/campaigns?entity_id=` +entity_id+`&page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityCampaignPaginateSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/campaigns?entity_id=` +entity_id+`&page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addEntityCampaign(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/campaigns`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateEntityCampaign(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/campaigns/`+ user_id +`/update`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enableEntityCampaign(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/campaigns/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableEntityCampaign(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/campaigns/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getAllPaymentMethod(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/payment-methods`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPaymentMethod(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/payment-methods?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPaymentMethodPaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/payment-methods?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPaymentMethodSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/payment-methods?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getPaymentMethodPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/payment-methods?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addPaymentMethod(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/payment-methods`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  enablePaymentMethod(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/payment-methods/`+ user_id +`/enable`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disablePaymentMethod(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/payment-methods/`+ user_id +`/disable`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getWeightLoading(entity_id:number, page:number): Observable<any> {
    console.log('entity_id',entity_id);
    return this.http.get<any[]>(`${this.baseUrl}/weight-loadings?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWeightLoadingPaginate(entity_id:number, page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/weight-loadings?entity_id=` +entity_id+`&page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWeightLoadingSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/weight-loadings?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWeightLoadingPaginateSearch(entity_id:number, page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/weight-loadings?entity_id=` +entity_id+`&page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addWeightLoading(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/weight-loadings`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateWeightLoading(id:any,data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/weight-loadings/`+id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getWarehouseDelivery(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouse-deliveries?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWarehouseDeliveryPaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouse-deliveries?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWarehouseDeliverySearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouse-deliveries?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWarehouseDeliveryPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouse-deliveries?page=${page}` +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  addWarehouseDelivery(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/warehouse-deliveries`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  updateWarehouseDelivery(id:any,data:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/warehouse-deliveries/`+id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  getWarehouseDeliveryByEntityId(entity_id:number,page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouse-deliveries/entity/`+entity_id+`?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWarehouseDeliveryByEntityIdPaginate(entity_id:number,page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouse-deliveries/entity/`+entity_id+`?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWarehouseDeliveryByEntityIdSearch(entity_id:number,page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouse-deliveries/entity/`+entity_id+`?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getWarehouseDeliveryByEntityIdPaginateSearch(entity_id:number,page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouse-deliveries/entity/`+entity_id+`?page=${page}`+`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
