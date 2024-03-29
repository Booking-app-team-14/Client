import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationDTO, OwnerDTO} from "../../shared/models/accommodation-details.model";
import {Accommodation} from "../../shared/models/accommodation.model";

export class OwnerService {

    constructor(private http: HttpClient) { }

    getAccommodationById(id: number): Observable<AccommodationDTO>{
        return this.http.get<AccommodationDTO>(`http://localhost:8080/api/accommodations/${id}`);
    }
    getUserById(currentUser:any): Observable<number> {
        return this.http.get<number>(`https://localhost:8080/api/users/token/${currentUser.token}`);
    }

    /*getOwnerByAccommodationId(accommodationId: number): Observable<any> {
      const url = `${this.baseUrl}/${accommodationId}/owner`;
      return this.http.get(url);
    }*/

    //getOwnerByAccommodationId(id: number):
    getOwnerByAccommodationId(accommodationId: number): Observable<OwnerDTO>{
        return this.http.get<OwnerDTO>(`http://localhost:8080/api/accommodations/{accommodationId}/owner`);
    }

    getOwnerByOwnerId(ownerId: number): Observable<OwnerDTO>{
        return this.http.get<OwnerDTO>(`http://localhost:8080/api/owners/{ownerId}`);
    }
}
