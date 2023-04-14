export class CourseModel {
    private _id?: number
    private _title: string = ''
    public _createdAt?: Date 
    public _updatedAt?: Date
    private _objective: string = '' 
    private _publish: boolean = false

    get id() {
      return this._id === undefined ? 0 : this._id
    }
    
    set id(val: number) {
      this._id = val
    }
    
    get title() {
      return this._title
    }
    
    set title(val: string) {
      this._title = val
    }
    
    get objective() {
      return this._objective
    }
    
    set objective(val: string) {
      this._objective = val
    }
    
    get publish() {
      return this._publish
    }
    
    set publish(val: boolean) {
      this._publish = val
    }
    
    
    
}
