// NetworkIdentity Module

export class NetworkIdentity {
  contructor(params) {
    this.params = Object.assign({
      geometry: true,
      material: true
    }, params);
  }
  
  integrate(self) {
    const params = self.params;
  }
  
}
