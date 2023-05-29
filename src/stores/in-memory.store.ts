/**
 * In memory store which can be used to manage any generic array structure.
 */
class InMemoryStore<T extends object> {
  entities: T[];

  constructor(entities: T[] = []) {
    this.entities = entities;
  }

  add(entity: T) {
    if (!this.entities.find((e) => entity)) {
      this.entities.push(entity);
    }
  }

  delete(entity: Partial<T>) {
    const found_entity = this.find(entity);
    this.entities.filter((e) => e !== found_entity);
  }

  update(identifier: Partial<T>, entity: Partial<T>) {
    const found_entity = this.find(identifier);
    return { ...found_entity, ...entity };
  }

  find(entity: Partial<T>) {
    const found_entity = this.entities.find((e) => {
      for (let key in entity) {
        if (entity[key] !== e[key]) {
          return false;
        }
      }
      return true;
    });

    return found_entity;
  }
}

export default InMemoryStore;
