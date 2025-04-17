import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoginResponse {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    authToken: string;
    authHeaderName: string;
    userType: string;
    userTypeAlias: string;
    permissions: string[];
    tokenCreationTime: number;
    tokenExpiryTime: number;
    // Add other properties as needed
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        // Check if we have a stored user in localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    login(username: string, password: string): Observable<LoginResponse> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this.http.post<LoginResponse>('/api/login', { username, password }, { headers })
            .pipe(
                map(response => {
                    // Store user details and token in local storage
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    this.currentUserSubject.next(response);
                    return response;
                })
            );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): LoginResponse | null {
        return this.currentUserSubject.value;
    }

    getAuthHeader(): { [key: string]: string } | null {
        const currentUser = this.getCurrentUser();
        if (currentUser?.authToken && currentUser?.authHeaderName) {
            return { [currentUser.authHeaderName]: currentUser.authToken };
        }
        return null;
    }
}