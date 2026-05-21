import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      paymentMethod: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      
      // Simple console output
      console.log('Pedido registrado con exito: OK');
      console.log('Cliente:', orderData.clientName);
      console.log('Direccion:', orderData.address);
      console.log('Cantidad:', orderData.quantity);
      console.log('Metodo de pago:', orderData.paymentMethod);

      // Reset form but keep default quantity as 1
      this.orderForm.reset({
        clientName: '',
        address: '',
        quantity: 1,
        paymentMethod: ''
      });
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
}
