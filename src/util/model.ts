import { Model as _Model, Active } from '@src/entities';

export class Model {
  public model: _Model;
  constructor() {
    this.model = this.createModel();
  }

  private generateUid(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 28; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  }

  private createModel = (uid?: string): _Model => {
    return {
      uid: uid ?? this.generateUid(),
      createdAt: new Date(),
      active: Active.Activated,
    };
  };

  public mergeModel = <T extends _Model>(o: Omit<T, keyof _Model>): T => {
    return { ...o, ...this.model } as T;
  };
}
