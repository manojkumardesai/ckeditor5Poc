import { LoginResponse } from '../services/login.service';

declare module 'ckeditor5/src/core' {
    interface Context {
        user?: LoginResponse;
    }
}