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

  getAllEntity(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
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

  getRole(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/roles`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
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

  getUser(page:number,role:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserPaginate(page:number,role:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserSearch(page:number,role:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserPaginateSearch(page:number,role:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role +`&search=` + information,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
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

  addOperation(wallet_id:number,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/operations`, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  cancelOperation(operation_id:number,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/operations/state/update/`+operation_id, data,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getStatistic(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/statistics`,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }

  getStatisticWithDate(from:Date,to:Date): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/statistics/`+from+`/`+to,{headers: this.herdersService.header()}).pipe(catchError(err => { return throwError(err); }));
  }


  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
