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
  submittedOrder: any = null;

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
      this.submittedOrder = { ...this.orderForm.value };
      
      // Beautifully print info to console as requested
      console.log('%c🍔 ¡NUEVO PEDIDO DE COMIDA RECIBIDO! 🍕', 'color: #ff9f43; font-size: 16px; font-weight: bold; background: #2f3640; padding: 8px 12px; border-radius: 4px;');
      console.table(this.submittedOrder);
      console.log('%cDetalles del Pedido:', 'color: #4cd137; font-weight: bold;');
      console.log(`👤 Cliente:   ${this.submittedOrder.clientName}`);
      console.log(`📍 Dirección: ${this.submittedOrder.address}`);
      console.log(`📦 Cantidad:  ${this.submittedOrder.quantity} producto(s)`);
      console.log(`💳 Pago:      ${this.submittedOrder.paymentMethod.toUpperCase()}`);
      console.log('%c---------------------------------------', 'color: #ff9f43;');

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
