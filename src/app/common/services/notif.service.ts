import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  info(message: string = '') {
    Swal.fire({
      title: 'Info',
      text: message,
      icon: 'info',
      background: '#0e1726',
    });
  }

  error(message: string = '') {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      background: '#0e1726',
    });
  }

  success(message: string = '') {
    Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
      background: '#0e1726',
    });
  }

  warning(message: string = '') {
    Swal.fire({
      title: 'Warning!',
      text: message,
      icon: 'warning',
      background: '#0e1726',
    });
  }

}